package eu.ase.net.udp;

import java.io.*;
import java.net.*;

public class UDPServer {
	public static void main(String[] args) {
		// get a datagram socket
        	DatagramSocket socket = null;
		byte[] bufResp = null;
		byte[] bufRecv = null;
		try {
		 socket = new DatagramSocket(7778);//it is correct because this constructor executes "bind"
		 while(true) {
			bufRecv = new byte[256];
			// receive request
		        DatagramPacket packet = new DatagramPacket(bufRecv, bufRecv.length);
		        socket.receive(packet);

			//bufRecv = packet.getData();
	                System.out.println("Client says: "+new String(bufRecv));

		        // figure out response
		        String respString = new String("OK");
			bufResp = respString.getBytes();
            
		    	// send the response to the client at "address" and "port"
            		InetAddress address = packet.getAddress();
            		int port = packet.getPort();
		        packet = new DatagramPacket(bufResp, bufResp.length, address, port);
		        socket.send(packet);
		 } //end while
		} catch(IOException ioe) {
			ioe.printStackTrace();
			// close socket
			//socket.close();
		} 
	}
}
