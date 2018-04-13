package com.digimons.flousseeker.dev.kafka.producer;

import com.google.gson.Gson;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import java.util.Properties;

public class GenericProducer {

    private static Gson gson = new Gson();
    private static Properties props = new Properties();
    private static Producer<byte[], byte[]> instance = null;

    synchronized public static <T> void send(T object, String topicName, boolean debug) {
        if(GenericProducer.instance == null) {
            loadProperties();
            GenericProducer.instance = new KafkaProducer<>(props);
            if(debug){
                System.out.println(" ==> Generic Producer Instance Started.");
            }
        }
        GenericProducer.instance.send(new ProducerRecord<>(topicName, GenericProducer.gson.toJson(object).getBytes()));
        if(debug) {
            System.out.println(" ==> Producer : " + object.getClass().getSimpleName() + " object sent.");
        }
    }

    private static void loadProperties() {
        props.put("bootstrap.servers", "localhost:9092");
        props.put("acks", "all");
        props.put("retries", 0);
        props.put("batch.size", 16384);
        props.put("linger.ms", 1);
        props.put("buffer.memory", 33554432);
        props.put("key.serializer", "org.apache.kafka.common.serialization.ByteArraySerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.ByteArraySerializer");
    }
}
