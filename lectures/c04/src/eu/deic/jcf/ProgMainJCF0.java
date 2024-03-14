package eu.deic.jcf;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.ArrayList;
import java.util.HashMap;

class Human {
	private int ssn; // cnp; <=> social security number
	public Human(int cnp) {
		this.ssn = cnp;
	}
	void print() {
        System.out.println("Human - ssn:" + this.ssn);
    }
	public int getSsn() { return ssn; }
}

class Student extends Human {
	private int group;
	public Student(int cnp, int group) {
		super(cnp);
		this.group = group;
	}
	void print() {
        System.out.println("Student - ssn:" + this.getSsn() + ", group = " + group);
    }
}

class Patient extends Human implements Cloneable {
    private int id;
    private String name;
    
    public Patient(int cnp, int idPatient, String name) {
    	super(cnp);
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
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Patient other = (Patient) obj;
		if (id != other.id)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "eu.deic.jcf.Patient@" + this.hashCode() + ", Patient [id=" + id + ", name=" + name + "]";
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
		// PLEASE draw the abstract memory layout:
		
		// clone:
		Patient objP1 = new Patient(1, 12, "Ion");
		Patient objP2 = new Patient(2, 15, "Dan");
		try {
			objP2 = (Patient) objP1.clone();
			objP1.print();
			objP2.print();
			if (objP1 == objP2)
				System.out.println("== true");
			if (objP1.equals(objP2))
				System.out.println("equals true objP1 = " + objP1 + ", objP2 = " + objP2);
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		// runtime/"pure" poly-morphism:
		Human objh = null;
		objh = new Student(1, 1003);
		objh.print();
		// 1000 lines of code:
		objh = new Patient(7, 22, "Ana");
		objh.print();
		
		// class cast exception:
		Human human5 = null;
		Human student5 = new Student(55, 1003);
		human5 = student5;
		try {
			Patient patient5 = (Patient) human5;
			patient5.print();
		} catch (ClassCastException cce) {
			cce.printStackTrace();
		}
		
		
		// JCF - Java Collection Framework:
		List<Patient> listP = new ArrayList<>();
		// List<Patient> listP = new LinkedList<Patient>(); 
		
        for(int i = 0; i < 5; i++) 
        	listP.add(new Patient(100+i, 200+i, "Location "+i));
        
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
        	List<Patient> plv = ((List<Patient>) ((ArrayList<Patient>) (listP) ).clone());
        	// List<Patient> plv = ((List<Patient>) ((LinkedList<Patient>) (listP) ).clone());
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
