package eu.ase.threads;

//este OK afisajul deoarece System.out.println este in metodele sincronizate inainte de notificari
class Producer extends Thread {
    private int idP;//numar identificare producator
    private MarketProduct market;//piata in care se desfasoara tranzactiile
    
    public Producer(int idProducer, MarketProduct market) {
        this.idP = idProducer;
        this.market = market;
    }
    
    public void run() {
        for (int i = 1; i < 10; i++) {
              market.sell(i, idP); //se vinde pe piata    
            try {this.sleep((int)(Math.random()*100));} catch(InterruptedException ie) {ie.printStackTrace();}
        }
    }
}

class Consumer extends Thread {
    private int idC;//numar identificare consumator
    private MarketProduct market;
    
    public Consumer(int idConsumer, MarketProduct market) {
        this.idC = idConsumer;
        this.market = market;
    }
    
    public void run() {
        for (int i = 1; i < 10; i++) {
            market.buy(idC); //se cumpara pe piata
            try {this.sleep((int)(Math.random()*100));} catch(InterruptedException ie) {ie.printStackTrace();}
        }
    }
}

class MarketProduct {
    private volatile int cantitate;
    private volatile boolean disponibil = false;

    public synchronized void buy(int id) {
        //if (!this.disponibil) {
        while (!this.disponibil) {
            try {this.wait();} catch(InterruptedException ie) {ie.printStackTrace();}
        }
        System.out.println("Consumer: "+id+" cumpara de pe piata (din produsul x):"+cantitate);
        this.disponibil = false;
        this.notify();
    }
    
    public synchronized void sell(int quantity, int id) {
        //if (disponibil) {
        while (disponibil) {
            try {this.wait();} catch(InterruptedException ie) {ie.printStackTrace();}
        }
        this.cantitate = quantity;
	System.out.println("Producer: "+id+" vinde pe piata (din produsul x):"+cantitate);
        this.disponibil = true;
        this.notify();
    }
}

class ProducatorConsumator {
    public static void main(String[] args) {
        MarketProduct m = new MarketProduct();
        Producer p1 = new Producer(1, m);
        Consumer c1 = new Consumer(1, m);
        //Producer p2 = new Producer(2, m);
        //Consumer c2 = new Consumer(2, m);
        
        p1.start();
        c1.start();
        
        //p2.start();
        //c2.start();//acum apare regiune critica pe buy() si sell()
        //pt a functiona corect este normal ca in obiectul comun sa se puna
        //boolean disponibil[] - vector (un element din vector este - (NU ESTE "semafor")-
	//vector de variabile mutex de sincronizare)
        //sau bucla while pt. ca notifyAll() nu se stie ce fir "trezeste"
        
        //asteapta sa se termine firul obiectului apelator c1
        //try {c1.join();} catch(InterruptedException ie) {ie.printStackTrace();}
        
        System.out.println("Gata fir principal");
    }
}