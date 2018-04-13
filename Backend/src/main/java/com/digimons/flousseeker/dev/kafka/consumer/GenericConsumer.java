package com.digimons.flousseeker.dev.kafka.consumer;

import com.digimons.flousseeker.dev.model.Behaviour;
import com.google.gson.Gson;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import java.util.Collections;
import java.util.Properties;

public class GenericConsumer {

    private static boolean loop = true;
    private static Gson gson = new Gson();
    private static Properties props = new Properties();

    synchronized public static void listen(String topicName, Class cls, boolean debug, Behaviour behaviour) {

        loadProperties();
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
        if(debug){
            System.out.println(" ==> Generic Consumer Instance Started.");
        }
        consumer.subscribe(Collections.singletonList(topicName));
        new Thread( () -> {
            while (loop) {
                ConsumerRecords<String, String> records = consumer.poll(100);
                for (ConsumerRecord<String, String> record : records) {
                   // try {

                        behaviour.consume( gson.fromJson(record.value(), cls) );
                   /* } catch (InstantiationException | IllegalAccessException e) {
                        e.printStackTrace();
                    }*/
                    if(debug) {
                        System.out.println(" ==> Generic Consumer  : Object received. ");
                    }
                }
            }
        }).start();
    }
    static private void loadProperties() {
        props.put("bootstrap.servers", "localhost:9092");
        props.put("group.id", "test");
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "1000");
        props.put("session.timeout.ms", "30000");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
    }
}
