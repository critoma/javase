package ro.ase.acs.classes;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import ro.ase.acs.interfaces.Taxable;

//Car is Serializable because it extends Vehicle
//which is Serializable
public final class Car extends Vehicle implements Taxable, Comparable<Car> {
	private static final long serialVersionUID = 1L;
	private String color;
	private int capacity;
	
	public Car() {
		super();
		color = "black";
		capacity = 50;
	}
	
	public Car(String name, int speed, String color, int capacity) {
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
	//so we used StringBuilder instead
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Car [color=");
		builder.append(color);
		builder.append(", capacity=");
		builder.append(capacity);
		builder.append(", name=");
		builder.append(getName());
		builder.append(", speed=");
		builder.append(getSpeed());
		builder.append("]");
		return builder.toString();
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

	//compareTo method from the Comparable interface
	//is used by TreeSet or TreeMap collections
	//in order to insert the elements/keys
	@Override
	public int compareTo(Car o) {
		if(capacity < o.capacity) {
			return -1;
		}
		else if (capacity == o.capacity) {
			return 0;
		}
		else {
			return 1;
		}
	}

	
	//every time we override hashCode we should override equals too
	//and vice-versa
	//for two objects for which equals return true, the hashCode
	//should be the same (the opposite is not true)
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof Car) {
			Car o = (Car)obj;
			return getName().equals(o.getName()) && getSpeed() == o.getSpeed() &&
					color.equals(o.color) && capacity == o.capacity;
		}
		return false;
	}

	//usually we use prime numbers in order to generate unique integer values
	//the probability to have collisions is lower in this manner
	@Override
	public int hashCode() {
		return (31 * getName().hashCode() + getSpeed()) * 31 * color.hashCode() + capacity;
	}
	
	//binary serialization
	public void serialize() {
		FileOutputStream fileOutputStream = null;
		ObjectOutputStream outputStream = null;
		try {
			fileOutputStream =
					new FileOutputStream("object.bin");
			if(fileOutputStream != null) {
				outputStream =
						new ObjectOutputStream(fileOutputStream);
				outputStream.writeObject(this);
			}
		} catch(FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		finally {
			if(outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	//binary deserialization
	public static Car deserialize() throws IOException, ClassNotFoundException {
		FileInputStream fileInputStream =
				new FileInputStream("object.bin");
		ObjectInputStream objectInputStream =
				new ObjectInputStream(fileInputStream);
		Car c = (Car)objectInputStream.readObject();
		objectInputStream.close();
		return c;
	}
}
