package eu.deic.db;

import com.mongodb.client.*;
import org.bson.Document;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.util.concurrent.*;

public class MainProgNoSql {
    public static void main(String args[]) {
        // use MongoDB 8+:
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
        MongoDatabase mongoDatabase = mongoClient.getDatabase("testdb");
        MongoCollection<Document> objTableAkaCollection = mongoDatabase.getCollection("usersCollection");

        BlockingQueue<Document> queue = new LinkedBlockingQueue<>();
        Document EOFDoc = new Document("EOF", true);

        ExecutorService executor = Executors.newFixedThreadPool(2);
        executor.submit(()->{
            // read from file:
            try(BufferedReader reader = new BufferedReader(new FileReader("./data.csv"))) {
                reader.readLine();
                String line = "";
                while ((line = reader.readLine()) != null) {
                    String[] objTokens = line.split(",");
                    Document objDocAsJson = new Document();
                    objDocAsJson.append("id", Integer.parseInt(objTokens[0]) );
                    objDocAsJson.append("name", objTokens[1]).append("email", objTokens[2]).append("age", Integer.parseInt(objTokens[3]) );

                    queue.put(objDocAsJson);
                    System.out.println("file (HDD) -> queue (RAM):" + objDocAsJson.toJson());
                }
                queue.put(EOFDoc);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        executor.submit(()->{
            // read from queue + write: insert into mongodb 8+
            try {
                while(true) {
                    Document doc = queue.take();
                    if(doc.toJson().equals(EOFDoc.toJson())) {
                        break;
                    }
                    objTableAkaCollection.insertOne(doc);
                    System.out.println("queue (RAM) -> NoSQL_DB (RAM-HDD):" + doc.toJson());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        executor.shutdown();
        try {
            executor.awaitTermination(2, TimeUnit.MINUTES);
            System.out.println("DONE!");
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        System.out.println("Main thread after exec 2 theads:");
        FindIterable<Document> objFindIterableAllDocs = objTableAkaCollection.find();
        for(Document doc : objFindIterableAllDocs) {
            System.out.println(doc.toJson());
        }

        mongoClient.close();
    }
}
