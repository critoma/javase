package eu.ase.polimorfism;

public class Avion extends Vehicul {
    private int capacitate;
    private float nrMotoare;
    
    public Avion() {
        this.capacitate = 0;
        this.nrMotoare = 0;
    }
    
    public Avion(int g, int capacit, float nrm) {
        super(g);
        this.capacitate = capacit;
        this.nrMotoare = nrm;
    }

    public int getCapacitate() {
        return capacitate;
    }

    public void setCapacitate(int capacitate) {
        this.capacitate = capacitate;
    }

    public float getNrMotoare() {
        return nrMotoare;
    }

    public void setNrMotoare(float nrMotoare) {
        this.nrMotoare = nrMotoare;
    }
    
    public String afis() {
        return "Avion::afis() , greutate="+this.getGreutate()+" , capacitate="+this.capacitate+" , nrMotoare="+this.nrMotoare; 
    }
}
