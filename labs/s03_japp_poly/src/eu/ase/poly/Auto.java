package eu.ase.poly;

public class Auto extends Vehicle {
	private int doorsNo;
	
	public Auto() {
		
	}
	
	public Auto(int weight, int doorsNo) {
		super(weight);
		this.doorsNo = doorsNo;
	}
	
	public int getDoorsNo() {
		return this.doorsNo;
	}
	
	public void setDoosNo(int doorsN) {
		this.doorsNo = doorsN;
	}
	
	@Override
	public String display() {
		return new String("Auto - w = " + this.getWeight() + ", doorsNo = " + this.doorsNo);
	}
}
