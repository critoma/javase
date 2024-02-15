package eu.ase.oop;

//import java.lang.Object;
//import java.lang.String;

public class Car /*extends Object*/ {
	private int idCar;
	private String modelName;
	
	public Car(int id, String modelName) {
		idCar = id;
		this.modelName = modelName;
	}
	
	public int getIdCar() {
		return this.idCar;
	}
	
	public String getModelName() {
		return this.modelName;
	}
	
	public void setIdCar(int id) {
		this.idCar = id;
	}
	
	public Car myClone() {
		Car t = new Car(this.idCar, this.modelName);
		return t;
	}
}
