import java.io.*;
import java.net.*;
import java.util.*;

public class UDPQuoteClient {
    public static void main(String[] args) throws IOException {

        if (args.length < 2) {
             System.out.println("Usage: java QuoteClient <dst_hostname> <dst_port>");
             return;
        }

        // get a datagram socket
        DatagramSocket socket = new DatagramSocket();

        // send request
        byte[] buf = new byte[256];
        InetAddress address = InetAddress.getByName(args[0]);
        DatagramPacket packet = new DatagramPacket(buf, buf.length, address, Integer.parseInt(args[1]));
        socket.send(packet);
    
        // get response
        packet = new DatagramPacket(buf, buf.length);
        socket.receive(packet);

	// display response
        String received = new String(packet.getData());
        System.out.println("Quote of the Moment: " + received);
    
	// close socket
        socket.close();
    }
}
