package com.digimons.flousseeker.dev.kafka.producer;

import com.digimons.flousseeker.dev.model.Geolocalisation;
import com.digimons.flousseeker.dev.model.Tweet;
import com.digimons.flousseeker.dev.tools.Geocoder;

public class SendTweetToKafka extends Thread {


    private static Geolocalisation geo;
    private static String label, userName, text, topicName;
    private static long time;
    private static boolean debug;

    SendTweetToKafka(String label, String userName, String text, long time, String topicName, boolean debug) {
        SendTweetToKafka.label = label;
        SendTweetToKafka.userName = userName;
        SendTweetToKafka.text = text;
        SendTweetToKafka.time = time;
        SendTweetToKafka.topicName = topicName;
        SendTweetToKafka.debug = debug;
    }

    @Override
    public void run() {
        geo = Geocoder.getGeolocalisation(label);
        if( geo != null ) {
            GenericProducer.send(new Tweet(SendTweetToKafka.userName, SendTweetToKafka.text, SendTweetToKafka.time, SendTweetToKafka.geo, -1), SendTweetToKafka.topicName, SendTweetToKafka.debug);
        }
    }
}
