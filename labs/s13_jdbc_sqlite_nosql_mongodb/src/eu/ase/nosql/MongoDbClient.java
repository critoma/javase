package eu.ase.nosql;

import org.bson.Document;

import com.mongodb.MongoClient;
//import com.mongodb.MongoException;
//import com.mongodb.WriteConcern;

//import com.mongodb.DB;
//import com.mongodb.DBCollection;
//import com.mongodb.BasicDBObject;
//import com.mongodb.DBObject;
//import com.mongodb.DBCursor;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

//import com.mongodb.ServerAddress;
//import java.util.Arrays;

//https://www.tutorialspoint.com/mongodb/mongodb_overview.htm
//https://www.tutorialspoint.com/mongodb/mongodb_java.htm
//http://www.programcreek.com/java-api-examples/index.php?api=com.mongodb.client.MongoCollection
public class MongoDbClient {

   public static void main( String args[] ) {
	
      try{
		
         // To connect to mongodb server
         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
			
         // Now connect to your databases
         MongoDatabase db = mongoClient.getDatabase("test"); 
         //DB db = mongoClient.getDB( "test" );
         System.out.println("Connect to database successfully");
         //boolean auth = db.authenticate(myUserName, myPassword);
         //System.out.println("Authentication: "+auth);
		
         //DBCollection coll = db.createCollection("mycol", null);
         if (db.getCollection("mycol") != null) {
        	 db.getCollection("mycol").drop();
         }
         db.createCollection("mycol");
         
         System.out.println("Collection created successfully");
         
         // /*DBCollection*/ coll = db.getCollection("mycol");
         MongoCollection<Document> coll = db.getCollection("mycol");
         System.out.println("Collection mycol selected successfully");
			
//         BasicDBObject doc = new BasicDBObject("title", "MongoDB").
//            append("description", "database").
//            append("likes", 100).
//            append("url", "http://www.tutorialspoint.com/mongodb/").
//            append("by", "tutorials point");
         Document doc = new Document("title", "MongoDB").
               append("description", "database").
               append("likes", 100).
               append("url", "http://www.tutorialspoint.com/mongodb/").
               append("by", "tutorials point"); 
				
         //coll.insert(doc);
         coll.insertOne(doc);
         System.out.println("Document inserted successfully");
         
         
         /*DBCollection*/ coll = db.getCollection("mycol");
         System.out.println("Collection mycol selected successfully");
			
         //DBCursor cursor = coll.find();
         FindIterable<Document> iterableFind = coll.find();
         MongoCursor<Document> cursor = iterableFind.iterator();
         int i = 1;
			
         while (cursor.hasNext()) { 
            System.out.println("Inserted Document: "+i); 
            System.out.println(cursor.next()); 
            i++;
         }
         
         mongoClient.close();
      }catch(Exception e){
         System.err.println( e.getClass().getName() + ": " + e.getMessage() );
      }
   }
}
