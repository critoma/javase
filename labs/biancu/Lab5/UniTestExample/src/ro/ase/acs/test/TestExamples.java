package ro.ase.acs.test;

import static org.junit.Assert.*;

import ro.ase.acs.classes.Car;

import org.junit.Test;

import java.lang.reflect.*;

public class TestExamples {

	@Test
	public void testCarFields() throws Exception {
		Class<?> t = Class.forName("ro.ase.acs.classes.Car");
		if(t.getDeclaredFields().length < 2)
			fail("Not proper number of fields");
		
		int noConstr = 0;
		for (Constructor<?> m : t.getDeclaredConstructors()) {
			if (m.getName().equals("ro.ase.acs.classes.Car"))
				noConstr++;
		}
		assertEquals("not proper number of constructors", 2, noConstr);
		
		for (Field f : t.getDeclaredFields()) {
			try {
	            //assertNotNull(f);
	            assertTrue("The field " + f.toString() + " should be private",  Modifier.isPrivate(f.getModifiers()));
	            if (f.getName().compareTo("name") == 0)
	            	assertEquals("The 'name' is type String", String.class, f.getType());
	            else if (f.getName().compareTo("speed") == 0)
	            	assertEquals("The 'speed' is type int", int.class, f.getType());
	            else if (f.getName().compareTo("color") == 0)
	            	assertEquals("The 'color' is type String", String.class, f.getType());
	            else if (f.getName().compareTo("capacity") == 0)
	            	assertEquals("The 'capacity' is type int", int.class, f.getType());
	         
	            else
	            	fail("The field "+f.toString()+" has problems in the class: " + t.getName());
	        } catch (Exception nsfe) {
	            fail("The field " + f.toString() + " has problems in the class: " + t.getName());
	        }
		}
		
	}
	
	@Test
	public void testCarExtension() throws Exception {
		Class<?> t = Class.forName("ro.ase.acs.classes.Car");
		if(t.getDeclaredFields().length < 2 && t.getSuperclass().getDeclaredFields().length < 2)
			fail("Not proper number of the fields");
	}
	
	@Test
	public void testCarCompareTo() throws Exception {
		Car c1 = new Car("Dacia", 100, "red", 1600); 
		Car c2 = new Car("Dacia", 100, "red", 1600);
		if(c1.compareTo(c2) != 0) {
			fail("The compareTo method is not correct implemented!");
		}
		c2.setCapacity(1800);
		if(c1.compareTo(c2) != -1) {
			fail("The compareTo method is not correct implemented!");
		}
	}
	
	@Test
	public void testCarClone() throws Exception {
		Car c1 = new Car("Dacia", 100, "red", 1600);
		c1.setColor("black");
		Car c2 = (Car) c1.clone();
		c2.setColor("white");

		assertNotSame(c1, c2);
	}
	
}

