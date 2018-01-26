package eu.ase.threads;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ProgMainExecutors2 {
  private static final int NTHREDS = 10;

  public static void main(String[] args) {
    ExecutorService executor1 = Executors.newFixedThreadPool(NTHREDS/2);
    ExecutorService executor2 = Executors.newFixedThreadPool(NTHREDS/2);
    for (int i = 0; i < 500; i++) {
      Runnable worker = new MyRunnable(10000000L + i);
      if(i % 2 == 0)
	executor1.execute(worker);
      else
	executor2.execute(worker);
    }
    // This will make the executor accept no new threads
    // and finish all existing threads in the queue
    executor1.shutdown();
    executor2.shutdown();
    try {
    	// Wait until all threads are finish
    	executor1.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);
    	executor2.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);
    } catch (InterruptedException e) {
	e.printStackTrace();
    }
    System.out.println("Finished all threads");
  }
} 
