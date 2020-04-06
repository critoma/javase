package ro.ase.acs.main;

import ro.ase.acs.classes.Car;

public class Main {

	public static void main(String[] args) {
		Car c = new Car();
		c.setProducer("Dacia");
		
		//shorthand notation
		//the same thing as saying
		//int[] array = new int[3];
		//array[0] = 100;...
		int[] array = new int[] { 100, 200, 300 };
		c.setDistances(array);
		array[0] = 5000;
		System.out.println(c.getDistances()[0]);
		
		//the calling of the clone method
		//to create a deep copy
		Car c2 = (Car)c.clone();
		c.setProducer("Ford");
		c.setDistances(array);
		
		System.out.println(c2.getProducer());
		int[] dist = c2.getDistances();
		
		//enhanced for can be used for arrays in Java
		for(int d : dist) {
			System.out.println(d);
		}
	}

}
