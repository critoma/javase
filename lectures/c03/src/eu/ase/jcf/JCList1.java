package eu.ase.jcf;

import java.lang.*;
import java.util.*;

class Mar {
 private int nr;
 Mar(int i) { this.nr = i;}
 void print() {System.out.println("Mar @ "+this.nr);}
}

class Para {
 private float nr;
 Para(float i) { this.nr = i;}
 void print() {System.out.println("Para @ "+this.nr);}
}

class ProgMainC {
 public static void main(String[] args) {
   //List<Mar> mere = new ArrayList<Mar>();
   List<Mar> mere = new Vector<Mar>();
   for(int i = 0; i < 9; i++)
     mere.add(new Mar(i));

   //mere.add(new Para(10));

   //for(int i = 0; i < 10; i++) ((Mar)mere.get(i)).print();
	 //for(Object o : mere) ((Mar)o).print();

	for(Mar o : mere) o.print();

	 for(Iterator<Mar> it = mere.iterator(); it.hasNext(); ) 
	 {
		 Mar m = it.next();//putea fi if(!conditie(it.next()))it.remove();
		 m.print();
	 }

	//doar daca mere este Vector<Mar> atunci 
	//for (Enumeration<E> e = mere.elements(); mere.hasMoreElements();)
	//       System.out.println(e.nextElement());

 }
}