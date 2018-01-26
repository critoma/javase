package eu.ase.lambdathreads;

public class ProgMainLambdaThread01 {
	public static void main(String[] args) {
		Runnable taskJava7 = new Runnable () {
			@Override
			public void run() {
				String threadName = Thread.currentThread().getName();
    				System.out.println("Hello " + threadName);
			}
		};

		taskJava7.run();

		//Thread threadJ7 = new Thread(taskJava7, "Thread Java 7");
		Thread threadJ7 = new Thread(taskJava7);
		threadJ7.start();

		Runnable taskJava8 = () -> {
			String threadName = Thread.currentThread().getName();
    			System.out.println("Hello " + threadName);
		};

		taskJava8.run();

		//Thread threadJ8 = new Thread(taskJava8, "Thread Java 8");
		Thread threadJ8 = new Thread(taskJava8);
		threadJ8.start();

		System.out.println("Done!");

	}
}
