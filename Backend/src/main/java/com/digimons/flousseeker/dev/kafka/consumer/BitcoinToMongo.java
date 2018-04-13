package com.digimons.flousseeker.dev.kafka.consumer;

import com.digimons.flousseeker.dev.model.Bitcoin;
import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class BitcoinToMongo extends Thread {

    private static final String topicName = "rtbtc";

    private static Bitcoin ValeurBitcoin;

    private static MongoClient client = new MongoClient("127.0.0.1", 27017);
    private static MongoDatabase db = client.getDatabase("flousseeker");
    private static MongoCollection<Document> collection = db.getCollection("Bitcoins");
    private static Document document;
    private static Gson gson = new Gson();

    @Override
    public void run() {

        GenericConsumer.listen(topicName, Bitcoin.class, false, vB -> {
            ValeurBitcoin = (Bitcoin) vB;
            document = new Document();
            document = Document.parse(gson.toJson(ValeurBitcoin));
            collection.insertOne(document);
        });
    }
}
