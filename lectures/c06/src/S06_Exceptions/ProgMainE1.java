
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

    public void writeList() {
        PrintWriter out = new PrintWriter(new FileWriter("OutFile.txt"));

        for (int i = 0; i < SIZE; i++) {
            out.println("Value at: " + i + " = " + vector.elementAt(i));
        }

        out.close();
    }
}

class ProgMainE1 {
 public static void main(String[] args) {
	ListOfNumbers ln = new ListOfNumbers();
	ln.writeList();
 }
}