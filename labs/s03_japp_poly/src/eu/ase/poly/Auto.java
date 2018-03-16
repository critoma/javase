package eu.ase.poly;

public class Auto extends Vehicle implements AutoCloseable, Cloneable {
	private int doorsNo;
	private static int noCars;
	
	public Auto() {
		Auto.noCars++;
	}
	
	public Auto(int weight, int doorsNo) {
		super(weight);
		this.doorsNo = doorsNo;
		Auto.noCars++;
	}
	
	public int getDoorsNo() {
		return this.doorsNo;
	}
	
	public void setDoosNo(int doorsN) {
		this.doorsNo = doorsN;
	}
	
	public static int getNoCars() {
		return Auto.noCars;
	}
	
	@Override
	public String display() {
		return new String("Auto - w = " + this.getWeight() + ", doorsNo = " + this.doorsNo);
	}
	
	@Override
	public void close() throws Exception {
		Auto.noCars--;
	}
	
	@Override
	public Object clone() {
		Auto r = null;
		try {
			r = (Auto)super.clone();
			//r.capacity = this.capacity.clone();
			r.doorsNo = this.doorsNo;
			Auto.noCars++;
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return r;
	}
}
