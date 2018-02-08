package eu.ase.nio;


/*

// 1. Sync NIO - read data from a file

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

public class ProgMainNio {

	public static void main(String[] args) {
		
		RandomAccessFile aFile;
		try {
			aFile = new RandomAccessFile("data/nio-data.txt", "rw");
		
			FileChannel inChannel = aFile.getChannel();

			//create buffer with capacity of 48 bytes
			ByteBuffer buf = ByteBuffer.allocate(48);
	
			int bytesRead = inChannel.read(buf); //read into buffer.
			while (bytesRead != -1) {
	
			  buf.flip();  //make buffer ready for read
	
			  while(buf.hasRemaining()){
			      System.out.print((char) buf.get()); // read 1 byte at a time
			  }
	
			  buf.clear(); //make buffer ready for writing
			  bytesRead = inChannel.read(buf);
			}
			aFile.close();
		} catch(IOException ioe) {
			ioe.printStackTrace();
		}
        
	} // end main

} //end class
*/

/*
// 2. Async NIO - model with Future, write + read data from a file

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousFileChannel;

import java.util.concurrent.Future;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class ProgMainNio {

	public static void main(String[] args) {
		
		try {
			
			//Path path = Paths.get("data/nio-data.txt");
			
			Path path = Paths.get("data/test-write2.txt");
			AsynchronousFileChannel fileChannelW = 
			    AsynchronousFileChannel.open(path, StandardOpenOption.WRITE);

			ByteBuffer buffer = ByteBuffer.allocate(1024);
			long positionW = 0;

			buffer.put("test data\r using Java SE NIO \r async with Future".getBytes());
			buffer.flip();

			Future<Integer> operationW = fileChannelW.write(buffer, positionW);
			buffer.clear();

			while(!operationW.isDone());

			System.out.println("Write done");
			
			
			AsynchronousFileChannel fileChannelR = 
				    AsynchronousFileChannel.open(path, StandardOpenOption.READ);

			//ByteBuffer buffer = ByteBuffer.allocate(1024);
			buffer = ByteBuffer.allocate(1024);
			long positionR = 0;

			Future<Integer> operationR = fileChannelR.read(buffer, positionR);

			while(!operationR.isDone());

			buffer.flip();
			byte[] data = new byte[buffer.limit()];
			buffer.get(data);
			System.out.println(new String(data));
			buffer.clear();
		} catch(IOException ioe) {
			ioe.printStackTrace();
		}
        
	} // end main

} //end class
*/

//3.1 Async NIO - model with CompletionHandler, write 
// + read data from a file


import static java.nio.file.StandardOpenOption.CREATE;
import static java.nio.file.StandardOpenOption.WRITE;
import static java.nio.file.StandardOpenOption.READ;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousFileChannel;
import java.nio.channels.CompletionHandler;
import java.nio.charset.Charset;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ProgMainNio {
	
    public static void main(String[] args) {
    	ProgMainNio myNio = new ProgMainNio();
    	try {
	    	myNio.writeFile("./data/test-write3.txt", "Test data\r using Java SE NIO \r async with CompletionHandler.");
	    	myNio.readFile("./data/test-write3.txt");
    	} catch(IOException ioe) {
    		ioe.printStackTrace();
    	}
    }
  
    private void writeFile(String filePath, String input) throws IOException {
    	Path path = Paths.get(filePath);
    	AsynchronousFileChannel afc = AsynchronousFileChannel.open(path, WRITE, CREATE);
    	
    	WriteHandler handler = new WriteHandler();
	    ByteBuffer dataBuffer = ByteBuffer.wrap(input.getBytes());//getDataBuffer();
	    Attachment attach = new Attachment();
	    
	    attach.asyncChannel = afc;
	    attach.buffer = dataBuffer;
	    attach.path = path;
	
	    afc.write(dataBuffer, 0, attach, handler);
	
	    System.out.println("Sleeping for 3 seconds...");
	    try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

    private void readFile(String filePath) throws IOException {
    	Path path = Paths.get(filePath);
        AsynchronousFileChannel afc = AsynchronousFileChannel.open(path, READ);
        ReadHandler handler = new ReadHandler();
        int fileSize = (int) afc.size();
        ByteBuffer dataBuffer = ByteBuffer.allocate(fileSize);

        Attachment attach = new Attachment();
        attach.asyncChannel = afc;
        attach.buffer = dataBuffer;
        attach.path = path;

        afc.read(dataBuffer, 0, attach, handler);

        System.out.println("Sleeping for 5  seconds...");
	    try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
//  public static ByteBuffer getDataBuffer() {
//    String lineSeparator = System.getProperty("line.separator");
//    StringBuilder sb = new StringBuilder();
//    sb.append("test");
//    sb.append(lineSeparator);
//    sb.append("test");
//    sb.append(lineSeparator);
//    String str = sb.toString();
//    Charset cs = Charset.forName("UTF-8");
//    ByteBuffer bb = ByteBuffer.wrap(str.getBytes(cs));
//    return bb;
//  }
}

class Attachment {
	public Path path;
	public ByteBuffer buffer;
	public AsynchronousFileChannel asyncChannel;
} // end Attachment

class WriteHandler implements CompletionHandler<Integer, Attachment> {
  @Override
  public void completed(Integer result, Attachment attach) {
    System.out.format("%s bytes written  to  %s%n", result, attach.path.toAbsolutePath());
    try {
       attach.asyncChannel.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void failed(Throwable e, Attachment attach) {
    try {
      attach.asyncChannel.close();
    } catch (IOException e1) {
      e1.printStackTrace();
    }
  }
} //end WriteHandler

class ReadHandler implements CompletionHandler<Integer, Attachment> {
	  @Override
	  public void completed(Integer result, Attachment attach) {
	    System.out.format("%s bytes read   from  %s%n", result, attach.path);
	    System.out.format("Read data is:%n");
	    byte[] byteData = attach.buffer.array();
	    Charset cs = Charset.forName("UTF-8");
	    String data = new String(byteData, cs);
	    System.out.println(data);
	    try {
	      // Close the channel
	      attach.asyncChannel.close();
	    } catch (IOException e) {
	      e.printStackTrace();
	    }
	  }

	  @Override
	  public void failed(Throwable e, Attachment attach) {
	    System.out.format("Read operation  on  %s  file failed."
	        + "The  error is: %s%n", attach.path, e.getMessage());
	    try {
	      // Close the channel
	      attach.asyncChannel.close();
	    } catch (IOException e1) {
	      e1.printStackTrace();
	    }
	  }
} //end ReadHandler



/*
//3.2 Async NIO - model with CompletionHandler, write + read data from a file

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.nio.file.StandardOpenOption;

import java.nio.channels.AsynchronousFileChannel;
import java.nio.channels.CompletionHandler;

import java.nio.ByteBuffer;
import java.io.IOException;


public class ProgMainNio {

	public static void main(String[] args) {
		
		try {
			//Thread currentThread = Thread.currentThread();

			Path path = Paths.get("data/test-write3.txt");
			if(!Files.exists(path)){
			    Files.createFile(path);
			}
			AsynchronousFileChannel fileChannelW = 
			    AsynchronousFileChannel.open(path, StandardOpenOption.WRITE);

			//ByteBuffer buffer = ByteBuffer.allocate(1024);
			long position = 0;
			String msgW = "test data\r using Java SE NIO \r async with CompletionHandler";
			//buffer.put(msgW.getBytes());
			//buffer.flip();
			ByteBuffer buffer = ByteBuffer.wrap(msgW.getBytes());

			fileChannelW.write(buffer, position, buffer, new CompletionHandler<Integer, ByteBuffer>() {

			    @Override
			    public void completed(Integer result, ByteBuffer attachment) {
			        System.out.println("bytes written: " + result);
			    }

			    @Override
			    public void failed(Throwable exc, ByteBuffer attachment) {
			        System.out.println("Write failed");
			        exc.printStackTrace();
			        //currentThread.interrupt();
			    }
			});
			
			fileChannelW.close();
			
			AsynchronousFileChannel fileChannelR = 
				    AsynchronousFileChannel.open(path, StandardOpenOption.READ);
			
			fileChannelR.read(buffer, position, buffer, new CompletionHandler<Integer, ByteBuffer>() {
			    @Override
			    public void completed(Integer result, ByteBuffer attachment) {
			        System.out.println("result = " + result);
			        System.out.println(attachment + " completed and " + result + " bytes are read.");
			        //attachment.flip();
			        //byte[] data = new byte[attachment.limit()];
			        //attachment.get(data);
			        //System.out.println(new String(data));
			        //attachment.clear();
			    }

			    @Override
			    public void failed(Throwable exc, ByteBuffer attachment) {
			    	System.out.println("Read failed");
			        exc.printStackTrace();
			    }
			});
			

			fileChannelR.close();
			
		} catch(IOException ioe) {
			ioe.printStackTrace();
		}
        
	} // end main

} //end class

*/

/*
//3.3 Async NIO - model with CompletionHandler, write + read data from a file

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousFileChannel;
import java.nio.file.StandardOpenOption;
import java.nio.channels.CompletionHandler;
import java.nio.file.Paths;
import java.nio.file.Path;

public class ProgMainNio {

	private Thread currentThread;
	
    public static void main (String [] args) throws Exception {
	
        ProgMainNio myNio = new ProgMainNio();
        myNio.writeFile("data/test-write3.txt", "Test data\r using Java SE NIO \r async with CompletionHandler.");
        myNio.readFile("data/test-write3.txt");
    }
	
    private void writeFile(String filePath, String input) throws IOException {
        
        System.out.println("Input string: " + input);
        byte[] byteArray = input.getBytes();

        ByteBuffer buffer = ByteBuffer.wrap(byteArray);
	
        Path path = Paths.get(filePath);
        AsynchronousFileChannel channel = AsynchronousFileChannel.open(path, StandardOpenOption.WRITE);
			
        CompletionHandler<Integer, ByteBuffer> handler = new CompletionHandler<Integer, ByteBuffer>() {

          @Override
		  public void completed(Integer result, ByteBuffer attachment) {
          //public void completed(Integer result, Object attachment) { 
			
            System.out.println(attachment + " completed and " + result + " bytes are written.");
          } 
          
          //@Override
          //public void failed(Throwable e, Object attachment) {
          @Override
		  public void failed(Throwable exc, ByteBuffer attachment) {
            System.out.println(attachment + " failed with exception:");
            exc.printStackTrace();
          }
        };
	
        channel.write(buffer, 0, buffer, handler);	
		
		channel.close();
    }
    
    private void readFile(String filePath) throws IOException {

        Path path = Paths.get(filePath);
		
        AsynchronousFileChannel channel = AsynchronousFileChannel.open(path, StandardOpenOption.READ);

        ByteBuffer buffer = ByteBuffer.allocate(1_024);

        channel.read(buffer, 0, buffer,
            new CompletionHandler<Integer, ByteBuffer>() {
              public void completed(Integer result, ByteBuffer attachment) {
                System.out.println("Bytes read [" + result + "]");
              }

              public void failed(Throwable exception, ByteBuffer attachment) {
                System.out.println(exception.getMessage());
              }
            });
        channel.close();
    }
}
*/

