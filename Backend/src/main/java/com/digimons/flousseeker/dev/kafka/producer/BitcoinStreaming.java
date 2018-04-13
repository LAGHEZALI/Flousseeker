package com.digimons.flousseeker.dev.kafka.producer;

import com.digimons.flousseeker.dev.model.Bitcoin;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DecimalFormat;

public class BitcoinStreaming extends Thread {

    private static final String topicName = "rtbtc";
    private static StringBuffer text = new StringBuffer();
    private static boolean loop = true;
    private static boolean debug = true;

    public BitcoinStreaming(boolean debug) {
        BitcoinStreaming.debug = debug;
    }

    @Override
    public void run() {
        try {
            URL url = new URL("https://api.coindesk.com/v1/bpi/currentprice/CNY.json");
            while (loop) {
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");
                connection.setRequestProperty("User-Agent", "digimons-team.com");
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null ) {
                    text.append(line);
                }
                JSONObject obj = new JSONObject(text.toString());
                GenericProducer.send(
                        new Bitcoin(new DecimalFormat(".##").format(obj.getJSONObject("bpi").getJSONObject("USD").getDouble("rate_float"))), topicName, BitcoinStreaming.debug
                );
                Thread.sleep(60000);
                text = new StringBuffer();
                reader.close();
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}