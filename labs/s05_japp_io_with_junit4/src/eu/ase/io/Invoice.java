package eu.ase.io;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.EOFException;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

// create Invoice class which contains:
// A. Fields:
// A.1 - prices: double[]
// A.2 - units: int[]
// A.3 - descs: String[] - descriptions of the products within invoice
// B. Methods:
// B.1 - constructor: public Invoice(int[] units, double[] prices, String[] productsDesc)
// B.2 - get and set methods
// B.3 - public void saveInvoice2File(String invoiceFileName) - save the invoice values (in order of the described fields) 
// into a file
// B.4 - public double readInvoiceFromFileAndCalcTotal(String invoiceFileName) - read from the file and calculate 
// the total of the invoice
// B.5 - clone method for deep copy

public class Invoice implements Cloneable {
	
	private double[] prices;
	private int[] units;
	private String[] descs;
	
	public Invoice(int[] units, double[] prices, String[] productsDesc) {
		this.units = units;
		this.prices = prices;
		this.descs = productsDesc;
	}
	
	public double[] getPrices() {
		return prices;
	}
	public void setPrices(double[] prices) {
		this.prices = prices;
	}
	public int[] getUnits() {
		return units;
	}
	public void setUnits(int[] units) {
		this.units = units;
	}
	public String[] getDescs() {
		return descs;
	}
	public void setDescs(String[] descs) {
		this.descs = descs;
	}

	public void saveInvoice2File(String invoiceFileName) {
		DataOutputStream out = null;
		
		try {
			FileOutputStream fos = new FileOutputStream(invoiceFileName);
			BufferedOutputStream bos = new BufferedOutputStream(fos);
			out = new DataOutputStream(bos);
			
			for (int i = 0; i < prices.length; i++) {
				out.writeDouble(prices[i]);
				out.writeInt(units[i]);
				out.writeUTF(descs[i]);
			}
			
			out.close(); 
		} catch(IOException ioe) {
			ioe.printStackTrace();
		}
	}
	
	public double readInvoiceFromFileAndCalcTotal(String invoiceFileName) {
		double total = 0.0;
		DataInputStream in = null;
		
		try {
			in = new DataInputStream(new BufferedInputStream(
					new FileInputStream(invoiceFileName)));
			double price; int unit; String desc;
			
			try {
				while (true) {
					price = in.readDouble();
					unit = in.readInt();
					desc = in.readUTF();
					total += (unit * price);
					System.out.printf("\n Read record: %s, unit = %d, price = %f", desc, unit, price);
				}
			} catch(EOFException eofe) {
				System.out.println("\n Total = " + total);
				in.close();
			}
			
		} catch(IOException ioe) {
			ioe.printStackTrace();
		}
		return total;
	}
	
	public double readInvoiceFromFileAndCalcTotalWithEx(String invoiceFileName)
			throws IOException {
		double total = 0.0;
		DataInputStream in = null;
		
			in = new DataInputStream(new BufferedInputStream(
					new FileInputStream(invoiceFileName)));
			double price; int unit; String desc;
			
			try {
				while (true) {
					price = in.readDouble();
					unit = in.readInt();
					desc = in.readUTF();
					total += (unit * price);
					System.out.printf("\n Read record: %s, unit = %d, price = %f", desc, unit, price);
				}
			} catch(EOFException eofe) {
				System.out.println("\n Total = " + total);
				in.close();
			}

		return total;
	}

	@Override
	public Object clone() throws CloneNotSupportedException {
		Invoice r = null;
		r = (Invoice) super.clone();
		r.descs = this.descs.clone();
		r.units = this.units.clone();
		r.prices = this.prices.clone();
		return r;
	}
	
}
