import java.io.*;

//scrierea unei facturi in fisier
public class ProgMain {
 public static void main(String[] args) {
	//double[] prices = { 19.99, 9.99, 15.99, 3.99, 4.99 };
	//int[] units = { 12, 8, 13, 29, 50 };
	double[] prices = { 19.99, 9.99, 15.99, 3.99, 4.99, 0.1 };
	int[] units = { 12, 8, 13, 29, 50, 1 };
	String[] descs = { "Java T-shirt",
				        "Java Mug",
				        "Duke Juggling Dolls",
				        "Java Pin",
				        "Java Key Chain", "Cucu" };

	DataOutputStream out = null;
	DataInputStream in = null;

	

	try {
		out = new DataOutputStream(new BufferedOutputStream(new FileOutputStream("test.txt")));
		
		for (int i = 0; i < prices.length; i ++) {
		    out.writeDouble(prices[i]);
		    out.writeInt(units[i]);
		    out.writeUTF(descs[i]);
		}

		out.flush();

		in = new DataInputStream(new BufferedInputStream(new FileInputStream("test.txt")));
		
		double price;
		int unit;
		String desc;
		double total = 0.0;


		try {
		    while (true) {
		        price = in.readDouble();
		        unit = in.readInt();
		        desc = in.readUTF();
		        System.out.format("You ordered %d units of %s at $%.2f%n", unit, desc, price);
		        total += unit * price;
    			}
		} catch (EOFException e) {
			//aici iese cand s-a terminat fisierul
		}
		System.out.format("Total=%f", total);

	} catch(IOException ioe) {
		ioe.printStackTrace();
	}
 }
}