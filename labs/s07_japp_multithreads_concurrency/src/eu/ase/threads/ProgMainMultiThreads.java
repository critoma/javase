package eu.ase.threads;

class ThreadNonSynch extends Thread {
	
	private static int a = 0;
	private static int b = 0;
	
	public ThreadNonSynch(String tName) {
		super(tName);
	}
	
	public void myMethod() {
		System.out.println("Thread = "+this.getName()+" ; a = "+a+" , b = "+b);
		a++;
		try {
			sleep((int)Math.random() * 1000);
		} catch(InterruptedException iex) {
			iex.printStackTrace();
		}
		b++;
	}
	
	@Override
	public void run() {
		for(int i = 0; i < 3; i++) {
			this.myMethod();
		}
	}
}

class ThreadSynch extends Thread {

	private static final Object myLock = new Object();
	
	private static int a = 0;
	private static int b = 0;
	
	public ThreadSynch(String tName) {
		super(tName);
	}
	
	//public synchronized void metoda() { //<=>
	//synchronized(this)
	public void myMethod() {
		synchronized(myLock) {
		System.out.println("Thread = "+this.getName()+" ; a = "+a+" , b = "+b);
		a++;
		try {
			//sleep((int)Math.random() * 1000);
			sleep(500L);
		} catch(InterruptedException iex) {
			iex.printStackTrace();
		}
		b++;
		} //end synch
	}
	
	@Override
	public void run() {
		for(int i = 0; i < 3; i++) {
			this.myMethod();
		}
	}
}

public class ProgMainMultiThreads {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
			//ThreadNonSynch f1 = new ThreadNonSynch("f1");
			//ThreadNonSynch f2 = new ThreadNonSynch("f2");
		ThreadSynch f1 = new ThreadSynch("f1");
		ThreadSynch f2 = new ThreadSynch("f2");
		
		
			f1.start();
			f2.start();
			System.out.println("Main Program finished!");
	}

}






