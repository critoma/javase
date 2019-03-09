package testing;

import static org.junit.Assert.*;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.EOFException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.*;
import java.util.Arrays;

import org.junit.Test;

import eu.ase.io.Invoice;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class JUnitEvaluation {

	@Test
	public void _310testInfoClassInvoice_mark3() throws Exception {
		Class<?> t = Class.forName("eu.ase.io.Invoice");
		if(t.getDeclaredFields().length < 3)
			fail("Not proper number of the fields");
		for (Field f : t.getDeclaredFields()) {
			try {
	            //assertNotNull(f);
				System.out.println("Invoice field: " + f.toString());
	            assertTrue("The field " + f.toString() + " is private",  Modifier.isPrivate(f.getModifiers()));
	            if (f.getName().compareTo("prices") == 0)
	            	assertEquals("The 'prices' is type double[]", double[].class, f.getType());
	            if (f.getName().compareTo("units") == 0)
	            	assertEquals("The 'units' is type int[]", int[].class, f.getType());
	            if (f.getName().compareTo("descs") == 0)
	            	assertEquals("The 'descs' is type String[]", String[].class, f.getType());
	        } catch (Exception nsfe) {
	            fail("The field "+f.toString()+" has problems in class Invoice.");
	        }
		}
	}
	
	@Test
	public void _313testInvoiceWrite2File_mark3() throws Exception {
		double[] prices = new double[] {10, 11, 9};
		int[] units = new int[] {9, 10, 9};
		String[] descs = new String[] {"T-Shirt", "Mug", "Pen"};
		
		Invoice invoice = new Invoice(units, prices, descs);
		System.out.println("Invoice test313 display = " + invoice.toString());
		
		invoice.saveInvoice2File("test3.txt");
		
		double total = 0.0;
		DataInputStream in = null;
		
			in = new DataInputStream(new BufferedInputStream(new FileInputStream("test3.txt")));
			double price; int unit; String desc;
			
			try {
				while (true) {
					price = in.readDouble();
					unit = in.readInt();
					desc = in.readUTF();
					total += (unit * price);
					//System.out.printf("\n Read record: %s, unit = %d, price = %f", desc, unit, price);
				}
			} catch(EOFException eofe) {
				try {
					assertEquals(281, total, 0.5);
					in.close();
					File f = new File("test3.txt");
					f.delete();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
	}
	
	@Test
	public void _313testInvoiceReadFromFile_mark3() throws Exception {
		double[] prices = new double[] {10, 11, 8};
		int[] units = new int[] {9, 10, 8};
		String[] descs = new String[] {"T-Shirt", "Mug", "Pen"};
		
		Invoice invoice = new Invoice(units, prices, descs);
		System.out.println("Invoice test313 display = " + invoice.toString());
		
		DataOutputStream out = null;
		
		try {
			FileOutputStream fos = new FileOutputStream("test4.txt");
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
		
		double total = invoice.readInvoiceFromFileAndCalcTotal("test4.txt");
		
		try {
			File f = new File("test4.txt");
			f.delete();
			assertEquals(264, total, 0.5);	
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	public void _315testInvoiceClone_mark3() throws Exception {
		double[] prices = new double[] {10, 11, 9};
		int[] units = new int[] {9, 10, 9};
		String[] descs = new String[] {"T-Shirt", "Mug", "Pen"};
		
		Invoice invoice1 = new Invoice(units, prices, descs);
		Invoice invoice2 = (Invoice) invoice1.clone();

		assertNotSame(invoice1, invoice2);
		if (invoice1.getPrices() == invoice2.getPrices()) {
			fail("clone not correct implemented");
		}
		if (invoice1.getUnits() == invoice2.getUnits()) {
			fail("clone not correct implemented");
		}
		if (invoice1.getDescs() == invoice2.getDescs()) {
			fail("clone not correct implemented");
		}
		if (! Arrays.equals(invoice1.getPrices(), invoice2.getPrices()) ) {
			fail("clone not correct implemented");
		}
		if (! Arrays.equals(invoice1.getUnits(), invoice2.getUnits()) ) {
			fail("clone not correct implemented");
		}
		
	}

}
