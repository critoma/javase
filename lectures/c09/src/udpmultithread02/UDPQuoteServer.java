import java.io.*;

public class UDPQuoteServer {
    public static void main(String[] args) {
        try {
			String ipServer = args[0];
			int portServer = Integer.parseInt(args[1]);
			UDPQuoteServerThread thQ = new UDPQuoteServerThread(ipServer, portServer);
			thQ.start();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
    }
}