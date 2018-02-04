import java.io.*;
import java.util.*;

public class ConcatenationFiles {
	public static void main(String[] args) {
		if (args.length < 3) {
			System.out.println("Utilizare: java ConcatenationFile <f_rezultat> <f_in1> <f_in2>");
			System.exit(1);
		}
		try {
			FileOutputStream rez = new FileOutputStream(args[0]);
			Vector<FileInputStream> fIns = new Vector<FileInputStream>(args.length - 1);
			for (int i = 1; i < args.length; i++)
				fIns.add(new FileInputStream(args[i]));
			
			Enumeration<FileInputStream> e = fIns.elements();
			SequenceInputStream sis = new SequenceInputStream(e);
			
			int c = 0;
			long t = System.currentTimeMillis();
			
			while( (c = sis.read()) != -1) rez.write(c);
			
			System.out.println("Timp executie: "+(System.currentTimeMillis() - t));
			rez.close();
			sis.close();
		} catch(IOException ioe) {
			ioe.printStackTrace();
		}
	}
}