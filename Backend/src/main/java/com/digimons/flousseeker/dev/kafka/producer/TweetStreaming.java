package com.digimons.flousseeker.dev.kafka.producer;

import twitter4j.*;
import twitter4j.conf.ConfigurationBuilder;


public class TweetStreaming extends Thread {


    private static boolean debug;
    private static final String topicName = "tweet-streaming";

    private static final String[] keySearch  = {"bitcoin", "blockchain"};
    private static final String language  = "en";

    private static String geo;

    private static ConfigurationBuilder configurationBuilder;
    private static TwitterStream twitterStream ;
    private static StatusListener listener;
    private static FilterQuery tweetFilterQuery = new FilterQuery();

    public TweetStreaming(boolean debug) {
        TweetStreaming.debug = debug;
    }

    @Override
    public void run() {
        getTweetConf();
        twitterStream = new TwitterStreamFactory(configurationBuilder.build()).getInstance();

        listener = new StatusListener() {
            @Override
            public void onStatus(Status status) {
                geo = status.getUser().getLocation();
                if(geo !=null && geo.length() > 0) {
                    new SendTweetToKafka(geo, status.getUser().getScreenName(), status.getText(), status.getCreatedAt().getTime(),
                            TweetStreaming.topicName, TweetStreaming.debug)
                            .start();
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

        tweetFilterQuery.track(keySearch);
        tweetFilterQuery.language(language);

        twitterStream.filter(tweetFilterQuery);
    }

    private static void getTweetConf() {
        configurationBuilder = new ConfigurationBuilder();
        configurationBuilder.setOAuthConsumerKey("sVP3gCTtRmooyzyZufYcpSo4q")
                .setOAuthConsumerSecret("I4hTiciOAqCKoJNCPqPCRezquuCQjNgdQrThLKylfSWFPZc2eG")
                .setOAuthAccessToken("371711588-x3Nl9HfKPdstzMt5uw5GXj4tPfnyvdJW5HsCqVBj")
                .setOAuthAccessTokenSecret("Hac3D9sXJda479CwyPJaPJDtDhTEseE0yxV7xDv2WYyYG");
    }
}