package eu.ase.threads;

import java.io.*;

// Copy file and update progress bar in a separate thread
class CopyFileTask implements Runnable {
    private String fNameSrc;
    private String fNameDst;

    private static Object myLock = new Object();

    public CopyFileTask(String fileNameSource, String fileNameDestination) {
	this.fNameSrc = fileNameSource;
	this.fNameDst = fileNameDestination;
    }

    @Override
    public void run() {
	//cFiles(); //copy files without synchronized keyword
	//csFiles(); //copy files WITH synchronized keyword @ method level <=> synchronized(this)
        //csLockFiles(); //copy files WITH synchronized keyword @ LOCK (myLock) static object <=> synchronized(myLock)

      BufferedInputStream in = null;
      BufferedOutputStream out = null;
      try {
        // Create file input stream
        File inFile = new File(this.fNameSrc);
        in = new BufferedInputStream(new FileInputStream(inFile));

        // Create file output stream
        File outFile = new File(this.fNameDst);
        out = new BufferedOutputStream(new FileOutputStream(outFile));

	//System.out.println("run(): in = " + in + ", out = " + out);

        // Get total bytes in the file
        long totalBytes = in.available();

        int r;
        long bytesRead = 0;
        // You may increase buffer size to improve IO speed
        byte[] b = new byte[10];
        while ((r = in.read(b, 0, b.length)) != -1) {
          out.write(b, 0, r);
          bytesRead += r;
        }
      }
      catch (FileNotFoundException ex) {
        ex.printStackTrace();
      }
      catch (IOException ex) {
        ex.printStackTrace();
      }
      finally {
        try {
          if (in != null) in.close();
          if (out != null) out.close();
        }
        catch (Exception ex) {}
      }

    } //end method

    private void cFiles() {
      BufferedInputStream in = null;
      BufferedOutputStream out = null;
      try {
        // Create file input stream
        File inFile = new File(this.fNameSrc);
        in = new BufferedInputStream(new FileInputStream(inFile));

        // Create file output stream
        File outFile = new File(this.fNameDst);
        out = new BufferedOutputStream(new FileOutputStream(outFile));

	//System.out.println("run(): in = " + in + ", out = " + out);

        // Get total bytes in the file
        long totalBytes = in.available();

        int r;
        long bytesRead = 0;
        // You may increase buffer size to improve IO speed
        byte[] b = new byte[10];
        while ((r = in.read(b, 0, b.length)) != -1) {
          out.write(b, 0, r);
          bytesRead += r;
        }
      }
      catch (FileNotFoundException ex) {
        ex.printStackTrace();
      }
      catch (IOException ex) {
        ex.printStackTrace();
      }
      finally {
        try {
          if (in != null) in.close();
          if (out != null) out.close();
        }
        catch (Exception ex) {}
      }
    }


    private synchronized void csFiles() {
      BufferedInputStream in = null;
      BufferedOutputStream out = null;
      try {
        // Create file input stream
        File inFile = new File(this.fNameSrc);
        in = new BufferedInputStream(new FileInputStream(inFile));

        // Create file output stream
        File outFile = new File(this.fNameDst);
        out = new BufferedOutputStream(new FileOutputStream(outFile));

	//System.out.println("run(): in = " + in + ", out = " + out);

        // Get total bytes in the file
        long totalBytes = in.available();

        int r;
        long bytesRead = 0;
        // You may increase buffer size to improve IO speed
        byte[] b = new byte[10];
        while ((r = in.read(b, 0, b.length)) != -1) {
          out.write(b, 0, r);
          bytesRead += r;
        }
      }
      catch (FileNotFoundException ex) {
        ex.printStackTrace();
      }
      catch (IOException ex) {
        ex.printStackTrace();
      }
      finally {
        try {
          if (in != null) in.close();
          if (out != null) out.close();
        }
        catch (Exception ex) {}
      }

    }

    private void csLockFiles() {
      //synchronized (this) {
      synchronized (myLock) {
      BufferedInputStream in = null;
      BufferedOutputStream out = null;
      try {
        // Create file input stream
        File inFile = new File(this.fNameSrc);
        in = new BufferedInputStream(new FileInputStream(inFile));

        // Create file output stream
        File outFile = new File(this.fNameDst);
        out = new BufferedOutputStream(new FileOutputStream(outFile));

	//System.out.println("run(): in = " + in + ", out = " + out);

        // Get total bytes in the file
        long totalBytes = in.available();

        int r;
        long bytesRead = 0;
        // You may increase buffer size to improve IO speed
        byte[] b = new byte[10];
        while ((r = in.read(b, 0, b.length)) != -1) {
          out.write(b, 0, r);
          bytesRead += r;
        }
      }
      catch (FileNotFoundException ex) {
        ex.printStackTrace();
      }
      catch (IOException ex) {
        ex.printStackTrace();
      }
      finally {
        try {
          if (in != null) in.close();
          if (out != null) out.close();
        }
        catch (Exception ex) {}
      }
     } //end synch
    }
  } //end class

public class ProgMainCopyFileTask 
{
	public static void main(String[] args) {
		Thread t1 = new Thread(new CopyFileTask("src.jpg", "dst1.jpg"));
		Thread t2 = new Thread(new CopyFileTask("src.jpg", "dst2.jpg"));
		Thread t3 = new Thread(new CopyFileTask("src.jpg", "dst3.jpg"));
		Thread t4 = new Thread(new CopyFileTask("src.jpg", "dst4.jpg"));

		long startSecv = System.currentTimeMillis();
		t1.run();
		t2.run();
		t3.run();
		t4.run();
		long stopSecv = System.currentTimeMillis();
		System.out.println("Running in: "+(stopSecv - startSecv));

		long startParalel = System.currentTimeMillis();
		t1.start(); t2.start(); t3.start(); t4.start();
		long stopParalel = System.currentTimeMillis();
		System.out.println("Running in: "+(stopParalel - startParalel));
	}
}
