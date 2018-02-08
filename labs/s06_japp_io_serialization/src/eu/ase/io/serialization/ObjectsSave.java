package eu.ase.io.serialization;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.net.URL;

public class ObjectsSave {
	public static void main(String[] args) {
		ObjectsGraph og = null;
		
		try {
			System.out.println("Saving objects ...");
			
			ObjectOutputStream sout = new ObjectOutputStream(
					new FileOutputStream("test4.txt"));
			
			URL o1 = new URL("http://www.google.com");
			URL o2 = o1;
			URL o3 = o1;
			
			og = new ObjectsGraph(o1, o2);
			sout.writeObject(og);
			//sout.reset();
			sout.writeObject(o3);
			sout.flush();
			
			System.out.println("og written: " + og);
			System.out.println("o3 written: "+ o3);
			
			boolean exp = ( (og.o1 == o3) && (og.o1 == og.o2) );
			System.out.println("exp boolean = " + exp);
			
			sout.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
