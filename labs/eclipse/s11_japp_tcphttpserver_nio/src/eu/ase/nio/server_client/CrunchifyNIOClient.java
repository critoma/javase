package eu.ase.nio.server_client;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.util.ArrayList;

// http://tutorials.jenkov.com/java-nio/index.html
// https://crunchify.com/java-nio-non-blocking-io-with-server-client-example-java-nio-bytebuffer-and-channels-selector-java-nio-vs-io/
// https://github.com/jjenkov/java-nio-server

public class CrunchifyNIOClient {
	public static void main(String[] args) throws IOException,
			InterruptedException {

		InetSocketAddress cAddr = new InetSocketAddress("localhost",
				1111);
		SocketChannel cClient = SocketChannel.open(cAddr);

		log("Connecting to Server on port 1111...");

		ArrayList<String> companyDetails = new ArrayList<String>();

		// create a ArrayList with companyName list
		companyDetails.add("Facebook");
		companyDetails.add("Twitter");
		companyDetails.add("IBM");
		companyDetails.add("Google");
		companyDetails.add("Oracle");
		companyDetails.add("STOP");

		for (String companyName : companyDetails) {

			byte[] message = new String(companyName).getBytes();
			ByteBuffer buffer = ByteBuffer.wrap(message);
			cClient.write(buffer);

			log("sending: " + companyName);
			buffer.clear();

			// wait for 2 seconds before sending next message
			Thread.sleep(2000);
		}
		cClient.close();
	}

	private static void log(String str) {
		System.out.println(str);
	}
}