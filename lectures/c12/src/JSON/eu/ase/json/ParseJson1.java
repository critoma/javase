package eu.ase.json;

import org.json.JSONObject;
import org.json.JSONArray; 
import org.json.JSONException;

import java.io.*;

public class ParseJson1 {

    private static String readFile( String file ) throws IOException {
	    BufferedReader reader = new BufferedReader( new FileReader (file));
	    String         line = null;
	    StringBuilder  stringBuilder = new StringBuilder();
	    String         ls = System.getProperty("line.separator");

	    while( ( line = reader.readLine() ) != null ) {
		stringBuilder.append( line );
		stringBuilder.append( ls );
	    }

	    return stringBuilder.toString();
    } //end readFile

    public static void main(String[] args) {
	try {
		String genreJson = readFile(args[0]);
		JSONObject json = new JSONObject(genreJson);
		// get the title
		System.out.println(json.get("genre_color"));
		// get the data
		JSONArray genreArray = (JSONArray) json.get("genre_title");
		// get the first genre
		//JSONObject firstGenre = (JSONObject) genreArray.get(0);
		//System.out.println(firstGenre.get("genre_title"));
		System.out.println("genre_title[1] = " + genreArray.get(1));
	} catch(IOException ioe) {
		ioe.printStackTrace();
	} catch(JSONException jsone) {
		jsone.printStackTrace();
	}
    } //end main
} //end class
