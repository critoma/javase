package eu.ase.io;

public class ProgMainOopIo {

	public static void main(String[] args) {
		double[] prices = new double[] {10, 11, 9};
		int[] units = new int[] {12, 8, 9};
		String[] descs = new String[] {"T-Shirt", "Mug", "Pen"};
		
		Invoice invoice = new Invoice(units, prices, descs);
		invoice.saveInvoice2File("test2.txt");
		invoice	.readInvoiceFromFileAndCalcTotal("test2.txt");
	}

}
