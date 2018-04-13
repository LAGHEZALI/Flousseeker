package com.digimons.flousseeker.dev.tools;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.SparkSession;
import org.bson.Document;

import com.mongodb.spark.MongoSpark;
import com.mongodb.spark.rdd.api.java.JavaMongoRDD;

import static java.util.Collections.singletonList;

public class ReadFromMongoDB {
    public static void main(final String[] args) {

        SparkSession spark = SparkSession.builder()
                .master("local")
                .appName("MongoSparkConnectorIntro")
                .config("spark.mongodb.input.uri", "mongodb://127.0.0.1/flousseeker.spark")
                .config("spark.mongodb.output.uri", "mongodb://127.0.0.1/flousseeker.spark")
                .getOrCreate();
        //spark.conf().set("spark.testing.memory", "2147480000");
        // Create a JavaSparkContext using the SparkSession's SparkContext object
        JavaSparkContext jsc = new JavaSparkContext(spark.sparkContext());

        /*Start Example: Read data from MongoDB************************/
        JavaMongoRDD<Document> rddt = MongoSpark.load(jsc);

        /*End Example**************************************************/
       JavaMongoRDD<Document> aggregatedRdd = rddt.withPipeline(
                singletonList(
                        Document.parse("{ $match: { polarity : -1 } }")));
        // Analyze data from MongoDB
        //System.out.println(aggregatedRdd.count());
        //aggregatedRdd.foreach(D ->System.out.println(D.toJson()));
        //System.out.println(aggregatedRdd.first().toJson());

        //WriteToMongoDB.updateimpo(aggregatedRdd,rddt.count());

        jsc.close();


    }

}
