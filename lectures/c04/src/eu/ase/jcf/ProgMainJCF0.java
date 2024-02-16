package eu.ase.jcf;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

class Patient implements Cloneable {
    private int id;
    private String name;
    
    public Patient(int idPatient, String name) {
        id = idPatient;
        this.name = name;
    }
    void print() {
        System.out.println("Patient - id:" + this.id + " has name: " + this.name + " and this obj: " + this);
    }
    @Override
	protected Object clone() throws CloneNotSupportedException {
		Patient c = (Patient)super.clone();
		c.id = this.id;
		c.name = this.name;
		return c;
	}
    
}

class Hospital implements Comparable<Hospital> {
    private int id;
    private int capacityNoBeds;
    private int noDoctors;
    private String location;
    
    public Hospital(int id, int noBeds, int noDoctors, String location) {
        this.id = id; 
        this.capacityNoBeds = noBeds;
        this.noDoctors = noDoctors;
        this.location = location;
    }
    public int compareTo(Hospital h) {
        if(this.id < h.id)
            return 1;
        else if(this.id > h.id)
            return -1;
        
        return 0;
    }
    void print() {
        System.out.println("Hospital @ "+this.id + ", noBeds = " + this.capacityNoBeds 
        		+ ", noDoctors = " + this.noDoctors + ", location = " + location);
    }
}

public class ProgMainJCF0 {

	public static void main(String[] args) {
		List<Patient> listP = new LinkedList<Patient>();
        for(int i = 0; i < 5; i++) 
        	listP.add(new Patient(200+i, "Location "+i));
        
        System.out.println("Normal iteration:");
        for(int i = 0; i < listP.size(); i++) {
            Patient pTemp = null;
            pTemp = listP.get(i);
            pTemp.print();
        }
        System.out.println("for-each iteration:");
        for(var pTemp : listP) {
        	pTemp.print();
        }
        System.out.println("Iteration with iterator object:");
        for(Iterator<Patient> it = listP.iterator(); it.hasNext();) {
            Patient pTemp = it.next();
            pTemp.print();
        }   
        
        Map<Hospital, List<Patient>> arb = new TreeMap<Hospital, List<Patient>>(); 
        // Map<Hospital, List<Patient>> arb = new HashMap<Hospital, List<Patient>>(); 
        for(int i = 0; i < 7; i++) {
        	Hospital hk = new Hospital(200+i, 100, 30, "Location: " + i);
        	//List<Patient> plv = listP.subList(0, listP.size());
        	
        	@SuppressWarnings("unchecked")
			List<Patient> plv = ((List<Patient>) ((LinkedList<Patient>) (listP) ).clone());
        	for(var idx = 0; idx < plv.size(); idx++) {
                Patient pTemp = null;
				try {
					pTemp = (Patient)listP.get(idx).clone();
				} catch (CloneNotSupportedException e) {
					e.printStackTrace();
				}
                plv.set(idx, pTemp);
            }
            arb.put(hk, plv);
        }
        
        System.out.println("\n\nPrint associative data structure:");    
        System.out.println(arb);
        Set<Hospital> s = arb.keySet();
        Iterator<Hospital> ith = s.iterator();
        for(;ith.hasNext();) {
            Hospital hk = ith.next();
            List<Patient> plvalue = arb.get(hk);
            hk.print(); 
            for(var objP : plvalue) 
            	objP.print();
        }
	} // end main method

} // end main class
