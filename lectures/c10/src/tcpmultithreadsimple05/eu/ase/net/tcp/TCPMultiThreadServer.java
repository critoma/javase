package eu.ase.net.tcp;

import java.net.*;
import java.io.*;

public class TCPMultiThreadServer {
    public static void main(String[] args) {
        
	ServerSocket serverSocket = null;
	Socket clientSocket = null;

    boolean listening = true;

        try {
			//SEVERSOCKET = SOCKET+BIND+LISTEN
            serverSocket = new ServerSocket(4801);			
            System.out.println("Serverul asculta in port 4801");
        } catch (IOException e) {
            System.err.println("Could not listen on port: 4801.");
            System.exit(-1);
        }

        while (listening) {
			try {
				clientSocket = serverSocket.accept();		//ACCEPT
				ThreadClient tc = new ThreadClient(clientSocket);
				tc.start();
			} catch (IOException ioe) {
				ioe.printStackTrace();
			} 
	} //end while
        try {
		serverSocket.close();//NEVER GETS HERE
	} catch (IOException ioe) {
		ioe.printStackTrace();
	}
    }
}

class ThreadClient extends Thread {
    private Socket clientSocket;
    public ThreadClient(Socket cS) {
	this.clientSocket = cS;
    }
    @Override
    public void run() {
	System.out.println("A venit clientul (remote addr.)="+clientSocket.getInetAddress().toString()+" : (remote port)="+clientSocket.getPort()+" in server port 4801");
	
	OutputStream os = null; PrintWriter out = null;
	InputStream is = null; BufferedReader in = null;
	String inputLine = null, outputLine = null;

	try {				
		is = clientSocket.getInputStream();
		in = new BufferedReader(new InputStreamReader(is));
				
		os = clientSocket.getOutputStream();
		out = new PrintWriter(os, true);
			
		while ((inputLine = in.readLine()) != null) {
			System.out.println(inputLine);
			outputLine = new String("OK");
			out.println(outputLine);
			out.flush();
			if (outputLine.compareTo("La revedere!") == 0) {break;}
		}
	} catch (IOException ioe) {
		ioe.printStackTrace();
	} finally {
		try {
			if (out != null) out.close();
			if (in != null) in.close();
			if (clientSocket != null) clientSocket.close();
		} catch (IOException ioec) {
			ioec.printStackTrace();
		}
	}

    } //end run
} //end class
