package com.digimons.flousseeker.dev;

import com.digimons.flousseeker.dev.kafka.consumer.BitcoinToMongo;
import com.digimons.flousseeker.dev.kafka.consumer.TweetToMongo;
import com.digimons.flousseeker.dev.kafka.producer.BitcoinStreaming;
import com.digimons.flousseeker.dev.kafka.producer.TweetStreaming;
import com.digimons.flousseeker.dev.tools.Geocoder;
import com.digimons.flousseeker.dev.tools.TweetSearch;
import com.digimons.flousseeker.dev.tools.WriteToMongoDB;

import java.io.File;
import java.util.Objects;

public class Driver {
    public static void main(String[] args) {

        //getApiData();

        //runAnalytics();

        //Geocoder.fillGeocoder(true);

        //TweetSearch.searchByDay("2018-03-24", "2018-03-25", true);
    }

    private static void getApiData() {
        new BitcoinStreaming(false).start();
        new TweetStreaming(false).start();

        new TweetToMongo(false).start();
        new BitcoinToMongo(false).start();

        System.out.println("GET API DATA STARTED ...");
    }

    private static void runAnalytics() {
        WriteToMongoDB.updateimpo();
        WriteToMongoDB.updateTweets();
    }
}
