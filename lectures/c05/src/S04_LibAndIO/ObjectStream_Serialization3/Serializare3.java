import java.io.*;

class ObiectSimplu implements Serializable {
 public static int n1;
 public String nume = "implicit";
 private transient int n2;
 public transient int n3;
 public int n4;

 public ObiectSimplu(String nume, int n1, int n2, int n3, int n4) {
  this.nume = nume;
  this.n1 = n1;
  this.n2 = n2;
  this.n3 = n3;
  this.n4 = n4;
 }

 public String toString() {
  return new String("Nume = "+nume+", n1="+n1+", n2="+n2+", n3="+n3+", n4="+n4);
 }

 public void afisare() {
  System.out.println("Obiectul meu");
 }
}


class SalvareObiect {

  public static void main(String[] args) {
   try {
    ObiectSimplu o = new ObiectSimplu("Obiectul meu",10,20,30,40);
    FileOutputStream fout = new FileOutputStream("test3.txt");
    ObjectOutputStream sout = new ObjectOutputStream(fout);

    sout.writeObject(o);

    System.out.println("S-a scris obiectul:"+o);
    o.afisare();
    sout.close();
    fout.close();
   }
   catch(IOException e) {
    e.printStackTrace();
   }
  }
}
