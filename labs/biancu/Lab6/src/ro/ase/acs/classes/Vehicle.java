package ro.ase.acs.classes;

import java.io.Serializable;

//a class should implement Serializable in order
//to be serialized
public abstract class Vehicle implements Cloneable, Serializable {
	//this field is used to identify the version of the class
	//and it should be incremented when the class changes
	private static final long serialVersionUID = 1L;
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

	@Override
	public Object clone() throws CloneNotSupportedException {
		Vehicle copy = (Vehicle)super.clone();
		copy.name = name;
		copy.speed = speed;
		return copy;
	}

	public abstract void move();
}
