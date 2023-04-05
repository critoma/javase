package eu.ase.threads;

import java.util.HashMap;
import java.util.Map;
import java.io.Serializable;

class ASingleton {

	private static ASingleton instance = null;
  	private int myField;

	private ASingleton() {
	}

	public static ASingleton getInstance() {
		if (instance == null) {
			instance = new ASingleton();
		}
		return instance;
	}
  
  	public void setMyField(int x) { myField = x; }
  	public int getMyField() { return myField; }

}

class ASingletonSafe {

	private static volatile ASingletonSafe instance;
	private static Object mutex = new Object();
  	private int myField;

	private ASingletonSafe() {
	}

	public static ASingletonSafe getInstance() {
		ASingletonSafe result = instance;
		if (result == null) {
			synchronized (mutex) {
				result = instance;
				if (result == null)
					instance = result = new ASingletonSafe();
			}
		}
		return result;
	}
  
  	public void setMyField(int x) { myField = x; }
  	public int getMyField() { return myField; }

}

/*
* How to create class which produces immutable objects (thread safe) + Java Fabrics (virtual Threads - run this with Java 19+): 
* https://www.geeksforgeeks.org/create-immutable-class-java/
* In Java, all the wrapper classes (like Integer, Boolean, Byte, Short) and String class is immutable.
1. Declare the class as final so it can’t be extended.
2. Make all of the fields private so that direct access is not allowed.
3. Don’t provide setter methods for variables.
4. Make all mutable fields final so that a field’s value can be assigned only once.
5. Initialize all fields using a constructor method performing deep copy.
6. Perform cloning of objects in the getter methods to return a copy rather than returning the actual object reference.
*
* regarding Comparable, please see lecture 3: https://github.com/critoma/javase/blob/master/lectures/c04/src/eu/ase/jcf/ObjectOrder5.java
*
*/
// Java Program to Create An Immutable Class
final class Student implements Comparable<Student>, Cloneable, Serializable {
	private static final long serialVersionUID = 1L;
	
	// Member attributes of final class
	private final String firstName;
	private final String lastName;
	private final int regNo;
	private final Map<String, String> metadata;

	// Constructor of immutable class
	// Parameterized constructor
	public Student(String firstName, String lastName, int regNo, Map<String, String> metadata)
	{
		// This keyword refers to current instance itself
		this.firstName = firstName;
		this.lastName = lastName;
		this.regNo = regNo;

		// Creating Map object with reference to HashMap
		// Declaring object of string type
		Map<String, String> tempMap = new HashMap<>();

		// Iterating using for-each loop
		for (Map.Entry<String, String> entry : metadata.entrySet()) {
			tempMap.put(entry.getKey(), entry.getValue());
		}

		this.metadata = tempMap;
	}
	public String getName() { return name; }

	public int getRegNo() { return regNo; }

	// Note that there should not be any setters
	public Map<String, String> getMetadata()
	{

		// Creating Map with HashMap reference
		Map<String, String> tempMap = new HashMap<>();

		for (Map.Entry<String, String> entry :
			this.metadata.entrySet()) {
			tempMap.put(entry.getKey(), entry.getValue());
		}
		return tempMap;
	}
	
	@Override
    	public int hashCode() {
        	return 31*firstName.hashCode() + lastName.hashCode();
    	}

    	public String toString() {
		return firstName + " " + lastName + " @ "+this.hashCode();
    	}

    	public int compareTo(Name n) {
        	int lastCmp = lastName.compareTo(n.lastName);
        	return (lastCmp != 0 ? lastCmp :
                	firstName.compareTo(n.firstName));
    	}
}

public class ThreadSafeSourceCodeDesignPatterns {
  public static void main(String[] args) {
	  ASingleton s1 = ASingleton.getInstance();
	  ASingleton s2 = ASingleton.getInstance();
	  s1.setMyField(9);
	  s2.setMyField(7);
	  System.out.println("s1 = " + s1.getMyField() + ", s2 = " + s2.getMyField());
	  
	  ASingletonSafe ss1 = ASingletonSafe.getInstance();
	  ASingletonSafe ss2 = ASingletonSafe.getInstance();
	  ss1.setMyField(9);
	  ss2.setMyField(7);
	  System.out.println("ss1 = " + ss1.getMyField() + ", ss2 = " + ss2.getMyField());
	  
	  // Creating Map object with reference to HashMap
	  Map<String, String> map = new HashMap<>();
	  
	  // Adding elements to Map object using put() method
	  map.put("Gr.", "1000");
	  map.put("Dpt.", "Department of Economic Informatics and Cybernetics");

	  Student s = new Student("Alexandra", 101, map);

	  System.out.println(s.getName());
	  System.out.println(s.getRegNo());
	  System.out.println(s.getMetadata());

	  // Uncommenting below line causes error
	  // s.regNo = 102;
          map.put("City", "Bucharest");
	  // Remains unchanged due to deep copy in constructor
	  System.out.println(s.getMetadata());
	  s.getMetadata().put("Country", "Romania");
	  // Remains unchanged due to deep copy in getter
	  System.out.println(s.getMetadata());
  }
}
