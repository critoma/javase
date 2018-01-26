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
        byte[] buf = new byte[255];
        InetAddress address = InetAddress.getByName(args[0]);
	buf[0] = (byte)'G'; buf[1] = (byte)'I'; buf[2] = (byte)'V'; buf[3] = (byte)'E'; buf[4] = (byte)'Q';
        DatagramPacket packet = new DatagramPacket(buf, buf.length, address, Integer.parseInt(args[1]));
        socket.send(packet);
    
	String received = ""; int idx = 0;
	while((idx = received.indexOf("No more")) != 0) {
	        // get response
        	packet = new DatagramPacket(buf, buf.length);
        	socket.receive(packet);

		// display response
        	received = new String(packet.getData());
        	System.out.println("Quote of the Moment: " + received);
	}
    
	// close socket
        socket.close();
    }
}
