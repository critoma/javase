package eu.ase.threads;

class SampleThread extends Thread {
  String message;
  public SampleThread(String m) {this.message = m;}
  public void run() {
     for (int i = 0; i < 100; i++) {
       System.out.println(this.message);
       this.yield();
     }
  }
}


public class ProgMainPriority {
  public static void main(String[] args) {
   SampleThread f1 = new SampleThread("f1");
   SampleThread f2 = new SampleThread("f2");

    Thread curent = Thread.currentThread();
    f1.setPriority(curent.getPriority() - 1);
    f2.setPriority(curent.getPriority() + 3);    
    f1.start();
    f2.start();
 } 
}

