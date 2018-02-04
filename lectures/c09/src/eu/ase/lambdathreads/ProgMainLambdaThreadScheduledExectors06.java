package eu.ase.lambdathreads;

import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.Callable;
import java.util.concurrent.Future;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.time.Instant;

public class ProgMainLambdaThreadScheduledExectors06 {
	
    private static void test1() throws InterruptedException {

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);

        Runnable task = () -> System.out.println("Scheduling: " + System.nanoTime() + ", Now = " + Instant.now());
	
        int delay = 3;
        ScheduledFuture<?> future = executor.schedule(task, delay, TimeUnit.SECONDS);

        TimeUnit.MILLISECONDS.sleep(1337);

        long remainingDelay = future.getDelay(TimeUnit.MILLISECONDS);
        System.out.printf("Remaining Delay: %sms\n", remainingDelay);

        TimeUnit.MILLISECONDS.sleep(10000);

	shutDown(executor);

    }

    private static void test2() {
        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
        Runnable task = () -> System.out.println("Scheduling at fixed rate: " + System.nanoTime() + ", Now = " + Instant.now());
        int initialDelay = 0;
        int period = 1;

	try {
           executor.scheduleAtFixedRate(task, initialDelay, period, TimeUnit.SECONDS);
           TimeUnit.MILLISECONDS.sleep(10000);
	} catch (InterruptedException e) {
                System.err.println("task interrupted");
        }

	shutDown(executor);
    }

    private static void test3() {
        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);

        Runnable task = () -> {
            try {
                TimeUnit.SECONDS.sleep(2);
                System.out.println("Scheduling with fixed delay: " + System.nanoTime() + ", Now = " + Instant.now());
            }
            catch (InterruptedException e) {
                System.err.println("task interrupted");
            }
        };

	try {
            executor.scheduleWithFixedDelay(task, 0, 1, TimeUnit.SECONDS);
            TimeUnit.MILLISECONDS.sleep(10000);
	} catch (InterruptedException e) {
                System.err.println("task interrupted");
        }

	shutDown(executor);
    }


    private static void shutDown(ExecutorService executor) {
	// executor shutdown
		try {
		    System.out.println("attempt to shutdown executor");
		    executor.shutdown();
		    executor.awaitTermination(5, TimeUnit.SECONDS);
		}
		catch (InterruptedException e) {
		    System.err.println("tasks interrupted");
		}
		finally {
		    if (!executor.isTerminated()) {
			System.err.println("cancel non-finished tasks");
		    }
		    executor.shutdownNow();
		    System.out.println("shutdown finished");
		}

    }

    public static void main(String[] args) {
	try {
		test1(); 
	} catch (InterruptedException e) {
                System.err.println("task interrupted");
        }
	test2();
	test3();
		
	System.out.println("Done!");

    } // end main

} //end class
