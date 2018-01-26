package eu.ase.iojson;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ProgMainIoJson {
	
	public static void buildAndWriteJson(String fileName) throws IOException, JSONException {
		JSONObject dataset = new JSONObject();
		dataset.put("node-ipv4", "10.2.67.96");
		dataset.put("node-mac", "E4:F6:A8");
		dataset.put("OIDs", new JSONArray());
		
		JSONObject jsonarray0 = new JSONObject();
		jsonarray0.put("1.6.3.5.1", "4800");
		JSONObject jsonarray1 = new JSONObject();
		jsonarray1.put("1.6.3.5.2", "RHEL 6");
		
		dataset.append("OIDs", jsonarray0);
		dataset.append("OIDs", jsonarray1);
		
		System.out.println("Write: " + JSONObject.quote(dataset.toString()));
		
		FileWriter fw = new FileWriter(fileName);
		fw.write(dataset.toString());
		fw.close();
	}
	
	public static void readAndParseJson(String fileName) throws IOException, JSONException {
		BufferedReader reader = new BufferedReader(new FileReader(fileName));
		
		String line = null;
		StringBuilder stringBuilder = new StringBuilder();
		String ls = System.getProperty("line.separator");
		
		while ( (line = reader.readLine()) != null ) {
			stringBuilder.append(line);
			stringBuilder.append(ls);
		}
		
		reader.close();
		
		String myNodeJson = stringBuilder.toString();
		JSONObject json = new JSONObject(myNodeJson);
		System.out.println("read node-ipv4 = " + json.get("node-ipv4"));
		
		JSONArray oidsArray = (JSONArray)json.get("OIDs");
		System.out.println("read - oid[1] = " + oidsArray.get(1));
	}
	
	public static void main(String[] args) {
		try {
			buildAndWriteJson("myNodeJsonObj.json");
			readAndParseJson("myNodeJsonObj.json");
		}  catch (IOException ioe) {
			ioe.printStackTrace();
		} catch (JSONException jsone) {
			jsone.printStackTrace();
		}
	}
}
