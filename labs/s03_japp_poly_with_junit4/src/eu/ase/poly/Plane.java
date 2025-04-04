package eu.ase.poly;

//Create the Plane class which is inheriting Vehicle and it is adding the following private fields:
//- capacity: float
//- enginesNo: int
//- Create default constructor and constructor with parameters - using super
//- create get/set methods with eventual throw Exception statement
//- overwrite display method from Vehicle class
public class Plane extends Vehicle {
	private float capacity;
	private int enginesNo;
	
	public Plane() {
	}
	
	public Plane(int weight, float capacity, int engineN) {
		super(weight);
		this.capacity = capacity;
		this.enginesNo = engineN;
	}
	
	@Override
	public String display() {
		return new String("Plane - w = " + this.getWeight() + 
				", capacity = " + this.capacity +
				", engines no = " + this.enginesNo);
	}

	public float getCapacity() {
		return capacity;
	}

	public void setCapacity(float capacity) throws Exception {
		if (capacity < 0) throw new Exception("The doorsNo must not be less than 0.");
		this.capacity = capacity;
	}

	public int getEnginesNo() {
		return enginesNo;
	}

	public void setEnginesNo(int enginesNo) {
		this.enginesNo = enginesNo;
	}
	
}
