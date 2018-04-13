package com.digimons.flousseeker.dev.spark.mllib;

import java.util.Iterator;
import java.util.List;
import java.util.function.Function;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.api.java.JavaRDD;

import org.apache.spark.broadcast.Broadcast;
import org.apache.spark.serializer.KryoSerializer;
import org.apache.spark.streaming.Durations;
import org.apache.spark.streaming.api.java.JavaStreamingContext;

import org.apache.hadoop.io.compress.GzipCodec;
//import org.apache.spark.broadcast.Broadcast;
import org.apache.spark.mllib.classification.NaiveBayes;

import org.apache.spark.mllib.classification.NaiveBayesModel;
import org.apache.spark.mllib.linalg.Vector;
import org.apache.spark.mllib.regression.LabeledPoint;
import org.apache.spark.mllib.util.MLUtils;
import org.apache.spark.rdd.RDD;
import org.apache.spark.serializer.KryoSerializer;
import org.apache.spark.sql.*;
import org.apache.spark.sql.SparkSession.Builder;
import org.apache.spark.SparkConf;
 import org.apache.spark. SparkContext;
import com.digimons.flousseeker.dev.spark.mllib.MLlibSentimentAnalyzer;
import com.digimons.flousseeker.dev.spark.utils.LogUtils;
import com.digimons.flousseeker.dev.spark.utils.StopwordsLoader;

public class SparkNaiveBayesModelCreator {
	public static long i=0;
	public static void main(String[] args) {

		SparkConf sparkConf = new SparkConf().setAppName("SOME APP NAME").
				setMaster("local[2]").
				set("spark.executor.memory","2g")
				.set("spark.serializer", KryoSerializer.class.getCanonicalName())
			      // For reconstructing the Web UI after the application has finished.
			      .set("spark.eventLog.enabled", "true")
			      // Reduce the RDD memory usage of Spark and improving GC behavior.
			      .set("spark.streaming.unpersist", "true");
JavaSparkContext sc=new JavaSparkContext(sparkConf);
		
//JavaStreamingContext ssc= new JavaStreamingContext(sparkConf, Durations.seconds(15));

LogUtils.setLogLevels(sc);
Broadcast<List<String>> stopWordsList = sc.broadcast(StopwordsLoader.loadStopWords("assets/MLlib/NLTK_English_Stopwords_Corpus.txt"));


			   createAndSaveNBModel(sc, stopWordsList);
			   /* validateAccuracyOfNBModel(sc, stopWordsList)*/
	}
	
	public static void createAndSaveNBModel(JavaSparkContext sc, Broadcast<List<String>> stopWordsList) {
		Dataset<Row>  tweetsDF  = loadSentiment140File(sc,"assets/MLlib/training.1600000.processed.noemoticon.csv");
		
		
		JavaRDD<LabeledPoint> labeledRDD = tweetsDF.select("polarity", "status").javaRDD().map((org.apache.spark.api.java.function.Function<Row, LabeledPoint>) r->{
					
					java.util.Vector<String> tweetInWords  = MLlibSentimentAnalyzer.getBarebonesTweetText((String)r.getAs("status"), stopWordsList.value());
				//erreur 
				double d=(double)((int) r.getAs("polarity"));
				//	double d=Double.parseDouble(r.getAs("polarity"));
				//tweetInWords.toArray(org.apache.spark.mllib.linalg.Vector<String>);
				//MLUtils.appendBias((Vector) tweetInWords);
				
				SparkNaiveBayesModelCreator.i++;
				//System.out.println(SparkNaiveBayesModelCreator.i+"-->"+(String)r.getAs("status")+"  :  "+((int) r.getAs("polarity")));
				LabeledPoint lp = new LabeledPoint(d,  MLlibSentimentAnalyzer.transformFeatures(tweetInWords));
					//LabeledPoint();
				return  lp;//.productIterator();
					
			
		});
		labeledRDD.cache();
		
		NaiveBayesModel naiveBayesModel  = NaiveBayes.train(labeledRDD.rdd(),  1.0,  "multinomial");
		naiveBayesModel.save(JavaSparkContext.toSparkContext(sc), "assets/MLlib/NBModel");
		
	}
		
		
	

	private static Dataset<Row> loadSentiment140File(JavaSparkContext sc, String sentiment140FilePath) {
		
		
		SparkSession sqlContext =new Builder()
			     .appName("Spark In Action")
			     .master("local")
			     .getOrCreate();//SQLContext(sc);// SQLContext.getInstance(sc);
		Dataset<Row> tweetsDF = sqlContext.read()
			      .format("com.databricks.spark.csv")
			      .option("header", "false")
			      .option("inferSchema", "true")
			      .load(sentiment140FilePath)
			      .toDF("polarity", "id", "date", "query", "user", "status");
			     // .toDF( "id","polarity"/*, "date", "query", "user",*/, "status");
			    // Drop the columns we are not interested in.
			    tweetsDF.drop("id").drop("date").drop("query").drop("user");
		return tweetsDF;
	}

}
