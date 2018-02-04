package eu.ase.httpserver;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class HTTPMultiServer {
    public static void main(String[] args) {
        ServerSocket serverSocket = null;
        boolean listening = true;
        
        try {
            int port = Integer.parseInt(args[0]);
            serverSocket = new ServerSocket(port);
            System.out.println("Serverul meu web asculta in portul:"+port); 
        } catch(IOException ioe) {
            ioe.printStackTrace();
        }
        while(listening) {
            try {
                Socket client = serverSocket.accept();
                HTTPMultiServerThread objClient = new HTTPMultiServerThread(client);
                objClient.start();
                //client.close();//WRONG
            } catch(IOException ioec) {
                ioec.printStackTrace();
            }
        }
        try {
            serverSocket.close();
        } catch(IOException ioe) {
            ioe.printStackTrace();
        }
    }
}
