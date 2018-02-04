package eu.ase.nio;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.util.ArrayList;

 
public class ProgMainClientNio {
 
	public static void main(String[] args) throws IOException, InterruptedException {
 
		InetSocketAddress myAddr = new InetSocketAddress("127.0.0.1", 8989);
		SocketChannel myClient = SocketChannel.open(myAddr);
 
		System.out.println("Connecting to Server on port 8989 ...");
 
		ArrayList<String> companyDetails = new ArrayList<String>();
 
		// create a ArrayList with companyName list
		companyDetails.add("Facebook");
		companyDetails.add("Twitter");
		companyDetails.add("IBM");
		companyDetails.add("Google");
 
		for (String companyName : companyDetails) {
 
			byte[] message = new String(companyName).getBytes();
			ByteBuffer buffer = ByteBuffer.wrap(message);
			myClient.write(buffer);
 
			System.out.println("sending: " + companyName);
			buffer.clear();
			
			/*
			myClient.read(buffer);
			buffer.flip();
			byte[] data = new byte[buffer.limit()];
			buffer.get(data);
			System.out.println(new String(data));
			buffer.clear();
			
			System.out.println("receiving: " + new String(data));
			*/
			// wait for 2 seconds before sending next message
			Thread.sleep(2000);
		}
		myClient.close();
	}

}
