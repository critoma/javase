package eu.ase.jcf;

public class Plane {
	private int idPlane;
	
	public Plane(int idPlane) {
		this.idPlane = idPlane;
	}
	
	public void print() {
		System.out.println("Plane - id = " + this.idPlane);
	}
}
