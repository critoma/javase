
//Note: This class won't compile by design!
import java.io.*;
import java.util.Vector;

class ListOfNumbers {

    private Vector<Integer> vector;
    private static final int SIZE = 10;

    public ListOfNumbers () {
        vector = new Vector<Integer>(SIZE);
        for (int i = 0; i < SIZE; i++) {
            vector.addElement(new Integer(i));
        }
    }

    public void writeList() throws IOException,  ArrayIndexOutOfBoundsException {
     PrintWriter out = null;

     try {
        System.out.println("Entering try statement");

        out = new PrintWriter(new FileWriter("OutFile.txt"));

        for (int i = 0; i < SIZE; i++)
		out.println("Value at: " + i + " = " + vector.elementAt(i));
     } finally {
         if (out != null) {
             System.out.println("Closing PrintWriter");
             out.close();		
         } 
         else {
             System.out.println("PrintWriter not open");
         }
     }
    }
}

class ProgMainE3 {
 public static void main(String[] args) {
	ListOfNumbers ln = new ListOfNumbers();
	try {
		ln.writeList();
	} catch (ArrayIndexOutOfBoundsException e) {
         	System.err.println("Caught " + "ArrayIndexOutOfBoundsException: " + e.getMessage());				 
    	} catch (IOException e) {
         	System.err.println("Caught IOException: " + e.getMessage());
 	}
 }
}