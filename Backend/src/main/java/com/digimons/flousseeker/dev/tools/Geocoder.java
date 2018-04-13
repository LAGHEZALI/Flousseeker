package com.digimons.flousseeker.dev.tools;

import com.digimons.flousseeker.dev.model.Geolocalisation;
import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.json.JSONException;
import org.json.JSONObject;
import twitter4j.*;
import twitter4j.conf.ConfigurationBuilder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.NoSuchElementException;

public class Geocoder {

    private static Geolocalisation geolocalisation;

    private static MongoClient client = new MongoClient("127.0.0.1", 27017);
    private static MongoDatabase db = client.getDatabase("flousseeker");
    private static MongoCollection<Document> collection = db.getCollection("Geocoder");
    private static Document document;
    private static BasicDBObject query;
    private static MongoCursor<Document> cursor;

    private static Gson gson = new Gson();

    private static JSONObject location;
    private static String jsonText, buffer, uri, geo,
        key = "AIzaSyDWln_K5Gh9S_AclqSyruhSZfWDoo0tVOM";

    private static ConfigurationBuilder configurationBuilder;
    private static TwitterStream twitterStream ;
    private static StatusListener listener;

    public static void fillGeocoder(boolean debug) {
        getTweetConf();
        twitterStream = new TwitterStreamFactory(configurationBuilder.build()).getInstance();
        listener = new StatusListener() {
            @Override
            public void onStatus(Status status) {
                geo = status.getUser().getLocation();
                if(geo !=null && geo.length() > 0) {
                    Geocoder.getGeolocalisation(geo, debug);
                }
            }

            @Override
            public void onDeletionNotice(StatusDeletionNotice statusDeletionNotice) {}

            @Override
            public void onTrackLimitationNotice(int numberOfLimitedStatuses) {}

            @Override
            public void onScrubGeo(long userId, long upToStatusId) {}

            @Override
            public void onStallWarning(StallWarning warning) {}

            @Override
            public void onException(Exception ex) {}
        };

        twitterStream.addListener(listener);

        twitterStream.sample();
    }

    private static void getTweetConf() {
        configurationBuilder = new ConfigurationBuilder();
        configurationBuilder.setOAuthConsumerKey("sVP3gCTtRmooyzyZufYcpSo4q")
                .setOAuthConsumerSecret("I4hTiciOAqCKoJNCPqPCRezquuCQjNgdQrThLKylfSWFPZc2eG")
                .setOAuthAccessToken("371711588-x3Nl9HfKPdstzMt5uw5GXj4tPfnyvdJW5HsCqVBj")
                .setOAuthAccessTokenSecret("Hac3D9sXJda479CwyPJaPJDtDhTEseE0yxV7xDv2WYyYG");
    }

    public static Geolocalisation getGeolocalisation(String label, boolean debug) {

        Geocoder.geolocalisation = getGeolocalisationFromLocal(label);
        if(Geocoder.geolocalisation != null) {
            if(debug) {
                System.out.println("=== FROM LOCAL ===" + Geocoder.geolocalisation);
            }
            return Geocoder.geolocalisation;
        } else {
            Geocoder.geolocalisation = getGeolocalisationFromGoogle(label);
            if (Geocoder.geolocalisation != null) {
                Geocoder.updateGeocoderCollection(Geocoder.geolocalisation);
                if (debug) {
                    System.out.println("=== FROM GOOGLE ===" + Geocoder.geolocalisation);
                }
                return Geocoder.geolocalisation;
            } else {
                return null;
            }
        }
    }

    private static Geolocalisation getGeolocalisationFromGoogle(String label){

        uri = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                label.replaceAll(" ","+") + "&key=" + Geocoder.key;
        try {
            URLConnection yc = new URL(uri).openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(yc.getInputStream()));
            jsonText = "";

            while((buffer = in.readLine())!=null)
                jsonText += buffer;
            try {
                location = new JSONObject(jsonText).getJSONArray("results").getJSONObject(0)
                        .getJSONObject("geometry").getJSONObject("location");


                Geocoder.geolocalisation = new Geolocalisation(label, location.getDouble("lat"), location.getDouble("lng"));
                if ( Geocoder.geolocalisation != null ) {
                    Geocoder.updateGeocoderCollection(Geocoder.geolocalisation);
                }
                return geolocalisation;

            } catch (JSONException e) {
                //e.printStackTrace();
                return null;
            }
        } catch ( IOException e) {
            //e.printStackTrace();
            return null;
        }
    }

    private static Geolocalisation getGeolocalisationFromLocal(String label){

        query = new BasicDBObject();
        query.put("label", label);

        cursor = collection.find(query).iterator();

        if (cursor.hasNext()) {
            try {
                Geocoder.geolocalisation = gson.fromJson(cursor.next().toJson(), Geolocalisation.class);
            } catch (Exception e) {
                Geocoder.geolocalisation = null;
            }
        } else {
            Geocoder.geolocalisation = null;
        }
        try {
            cursor.close();
        } catch (Exception ignored) {}
        return Geocoder.geolocalisation;
    }

    private static void updateGeocoderCollection(Geolocalisation geolocalisation){
        document = Document.parse(gson.toJson(geolocalisation));
        try {
            collection.insertOne(document);
        } catch (MongoWriteException e) {
            // duplicate key -> just ignore it
        }
    }
}
