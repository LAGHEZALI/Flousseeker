package com.digimons.flousseeker.dev.spark.utils;


import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.spark.internal.Logging;
import org.apache.spark.SparkContext;
import org.apache.spark.api.java.JavaSparkContext;

public interface LogUtils extends Logging {

	/*  public static void setLogLevels( SparkContext sparkContext ) {

	    sparkContext.setLogLevel(Level.WARN.toString());
	     boolean log4jInitialized = Logger.getRootLogger().getAllAppenders().hasMoreElements();
	    if (!log4jInitialized) {
	      //logInfo("Setting log level to [WARN] for streaming executions.\nTo override add a custom log4j.properties to the classpath.");
	    	Logger.getRootLogger().info("Setting log level to [WARN] for streaming executions."
	    			+ "\nTo override add a custom log4j.properties to the classpath.");
	    	Logger.getRootLogger().setLevel(Level.WARN);
	    }
	  }*/

	public static void setLogLevels(JavaSparkContext sparkContext) {
		// TODO Auto-generated method stub
		sparkContext.setLogLevel(Level.WARN.toString());
	     boolean log4jInitialized = Logger.getRootLogger().getAllAppenders().hasMoreElements();
	    if (!log4jInitialized) {
	      //logInfo("Setting log level to [WARN] for streaming executions.\nTo override add a custom log4j.properties to the classpath.");
	    	Logger.getRootLogger().info("Setting log level to [WARN] for streaming executions."
	    			+ "\nTo override add a custom log4j.properties to the classpath.");
	    	Logger.getRootLogger().setLevel(Level.WARN);
	    }
	}
}
