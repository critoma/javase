package eu.ase.io.serialization;

import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.net.URL;

public class ObjectsRestore {
	public static void main(String[] args) {
		ObjectsGraph og = null;
		try {
			System.out.println("Objects Restore ...");
			FileInputStream fin = new FileInputStream("test4.txt");
			ObjectInputStream sin = new ObjectInputStream(fin);
			
			og = (ObjectsGraph)sin.readObject();
			System.out.println("og read = " + og);
			
			URL o3 = (URL)sin.readObject();
			System.out.println("o3 read = " + o3);
			
			boolean exp = ( (og.o1 == o3) && (og.o1 == og.o2) );
			System.out.println("exp boolean = " + exp);
			
			sin.close();
			fin.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
