package eu.ase.net.udp;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Date;

public class UDPServer {

	public static void main(String[] args) {
		byte[] bRecv = null; byte[] bResp = null;
		
		// re-factored with "try with resources"
		//try {
			//socket = new DatagramSocket(7778);
		try (DatagramSocket socket = new DatagramSocket(7778)) {
			System.out.println("My UDP DEIC/DICE Server is bining in port 7778");
			while(true) {
				bRecv = new byte[256];
				DatagramPacket packet = new DatagramPacket(bRecv, bRecv.length);
				socket.receive(packet);
				
				System.out.println("UDP Client " + packet.getAddress() + ":" + packet.getPort() + " sent 2 Server = " + new String(packet.getData()) 
						/*new String(bRecv)*/ );
				
				String respS = null;
				if ( "What date & time is it?".equals( new String(packet.getData() ).trim() )  ) {
					respS = new Date().toString();
				} else {
					respS = new String("I don't understand!");
				}
				
				bResp = respS.getBytes();
				
				InetAddress addrSender = packet.getAddress();
				int portSender = packet.getPort();
				DatagramPacket respPacket = new DatagramPacket(bResp, bResp.length, addrSender, portSender);
				socket.send(respPacket);
			} // end while
		} catch(IOException ioe) {
			ioe.printStackTrace();
		}
//		finally {
//			if (socket != null) 
//				socket.close();
//		}
	} // end main method

} // end class
