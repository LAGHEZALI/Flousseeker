package com.digimons.flousseeker.dev.tools;
import com.digimons.flousseeker.dev.kafka.consumer.FromMongo;
import com.digimons.flousseeker.dev.model.Geolocalisation;
import com.digimons.flousseeker.dev.model.Important;
import com.digimons.flousseeker.dev.model.Sentiment;
import com.digimons.flousseeker.dev.model.Tweet;
import com.digimons.flousseeker.dev.spark.TweetSentimentAnalyzer;
import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.spark.MongoSpark;

import com.mongodb.spark.rdd.api.java.JavaMongoRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.sql.SparkSession;

import org.bson.Document;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.Collectors;


public final class WriteToMongoDB {

    /********** insert one******************************/
    private static MongoClient client = new MongoClient("127.0.0.1", 27017);
    private static MongoDatabase db = client.getDatabase("flousseeker");
    private static MongoCollection<Document> collection;
   // private static Document document;
    private static Gson gson = new Gson();
    /******************************************************/

    private static SparkSession spark;
    private static JavaSparkContext jsc;

    private static JavaMongoRDD<Document> rdd;

    private static ArrayList<Tweet> newtweets;
    private static ArrayList<Tweet> Alltweets;
    private static ArrayList<Important> impotance=new ArrayList();
    private static int nballtweets;


    public static void updateimpo()  {

        System.setProperty("hadoop.home.dir", "D:\\DevTools\\hadoop");

        Alltweets= FromMongo.getRDD("Tweets");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        WriteToMongoDB.loadSpark("Importances");
          JavaSparkContext jsc = new JavaSparkContext(WriteToMongoDB.spark.sparkContext());
        JavaMongoRDD<Document> rdd = MongoSpark.load(jsc);

        WriteToMongoDB.nballtweets=Alltweets.size();

        WriteToMongoDB.newtweets=Alltweets.stream()
        .filter(T-> T.getPolarity()==-1)
        .collect(Collectors.toCollection(ArrayList::new));

        rdd.foreach(I->{
            Document geo=(Document) I.get("geolocalisation");
            long n=(I.getInteger("nb")+newtweets.stream()
                    .filter(T-> T.egale(geo.getDouble("lng"), geo.getDouble("lat")))
                     .count());
            impotance.add(new Important((double)n/(double)WriteToMongoDB.nballtweets,n,
                          new Geolocalisation(geo.getString("label"), geo.getDouble("lat"), geo.getDouble("lng"))));

            WriteToMongoDB.newtweets=WriteToMongoDB.newtweets.stream()
                    .filter(T-> !T.egale(geo.getDouble("lng"),geo.getDouble("lat")))
                    .collect(Collectors.toCollection(ArrayList::new));
        });

        newtweets.forEach(T->{
            long n=(long) Collections.frequency(newtweets,T);
            if(n!=0) {
                impotance.add(new Important((double) n / (double) WriteToMongoDB.nballtweets, n,
                        T.getLocation()));
                WriteToMongoDB.newtweets = WriteToMongoDB.newtweets.stream()
                        .filter(t -> !t.equals(T))
                        .collect(Collectors.toCollection(ArrayList::new));
            }
        });

        JavaRDD<Document> sparkDocuments = jsc.parallelize(impotance).map
                ((Function<Important, Document>) i -> Document.parse(gson.toJson(i)));

        BasicDBObject document = new BasicDBObject();

// Delete All documents from collection Using blank BasicDBObject
        collection.deleteMany(document);
MongoSpark.save(sparkDocuments);

        jsc.close();
    }

    public  static void updateTweets(){
        WriteToMongoDB.newtweets    = WriteToMongoDB.Alltweets.stream()
                .filter(T-> T.getPolarity()==-1)
                .collect(Collectors.toCollection(ArrayList::new));
        WriteToMongoDB.Alltweets    = WriteToMongoDB.Alltweets.stream()
                .filter(T-> T.getPolarity()!=-1)
                .collect(Collectors.toCollection(ArrayList::new));
         newtweets.forEach(T->{
             T.setPolarity(TweetSentimentAnalyzer.predictpolarity(T.getText()));
         });
         TweetSentimentAnalyzer.stopSparkStreamingContext();

        WriteToMongoDB.Alltweets.addAll( WriteToMongoDB.newtweets);

        WriteToMongoDB.loadSpark("Tweets");
        JavaSparkContext jsc = new JavaSparkContext(WriteToMongoDB.spark.sparkContext());

        JavaRDD<Document> sparkDocuments = jsc.parallelize(Alltweets).map
                ((Function<Tweet, Document>) i -> Document.parse(gson.toJson(i)));

        BasicDBObject document = new BasicDBObject();

// Delete All documents from collection Using blank BasicDBObject
        collection.deleteMany(document);
        MongoSpark.save(sparkDocuments);

        jsc.close();
        WriteToMongoDB.loadSpark("Sentiments");
        long pos= WriteToMongoDB.newtweets .stream().filter(T-> T.getPolarity()==1).count();
        long neg=WriteToMongoDB.newtweets .stream().filter(T-> T.getPolarity()==2).count();
        long neu=WriteToMongoDB.newtweets .stream().filter(T-> T.getPolarity()==0).count();
        Document d;
        d=Document.parse(gson.toJson(new Sentiment(pos,neg,neu)));
        collection.insertOne(d);
    }

    static private void loadSpark(String collectionName) {
        WriteToMongoDB.spark = SparkSession.builder()
                .master("local")
                .appName("MongoSparkConnectorIntro")
                .config("spark.mongodb.input.uri", "mongodb://127.0.0.1/flousseeker."+collectionName)
                .config("spark.mongodb.output.uri", "mongodb://127.0.0.1/flousseeker."+collectionName)
                .getOrCreate();
        collection = db.getCollection(collectionName);
    }

}