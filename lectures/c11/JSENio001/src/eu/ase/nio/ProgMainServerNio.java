package eu.ase.nio;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Set;
 
public class ProgMainServerNio {
 
	@SuppressWarnings("unused")
	public static void main(String[] args) throws IOException {
 
		// Selector: multiplexor of SelectableChannel objects
		Selector selector = Selector.open(); // selector is open here
 
		// ServerSocketChannel: selectable channel for stream-oriented listening sockets
		ServerSocketChannel serverSocket = ServerSocketChannel.open();
		InetSocketAddress serverAddr = new InetSocketAddress("127.0.0.1", 8989);
 
		// Binds the channel's socket to a local address and configures the socket to listen for connections
		serverSocket.bind(serverAddr);
 
		// Adjusts this channel's blocking mode.
		serverSocket.configureBlocking(false);
 
		int ops = serverSocket.validOps();
		SelectionKey selectKy = serverSocket.register(selector, ops, null);
 
		// Infinite loop..
		// Keep server running
		while (true) {
 
			System.out.println("I'm a server and I'm waiting for new connection and buffer select...");
			// Selects a set of keys whose corresponding channels are ready for I/O operations
			selector.select();
 
			// token representing the registration of a SelectableChannel with a Selector
			Set<SelectionKey> cKeys = selector.selectedKeys();
			Iterator<SelectionKey> cIterator = cKeys.iterator();
 
			while (cIterator.hasNext()) {
				SelectionKey myKey = cIterator.next();
 
				// Tests whether this key's channel is ready to accept a new socket connection
				if (myKey.isAcceptable()) {
					SocketChannel sClient = serverSocket.accept();
 
					// Adjusts this channel's blocking mode to false
					sClient.configureBlocking(false);
 
					// Operation-set bit for read operations
					sClient.register(selector, SelectionKey.OP_READ);
					System.out.println("Connection Accepted: " + sClient.getLocalAddress() + "\n");
 
					// Tests whether this key's channel is ready for reading
				} else if (myKey.isReadable()) {
					
					SocketChannel sClient = (SocketChannel) myKey.channel();
					ByteBuffer cBuffer = ByteBuffer.allocate(256);
					sClient.read(cBuffer);
					String result = new String(cBuffer.array()).trim();
 
					System.out.println("Message received: " + result);
 
					if (result.equals("Google")) {
						sClient.close();
						System.out.println("\nIt's time to close connection as we got last company name 'Google'");
						System.out.println("\nServer will keep running. Try running client again to establish new connection");
					}
				}
				cIterator.remove();
			}
		}
	}

}


/*
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousServerSocketChannel;
import java.nio.channels.AsynchronousSocketChannel;
import java.nio.channels.CompletionHandler;
import java.nio.charset.Charset;

public class ProgMainServerNio {
	public static void main(String[] args) throws Exception {
		AsynchronousServerSocketChannel server = AsynchronousServerSocketChannel.open();
		String host = "localhost";
	    int port = 8989;
	    InetSocketAddress sAddr = new InetSocketAddress(host, port);
	    server.bind(sAddr);
	    System.out.format("Server is listening at %s%n", sAddr);
	    SockAttachment attach = new SockAttachment();
	    attach.server = server;
	    server.accept(attach, new ConnectionHandler());
	    Thread.currentThread().join();
	}
}
class SockAttachment {
	AsynchronousServerSocketChannel server;
	AsynchronousSocketChannel client;
	ByteBuffer buffer;
	SocketAddress clientAddr;
	boolean isRead;
}

class ConnectionHandler implements
    CompletionHandler<AsynchronousSocketChannel, SockAttachment> {
	@Override
	public void completed(AsynchronousSocketChannel client, SockAttachment attach) {
		try {
			SocketAddress clientAddr = client.getRemoteAddress();
			System.out.format("Accepted a  connection from  %s%n", clientAddr);
			attach.server.accept(attach, this);
			ReadWriteHandler rwHandler = new ReadWriteHandler();
			SockAttachment newAttach = new SockAttachment();
			newAttach.server = attach.server;
			newAttach.client = client;
			newAttach.buffer = ByteBuffer.allocate(2048);
			newAttach.isRead = true;
			newAttach.clientAddr = clientAddr;
			client.read(newAttach.buffer, newAttach, rwHandler);
	    } catch (IOException e) {
	      e.printStackTrace();
	    }
	}
	
	@Override
	public void failed(Throwable e, SockAttachment attach) {
		System.out.println("Failed to accept a  connection.");
		e.printStackTrace();
	}
}

class ReadWriteHandler implements CompletionHandler<Integer, SockAttachment> {
	@Override
	public void completed(Integer result, SockAttachment attach) {
		if (result == -1) {
			try {
				attach.client.close();
				System.out.format("Stopped listening to the client %s%n", attach.clientAddr);
			} catch (IOException ex) {
				ex.printStackTrace();
			}
			return;
		}
		
		if (attach.isRead) {
			attach.buffer.flip();
			int limits = attach.buffer.limit();
			byte bytes[] = new byte[limits];
			attach.buffer.get(bytes, 0, limits);
			Charset cs = Charset.forName("UTF-8");
			String msg = new String(bytes, cs);
			System.out.format("Client at  %s  says: %s%n", attach.clientAddr, msg);
			attach.isRead = false; // It is a write
			attach.buffer.rewind();
		} else {
			// Write to the client
			attach.client.write(attach.buffer, attach, this);
			attach.isRead = true;
			attach.buffer.clear();
			attach.client.read(attach.buffer, attach, this);
		}
	}

	@Override
	public void failed(Throwable e, SockAttachment attach) {
		e.printStackTrace();
	}
}
*/
