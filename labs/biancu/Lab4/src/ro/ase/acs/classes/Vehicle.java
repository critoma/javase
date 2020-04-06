package ro.ase.acs.classes;

//in order to properly override the clone method
//the class needs to implement Cloneable
public abstract class Vehicle implements Cloneable {
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

	//the proper implementation of the clone method
	//the method is public, not protected
	//the base implementation (super) is used instead of new
	//because the class is abstract
	//this method cannot be called directly
	//its scope is to be called from derived classes
	@Override
	public Object clone() throws CloneNotSupportedException {
		Vehicle copy = (Vehicle)super.clone();
		copy.name = name;
		copy.speed = speed;
		return copy;
	}

	//abstract method
	public abstract void move();
}
