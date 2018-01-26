package eu.ase.lambdathreads;

// https://www.mkyong.com/java/java-thread-mutex-and-semaphore-example/

import java.util.concurrent.Semaphore;

public class ProgMainSemaphore08 {
   // max 4 people on the 4 ATMs cubical
   static Semaphore semaphore = new Semaphore(4);

   // max 1 people in the bank locker room
   static Semaphore semaphoreLocker = new Semaphore(1);

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

        // #####################################################
	try { Thread.sleep(20000); } catch(InterruptedException ie) {ie.printStackTrace();}
	System.out.println("#####################################################");
        System.out.println("Total available Semaphore permits : "
				+ semaphoreLocker.availablePermits());
	Runnable taskLocker = () -> {
	   try {
		System.out.println(Thread.currentThread().getName() 
			+ " : acquiring lock...");

		System.out.println(Thread.currentThread().getName() + " : available Semaphore permits now: "
			+ semaphoreLocker.availablePermits());

		semaphoreLocker.acquire();
		System.out.println(Thread.currentThread().getName() + " : got the permit!");

		try {
			for (int i = 1; i <= 5; i++) {
		 	   System.out.println(Thread.currentThread().getName() + " : is performing operation " + i
				+ ", available Semaphore permits : "
				+ semaphoreLocker.availablePermits());

				// sleep 1 second
				Thread.sleep(1000);
			}
		} finally {

			// calling release() after a successful acquire()
			System.out.println(Thread.currentThread().getName() + " : releasing lock...");
			semaphoreLocker.release();
			System.out.println(Thread.currentThread().getName() + " : available Semaphore permits now: "
						+ semaphoreLocker.availablePermits());

		}
	   } catch (InterruptedException e) { e.printStackTrace(); }
	};

	Thread tL1 = new Thread(taskLocker, "TL_A");
	tL1.start();

	Thread tL2 = new Thread(taskLocker, "TL_B");
	tL2.start();

	Thread tL3 = new Thread(taskLocker, "TL_C");
	tL3.start();

	Thread tL4 = new Thread(taskLocker, "TL_D");
	tL4.start();

	Thread tL5 = new Thread(taskLocker, "TL_E");
	tL5.start();

	Thread tL6 = new Thread(taskLocker, "TL_F");
	tL6.start();

    } // end main method
} // end main class
