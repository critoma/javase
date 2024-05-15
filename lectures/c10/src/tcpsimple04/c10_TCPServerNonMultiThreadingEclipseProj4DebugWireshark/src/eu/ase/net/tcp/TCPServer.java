package eu.ase.net.tcp;

import java.net.*;
import java.util.Date;
import java.io.*;

public class TCPServer {
	public static void main(String[] args) {

		ServerSocket serverSocket = null;
		Socket clientSocket = null;

		boolean listening = true;

		OutputStream os = null;
		PrintWriter out = null;
		InputStream is = null;
		BufferedReader in = null;
		String inputLine = null, outputLine = null;

		try {
			// SEVERSOCKET = SOCKET+BIND+LISTEN
			serverSocket = new ServerSocket(4801);
			System.out.println("Server is listening in port 4801!");
		} catch (IOException e) {
			System.err.println("Could not listen on port: 4801.");
			System.exit(-1);
		}

		while (listening) {
			try {
				clientSocket = serverSocket.accept(); // ACCEPT
				System.out.println("Clientul (remote addr.)=" + clientSocket.getInetAddress().toString()
						+ " : (remote port)=" + clientSocket.getPort() + " in server port 4801");

				is = clientSocket.getInputStream();
				in = new BufferedReader(new InputStreamReader(is));

				os = clientSocket.getOutputStream();
				out = new PrintWriter(os, true);

				while ((inputLine = in.readLine()) != null) {
					System.out.println(inputLine);
					if (inputLine.compareTo("What date & time is it?") == 0) {
						outputLine = new Date().toString();
					} else {
						if (inputLine.compareTo("Good bye!") == 0) {
							outputLine = new String("Good bye to you too!");
						} else
							outputLine = new String("OK! I don't know your request!");
					}
					out.println(outputLine);
					out.flush();

					if (inputLine.compareTo("Good bye!") == 0) {
						break;
					}
				}
			} catch (IOException ioe) {
				ioe.printStackTrace();
			} finally {
				try {
					if (out != null)
						out.close();
					if (in != null)
						in.close();
					if (clientSocket != null)
						clientSocket.close();
				} catch (IOException ioec) {
					ioec.printStackTrace();
				}
			}
		} // end while
		try {
			serverSocket.close();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}
}

