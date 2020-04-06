package ro.ase.acs.interfaces;

//interfaces have a special keyword in Java
public interface Taxable {
	//constant field
	public static final float MIN_TAX = 5;
	
	//abstract method
	public float computeTax();
}
