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

	//we override the clone method again
	//and we call the base implementation
	@Override
	public Object clone() throws CloneNotSupportedException {
		Car copy = (Car)super.clone();
		copy.color = color;
		copy.capacity = capacity;
		return copy;
	}

	//The toString method is called in order to
	//convert to object into a String
	//for example when we want to display it to the console
	//
	//String concatenation is not the best approach
	//because the String class is immutable
	@Override
	public String toString() {
		return "Car [color=" + color + ", capacity=" + capacity 
				+ ", name=" + getName() + ", speed="
				+ getSpeed() + "]";
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
