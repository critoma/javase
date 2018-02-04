import java.util.*;

class ReadFile {
	//Native method declaration
  	native byte[] loadFileInMemory(String name);

	//Load the library
  	static {
		//in Linux prefix "lib" is added automatically
		//plus in Linux is important $LD_LIBRARY_PATH
		//see how it was used gcc -fpic ...
		System.loadLibrary("dad_native");
		//MS Windows: System.loadLibrary("dad_native");
  	}
}

class JNIProgMain {
  public static void main(String args[]) {
	byte[] buf;
	System.out.println("args[0]="+args[0]);
	System.out.println("java.library.path = "+System.getProperty("java.library.path"));
    			
	//Create class instance

	ReadFile mappedFile=new ReadFile();
	//Call native method to load ReadFile.java

	buf=mappedFile.loadFileInMemory(args[0]);

	//Print contents of ReadFile.java
    	for(int i=0;i<buf.length;i++) {
      		System.out.print((char)buf[i]);
    	}
  } //end main
}//end class
