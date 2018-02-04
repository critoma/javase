package eu.ase.httpserver;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;

public class HTTPMultiServerThread extends Thread {
    private Socket socket = null;
    public HTTPMultiServerThread(Socket s) {
        super("Fir exec tratare client web");
        this.socket = s;
    }
    @Override
    public void run() {
        OutputStream os = null; PrintWriter out = null;
        InputStream is = null; BufferedReader in = null;
        String inputLine = null, outputLine = null;
        try {
            os = socket.getOutputStream(); out = new PrintWriter(os, true);
            is = socket.getInputStream(); in = new BufferedReader(new InputStreamReader(is));
            
            HTTPSeminarProtocol kkp = new HTTPSeminarProtocol();
            String processLine = "";
            while((inputLine = in.readLine()) != null && inputLine.length() > 1) {
                processLine += inputLine;
            }
            outputLine = kkp.processInput(processLine);
            out.println(outputLine);
            out.flush();
        } catch(IOException ioe) {
            ioe.printStackTrace();
        } finally {
            try {
                if(out != null) out.close();
                if(in != null) in.close();
                if(socket != null) socket.close();
            } catch(IOException ioec) {
                ioec.printStackTrace();
            }            
        }
    }
}
