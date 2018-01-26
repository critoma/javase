package eu.ase.poly;

public class Vehicle implements Movement {

	private int weight;
	
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

}
