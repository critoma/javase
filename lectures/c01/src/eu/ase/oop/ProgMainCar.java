package eu.ase.oop;

public class ProgMainCar {
	public static void main(String[] args) {
		Car c1 = new Car(777, "BMW");
		Car c2 = new Car(999, "Tesla");
		
		System.out.println("c1 - id = " + c1.getIdCar() + ", modelName = " + c1.getModelName());
		System.out.println("c2 - id = " + c2.getIdCar() + ", modelName = " + c2.getModelName());
		
		//c2 = c1;
		c2 = c1.myClone();
		c2.setIdCar(333);
		
		System.out.println("c1 - id = " + c1.getIdCar() + ", modelName = " + c1.getModelName());
    System.out.println("c2 - id = " + c2.getIdCar() + ", modelName = " + c2.getModelName());

	}
}
