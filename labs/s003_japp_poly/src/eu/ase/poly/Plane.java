package eu.ase.poly;

public class Plane extends Vehicle {
	private float capacity;
	private int enginesNo;
	
	public Plane() {
	}
	
	public Plane(int weight, float capacity, int enginesNo) {
		super(weight);
		this.capacity = capacity;
		this.enginesNo = enginesNo;
	}
	
	public float getCapacity() {
		return this.capacity;
	}
	
	public int getEnginesNo() {
		return this.enginesNo;
	}
	
	@Override
	public String display() {
		return new String("Plane - weight = " + this.getWeight()
		+ ", capacity = " + this.capacity + ", enginesNo = "
		+ this.enginesNo);
	}
}
