package eu.ase.reflection;

import java.lang.reflect.*;
        
public class Constructors4 {       
    public static void main(String args[])
    {
        try {
           Class cls = Class.forName(args[0]);
        
           Constructor ctorlist[] = cls.getDeclaredConstructors();
           for (int i = 0; i < ctorlist.length; i++) {
               Constructor ct = ctorlist[i];
               System.out.println("name = " + ct.getName());
               System.out.println("decl class = " + ct.getDeclaringClass());
               Class pvec[] = ct.getParameterTypes();
               for (int j = 0; j < pvec.length; j++)
                  System.out.println("param #" + j + " " + pvec[j]);
               
	       Class evec[] = ct.getExceptionTypes();
               for (int j = 0; j < evec.length; j++)
                  System.out.println("exc #" + j + " " + evec[j]);
               
	       System.out.println("-----");
            }
          }
          catch (Throwable e) {
             System.err.println(e);
          }
    }
}
