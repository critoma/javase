package ro.ase.acs.interfaces;

public interface Taxable {
	public static final float MIN_TAX = 5;
	
	public float computeTax();
}
