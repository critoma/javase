package nioexamples;

import java.io.*;
import java.nio.*;
import java.nio.channels.*;

public class SliceBuffer
{
  static public void main( String args[] ) throws Exception {
    ByteBuffer buffer = ByteBuffer.allocate( 10 );
    System.out.println("A1. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining());

    for (int i=0; i<buffer.capacity(); ++i) {
      buffer.put( (byte)i );
      System.out.println("A2. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining());
    }

    buffer.position( 3 );
    System.out.println("A3. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining());
    buffer.limit( 7 );
    System.out.println("A4. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining());

    ByteBuffer slice = buffer.slice();
    System.out.println("A5. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining());
    System.out.println("B1. slice.position() = " + slice.position() + ", limit = " + slice.limit() + ", remaining = " + slice.remaining());

    for (int i=0; i<slice.capacity(); ++i) {
      byte b = slice.get( i );
      System.out.println("B2. slice.position() = " + slice.position() + ", limit = " + slice.limit() + ", remaining = " + slice.remaining());

      b *= 11;
      slice.put( i, b );
      System.out.println("B3. slice.position() = " + slice.position() + ", limit = " + slice.limit() + ", remaining = " + slice.remaining());

    }

    buffer.position( 0 );
    System.out.println("A6. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining());
    
    buffer.limit( buffer.capacity() );
    System.out.println("A7. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining());
    
    while (buffer.remaining()>0) {
      System.out.println( buffer.get() );
      System.out.println("A8. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining());
    
    }
  }
}
