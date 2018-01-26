import java.util.*;

//orice clasa se recomanda sa fie "immutable" 
class Name implements Comparable<Name>, Cloneable {
    //private final String firstName, lastName;//daca erau final nu se putea utiliza metode de tip "set"
    private String firstName;
    private String lastName;

    public Name(String firstName, String lastName) {
        if (firstName == null || lastName == null)
            throw new NullPointerException();
	this.firstName = firstName;//daca nu era "String" (clasa immutable) se obtinea immutable prin
        this.lastName = lastName;  // this.firstName = new String(firstName);
    }

    public String getFirstName() { return firstName; }
    public void setFirstName(String fn) { this.firstName = fn; }
    public String getLastName()  { return lastName;  }
    public void setLastName(String ln)  { this.lastName = ln;  }

    public boolean equals(Object o) {
        if (!(o instanceof Name))
            return false;
        Name n = (Name)o;
        return n.firstName.equals(firstName) &&
               n.lastName.equals(lastName);
    }

    public Object clone() throws CloneNotSupportedException {
	//super.clone(); //ar fi fost eroare la executie daca clasa mea nu declara "implements Clonable"
	Name newOb = (Name)super.clone(); //nu se recomanda alocare cu "new", conform specificatiilor
	//nu este cazul, se face doar pentru obiecte "mutable"
	//if (this.firstName != null) newOb.firstName = (String)this.firstName.clone();
	//if (this.lastName != null) newOb.lastName = (String)this.lastName.clone();

	if (this.firstName != null) newOb.firstName = this.firstName;
	if (this.lastName != null) newOb.lastName = this.lastName;

	return newOb;
    }

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


class NameSort {
    public static void main(String[] args) {
	Name n1 = new Name("Badea", "Vasile");
	Name n2 = new Name("Badea", "Ion");
	Name n3 = null;

	try { n3 = (Name)n1.clone(); } catch(CloneNotSupportedException cnse) {cnse.printStackTrace();} 
	
	n3.setFirstName("Iona");
	System.out.println("n1="+n1+" , n3="+n3);
	n1.setFirstName("Iona");
	System.out.println("n1="+n1+" , n3="+n3);
	
	if (n1 == n3) System.out.println("cucu");
	if (n1.equals(n3)) System.out.println("este egal");

        Name nameArray[] = {
            new Name("John", "Lennon"),
            new Name("Karl", "Marx"),
            new Name("Groucho", "Marx"),
            new Name("Oscar", "Grouch")
        };
        List<Name> names = Arrays.asList(nameArray);
        Collections.sort(names);
        System.out.println(names);
    }
}

class Angajat {
  private Name nume;
  private Date dataA;

  public Angajat(String firstName, String lastName, Date dA) {
	this.nume = new Name(firstName, lastName);
	this.dataA = dA;
  }

  public Name getNume() {
  	return this.nume;
  }

  public Date getDataA() {
  	return this.dataA;
  }

  public String toString() {
	return new String(" Name="+this.nume+" , Data Angajarii="+this.dataA);
  }
}

class MyComparator implements Comparator<Angajat> {
  public int compare(Angajat a1, Angajat a2) {
	return a1.getDataA().compareTo(a2.getDataA());
  }
}


class NameSort2 {
    public static void main(String[] args) {
	MyComparator mya = new MyComparator();
        Angajat aArray[] = {
            new Angajat("John", "Lennon", new Date(435263625)),
            new Angajat("Karl", "Marx", new Date(335263625)),
            new Angajat("Groucho", "Marx", new Date(235263625)),
            new Angajat("Oscar", "Grouch", new Date(135263625))
        };
        List<Angajat> al = Arrays.asList(aArray);
        Collections.sort(al, mya);
        System.out.println(al);
    }
}