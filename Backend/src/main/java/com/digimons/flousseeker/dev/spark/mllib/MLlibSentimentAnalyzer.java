package com.digimons.flousseeker.dev.spark.mllib;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.broadcast.Broadcast;
import org.apache.spark.mllib.classification.NaiveBayesModel;
import org.apache.spark.mllib.feature.HashingTF;
import org.apache.spark.mllib.linalg.Vector;

//import scala.collection.Seq;


public class MLlibSentimentAnalyzer {
	 /**
	    * Predicts sentiment of the tweet text with Naive Bayes model passed after removing the stop words.
	    *
	    * @param text          -- Complete text of a tweet.
	    * @param stopWordsList -- Broadcast variable for list of stop words to be removed from the tweets.
	    * @param model         -- Naive Bayes Model of the trained data.
	    * @return Int Sentiment of the tweet.
	    */
	public  static int computeSentiment(String text,Broadcast<List<String>> stopWordsList,NaiveBayesModel model ){
		java.util.Vector<String> tweetInWords  = getBarebonesTweetText(text, stopWordsList.value());
		double polarity = model.predict(MLlibSentimentAnalyzer.transformFeatures(tweetInWords));
		    	    return normalizeMLlibSentiment(polarity);
		    	  }

	/**
	    * Normalize sentiment for visualization perspective.
	    * We are normalizing sentiment as we need to be consistent with the polarity value with Core NLP and for visualization.
	    *
	    * @param polarity polarity of the tweet
	    * @return normalized to either -1, 0 or 1 based on tweet being negative, neutral and positive.
	    */
	public static int normalizeMLlibSentiment(double polarity ) {
		if(polarity==(0)) return 2;
		if(polarity==(2)) return 0;
		if(polarity==(4)) return 1;
		return 0;
	    
	  }
	
	/**
	    * Strips the extra characters in tweets. And also removes stop words from the tweet text.
	    *
	    * @param tweetText     -- Complete text of a tweet.
	    * @param stopWordsList -- Broadcast variable for list of stop words to be removed from the tweets.
	    * @return Seq[String] after removing additional characters and stop words from the tweet.
	    */
	  public static java.util.Vector<String> getBarebonesTweetText(String tweetText,List<String> stopWordsList) {
	    //Remove URLs, RT, MT and other redundant chars / strings from the tweets.
	  return  Arrays.stream(
	    tweetText.toLowerCase()
	      .replaceAll("\n", "")
	      .replaceAll("rt\\s+", "")
	      .replaceAll("\\s+@\\w+", "")
	      .replaceAll("@\\w+", "")
	      .replaceAll("\\s+#\\w+", "")
	      .replaceAll("#\\w+", "")
	      .replaceAll("(?:https?|http?)://[\\w/%.-]+", "")
	      .replaceAll("(?:https?|http?)://[\\w/%.-]+\\s+", "")
	      .replaceAll("(?:https?|http?)//[\\w/%.-]+\\s+", "")
	      .replaceAll("(?:https?|http?)//[\\w/%.-]+", "")
	      .split("\\W+")).filter(s-> s.matches("^[a-zA-Z]+$")).collect(Collectors.toCollection(java.util.Vector<String>::new))
	    //.filter(s-> !stopWordsList.contains(s)).collect(Collectors.toCollection(java.util.Vector<String>::new))
	    ;
	      
			      
	     /* .filter(_.matches("^[a-zA-Z]+$"))
	      .filter(!stopWordsList.contains(_));*/
	    //.fold("")((a,b) => a.trim + " " + b.trim).trim
	  }
	  static HashingTF hashingTF = new HashingTF();

			  /**
			    * Transforms features to Vectors.
			    *
			    * @param tweetText -- Complete text of a tweet.
			    * @return Vector
			    */
			  public static Vector transformFeatures(java.util.Vector<String> tweetText){
				  return  hashingTF.transform(tweetText);
			    
			    
			  }


}