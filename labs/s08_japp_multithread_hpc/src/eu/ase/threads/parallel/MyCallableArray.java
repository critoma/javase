package eu.ase.threads.parallel;

import java.util.concurrent.Callable;

public class MyCallableArray implements Callable<Long> {
	private int[] vinp = null;
	private int startC;
	private int stopC;
	private Long sum;
	
	public MyCallableArray(int[] v, int start, int stop) {
		this.vinp = v; 
		this.startC = start;
		this.stopC = stop;
	}

	@Override
	public Long call() throws Exception {
		long s = 0;
		for(int i = startC; i <= stopC; i++) {
			s += this.vinp[i];
		}
		this.sum = new Long(s);
		return this.sum;
	} // end call

} // end class
