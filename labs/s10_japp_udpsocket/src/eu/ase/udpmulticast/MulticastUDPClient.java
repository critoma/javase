package eu.ase.udpmulticast;

import java.net.DatagramPacket;
import java.net.InetAddress;
import java.net.MulticastSocket;
import java.io.IOException;

public class MulticastUDPClient {

    public static void main(String[] args) throws IOException {

    	// udp port 4446 (e.g. serverPort + 1)
        MulticastSocket socket = new MulticastSocket(Integer.parseInt(args[0]));
        //MulticastSocket socket = new MulticastSocket(4446);
        
        InetAddress address = InetAddress.getByName("230.0.0.1");
        socket.joinGroup(address);

        DatagramPacket packet;
    
        // get a few times
        for (int i = 0; i < 5; i++) {

        	byte[] buf = new byte[256];
            packet = new DatagramPacket(buf, buf.length);
            socket.receive(packet);

            String received = new String(packet.getData(), 0, packet.getLength());
            System.out.println("Received the Moment multicast: " + received);
        } //end for

        socket.leaveGroup(address);
        socket.close();
    } // end main

} // end class