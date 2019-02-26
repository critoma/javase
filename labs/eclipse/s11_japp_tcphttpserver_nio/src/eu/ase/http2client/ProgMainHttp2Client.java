package eu.ase.http2client;

import jdk.incubator.http.*;
import java.net.URI;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

public class ProgMainHttp2Client {

	public static void main(String[] args) throws IOException {
        try {
            HttpClient httpClient = HttpClient.newHttpClient(); //Create a HttpClient
            System.out.println(httpClient.version());
            HttpRequest httpRequest = 
            		HttpRequest.newBuilder().uri(new URI("https://www.google.com/")).GET().build(); //Create a GET request for the given URI
            Map <String, List<String> > headers = httpRequest.headers().map();
            headers.forEach((k, v) -> System.out.println(k + "-" + v));
            HttpResponse < String > httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandler.asString());
            //System.out.println("HTTP2 response = \n" + httpResponse.body());
        
            CompletableFuture<HttpResponse<String>> httpResponse2 
            	= httpClient.sendAsync(httpRequest, HttpResponse.BodyHandler.asString());
            
            Thread.currentThread().sleep(5000);
            
            if(httpResponse2.isDone()) {
            	System.out.println("\n\n httpResponse2 = \n");
                System.out.println(httpResponse2.get().statusCode());
                System.out.println(httpResponse2.get().body());
            } else {
            	System.out.println("Response not received!");
                httpResponse2.cancel(true);
            }
            
            //Thread.currentThread().sleep(5000);
        } catch (Exception e) {
            System.out.println("message " + e);
        }
    }

}
