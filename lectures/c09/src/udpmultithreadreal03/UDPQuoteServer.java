import java.io.*;
import java.net.*;

public class UDPQuoteServer {
    public static void main(String[] args) {
        try {
			String ipServer = args[0];
			int portServer = Integer.parseInt(args[1]);

			DatagramSocket serverSocket = new DatagramSocket(portServer);
			byte[] receivedData = new byte[255];//only first 5 are used
			while(true) {
			   try {
				DatagramPacket receivedPacket = new DatagramPacket(receivedData, receivedData.length);
				serverSocket.receive(receivedPacket);
				if((receivedData[0] == (byte)'G') && (receivedData[1] == (byte)'I') && (receivedData[2] == (byte)'V') && (receivedData[3] == (byte)'E') && (receivedData[4] == (byte)'Q')) {
					UDPQuoteServerThread thQ = new UDPQuoteServerThread(serverSocket, receivedPacket);
					thQ.start();
				}
			   } catch(IOException ioec) {
				ioec.printStackTrace();
			   }
			}
			//serverSocket.close();//impossible to get here
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
    }
}