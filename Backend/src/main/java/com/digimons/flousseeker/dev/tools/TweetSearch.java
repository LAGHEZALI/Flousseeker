package com.digimons.flousseeker.dev.tools;

import com.digimons.flousseeker.dev.model.Geolocalisation;
import com.digimons.flousseeker.dev.model.Tweet;
import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import twitter4j.*;
import twitter4j.auth.OAuth2Token;
import twitter4j.conf.ConfigurationBuilder;

import java.util.Map;

public class TweetSearch {

    private static final String CONSUMER_KEY		= "F9ozaX4RttNhlJr0D7iaflHrg";
    private static final String CONSUMER_SECRET 	= "gEmusHgBZvtHeA8g32siuG9OJO6VLkZ32vvDAi0czaQRLXadMH";
    private static final int TWEETS_PER_QUERY		= 2000;
    private static final int MAX_QUERIES			= 100;
    private static final String SEARCH_TERM			= "bitcoin";

    private static String geoLabel;
    private static Geolocalisation geo;

    private static MongoClient client = new MongoClient("127.0.0.1", 27017);
    private static MongoDatabase db = client.getDatabase("flousseeker");
    private static MongoCollection<Document> collection = db.getCollection("day");
    private static Document document;
    private static Gson gson = new Gson();


    private static OAuth2Token getOAuth2Token() {
        OAuth2Token token = null;
        ConfigurationBuilder cb;
        cb = new ConfigurationBuilder();
        cb.setApplicationOnlyAuthEnabled(true);
        cb.setOAuthConsumerKey(CONSUMER_KEY).setOAuthConsumerSecret(CONSUMER_SECRET);
        try {
            token = new TwitterFactory(cb.build()).getInstance().getOAuth2Token();
        } catch (Exception e) {
            System.out.println("Could not get OAuth2 token");
            e.printStackTrace();
            System.exit(0);
        }
        return token;
    }

    private static Twitter getTwitter() {
        OAuth2Token token;
        token = getOAuth2Token();
        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setApplicationOnlyAuthEnabled(true);
        cb.setOAuthConsumerKey(CONSUMER_KEY);
        cb.setOAuthConsumerSecret(CONSUMER_SECRET);
        cb.setOAuth2TokenType(token.getTokenType());
        cb.setOAuth2AccessToken(token.getAccessToken());
        return new TwitterFactory(cb.build()).getInstance();
    }

    public static void searchByDay(String since, String until, boolean debug) {
        long maxID = -1;
        Twitter twitter = getTwitter();
        try {
            Map<String, RateLimitStatus> rateLimitStatus = twitter.getRateLimitStatus("search");
            RateLimitStatus searchTweetsRateLimit = rateLimitStatus.get("/search/tweets");
            System.out.printf("You have %d calls remaining out of %d, Limit resets in %d seconds\n",
                    searchTweetsRateLimit.getRemaining(),
                    searchTweetsRateLimit.getLimit(),
                    searchTweetsRateLimit.getSecondsUntilReset());
            for (int queryNumber=0;queryNumber < MAX_QUERIES; queryNumber++) {
                if (searchTweetsRateLimit.getRemaining() == 0) {
                    System.out.printf("!!! Sleeping for %d seconds due to rate limits\n", searchTweetsRateLimit.getSecondsUntilReset());

                    Thread.sleep((searchTweetsRateLimit.getSecondsUntilReset()+2) * 1000L);
                }
                Query q = new Query(SEARCH_TERM);
                q.setUntil(since);
                q.setSince(until);
                q.setCount(TWEETS_PER_QUERY);
                q.setLang("en");
                if (maxID != -1) {
                    q.setMaxId(maxID - 1);
                }
                QueryResult r = twitter.search(q);
                if (r.getTweets().size() == 0) {
                    break;
                }
                for (Status status: r.getTweets()) {
                    if (maxID == -1 || status.getId() < maxID) {
                        maxID = status.getId();
                    }
                    geoLabel = status.getUser().getLocation();
                    if(geoLabel != null && geoLabel.length() > 0) {
                        geo = Geocoder.getGeolocalisation(geoLabel, debug);
                        if(geo != null) {
                            document = new Document();
                            document=Document.parse(gson.toJson(
                                    new Tweet(status.getUser().getScreenName(), status.getText(), status.getCreatedAt().getTime(), geo, -1)
                            ));
                            collection.insertOne(document);
                            System.out.println(status.getCreatedAt().getTime() + " === " + geo);
                        }
                    }
                }
                searchTweetsRateLimit = r.getRateLimitStatus();
            }
        }
        catch (Exception e) {
            System.out.println("That didn't work well...wonder why?");
            e.printStackTrace();
        }
    }
}
