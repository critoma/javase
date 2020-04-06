package ro.ase.acs.main;

import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import ro.ase.acs.classes.Car;
import ro.ase.acs.classes.Vehicle;
import ro.ase.acs.interfaces.Taxable;

public class Main {

	public static void main(String[] args) {
		Taxable t = new Car("Dacia", 100, "red", 1400);
		System.out.println(t.computeTax());
		
		Vehicle v = new Car();
		v.move();

		Car c = new Car("Ford", 90, "white", 1000);
		//the instanceof operator checks
		//if the Car inherits Cloneable
		if(c instanceof Cloneable) {
			try {
				//a deep copy is made
				Car c2 = (Car)c.clone();
				c.setColor("black");
				//toString is called when we print the object
				System.out.println(c2);
			} catch (CloneNotSupportedException e) {
				e.printStackTrace();
			}
		}
		
		//Generics in Java accept reference types only
		//We need to use the wrapper class Integer
		//instead of the int primitive
		List<Integer> list = new Vector<>();
		list.add(5);
		list.add(4);
		list.add(1);
		
		list.add(3, 7);
		list.remove(0);
		
		//classic for loop
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i));
		}
		
		System.out.println();
		
		//enhanced for
		for(Integer x : list) {
			System.out.printf("%d ", x);
		}
		
		list.add(0, 9);
		System.out.println();
		
		//iterator based loop
		for(Iterator<Integer> it = list.iterator(); it.hasNext(); ) {
			System.out.println(it.next());
		}
	}

}
