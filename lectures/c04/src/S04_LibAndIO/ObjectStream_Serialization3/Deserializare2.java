import java.io.*;


//cu totul alta clasa din punct de vedere - signatura clasei
class ObiectSimplu implements Serializable {
 public static int n1;
 public String nume = "implicit";
 private transient int n2;
 public transient int n3;
 public int n4;
 public int n5 = 0; //camp adaugat in noua versiune

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
  System.out.println("Alta clasa dar acelasi obiect");
 }
}

class RefacereObiect {

  public static void main(String[] args) {
   try {
    ObiectSimplu o = null;
    FileInputStream fin = new FileInputStream("test2.txt");
    ObjectInputStream sin = new ObjectInputStream(fin);

    o = (ObiectSimplu)sin.readObject();

    System.out.println("S-a citit obiectul:"+o);
    o.afisare();
    sin.close();
    fin.close();
   }
   catch(IOException e) {
    e.printStackTrace();
   }
   catch(ClassNotFoundException e2) {
    e2.printStackTrace();
   }
  }
}
