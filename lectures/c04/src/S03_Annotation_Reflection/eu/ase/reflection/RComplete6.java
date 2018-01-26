package eu.ase.reflection;

import java.lang.reflect.*;
        
public class RComplete6 {
    public static void main(String args[])
    {
        try {
		   //obtaining class
           Class cls = Class.forName(args[0]);
           //obtaining constructor with 1 String parameter
		   Class partypes[] = new Class[1];
           partypes[0] = new String("").getClass();//Integer.TYPE;
           Constructor ct = cls.getConstructor(partypes);

           //A. CREATING INSTANCES
		   //creating TString object 1
		   Object arglist[] = null;
		   arglist = new Object[1];
           arglist[0] = new String("Ion merge la piata.");
           Object ts1 = ct.newInstance(arglist);
		   //creating TString object 2
		   arglist = new Object[1];
           arglist[0] = new String("O fraza.");
           Object ts2 = ct.newInstance(arglist);

		   //B. INVOKING METHODS
		   Class partypesm[] = new Class[1];
           partypesm[0] = ts2.getClass();
           Method meth = cls.getMethod("concatenate", partypesm);
           Object arglistm[] = new Object[1];
           arglistm[0] = ts2;//new TString(...)
           ts1 = meth.invoke(ts1, arglistm);
           
           System.out.println(ts1.toString());
		   
		   //C. Changing value of fields
		   TString tx = (TString)ts1;
		   Field fld = cls.getField("length"); //generates exception because of private
		   System.out.println("!!! private - tx.length = " + tx.getLength());
           fld.setInt(tx, 20);
           System.out.println("!!! private - tx.length = " + tx.getLength());


        }
        catch (Throwable e) {
            System.err.println(e);
        }
    }
}
