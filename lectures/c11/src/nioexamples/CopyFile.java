package nioexamples;

import java.io.*;
import java.nio.*;
import java.nio.channels.*;

public class CopyFile
{
  static public void main( String args[] ) throws Exception {
    if (args.length<2) {
      System.err.println( "Usage: java CopyFile infile outfile" );
      System.exit( 1 );
    }

    String infile = args[0];
    String outfile = args[1];

    FileInputStream fin = new FileInputStream( infile );
    FileOutputStream fout = new FileOutputStream( outfile );

    FileChannel fcin = fin.getChannel();
    FileChannel fcout = fout.getChannel();

    ByteBuffer buffer = ByteBuffer.allocate( 1024 );
    System.out.println("A1. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining());
    while (true) {
      buffer.clear();
      System.out.println("Aw1. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining());
    
      int r = fcin.read( buffer );
      System.out.println("Aw2. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining() + ", r = " + r);
    
      if (r==-1) {
        break;
      }

      buffer.flip();
      System.out.println("Aw3. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining());  

      fcout.write( buffer );
      System.out.println("Aw4. buffer.position() = " + buffer.position() + ", limit = " + buffer.limit() + ", remaining = " + buffer.remaining());
    }
  }
}
