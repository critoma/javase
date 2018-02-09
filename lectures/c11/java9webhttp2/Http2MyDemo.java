package java9webhttp2;

import jdk.incubator.http.*;

import java.net.URI;
import java.io.IOException;
import java.util.Map;
import java.util.List;


public class Http2MyDemo {
    public static void main(String[] args) throws IOException {
        try {
            HttpClient httpClient = HttpClient.newHttpClient(); //Create a HttpClient
            System.out.println(httpClient.version());
            //Create a GET request for the given URI
            HttpRequest httpRequest = 
                //HttpRequest.newBuilder().uri(new URI("https://172.217.16.68/")).GET().build(); 
		HttpRequest.newBuilder().uri(new URI("http://ism.ase.ro/")).GET().build(); 
            
            Map < String, List < String >> headers = httpRequest.headers().map();
            headers.forEach((k, v) -> System.out.println(k + "-" + v));
            HttpResponse < String > httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandler.asString());

            System.out.println(httpResponse.body());
        } catch (Exception e) {
            System.out.println("message: " + e);
        }
    }

}
