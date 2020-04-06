package ro.ase.acs.classes;

import ro.ase.acs.interfaces.Taxable;

//inheritance in Java is done with extends and implements
public final class Car extends Vehicle implements Taxable {
	private String color;
	private int capacity;
	
	public Car() {
		//base default constructor call
		super();
		color = "black";
		capacity = 50;
	}
	
	public Car(String name, int speed, String color, int capacity) {
		//base constructor call
		super(name, speed);
		this.color = color;
		this.capacity = capacity;
	}
	
	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	@Override
	public float computeTax() {
		float tax = 0;
		if(capacity < 2000) {
			tax = (float)capacity / 1000 * 50;
		}
		else {
			tax = (float)capacity / 1000 * 100;
		}
		return (tax > MIN_TAX) ? tax : MIN_TAX;
	}

	@Override
	public final void move() {
		System.out.println("The car is moving with " + getSpeed() + 
				" km/h");
	}

}
