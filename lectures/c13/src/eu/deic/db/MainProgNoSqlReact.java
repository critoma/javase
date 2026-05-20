package eu.deic.db;

import com.mongodb.client.*;
import org.bson.Document;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.concurrent.Flow;
import java.util.concurrent.SubmissionPublisher;

public class MainProgNoSqlReact {
    public static void main(String[] args) {
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
        MongoDatabase mongoDatabase = mongoClient.getDatabase("testdb");
        MongoCollection<Document> collection = mongoDatabase.getCollection("usersCollection");

        // Reactive Subscriber
        Flow.Subscriber<Document> mongoSubscriber = new Flow.Subscriber<>() {
            private Flow.Subscription subscription;
            @Override
            public void onSubscribe(Flow.Subscription subscription) {
                this.subscription = subscription;
                // request first item
                subscription.request(1);
            }
            @Override
            public void onNext(Document item) {
                collection.insertOne(item);
                System.out.println("CSV -> MongoDB : " + item.toJson());
                // request next item
                subscription.request(1);
            }
            @Override
            public void onError(Throwable throwable) {
                throwable.printStackTrace();
            }
            @Override
            public void onComplete() {
                System.out.println("DONE!");
                System.out.println("\nDocuments from MongoDB:");
                FindIterable<Document> docs = collection.find();
                for (Document doc : docs) {
                    System.out.println(doc.toJson());
                }

                mongoClient.close();
            }
        };

        // Reactive Publisher
        SubmissionPublisher<Document> publisher = new SubmissionPublisher<>();
        // connect publisher to subscriber
        publisher.subscribe(mongoSubscriber);

        // Producer logic (CSV reading)
        try (BufferedReader reader = new BufferedReader(new FileReader("./data.csv"))) {
            // skip header
            reader.readLine();
            String line = "";

            while ((line = reader.readLine()) != null) {
                String[] tokens = line.split(",");
                Document doc = new Document()
                        .append("id", Integer.parseInt(tokens[0]))
                        .append("name", tokens[1])
                        .append("email", tokens[2])
                        .append("age", Integer.parseInt(tokens[3]));

                System.out.println(
                        "File -> Reactive Stream : " + doc.toJson()
                );

                // publish item reactively
                publisher.submit(doc);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        // signal completion
        publisher.close();
    }
}
