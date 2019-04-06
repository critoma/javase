package eu.ase.poly;


// Create the Vehicle class which implements Movement and Cloneable interface 
// and is has a private int non-static field weight with default constructor and constructor with 
// one parameter, plus get and set methods
// implement public String display() method for returning a string which contain the Vehicle weight
public class Vehicle implements Movement, Cloneable {

	public int weight;
	
	public Vehicle() {
		
	}
	
	Vehicle(int weight) {
		this.weight = weight;
	}
	
	public int getWeight() {
		return this.weight;
	}
	
	public String display() {
		return new String("Vehicle - w = " + this.weight);
	}
	
	@Override
	public void startEngine() {
		System.out.println("Vehicle::startEngine()");
	}

	@Override
	public void stopEngine() {
		System.out.println("Vehicle::stopEngine()");
	}
	
	@Override
	public Object clone() throws CloneNotSupportedException {
		Vehicle r = null;
		
		r = (Vehicle)super.clone();
		r.weight = this.weight;
		
		return r;
	}

}
