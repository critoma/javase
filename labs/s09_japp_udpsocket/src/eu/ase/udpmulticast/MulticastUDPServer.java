package eu.ase.udpmulticast;

import java.time.Instant;
import java.net.DatagramSocket;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.io.IOException;

public class MulticastUDPServer {
  public static void main(String[] args) {
	DatagramSocket socket = null;
	boolean running = true;
	byte[] buf = null;

	try {
		// udp socket 4445
		// socket = new DatagramSocket(4445);
		socket = new DatagramSocket(Integer.parseInt(args[0]));
	} catch(IOException ioe) {
		ioe.printStackTrace();
	}

    while (running) {
    	try {
    		// construct the time now message
            String dString = Instant.now().toString();

            buf = dString.getBytes();

		    // send it
            InetAddress group = InetAddress.getByName("230.0.0.1");
            DatagramPacket packet = new DatagramPacket(buf, buf.length, group, 4446);
            socket.send(packet);

		    // sleep for a while
		    try {
		      Thread.currentThread();
			  Thread.sleep((long)(Math.random() * 5000)); //up to five seconds
		    } catch (InterruptedException e) { 
		    	e.printStackTrace();
		    }
        } catch (IOException ioe) {
        	ioe.printStackTrace();
        	running = false;
        } catch (Exception ge) {
            ge.printStackTrace();
            running = false;
	    }
    } //end while
	socket.close();
  } //end main
} //end class
