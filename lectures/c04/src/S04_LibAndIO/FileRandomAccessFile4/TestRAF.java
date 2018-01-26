import java.io.*;

public class TestRAF {
 public static void main(String[] args) {
	if (args.length != 1) {
		System.out.println("Utilizare: java TestRAF <fisier>");
		System.exit(1);
	}
	
	String nFis = args[0];
	
	try {
		RandomAccessFile raf = new RandomAccessFile(nFis, "rw");
		String s1 = "Prima pozitie";
		int i = 1;
		String s2 = "A doua pozitie";
		boolean b = true;
		
		long poz1 = raf.getFilePointer();
		raf.writeUTF(s1);
		raf.writeInt(i);
		
		long poz2 = raf.getFilePointer();
		raf.writeUTF(s2);
		raf.writeBoolean(b);
		
		raf.seek(poz2);
		System.out.println("La pozitia 2:"+raf.readUTF()+" : "+raf.readBoolean());
		raf.seek(poz1);
		System.out.println("La pozitia 1:"+raf.readUTF()+" : "+raf.readInt());
		
		raf.close();
	} catch(IOException ioe) {
		ioe.printStackTrace();
	}
 }
}