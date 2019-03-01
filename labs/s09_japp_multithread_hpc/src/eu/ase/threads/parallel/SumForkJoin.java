package eu.ase.threads.parallel;

import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;

public class SumForkJoin extends /* RecursiveTask<Void> */RecursiveTask<Long> {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	static final int SEQUENTIAL_THRESHOLD = 5000;

	int low;
	int high;
	int[] array;

	SumForkJoin(int[] arrayInput, int lo, int hi) {
		array = arrayInput;
		low = lo;
		high = hi;
	}

	protected Long /* Void */compute() {
		if (high - low <= SEQUENTIAL_THRESHOLD) {
			long sum = 0;
			for (int i = low; i < high; ++i)
				sum += array[i];
			// outarrayres[i] = inparray1[i] + inparray2[i];
			return sum;
		} else {
			int mid = low + (high - low) / 2;
			SumForkJoin left = new SumForkJoin(array, low, mid);
			SumForkJoin right = new SumForkJoin(array, mid, high);
			left.fork();
			long rightAns = right.compute();
			long leftAns = left.join();
			return leftAns + rightAns;
		}
		// return null;
	}

	static long /*Void*/ sumArrays(int[] inparray) {
		return ForkJoinPool.commonPool().invoke(
				new SumForkJoin(inparray, 0, inparray.length));
	}
}
