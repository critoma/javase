package testing;

import static org.junit.Assert.*;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;


import java.lang.reflect.*;
import org.junit.Test;

import eu.ase.poly.Auto;
import eu.ase.poly.Plane;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class JUnitEvaluation {

	@Test
	public void _310testInfoClassVehicle_mark3() throws Exception {
		Class<?> t = Class.forName("eu.ase.poly.Vehicle");
		if(t.getDeclaredFields().length < 1)
			fail("Not proper number of the fields");
		for (Field f : t.getDeclaredFields()) {
			try {
	            //assertNotNull(f);
				System.out.println("Vehicle field: " + f.toString());
	            assertTrue("The field " + f.toString() + " is private",  Modifier.isPrivate(f.getModifiers()));
	            if (f.getName().compareTo("weight") == 0)
	            	assertEquals("The 'weight' is type int", int.class, f.getType());
	        } catch (Exception nsfe) {
	            fail("The field "+f.toString()+" has problems in class Auto.");
	        }
		}
	}
	
	@Test
	public void _311testInfoClassAuto_mark3() throws Exception {
		Class<?> t = Class.forName("eu.ase.poly.Auto");
		if(t.getDeclaredFields().length < 2)
			fail("Not proper number of the fields");
		for (Field f : t.getDeclaredFields()) {
			try {
	            //assertNotNull(f);
				System.out.println("Auto field: " + f.toString());
	            assertTrue("The field " + f.toString() + " is private",  Modifier.isPrivate(f.getModifiers()));
	            if (f.getName().compareTo("noCars") == 0)
	            	assertEquals("The 'noCars' is type int", int.class, f.getType());
	            if (f.getName().compareTo("noDoors") == 0)
	            	assertEquals("The field 'noDoors' is int", String.class, f.getType());
	        } catch (Exception nsfe) {
	            fail("The field "+f.toString()+" has problems in class Auto.");
	        }
		}
	}
	
	@Test
	public void _312testInfoClassPlane_mark3() throws Exception {
		Class<?> t = Class.forName("eu.ase.poly.Plane");
		if(t.getDeclaredFields().length < 2)
			fail("Not proper number of the fields");
		for (Field f : t.getDeclaredFields()) {
			try {
	            //assertNotNull(f);
				System.out.println("Plane field: " + f.toString());
	            assertTrue("The field " + f.toString() + " is private",  Modifier.isPrivate(f.getModifiers()));
	            if (f.getName().compareTo("weight") == 0)
	            	assertEquals("The 'weight' is type int", int.class, f.getType());
	            if (f.getName().compareTo("capacity") == 0)
	            	assertEquals("The 'capacity' is type float", float.class, f.getType());
	            if (f.getName().compareTo("enginesNo") == 0)
	            	assertEquals("The 'enginesNo' is type int", int.class, f.getType());
	        } catch (Exception nsfe) {
	            fail("The field "+f.toString()+" has problems in class AutonomousCar.");
	        }
		}
	}
	
	@Test
	public void _313testAutoSetDoorsNoLt0_mark3() throws Exception {
		Auto a = new Auto();
		System.out.println("Auto test313 display = " + a.display());
		
		try {
			a.setDoorsNo(-5);
			fail("setDoorsNo accepts negative values - it MUST NOT");
		} catch (Exception ert) {

		}
	}
	
	@Test
	public void _314testPlaneSetCapacityNoLt0_mark3() throws Exception {
		Plane p = new Plane();
		System.out.println("Plane test314 display = " + p.display());
		
		try {
			p.setCapacity(-7);
			fail("setCapacity accepts negative values - it MUST NOT");
		} catch (Exception ert) {

		}
	}

	@Test
	public void _315testAutoClone_mark3() throws Exception {
		Auto a1 = new Auto();
		a1.setDoorsNo(4);
		Auto a2 = (Auto) a1.clone();
		a2.setDoorsNo(4);

		assertNotSame(a1, a2);
		if (a1.getWeight() != a2.getWeight()) {
			fail("clone not correct implemented");
		}
		if (a1.getDoorsNo() != a2.getDoorsNo()) {
			fail("clone not correct implemented");
		}
		
	}

}
