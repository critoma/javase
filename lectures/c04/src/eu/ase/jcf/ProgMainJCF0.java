package eu.ase.jcf;

import java.util.*;

class Avion {
    private int nrPasageri;
    public Avion(int nrP) {
        this.nrPasageri = nrP;
    }
    void print() {
        System.out.println("Avion @ "+this.nrPasageri);
    }
}

class PersDetinator implements Comparable<PersDetinator> {
    private int cnp;
    public PersDetinator(int cnp) {
        this.cnp = cnp;
    }
    public int compareTo(PersDetinator p) {
        if(this.cnp < p.cnp)
            return 1;
        else if(this.cnp > p.cnp)
            return -1;
        
        return 0;
    }
    void print() {
        System.out.println("PersDetinator @ "+this.cnp);
    }
}

public class ProgMainJCF0 {
    public static void main(String[] args) {
        //List<Avion> listaavioane = new Vector<Avion>();
        List<Avion> listaavioane = new LinkedList<Avion>();
        for(int i = 0; i < 5; i++) 
            listaavioane.add(new Avion(100+i));
        /*
        for(int i = 0; i < 5; i++) {
            Avion atemp = null;
            atemp = listaavioane.get(i);
            atemp.print();
        }*/
        
        for(Iterator<Avion> it = listaavioane.iterator(); it.hasNext();) {
            Avion atemp = it.next();
            atemp.print();
        }
        
        Map<PersDetinator, Avion> arb = new TreeMap<PersDetinator, Avion>(); //Hashtable
        for(int i = 0; i < 7; i++) {
            PersDetinator pd = new PersDetinator(i+200);
            Avion va = new Avion(i+50);
            arb.put(pd, va);
        }
            
        //System.out.println(arb);
        Set<PersDetinator> s = arb.keySet();
        Iterator<PersDetinator> itp = s.iterator();
        for(;itp.hasNext();) {
            PersDetinator ppk = itp.next();
            Avion aavalue = arb.get(ppk);
            ppk.print(); aavalue.print();
        }
    }
}
