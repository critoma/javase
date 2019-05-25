package eu.ase.tcp;

import java.io.BufferedReader;
import java.io.ObjectOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import eu.ase.iojson.User;

public class SocketClientReadFromFile {
	
	public static void main(String[] args) {
		try {
			List<User> usersList = readJsonFile("myUsers.json");
			sendTheUsers2Server("127.0.0.1", 7997, usersList);
		} catch (IOException | JSONException e) {
			e.printStackTrace();
		}
	}
	
	public static List<User> readJsonFile(String fileName) 
			throws IOException, JSONException {
		BufferedReader reader = new BufferedReader(new FileReader(fileName));
		List<User> users = new ArrayList<>();
		String line = null;
		
		String ls = System.getProperty("line.separator");
		
		while ( (line = reader.readLine()) != null ) {
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append(line);
			stringBuilder.append(ls);
			String myNodeJson = stringBuilder.toString();
			JSONObject json = new JSONObject(myNodeJson);
			User u = new User(Integer.parseInt("" + json.get("id")), 
					"" + json.get("name"), 
					"" + json.get("email"), 
					"" + json.get("password"));
			users.add(u);
		}
		
		reader.close();
		return users;
	}
	
	public static void sendTheUsers2Server(String ip, int port, List<User> usersList) 
			throws UnknownHostException, IOException {
		Socket s = new Socket(ip, port);
		ObjectOutputStream out = new ObjectOutputStream(s.getOutputStream());
		ObjectInputStream in = new ObjectInputStream(s.getInputStream());
		out.writeObject(usersList);
		System.out.printf("\n read utf from network - insert in DB: %s", in.readUTF());
		
		if(out != null)
			out.close();
		if (s != null)
			s.close();
	}

}
