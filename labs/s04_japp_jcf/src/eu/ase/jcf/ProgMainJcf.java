package eu.ase.jcf;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.Vector;

public class ProgMainJcf {
	public static void main(String[] args) {
		//List<Plane> listPlanes = new Vector<Plane>(10);
		//List<Plane> listPlanes = new ArrayList<Plane>();
		List<Plane> listPlanes = new LinkedList<Plane>();
		
		System.out.println("size / capacity = " + listPlanes.size());
	
		for(int i = 0; i < 20; i++) {
			listPlanes.add(new Plane(101 + i, "Airbus " + i, 500.0f));
		}
		System.out.println("size / capacity = " + listPlanes.size());
		
		Plane temp = null;
		for(Iterator<Plane> it = listPlanes.iterator(); it.hasNext();) {
			temp = it.next();
			temp.print();
		}
		
		Map<Plane, Country> treeMap = new TreeMap<Plane, Country>();
		//Map<Plane, Country> treeMap = new Hashtable<Plane, Country>();
		for(int i = 0; i < 7; i++) {
			Plane pk = new Plane(201 + i, "Airbus " + (i*10), 351.0f + i);
			Country cv = new Country(701 + i, "Country " + i);
			
			treeMap.put(pk, cv);
		}
		
		//System.out.println(treeMap);
        Set<Plane> s = treeMap.keySet();
        Iterator<Plane> itp = s.iterator();
        for(;itp.hasNext();) {
        		Plane pk = itp.next();
            Country cvalue = treeMap.get(pk);
            pk.print(); 
            cvalue.print();
        }
		
	}
}
