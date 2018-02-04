import java.io.*;
import java.net.*;

class GrafObiecte implements Serializable {
	public URL o1;
	public URL o2;

	public GrafObiecte(URL o1, URL o2) {
		this.o1 = o1;
		this.o2 = o2;
	}

	public String toString() {
		return new String("o1: " + o1 + " o2: " + o2);
	}
}

class SalvareObiect{

	
	public static void main(String args[]){
	
		GrafObiecte go = null;
		
		try{

			System.out.println("Salvare obiect");
			FileOutputStream fout = new FileOutputStream("test4.txt");
			ObjectOutputStream sout = new ObjectOutputStream(fout);
	
			URL o1 = new URL("http://www.google.ro");
			URL o2 = o1;
			URL o3 = o1;

			go = new GrafObiecte(o1, o2);
			sout.writeObject(go);
			//sout.reset(); //le salveaza separat
			sout.writeObject(o3);
			sout.flush();
			
			System.out.println("S-a scris obiectul: " + go);
			System.out.println("S-a scris obiectul: " + o3);
			System.out.println("(go.o1 == go.o2) && (go.o1 == o3) este: " +
					((go.o1 == go.o2) && (go.o1 == o3)) );

			sout.close();
			fout.close();
			
		}
		catch(Exception e){
			
			e.printStackTrace();

		}
	}
}

class RestaurareObiect
{
	public static void main(String args[]){
	
		GrafObiecte go = null;
		
		try{

			System.out.println("Restaurare obiect");
			FileInputStream fin = new FileInputStream("test4.txt");
			ObjectInputStream sin = new ObjectInputStream(fin);
	
			go = (GrafObiecte) sin.readObject();
			System.out.println("S-a citit obiectul: " + go);
			URL o3 = (URL) sin.readObject();
			System.out.println("S-a citit obiectul: " + o3);
			
			System.out.println("(go.o1 == go.o2) && (go.o1 == o3) este: " +
					((go.o1 == go.o2) && (go.o1 == o3)) );

			sin.close();
			fin.close();
			
		}
		catch(Exception e){
			
			e.printStackTrace();

		}
	}
}
