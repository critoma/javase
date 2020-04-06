package eu.ase.threads;

import java.io.*;

// Copy file and update progress bar in a separate thread
public class CopyFileTask implements Runnable {
    private String fNameSrc;
    private String fNameDst;

    public CopyFileTask(String fileNameSource, String fileNameDestination) {
	this.fNameSrc = fileNameSource;
	this.fNameDst = fileNameDestination;
    }

    public void run() {
      BufferedInputStream in = null;
      BufferedOutputStream out = null;
      try {
        // Create file input stream
        File inFile = new File(jtfFrom.getText().trim());
        in = new BufferedInputStream(new FileInputStream(inFile));

        // Create file output stream
        File outFile = new File(jtfTo.getText());
        out = new BufferedOutputStream(new FileOutputStream(outFile));

        // Get total bytes in the file
        long totalBytes = in.available();

        // Start progress meter bar
        jpb.setValue(0);
        jpb.setMaximum(100);

        int r;
        long bytesRead = 0;
        // You may increase buffer size to improve IO speed
        byte[] b = new byte[10];
        while ((r = in.read(b, 0, b.length)) != -1) {
          out.write(b, 0, r);
          bytesRead += r;
          currentValue = (int)(bytesRead * 100 / totalBytes);

          // Update the progress bar
          jpb.setValue(currentValue);
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
  }

