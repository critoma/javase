package eu.deic.nosql;

import org.bson.Document;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

public class MongoDbClient {

	public static void main(String args[]) {

		// Replace the placeholder with your MongoDB deployment's connection string
		String uri = "mongodb://127.0.0.1:27017/test?connectTimeoutMS=2000";
		try (MongoClient mongoClient = MongoClients.create(uri)) {

			MongoDatabase db = mongoClient.getDatabase("test");

			System.out.println("Connect to database successfully");
			// boolean auth = db.authenticate(myUserName, myPassword);
			// System.out.println("Authentication: "+auth);
			MongoCollection<Document> collection = db.getCollection("mycol");

			if (collection != null) {
				collection.drop();
			} else {
				db.createCollection("mycol");
				collection = db.getCollection("mycol");
			}

			System.out.println("Collection accessed successfully");

			Document doc = new Document("title", "MongoDB").append("description", "database").
        append("likes", 100).
        append("url", "http://www.tutorialspoint.com/mongodb/").
        append("by", "www.ism.ase.ro");

			// coll.insert(doc);
			collection.insertOne(doc);
			System.out.println("Document inserted successfully");

			/* DBCollection */ collection = db.getCollection("mycol");
			System.out.println("Collection mycol selected successfully");

			// DBCursor cursor = coll.find();
			FindIterable<Document> iterableFind = collection.find();
			MongoCursor<Document> cursor = iterableFind.iterator();
			int i = 1;

			while (cursor.hasNext()) {
				System.out.println("Inserted Document: " + i);
				System.out.println(cursor.next());
				i++;
			}

			mongoClient.close();
		} catch (Exception e) {
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
		}
	} // end main method
} // end class
