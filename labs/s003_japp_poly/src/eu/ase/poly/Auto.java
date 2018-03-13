package eu.ase.poly;

public class Auto extends Vehicle {
	private int doorsNo;
	
	public Auto() {
		//super();
	}
	
	public Auto(int weight, int doorsNo) {
		super(weight);
		this.doorsNo = doorsNo;
	}
	
	public int getDoorsNo() {
		return this.doorsNo;
	}
	
	@Override
	public String display() {
		return new String("Auto - weight = " + this.getWeight() + ", doorsNo = " + this.doorsNo);
	}
}
