package eu.ase.threads;

import java.time.Duration;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.TimeUnit;

class HelloThread extends Thread {

	public HelloThread(String name) {
		super(name);
	}

	@Override
	public void run() {

		String name = Thread.currentThread().getName();
		System.out.println("Hello " + name);
	}
}

class HelloRunnable extends /* OtherClass */ Object implements Runnable {

	@Override
	public void run() {
		String name = Thread.currentThread().getName();
		System.out.println("Hello " + name);

	}

}

class VirtualThreadsPlayground {
	// https://blog.rockthejvm.com/ultimate-guide-to-java-virtual-threads/
	// MacOS - get CPU cores: sysctl hw.physicalcpu hw.logicalcpu
	// Linux - get CPU: lscpu
	// put in Run cofig: --enable-preview and Java 19
	
	static int numberOfCores() {
		return Runtime.getRuntime().availableProcessors();
	}
	
	static void concurrentMorningRoutineUsingExecutorsWithName() {
		@SuppressWarnings("preview")
		final ThreadFactory factory = Thread.ofVirtual().name("routine-", 0).factory();
		//final ThreadFactory factory = Thread.ofVirtual().factory();
		
		try (@SuppressWarnings("preview")
		var executor = Executors.newThreadPerTaskExecutor(factory)) {
			
			var bathTime = executor.submit(() -> {
				// breakpoint here:
				System.out.printf("\n %s - I'm going to take a bath", Thread.currentThread().getName());
				try {
					Thread.sleep(Duration.ofMillis(500L));
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				System.out.printf("\n %s - I'm done with the bath", Thread.currentThread().getName());
			});
			
			var boilingWater = executor.submit(() -> {
				// breakpoint here:
				System.out.printf("\n %s - I'm going to boil some water", Thread.currentThread().getName());
				try {
					Thread.sleep(Duration.ofSeconds(1L));
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				System.out.printf("\n %s - I'm done with the water", Thread.currentThread().getName());
			});
			
			try {
				// breakpoints here:
				bathTime.get();
				boilingWater.get();
			} catch (InterruptedException | ExecutionException e) {
				e.printStackTrace();
			}
			
		} 
	}
}

public class TestThreads {

	public static void main(String[] args) {

		HelloThread tJ5 = new HelloThread("Th01 Java 1.1 ...17");
		// tJ5.run();

		tJ5.start();
//		try {
//			tJ5.join();
//		} catch (InterruptedException e) {
//			e.printStackTrace();
//		}
//		

		// HelloRunnable tJ5Plus = new HelloRunnable("Th02 Java 1.1 Plus... 17");
		HelloRunnable tJ5Plus = new HelloRunnable();
		Thread tw_tJ5Plus = new Thread(tJ5Plus, "Th02 Java 1.1 Plus... 17");
		tw_tJ5Plus.start();

		Runnable taskJ7 = new Runnable() {

			@Override
			public void run() {
				String name = Thread.currentThread().getName();
				System.out.println("Hello J7 " + name);
			}
		};

		Thread twj7 = new Thread(taskJ7, "Th03 Java 7...17 ");
		twj7.start();

		Runnable taskJ8 = () -> {
			String name = Thread.currentThread().getName();
			System.out.println("Hello J8 " + name);
		};

		Thread twj8 = new Thread(taskJ8, "Th04 Java 8 ...17");
		twj8.start();
		

		ExecutorService executorThreadsPool = Executors.newFixedThreadPool(2); // .newSingleThreadExecutor(); //
																				// .newFixedThreadPool(4);
		executorThreadsPool.submit(taskJ8);
		executorThreadsPool.submit(taskJ8);
//		executorThreadsPool.submit(() -> {
//			String name = Thread.currentThread().getName();
//			System.out.println("Hello J8 ExecServ " + name);
//		});

		try {
			System.out.println("attempt to shutdown executor");
			executorThreadsPool.shutdown();
			executorThreadsPool.awaitTermination(5, TimeUnit.SECONDS);
		} catch (InterruptedException e) {
			System.err.println("tasksinterrupted");
		} finally {
			if (!executorThreadsPool.isTerminated()) {
				System.err.println("cancel non-finished tasks");
			}
			executorThreadsPool.shutdownNow();
			System.out.println("shutdown finished");
		}

		ExecutorService executorThreadsPool4FC = Executors.newFixedThreadPool(1); // .newSingleThreadExecutor(); //
																					// .newFixedThreadPool(4);
		Callable<Integer> taskCallable = () -> {
			try {
				TimeUnit.SECONDS.sleep(2);
				return 105;
			} catch (InterruptedException ie) {
				throw new IllegalStateException("task callable interrupted!", ie);
			}
		};
		Future<Integer> future = executorThreadsPool4FC.submit(taskCallable);
		Integer result = null;
		try {
			result = future.get();
			System.out.println("result wout/ = " + result);
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		if (future.isDone()) {
			try {
				result = future.get();
				System.out.println("result w/ = " + result);
			} catch (InterruptedException | ExecutionException e) {
				e.printStackTrace();
			}
		}

		try {
			System.out.println("attempt to shutdown executor");
			executorThreadsPool4FC.shutdown();
			executorThreadsPool4FC.awaitTermination(5, TimeUnit.SECONDS);
		} catch (InterruptedException e) {
			System.err.println("tasksinterrupted");
		} finally {
			if (!executorThreadsPool4FC.isTerminated()) {
				System.err.println("cancel non-finished tasks");
			}
			executorThreadsPool4FC.shutdownNow();
			System.out.println("shutdown finished");
		}
		
		// Java Fabrics (Virtual Threads - run this with Java 19+):
		// Java 19+ MUST be set and --enable-preview in VM arguments:
		Runnable taskJ19 = () -> {
			String name = Thread.currentThread().getName();
			System.out.println("Hello J19 " + name);
		};
		@SuppressWarnings("preview")
		Thread twj19 = Thread.ofVirtual()
						.name("virtualThread-aka-fabric").unstarted(taskJ19);
		twj19.start();
		
		System.out.printf("# of CPU cores: %s", VirtualThreadsPlayground.numberOfCores());
		VirtualThreadsPlayground.concurrentMorningRoutineUsingExecutorsWithName();

		System.out.println("\n Main Program finished!");

	}

}
