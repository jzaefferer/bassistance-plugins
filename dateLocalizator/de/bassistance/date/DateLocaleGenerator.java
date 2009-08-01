package de.bassistance.date;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Locale;

/**
 * Generates JavaScript to localize day and month names, be used with a datepicker etc.
 * 
 * TODO Figure out how to properly encode chinese/korean/japanese
 */
public class DateLocaleGenerator {
	
	public static void main(String[] args) throws IOException {
		writeLocales(new Locale[] { Locale.ENGLISH, Locale.GERMAN, Locale.FRENCH, Locale.ITALIAN, new Locale("es") });
	}
	
	private static void writeLocales(Locale[] locales) throws IOException {
		for (int i = 0; i < locales.length; i++) {
			System.out.println("writing " + locales[i]);
			writeFile("localizations/date_" + locales[i] + ".js", new DateGenerator(locales[i]).all());
		}
	}
	
	private static void writeFile(String name, String content) throws IOException {
		FileWriter writer = new FileWriter(name);
		writer.write(content);
		writer.close();
	}
	

}
