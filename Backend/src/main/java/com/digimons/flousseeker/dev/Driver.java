package com.digimons.flousseeker.dev;

import com.digimons.flousseeker.dev.kafka.consumer.BitcoinToMongo;
import com.digimons.flousseeker.dev.kafka.consumer.TweetToMongo;
import com.digimons.flousseeker.dev.kafka.producer.BitcoinStreaming;
import com.digimons.flousseeker.dev.kafka.producer.TweetStreaming;
import com.digimons.flousseeker.dev.tools.Geocoder;
import com.digimons.flousseeker.dev.tools.TweetSearch;
import com.digimons.flousseeker.dev.tools.WriteToMongoDB;


public class Driver {
    public static void main(String[] args) {

    /*
        new BitcoinStreaming(true).start();
        new TweetStreaming(true).start();
        new TweetToMongo(true).start();
        new BitcoinToMongo().start();
    */

        //WriteToMongoDB.updateimpo();
        //WriteToMongoDB.updateTweets();


        //Geocoder.fillGeocoder();

        //TweetSearch.searchByDay("2018-03-24", "2018-03-25");
    }
}
