package eu.ase.ooparrays;

public class Car {
	private static int noCars;
	private String rName;
	private short[] km;
	private float averageKm;
	
	public Car(String registrationPlateNumber, short[] kmPerDayByCar) {
		this.rName = registrationPlateNumber;
		this.km = kmPerDayByCar;
	}
	
	public static int getNoCars() {
		return noCars;
	}
	public static void setNoCars(int noCars) {
		Car.noCars = noCars;
	}
	public String getRName() {
		return rName;
	}
	public void setRName(String registrationPlateNumber) {
		this.rName = registrationPlateNumber;
	}
	public short[] getKm() {
		return km;
	}
	public void setKm(short[] kmDailyByEachCar) {
		this.km = kmDailyByEachCar;
	}
	public float getAverageKm() {
		this.averageKm = this.calcAvgKm();
		return averageKm;
	}
	private float calcAvgKm() {
		float result = 0.0f;
		for (int j = 0; j < km.length; j++) {
			result = result + this.km[j];
		}
		result = result / km.length;
		return result;
	}
	
	
}
