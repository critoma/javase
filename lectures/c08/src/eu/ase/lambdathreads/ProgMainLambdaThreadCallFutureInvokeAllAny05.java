package eu.ase.lambdathreads;

import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.Callable;
import java.util.concurrent.Future;
import java.util.concurrent.ExecutionException;
import java.util.Arrays;
import java.util.List;


public class ProgMainLambdaThreadCallFutureInvokeAllAny05 {

	public static Callable<String> callable(String result, long sleepSeconds) {
	    return () -> {
		TimeUnit.SECONDS.sleep(sleepSeconds);
		return result;
	    };
	}	

	public static void main(String[] args) {

		ExecutorService executor = Executors.newWorkStealingPool();

		List<Callable<String>> callables = Arrays.asList(
			() -> "All task1",
			() -> "All task2",
			() -> "All task3");
		
		// invoke all
		try {
		    executor.invokeAll(callables)
		    .stream()
		    .map(future -> {
			try {
			    return future.get();
			}
			catch (Exception e) {
			    throw new IllegalStateException(e);
			}
		    })
		    .forEach(System.out::println);
		} catch (InterruptedException e) {
		    System.err.println("tasks all interrupted");
		}

		// invoke any
		List<Callable<String>> callablesAny = Arrays.asList(
		    callable("Any task1", 2),
		    callable("Any task2", 1),
		    callable("Any task3", 3));

		try {
			String result = executor.invokeAny(callablesAny);
			System.out.println(result);

			// => task2
		} catch (InterruptedException e) {
		    System.err.println("tasks any interrupted");
		} catch (ExecutionException ee) {
		    ee.printStackTrace();
		}


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

		System.out.println("Done!");

	} // end main
} //end class
