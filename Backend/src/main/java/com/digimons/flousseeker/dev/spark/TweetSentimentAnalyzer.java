package com.digimons.flousseeker.dev.spark;
import java.util.List;
import java.util.Objects;

import org.apache.spark.SparkConf;
import org.apache.spark.broadcast.Broadcast;
import org.apache.spark.mllib.classification.NaiveBayesModel;
import org.apache.spark.serializer.KryoSerializer;
import org.apache.spark.streaming.Durations;
import org.apache.spark.streaming.api.java.JavaStreamingContext;

import com.digimons.flousseeker.dev.spark.utils.*;
import com.digimons.flousseeker.dev.spark.mllib.*;

public class TweetSentimentAnalyzer {

	private  static ClassLoader classLoader = TweetSentimentAnalyzer.class.getClassLoader();
	private  static String stopWordsPath = Objects.requireNonNull(classLoader.getResource("MLlib/NLTK_English_Stopwords_Corpus.txt")).getPath().substring(1);
	private  static String modelPath = Objects.requireNonNull(classLoader.getResource("MLlib/NBModel")).getPath().substring(1);

	private  static JavaStreamingContext ssc;
	private  static NaiveBayesModel naiveBayesModel;
	private  static Broadcast<List<String>> stopWordsList;

	private static boolean isRunning = false;

	public static void stopSparkStreamingContext(){
		if(TweetSentimentAnalyzer.isRunning){
			TweetSentimentAnalyzer.ssc.close();
			TweetSentimentAnalyzer.isRunning = false;
			System.out.println("TweetSentimentAnalyzer Stoped...");
		} else {
			System.out.println("TweetSentimentAnalyzer already Stoped...");
		}
	}

	private static  void createSparkStreamingContextAndModel() {
		System.setProperty("hadoop.home.dir", "D:\\DevTools\\hadoop");
		SparkConf sparkConf = new SparkConf().setAppName("SOME APP NAME").
				setMaster("local[2]").
				set("spark.executor.memory","3g")
				.set("spark.serializer", KryoSerializer.class.getCanonicalName())
				.set("spark.eventLog.enabled", "true")
				.set("spark.streaming.unpersist", "true")
				.set("spark.testing.memory", "2147480000");

		TweetSentimentAnalyzer.ssc= new JavaStreamingContext(sparkConf, Durations.seconds(15));
		LogUtils.setLogLevels(ssc.sparkContext());

		TweetSentimentAnalyzer.naiveBayesModel= NaiveBayesModel.load(ssc.sparkContext().sc(), modelPath);

		TweetSentimentAnalyzer.stopWordsList = ssc.sparkContext()
				.broadcast(StopwordsLoader.loadStopWords(stopWordsPath));

		System.out.println("TweetSentimentAnalyzer Started...");
	}

	public static int predictpolarity(String tweet){
		if(!TweetSentimentAnalyzer.isRunning){
			System.out.println("Starting TweetSentimentAnalyzer");
			TweetSentimentAnalyzer.createSparkStreamingContextAndModel();
			TweetSentimentAnalyzer.isRunning = true;
		} else {
			//System.out.println("TweetSentimentAnalyzer already Started...");
		}
		return MLlibSentimentAnalyzer.computeSentiment(tweet,
				TweetSentimentAnalyzer.stopWordsList, TweetSentimentAnalyzer.naiveBayesModel);
	}

}
