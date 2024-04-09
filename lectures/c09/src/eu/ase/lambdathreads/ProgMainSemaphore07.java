package eu.ase.lambdathreads;

import java.util.concurrent.Semaphore;

public class ProgMainSemaphore07 {
   // max 4 people on 4 ATMs
   static Semaphore semaphore = new Semaphore(4);

   public static void main(String[] args) {
	System.out.println("Total available Semaphore permits : "
				+ semaphore.availablePermits());
	Runnable taskATM = () -> {
	   try {
		System.out.println(Thread.currentThread().getName() 
			+ " : acquiring lock...");

		System.out.println(Thread.currentThread().getName() + " : available Semaphore permits now: "
			+ semaphore.availablePermits());

		semaphore.acquire();
		System.out.println(Thread.currentThread().getName() + " : got the permit!");

		try {
			for (int i = 1; i <= 5; i++) {
		 	   System.out.println(Thread.currentThread().getName() + " : is performing operation " + i
				+ ", available Semaphore permits : "
				+ semaphore.availablePermits());

				// sleep 1 second
				Thread.sleep(1000);
			}
		} finally {

			// calling release() after a successful acquire()
			System.out.println(Thread.currentThread().getName() + " : releasing lock...");
			semaphore.release();
			System.out.println(Thread.currentThread().getName() + " : available Semaphore permits now: "
						+ semaphore.availablePermits());

		}
	   } catch (InterruptedException e) { e.printStackTrace(); }
	};

	Thread t1 = new Thread(taskATM, "A");
	t1.start();

	Thread t2 = new Thread(taskATM, "B");
	t2.start();

	Thread t3 = new Thread(taskATM, "C");
	t3.start();

	Thread t4 = new Thread(taskATM, "D");
	t4.start();

	Thread t5 = new Thread(taskATM, "E");
	t5.start();

	Thread t6 = new Thread(taskATM, "F");
	t6.start();
    } // end main method
} // end main class
