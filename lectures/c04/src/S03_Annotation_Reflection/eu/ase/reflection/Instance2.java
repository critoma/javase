package eu.ase.reflection;

import java.lang.reflect.*;

public class Instance2 {
      public static void main(String args[])
      {
        try {
            Class cls = Class.forName("eu.ase.reflection.TString");
            Integer i = new Integer(37);
			boolean b1 = cls.isInstance(i);
            System.out.println(b1);
			TString t = new TString();
            boolean b2 = cls.isInstance(t);
            System.out.println(b2);
        }
        catch (Throwable e) {
            System.err.println(e);
        }
      }
   }
