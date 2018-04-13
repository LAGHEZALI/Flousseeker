package com.digimons.flousseeker.dev.spark.utils;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


public class StopwordsLoader {

	
	public static List<String> loadStopWords( String stopWordsFileName){
		String fileName = stopWordsFileName;
		List<String> maListe = new ArrayList<>();
		try (Stream<String> stream = Files.lines(Paths.get(fileName))) {
			maListe = stream.collect(Collectors.toList());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return maListe;
			
		  }
}
