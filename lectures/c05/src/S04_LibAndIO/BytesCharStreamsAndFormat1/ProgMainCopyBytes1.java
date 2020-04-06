import eu.ase.IO.*;

import java.io.*;
import java.util.StringTokenizer;

public class ProgMainCopyBytes1 {
 public static void main(String[] args) {
   try {
	//CopyBytesLib.copyFiles(args[0], args[1]);
	CopyCharsLib ccl = new CopyCharsLib();
	ccl.copyFilesWithCharset(args[0], args[1], "UTF-16BE");

   } catch(IOException e) {
	e.printStackTrace();
   }
 }
}
