import eu.ase.IO.*;

import java.io.*;
import java.util.StringTokenizer;

public class CopyBytes1 {
 public static void main(String[] args) {
   try {
	CopyBytesLib.copyFiles(args[0], args[1]);
	
/*
	//formatarea si scanarea fluxurilor
	System.out.format("%f, %1$+020.10f %n", Math.PI);
	
	//de citit Scanner (clasa din JDK 6 care va inlocui StringTokenizer si StreamTokenizer)
	StringTokenizer st = new StringTokenizer("this is a test");
     	while (st.hasMoreTokens()) {
          System.out.println(st.nextToken());
        }

	//StringTokenizer is a legacy class that is retained for compatibility reasons although 
	//its use is discouraged in new code. It is recommended that anyone seeking this functionality 
	//use the split  method of String or the java.util.regex package instead.
*/
   } catch(IOException e) {
	e.printStackTrace();
   }
 }
}
