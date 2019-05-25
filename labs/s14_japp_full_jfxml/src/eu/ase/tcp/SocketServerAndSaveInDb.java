package eu.ase.tcp;

import java.net.*;
import java.util.List;
import java.util.concurrent.SubmissionPublisher;

import eu.ase.iojson.User;
import eu.ase.jfxmltest.RegistrationFormController;
import eu.ase.sqldao.SqlDAO;
import eu.ase.sqldao.UsersSubscriberReactStream;

import java.io.*;

public class SocketServerAndSaveInDb {
	public static void main(String[] args) {
		ServerSocket serverSocket = null;
		boolean listening = true;
		SqlDAO sqlObj = SqlDAO.getInstance();
		
		try {
			int port = 7997;
			serverSocket = new ServerSocket(port);
			System.out.println("Server listens in port: " + port); 
		} catch(IOException ioe) {
			ioe.printStackTrace();
		}
		
		while(listening) {
			try {
				Socket client = serverSocket.accept();
				Runnable rClient = () -> {
					ObjectInputStream in;
					ObjectOutputStream out;
					try {
						in = new ObjectInputStream(client.getInputStream());
						out = new ObjectOutputStream(client.getOutputStream());
						
						List<User> usersList = null;
						Object list = in.readObject();
						if (list instanceof List<?>) {
							usersList = ((List<User>)list);
						}
						for(User u : usersList) {
							System.out.printf("\n u = " + u.getJsonString());
				    		sqlObj.insertIntoDB(u.getId(), u.getName(), u.getEmail(), u.getPassword());
				    	}
						sqlObj.closeDB();
						out.writeUTF("OK!");
						out.close();
						client.close();
					} catch (IOException | ClassNotFoundException e) {
						e.printStackTrace();
					}
				};
				Thread objClient = new Thread(rClient);
				objClient.start();
			} catch (IOException ioe) {
				ioe.printStackTrace();
			}
		}
}}
