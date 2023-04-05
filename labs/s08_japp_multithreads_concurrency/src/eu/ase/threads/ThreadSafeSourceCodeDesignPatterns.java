package eu.ase.threads;

import java.util.HashMap;
import java.util.Map;

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
* How to create class which produces immutable objects (thread safe): 
1. Declare the class as final so it can’t be extended.
2. Make all of the fields private so that direct access is not allowed.
3. Don’t provide setter methods for variables.
4. Make all mutable fields final so that a field’s value can be assigned only once.
5. Initialize all fields using a constructor method performing deep copy.
6. Perform cloning of objects in the getter methods to return a copy rather than returning the actual object reference.
*/

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
  }
}
