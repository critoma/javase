package eu.ase.nio.server_client;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Set;

//http://tutorials.jenkov.com/java-nio/index.html
//https://crunchify.com/java-nio-non-blocking-io-with-server-client-example-java-nio-bytebuffer-and-channels-selector-java-nio-vs-io/
//https://github.com/jjenkov/java-nio-server

public class CrunchifyNIOServer {
	@SuppressWarnings("unused")
	public static void main(String[] args) throws IOException {

		// Selector: multiplexor of SelectableChannel objects
		Selector selector = Selector.open(); // selector is open here

		// ServerSocketChannel: selectable channel for stream-oriented listening
		// sockets
		ServerSocketChannel cSocket = ServerSocketChannel.open();
		InetSocketAddress cAddr = new InetSocketAddress("localhost",
				1111);

		// Binds the channel's socket to a local address and configures the
		// socket to listen for connections
		cSocket.bind(cAddr);

		// Adjusts this channel's blocking mode.
		cSocket.configureBlocking(false);

		int ops = cSocket.validOps();
		SelectionKey selectKy = cSocket.register(selector, ops, null);

		// Infinite loop..
		// Keep server running
		while (true) {

			log("i'm a server and i'm waiting for new connection and buffer select...");
			// Selects a set of keys whose corresponding channels are ready for
			// I/O operations
			selector.select();

			// token representing the registration of a SelectableChannel with a
			// Selector
			Set<SelectionKey> cKeys = selector.selectedKeys();
			Iterator<SelectionKey> cIterator = cKeys.iterator();

			while (cIterator.hasNext()) {
				SelectionKey myKey = cIterator.next();

				// Tests whether this key's channel is ready to accept a new
				// socket connection
				if (myKey.isAcceptable()) {
					SocketChannel cClient = cSocket.accept();

					// Adjusts this channel's blocking mode to false
					cClient.configureBlocking(false);

					// Operation-set bit for read operations
					cClient.register(selector, SelectionKey.OP_READ);
					log("Connection Accepted: "
							+ cClient.getLocalAddress() + "\n");

					// Tests whether this key's channel is ready for reading
				} else if (myKey.isReadable()) {
					SocketChannel cClient = (SocketChannel) myKey
							.channel();
					ByteBuffer cBuffer = ByteBuffer.allocate(256);
					cClient.read(cBuffer);
					String result = new String(cBuffer.array()).trim();

					log("Message received: " + result);

					if (result.equals("STOP")) {
						cClient.close();
						log("\nIt's time to close connection as we got last company name 'c'");
						log("\nServer will keep running. Try running client again to establish new connection");
					}
				}
				cIterator.remove();
			}
		}
	}

	private static void log(String str) {
		System.out.println(str);
	}
}
