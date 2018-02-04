package eu.ase.udpmulticast;

import java.time.Instant;
import java.net.DatagramSocket;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.net.MulticastSocket;
import java.io.IOException;

public class MulticastUDPClient {

    public static void main(String[] args) throws IOException {

        MulticastSocket socket = new MulticastSocket(Integer.parseInt(args[0]));
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
	}

	socket.leaveGroup(address);
	socket.close();
    }

}
