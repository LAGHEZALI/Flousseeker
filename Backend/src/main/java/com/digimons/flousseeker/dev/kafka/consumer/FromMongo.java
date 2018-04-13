package com.digimons.flousseeker.dev.kafka.consumer;

import com.digimons.flousseeker.dev.model.Geolocalisation;
import com.digimons.flousseeker.dev.model.Tweet;
import com.mongodb.spark.MongoSpark;
import com.mongodb.spark.rdd.api.java.JavaMongoRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.SparkSession;
import org.bson.Document;

import java.util.ArrayList;

public class FromMongo {

    private static SparkSession spark;
    private static JavaSparkContext jsc;

    private static JavaMongoRDD<Document> rdd;
    private static Tweet t;
    private static ArrayList<Tweet> result=new ArrayList<>();

    public static ArrayList<Tweet> getRDD(String collectionName) {
        result.clear();

        FromMongo.loadSpark(collectionName);
        FromMongo.jsc = new JavaSparkContext(spark.sparkContext());
        FromMongo.rdd = MongoSpark.load(jsc);

        rdd.foreach((Document D) ->{
            Document geo=(Document) D.get("geolocalisation");
            t=new Tweet(D.getString("username"),
                    D.getString("username"),
                    D.getLong("date"),
                    new Geolocalisation(geo.getString("label"),geo.getDouble("lat"),geo.getDouble("lng")),
                    D.getInteger("polarity"));
            FromMongo.result.add(t);
        });

        FromMongo.jsc.close();

        return FromMongo.result;

    }

    static private void loadSpark(String collectionName) {
        FromMongo.spark = SparkSession.builder()
                .master("local")
                .appName("MongoSparkConnectorIntro")
                .config("spark.mongodb.input.uri", "mongodb://127.0.0.1/flousseeker."+collectionName)
                .config("spark.mongodb.output.uri", "mongodb://127.0.0.1/flousseeker."+collectionName)
                .getOrCreate();
    }
}
