package ro.ase.acs.classes;

public abstract class Vehicle {
	private String name;
	private int speed;
	
	public Vehicle() {
		name = "";
		speed = 1;
	}
	
	public Vehicle(String name, int speed) {
		this.name = name;
		this.speed = speed;
	}

	public String getName() {
		return name;
	}

	public int getSpeed() {
		return speed;
	}
	
	//abstract method
	public abstract void move();
}
