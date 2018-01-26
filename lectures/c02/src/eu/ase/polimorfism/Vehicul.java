package eu.ase.polimorfism;

public class Vehicul implements IMiscare {
    private int greutate;
    
    public Vehicul() {
        this.greutate = 0;
    }
    
    public Vehicul(int gr) {
        this.greutate = gr;
    }
    
    public int getGreutate() {
        return this.greutate;
    }
    
    public void setGreutate(int greutate) {
        this.greutate = greutate;
    }    
    
    public String pornesteMotor() {
        return new String("Vehicul - porneste motor");
    }    
    
    public String opresteMotor() {
        return new String("Vehicul - opreste motor");
    }
    
    public String afis() {
        String rez = new String("Vehicul - greutate="+this.greutate);
        return rez;
    }
}
