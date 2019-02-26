package nioexamples;

import java.nio.ByteBuffer;

public class ByteBufferSimpleProgMain 
{
    public static void main(String[] args) {
    	
	    byte[] result = new byte[7];
	    ByteBuffer byteBuffer = ByteBuffer.allocate(8);

	    System.out.println("A1. byteBuffer.position() = " + byteBuffer.position() + ", limit = " + byteBuffer.limit() + ", remaining = " + byteBuffer.remaining());
	    byte[] tmp1 = new byte[] {1, 2, 3};
	    byteBuffer.put(tmp1); // put in the byteBuffer <=> reading from a FileChannel
	    System.out.println("A2. byteBuffer.position() = " + byteBuffer.position() + ", limit = " + byteBuffer.limit() + ", remaining = " + byteBuffer.remaining());
	    byte[] tmp2 = new byte[] {5, 6};
	    byteBuffer.put(tmp2); // put in the byteBuffer <=> reading from a FileChannel

	    System.out.println("A3. byteBuffer.position() = " + byteBuffer.position() + ", limit = " + byteBuffer.limit() + ", remaining = " + byteBuffer.remaining());
	    System.out.println(byteBuffer.toString());
	    
	    byteBuffer.flip();

	    System.out.println("A4. byteBuffer.position() = " + byteBuffer.position() + ", limit = " + byteBuffer.limit() + ", remaining = " + byteBuffer.remaining());
	    byteBuffer.get(result, 0, 4); // get from the byteBuffer <=> writing to a FileChannel

	    System.out.println("A5. byteBuffer.position() = " + byteBuffer.position() + ", limit = " + byteBuffer.limit() + ", remaining = " + byteBuffer.remaining());
	    byteBuffer.get(result, 4, 1); // get from the byteBuffer <=> writing to a FileChannel

	    System.out.println("A6. byteBuffer.position() = " + byteBuffer.position() + ", limit = " + byteBuffer.limit() + ", remaining = " + byteBuffer.remaining());
	    byteBuffer.clear(); 

	    System.out.println("A7. byteBuffer.position() = " + byteBuffer.position() + ", limit = " + byteBuffer.limit() + ", remaining = " + byteBuffer.remaining());
	    
	    // Create an empty ByteBuffer with a 10 byte capacity
	    ByteBuffer bbuf = ByteBuffer.allocate(10);
	
	    // Get the buffer's capacity
	    int capacity = bbuf.capacity(); // 10
	    System.out.println("capacity = " + capacity);
	
	    // Use the absolute put(int, byte).
	    // This method does not affect the position.
	    System.out.println("B1. byteBuffer.position() = " + bbuf.position() + ", limit = " + bbuf.limit() + ", remaining = " + bbuf.remaining());
	    
	    bbuf.put(0, (byte)0xFF); // position=0
	    System.out.println("B2. byteBuffer.position() = " + bbuf.position() + ", limit = " + bbuf.limit() + ", remaining = " + bbuf.remaining());
	    
	    // Set the position
	    bbuf.position(5);
	    System.out.println("B3. byteBuffer.position() = " + bbuf.position() + ", limit = " + bbuf.limit() + ", remaining = " + bbuf.remaining());
	    
	
	    // Use the relative put(byte)
	    bbuf.put((byte)0xFF);
	    System.out.println("B4. byteBuffer.position() = " + bbuf.position() + ", limit = " + bbuf.limit() + ", remaining = " + bbuf.remaining());
	    
	    // Get the new position
	    int pos = bbuf.position(); // 6
	
	    // Get remaining byte count
	    int rem = bbuf.remaining(); // 4
	
	    // Set the limit
	    bbuf.limit(7); // remaining=1
	    System.out.println("B5. byteBuffer.position() = " + bbuf.position() + ", limit = " + bbuf.limit() + ", remaining = " + bbuf.remaining());
	    
	    // This convenience method sets the position to 0
	    bbuf.rewind(); // remaining=7
	    System.out.println("B6. byteBuffer.position() = " + bbuf.position() + ", limit = " + bbuf.limit() + ", remaining = " + bbuf.remaining());
	
    }
}

