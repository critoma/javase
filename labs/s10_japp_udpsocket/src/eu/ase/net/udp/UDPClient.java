package eu.ase.net.udp;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class UDPClient {
	public static void main(String[] args) throws IOException {
		// get a datagram socket
		DatagramSocket clientSocket = new DatagramSocket();
		
		// send the request
		byte[] buf = new byte[256];
		buf[0] = 'H'; buf[1] = 'e'; buf[2] = 'l';
		buf[3] = 'l'; buf[4] = 'o';
		// buf = new String("Hello").getBytes();

		//InetAddress address = InetAddress.getByName("127.0.0.1");
		InetAddress address = InetAddress.getByName(args[0]);
		int port = Integer.parseInt(args[1]); // 7778
		DatagramPacket packet = 
				new DatagramPacket(buf, buf.length, address, port);
		clientSocket.send(packet);
		
		// get the response
		byte[] bufResp = new byte[256];
		packet = new DatagramPacket(bufResp, bufResp.length);
		clientSocket.receive(packet);
		
		// display the response
		String received = new String(packet.getData());
		System.out.println("Client from server received = " + received);
		
		// close socket
		clientSocket.close();
	}
}
