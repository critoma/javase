package eu.ase.iojson;

import java.io.Serializable;

//import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String name;
	private String email;
	private String password;
	
	public User(int id, String name, String email, String password) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "user [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + "]";
	}
	
	public JSONObject getJson() {
		JSONObject dataset = new JSONObject();
		try {
			dataset.put("id", id);
			dataset.put("name", this.name);
			dataset.put("email", this.email);
			dataset.put("password", this.password);
			
			System.out.println("JSON: " + JSONObject.quote(dataset.toString()));
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return dataset;
	}
	
	public String getJsonString() {
		JSONObject dataset = new JSONObject();
		try {
			dataset.put("id", id);
			dataset.put("name", this.name);
			dataset.put("email", this.email);
			dataset.put("password", this.password);
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return dataset.toString();
	}
}