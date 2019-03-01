package eu.ase.jcf;

public class Plane implements Comparable<Plane>, Cloneable {
	private int idPlane;
	private String type;
	private float capacity;
	
	public Plane(int idPlane, String type, float capacity) {
		this.idPlane = idPlane;
		this.type = type;
		this.capacity = capacity;
	}
	
	public void print() {
		System.out.println("Plane - id = " + this.idPlane +
				", type = " + this.type + ", capacity = "+this.capacity);
	}
	
	@Override
	public int compareTo(Plane p) {
		if (this.idPlane == p.idPlane)
			return 0;
		else if(this.idPlane > p.idPlane)
			return 1;
		else
			return -1;
	}
	
	@Override
	public boolean equals(Object o) {
        if (!(o instanceof Plane))
            return false;
        Plane p = (Plane) o;
        return p.type.equals(this.type) &&
               (p.capacity == this.capacity) &&
               (p.idPlane == this.idPlane);
    }

	@Override
    public Object clone() throws CloneNotSupportedException {
		//super.clone(); //ar fi fost eroare la executie daca clasa mea nu declara "implements Clonable"
		Plane newOb = (Plane) super.clone(); //nu se recomanda alocare cu "new", conform specificatiilor
		//nu este cazul, se face doar pentru obiecte "mutable"
		//if (this.type != null) newOb.type = (String) this.type.clone();
		
		if (this.type != null) newOb.type = (String) this.type;
		
		newOb.capacity = this.capacity;
		newOb.idPlane = this.idPlane;
	
		return newOb;
    }

	@Override
    public int hashCode() {
        return 31*31*idPlane + 31*type.hashCode() + (int)capacity;
    }

	@Override
    public String toString() {
    		return (idPlane + ", " + type + ", " + capacity + " @ "+this.hashCode());
    }

}
