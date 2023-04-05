package eu.ase.threads;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.io.Serializable;

class ASingleton {

	private static ASingleton instance = null;
	private int myField;

	private ASingleton() {
	}

	public static ASingleton getInstance() {
		// breakpoint here in debug mode
		if (instance == null) {
			instance = new ASingleton();
		}
		return instance;
	}

	public void setMyField(int x) {
		myField = x;
	}

	public int getMyField() {
		return myField;
	}

}

class ASingletonSafe {

	private static volatile ASingletonSafe instance;
	private static Object mutex = new Object();
	private int myField;

	private ASingletonSafe() {
	}

	public static ASingletonSafe getInstance() {
		// breakpoint here:
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

	public void setMyField(int x) {
		myField = x;
	}

	public int getMyField() {
		return myField;
	}

}

/*
 * How to create class which produces immutable objects (thread safe) + Java
 * Fabrics (virtual Threads - run this with Java 19+):
 * https://www.geeksforgeeks.org/create-immutable-class-java/ 
 * 
 * In Java, all the wrapper classes (like Integer, Boolean, Byte, Short) and String class is
 * immutable. 1. Declare the class as final so it can’t be extended. 2. Make all
 * of the fields private so that direct access is not allowed. 3. Don’t provide
 * setter methods for variables. 4. Make all mutable fields final so that a
 * field’s value can be assigned only once. 5. Initialize all fields using a
 * constructor method performing deep copy. 6. Perform cloning of objects in the
 * getter methods to return a copy rather than returning the actual object
 * reference.
 *
 * regarding Comparable, please see lecture 4 and JCF - Java Collection
 * Framework:
 * https://github.com/critoma/javase/blob/master/lectures/c04/src/eu/ase/jcf/
 * ObjectOrder5.java
 *
 */
// Java Program to Create An Immutable Class
final class Student implements Serializable, Cloneable, Comparable<Student> {
	private static final long serialVersionUID = 1L;

	// Member attributes of final class
	private final int regNo;
	
	private final String firstName;
	private final String lastName;
	
	private final Map<String, String> metadata;

	// Constructor of immutable class
	// Parameterized constructor
	public Student(int regNo, String firstName, String lastName, Map<String, String> metadata) {
		this.regNo = regNo;
		this.firstName = new String("" + firstName);
		this.lastName = new String("" + lastName);
		
		// Creating Map object with reference to HashMap
		// Declaring object of string type
		Map<String, String> tempMap = new HashMap<>();

		// Iterating using for-each loop
		for (Map.Entry<String, String> entry : metadata.entrySet()) {
			// instead of new if other class than String, then 'clone()' will be used
			tempMap.put(new String(""+entry.getKey()), new String(""+entry.getValue()));
		}

		this.metadata = tempMap;
	}

	public int getRegNo() {
		return regNo;
	}

	public String getFirstName() {
		return new String("" + firstName);
	}

	public String getLastName() {
		return new String("" + lastName);
	}

	// Note that there should not be any setters
	public Map<String, String> getMetadata() {

		// Creating Map with HashMap reference
		Map<String, String> tempMap = new HashMap<>();

		for (Map.Entry<String, String> entry : this.metadata.entrySet()) {
			tempMap.put(entry.getKey(), entry.getValue());
		}
		return tempMap;
	}

	@Override
	protected Object clone() throws CloneNotSupportedException {
		//return super.clone();
		//Student objCopy =  (Student) super.clone();
		Student objCopy = new Student(this.regNo, this.firstName, this.lastName, this.getMetadata());
		return objCopy;
	}
	
	
	@Override
	public int hashCode() {
		// return Objects.hash(firstName, lastName, metadata, regNo);
		final int prime = 31;
		int result = 1;
		result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
		result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
		result = prime * result + ((metadata == null) ? 0 : metadata.hashCode());
		result = prime * result + regNo;
		
		int r = Objects.hash(firstName, lastName, metadata, regNo);
		String str = (r != result)? "\n whoops! \n" : "\n good! \n";
		System.out.printf(str);
		
		return result;
	}

	@Override
	public boolean equals(Object obj) {
//		if (this == obj) {
//			return true;
//		}
//		if (!(obj instanceof Student)) {
//			return false;
//		}
//		Student other = (Student) obj;
//		return Objects.equals(firstName, other.firstName) && Objects.equals(lastName, other.lastName)
//				&& Objects.equals(metadata, other.metadata) && regNo == other.regNo;
		
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Student other = (Student) obj;
		if (firstName == null) {
			if (other.firstName != null)
				return false;
		} else if (!firstName.equals(other.firstName))
			return false;
		if (lastName == null) {
			if (other.lastName != null)
				return false;
		} else if (!lastName.equals(other.lastName))
			return false;
		if (metadata == null) {
			if (other.metadata != null)
				return false;
		} else if (!metadata.equals(other.metadata))
			return false;
		if (regNo != other.regNo)
			return false;
		return true;
	}

	@Override
	public int compareTo(Student o) {
		if(this.regNo > o.regNo)
			return 1;
		else if (this.regNo == o.regNo)
			return 0;
		else
			return -1;
	}

	@Override
	public String toString() {
		return "eu.ase.threads.Student [regNo=" + regNo + ", firstName=" + firstName + ", lastName=" + lastName + ", metadata="
				+ metadata + "]" + " @ " + Integer.toHexString(this.hashCode());
	}

}

public class ThreadSafeSourceCodeDesignPatterns {
	public static void main(String[] args) {
		Runnable t0 = () -> {
			// breakpoint here in debug mode
			ASingleton sg1 = ASingleton.getInstance();
			sg1.setMyField(9);
			System.out.println("sg1.myField = " + sg1.getMyField() + ", sg1 = " + sg1);
		};
		Runnable t1 = () -> {
			// breakpoint here in debug mode
			ASingleton sg2 = ASingleton.getInstance();
			sg2.setMyField(7);
			System.out.println("sg2.myField = " + sg2.getMyField() + ", sg2 = " + sg2);
		};
		Thread th0 = new Thread(t0);
		Thread th1 = new Thread(t1);
		th0.start();
		th1.start();
		
		Runnable t2 = () -> {
			ASingletonSafe ss1 = ASingletonSafe.getInstance();
			ss1.setMyField(91);
			System.out.println("ss1.myField = " + ss1.getMyField() + ", ss1 = " + ss1);
		};
		Runnable t3 = () -> {
			ASingletonSafe ss2 = ASingletonSafe.getInstance();
			ss2.setMyField(71);
			System.out.println("ss2.myField = " + ss2.getMyField() + ", ss2 = " + ss2);
		};
		Thread th2 = new Thread(t2);
		Thread th3 = new Thread(t3);
		th2.start();
		th3.start();
		

		// Creating Map object with reference to HashMap
		Map<String, String> map1 = new HashMap<>();

		// Adding elements to Map object using put() method
		map1.put("Gr.", "1000");
		map1.put("Dpt.", "Department of Economic Informatics and Cybernetics");

		Student s1 = new Student(101, "Alexandra", "Popescu", map1);

		System.out.println(s1.getRegNo() + " " + s1.getFirstName() + " " + s1.getLastName());
		
		System.out.println("\n" + Thread.currentThread().getName() + " : " + s1.getMetadata());

		Runnable t4 = () -> {
			// Below line causes error:
			// s.regNo = 102;
			// breakpoint here:
			map1.put("City", "Bucharest");
			// Remains unchanged due to deep copy in constructor
			System.out.println(Thread.currentThread().getName() + " : " + s1.getMetadata());
		};
		Runnable t5 = () -> {
			// breakpoint here:
			s1.getMetadata().put("Country", "Romania");
			// Remains unchanged due to deep copy in getter
			System.out.println(Thread.currentThread().getName() + " : " + s1.getMetadata());
		};
		Thread th4 = new Thread(t4);
		Thread th5 = new Thread(t5);
		th4.start();
		th5.start();
		try {
			th4.join();
			th5.join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println(s1);
	}
}
