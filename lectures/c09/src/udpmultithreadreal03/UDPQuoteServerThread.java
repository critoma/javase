import java.io.*;
import java.net.*;
import java.util.*;

public class UDPQuoteServerThread extends Thread {
    protected DatagramSocket servSock = null;
    protected DatagramPacket packet = null;
    protected BufferedReader in = null;
    protected boolean moreQuotes = true;

    public UDPQuoteServerThread(DatagramSocket ss, DatagramPacket p) throws IOException {
        try {
	    this.servSock = ss;
	    this.packet = p;
            in = new BufferedReader(new FileReader("one-liners.txt"));
        } catch (FileNotFoundException e) {
            System.err.println("Could not open quote file. Serving time instead.");
        }
    }

    public void run() {
        while (moreQuotes) {
            try {
                byte[] buf = new byte[256];

                    // figure out response
                String dString = null;
                if (in == null)
                    dString = new Date().toString();
                else
                    dString = this.getNextQuote();
                buf = dString.getBytes();

		    // send the response to the client at "address" and "port"
                InetAddress address = packet.getAddress();
                int port = packet.getPort();
                packet = new DatagramPacket(buf, buf.length, address, port);
                servSock.send(packet);
            } catch (IOException e) {
                e.printStackTrace();
		moreQuotes = false;
            }
        }
    }

    protected String getNextQuote() {
        String returnValue = null;
        try {
            if ((returnValue = in.readLine()) == null) {
                in.close();
		moreQuotes = false;
                returnValue = "No more quotes. Goodbye.";
            }
        } catch (IOException e) {
            returnValue = "IOException occurred in server.";
        }
		
        return returnValue;
    }
}
