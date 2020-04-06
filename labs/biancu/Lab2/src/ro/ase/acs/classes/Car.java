package ro.ase.acs.classes;

public class Car {
	private String producer;
	private float price;
	
	//an enum is a reference type in Java
	//it can be defined in its own file or
	//as an inner type as here
	public enum FuelType { gas, diesel, electric };
	
	private FuelType fuelType;
	
	//arrays from Java behave like the
	//dynamically allocated arrays from C++
	//distances from bellow is by default null
	private int[] distances;
	
	public Car() {
		producer = "";
		price = 0;
		fuelType = FuelType.gas;
		distances = new int[1];
		distances[0] = 100;
	}

	public String getProducer() {
		return producer;
	}

	public void setProducer(String producer) {
		this.producer = producer;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public FuelType getFuelType() {
		return fuelType;
	}

	public void setFuelType(FuelType fuelType) {
		this.fuelType = fuelType;
	}

	//because arrays are references
	//we cannot return directly distances
	//because this will allow a direct access
	//to the private field, that's why we do a copy
	public int[] getDistances() {
		int[] copy = new int[distances.length];
		System.arraycopy(distances, 0, copy, 0, distances.length);
		return copy;
	}

	//same goes for the setter, a direct copy with =
	//will be just a shallow copy
	//
	//not always the automatically generated getters
	//and setters are the ones we need
	public void setDistances(int[] distances) {
		this.distances = new int[distances.length];
		for(int i = 0; i < distances.length; i++) {
			this.distances[i] = distances[i];
		}
	}

	//a better approach than creating a custom cloning method
	//is to override the one inherited from Object
	//even if the method from Object is protected
	//and has some known issues
	//
	//more details in future labs
	@Override
	public Object clone() {
		Car car = new Car();
		//String is immutable 
		//(once instantiated cannot be modified)
		//we say new String just if we want to be sure
		//that the two instances point to two different
		//memory areas from the beginning
		//otherwise copying with = is ok
		car.producer = new String(producer);
		car.price = price;
		car.fuelType = fuelType;
		//all the reference type members should
		//be cloned too, otherwise the clone is not
		//a fully deep copy
		car.distances = getDistances();
		return car;
	}
	
	
}
