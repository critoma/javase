package eu.ase.threads;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
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
		
		// Java 19+ MUST be set and --enable-preview in VM arguments:
		Runnable taskJ19 = () -> {
			String name = Thread.currentThread().getName();
			System.out.println("Hello J19 " + name);
		};
		@SuppressWarnings("preview")
		Thread twj19 = Thread.ofVirtual().unstarted(taskJ19);
		twj19.start();
		

		ExecutorService executorThreadsPool = Executors.newFixedThreadPool(2); // .newSingleThreadExecutor(); //
																				// .newFixedThreadPool(4);
		executorThreadsPool.submit(taskJ8);
		executorThreadsPool.submit(taskJ8);
		executorThreadsPool.submit(taskJ19);
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
		
		

		System.out.println("Main Program finished!");

	}

}
