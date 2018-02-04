package eu.ase.threads.parallel;

public class MyMultiThreadArray implements Runnable {
	private int[] vi;
	
	private int startIdx;
	private int stopIdx;
	private Long sum;
	
	public MyMultiThreadArray(int[] v, 
			int start, int stop) {
		this.vi = v;
		this.startIdx = start;
		this.stopIdx = stop;
	}
	
	@Override
	public void run() {
		long s = 0;
		for (int idx = this.startIdx; idx <= this.stopIdx; 
				idx++) {
			s += this.vi[idx];
		}
		this.sum = new Long(s);
	}
	
	public Long getSum() {
		return this.sum;
	}
}
