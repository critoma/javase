package eu.ase.polimorfism;

public class Auto extends Vehicul implements IAuto {

    private int nrUsi;

    public Auto () {
        super();
        this.nrUsi = 0;
    }
 
    public Auto (int g, int nrU) {
        super(g);
        this.nrUsi = nrU;
    }

    public int getNrUsi () {
        return this.nrUsi;
    }

    public void setNrUsi (int val) {
        this.nrUsi = val;
    }

    public String toString () {
        String rez = new String("Auto->toString() - greutate: "+this.getGreutate()+" , nrUsi: "+this.nrUsi);
        return rez;
    }

    public String afis () {
        String rez = new String("Auto->toString() - greutate: "+this.getGreutate()+" , nrUsi: "+this.nrUsi);
        return rez;
    }
	
	public void g() {
	}

    public String deschideUsa () {
        return "Auto::deschideUsa()";
    }
}

