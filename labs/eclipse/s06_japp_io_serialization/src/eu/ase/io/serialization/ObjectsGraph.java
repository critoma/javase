package eu.ase.io.serialization;

import java.io.Serializable;
import java.net.URL;

public class ObjectsGraph implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -689547391845626872L;
	public URL o1;
	public URL o2;
	
	public ObjectsGraph(URL o1, URL o2) {
		this.o1 = o1;
		this.o2 = o2;
	}
	
	@Override
	public String toString() {
		return new String("o1 = " + this.o1 
				+ ", o2 = " + this.o2);
	}
}
