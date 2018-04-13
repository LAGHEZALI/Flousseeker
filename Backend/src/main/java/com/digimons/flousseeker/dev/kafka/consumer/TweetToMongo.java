package com.digimons.flousseeker.dev.kafka.consumer;


import com.digimons.flousseeker.dev.model.Tweet;
import com.google.gson.Gson;
import com.mongodb.*;


/*import for mongo with java */

import org.bson.Document;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;


public class TweetToMongo extends Thread {

    private static boolean debug = true;
    private static final String topicName = "tweet-streaming";

    private static Tweet newComingTweet;

    private static MongoClient client = new MongoClient("127.0.0.1", 27017);
    private static MongoDatabase db = client.getDatabase("flousseeker");
    private static MongoCollection<Document> collection = db.getCollection("Tweets");
    private static Document document;
    private static Gson gson = new Gson();

    public TweetToMongo(boolean debug) {
        TweetToMongo.debug = debug;
    }

    @Override
    public void run() {

        GenericConsumer.listen(topicName, Tweet.class, debug, tweet -> {
            newComingTweet = (Tweet) tweet;
            document = new Document();
            document=Document.parse(gson.toJson(newComingTweet));
            collection.insertOne(document);
        });
    }
}