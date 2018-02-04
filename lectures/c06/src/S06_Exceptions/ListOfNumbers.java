
//Note: This class won't compile by design!
import java.io.*;
import java.util.Vector;

public class ListOfNumbers {

    private Vector<Integer> vector;
    private static final int SIZE = 10;

    public ListOfNumbers () {
        vector = new Vector<Integer>(SIZE);
        for (int i = 0; i < SIZE; i++) {
            vector.addElement(new Integer(i));
        }
    }

    public void writeList() {//throws IOException {//---nu inca
        PrintWriter out = new PrintWriter(new FileWriter("OutFile.txt"));

        for (int i = 0; i < SIZE; i++) {
            out.println("Value at: " + i + " = " + vector.elementAt(i));
        }

        out.close();
    }
}


/*
private Vector vector;
private static final int SIZE = 10;

PrintWriter out = null;

try {
    System.out.println("Entered try statement");
    out = new PrintWriter(new FileWriter("OutFile.txt"));
    for (int i = 0; i < SIZE; i++) {
        out.println("Value at: " + i + " = "  + vector.elementAt(i));
    }
}
*/

/*
} catch (FileNotFoundException e) {
    System.err.println("FileNotFoundException: " + e.getMessage());
    throw new SampleException(e);
    
} catch (IOException e) {
    System.err.println("Caught IOException: " + e.getMessage());
}
*/

/*
finally {
    if (out != null) { 
        System.out.println("Closing PrintWriter");
        out.close(); 
    } else { 
        System.out.println("PrintWriter not open");
    } 
} 
*/

/*
try {
    
    out.close();       //Don't do this; it duplicates code. 
    
} catch (FileNotFoundException e) {
    out.close();       //Don't do this; it duplicates code.
    System.err.println("Caught: FileNotFoundException: " 
                      + e.getMessage());
    throw new RuntimeException(e);
    
} catch (IOException e) {
    System.err.println("Caught IOException: " 
                      + e.getMessage());
}
*/

/*
public void writeList() {
    PrintWriter out = null;

    try {
        System.out.println("Entering try statement");
        out = new PrintWriter(
	                  new FileWriter("OutFile.txt"));
            for (int i = 0; i < SIZE; i++)
                out.println("Value at: " + i + " = " 
                             + vector.elementAt(i));
		  
    } catch (ArrayIndexOutOfBoundsException e) {
         System.err.println("Caught " 
                     + "ArrayIndexOutOfBoundsException: " 
                     +   e.getMessage());
				 
    } catch (IOException e) {
         System.err.println("Caught IOException: " 
                             +  e.getMessage());
				 
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
*/
/*
or

///public void writeList() throws IOException,  ArrayIndexOutOfBoundsException {ArrayIndexOutOfBoundsException - in unchecked exception => it is not mandatory
///=>
public void writeList() throws IOException { 
...like first time
}
*/