package eu.deic.hpc;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.Future;
import java.util.concurrent.RecursiveTask;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.TimeUnit;

// Java 21+
// https://stackoverflow.com/questions/13392379/how-to-set-a-java-threads-cpu-core-affinity

// in Google Shell Cloud - lscpu
// ssh -i "clusterAwsEc2_01.pem" ubuntu@ec2-3-135-212-48.us-east-2.compute.amazonaws.com
// In terminal in Linux, the one can set Java thread affinity on CPU core:
// javac -cp . -g eu/deic/hpc/ProgMainThreadParallel.java
// java -cp . eu.deic.hpc.ProgMainThreadParallel &
// 
// jdb -launch -classpath . eu.deic.hpc.ProgMainThreadParallel
// stepi
// stop at ProgMainThreadParallel:107
// stepi ...
// cont
// quit

// ps -ax | grep java
// sudo jstack <PID_JAVA_PROCESS> # jstack 3085
// ll /proc/3085/task
// taskset -p -c 0 3085
// taskset -p -c 1 3086   

// https://github.com/OpenHFT/Java-Thread-Affinity
// https://github.com/OpenHFT/Java-Thread-Affinity/blob/ea/affinity/src/test/java/net/openhft/affinity/AffinityLockMain.java
// https://github.com/OpenHFT/Java-Thread-Affinity/blob/ea/affinity/src/main/c/software_chronicle_enterprise_internals_impl_NativeAffinity.cpp
// sudo apt-get install libjna-java

class MyMultiThreadArray implements Runnable {
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
		this.sum = Long.valueOf(s); //this.sum = new Long(s);
	}
	
	public Long getSum() {
		return this.sum;
	}
} // end class MyMultiThreadArray

class MyCallableArray implements Callable<Long> {
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
		this.sum = Long.valueOf(s);  // this.sum = new Long(s);
		return this.sum;
	} // end call

} // end class MyCallableArray

public class ProgMainThreadParallel {
	private static final int NTHREADS = 4; //8 or 4 or 2
	
	public static void main(String[] args) {
		int dimVect = 40_000_000;
		
		int [] v = new int[dimVect];
		Long sum = Long.valueOf(0);
		
		for (int i = 0; i < dimVect; i++)
			v[i] = 1 + i;
		
		int startIdx = 0, stopIdx = 0;
		long startTime = 0, stopTime = 0;
		Long[] vectSum = new Long[NTHREADS];
		
		// -----------
		// 1. Sequential
		sum = Long.valueOf(0);
		startTime = System.currentTimeMillis();
		for (int i = 0; i < dimVect; i++) {
			sum += v[i];
		}
		stopTime =  System.currentTimeMillis();
		System.out.println("1. Seq time = " + (stopTime - startTime) 
				+ " , sum = " + sum);
		
		// 2. Multi-threading standard
		sum = Long.valueOf(0);
		startTime = System.currentTimeMillis();
		
		Thread[] vectThreads = new Thread[NTHREADS];
		MyMultiThreadArray[] vectRThreads = new MyMultiThreadArray[NTHREADS];
		
		for (int it = 0; it < NTHREADS; it++) {
			startIdx = it * (dimVect/NTHREADS);
			stopIdx = (it + 1) * (dimVect/NTHREADS) - 1;
			vectSum[it] = Long.valueOf(0);
			vectRThreads[it] = new MyMultiThreadArray(v, 
					startIdx, stopIdx);
			vectThreads[it] = new Thread(vectRThreads[it]);
		}
		
		for (int it = 0; it < NTHREADS; it++) {
			vectThreads[it].start();
		}
		
		for (int it = 0; it < NTHREADS; it++) {
			try {
				vectThreads[it].join();
			} catch(InterruptedException ie) {
				ie.printStackTrace();
			}
		}
		
		for (int it = 0; it < NTHREADS; it++) {
			sum += vectRThreads[it].getSum(); //vectSum[it]; //vectRThreads[it].getSum();
		}
		
		stopTime =  System.currentTimeMillis();
		System.out.println("2. MultiThread Standard Time = " + (stopTime - startTime) 
				+ " , sum = " + sum);
		
		
		// 3. Multi-threading executor-service +/- Lambda
		sum = Long.valueOf(0);
		startTime = System.currentTimeMillis();
		ExecutorService execThreadPool = Executors.newFixedThreadPool(NTHREADS);	
		MyMultiThreadArray[] workerTask = new MyMultiThreadArray[NTHREADS];
				
		for (int it = 0; it < NTHREADS; it++) {
			startIdx = it * (dimVect/NTHREADS);
			stopIdx = (it + 1) * (dimVect/NTHREADS) - 1;
			vectSum[it] = Long.valueOf(0);
			workerTask[it] = new MyMultiThreadArray(v, 
							startIdx, stopIdx);
			execThreadPool.execute(workerTask[it]);
		}
		
		execThreadPool.shutdown();
		try {
			execThreadPool.awaitTermination(Long.MAX_VALUE, 
					TimeUnit.NANOSECONDS);
		} catch (InterruptedException ie) {
			ie.printStackTrace();
		}
		
		for (int it = 0; it < NTHREADS; it++) {
			sum += workerTask[it].getSum(); //vectSum[it]; //vectRThreads[it].getSum();
		}
				
		stopTime =  System.currentTimeMillis();
		System.out.println("3. MultiThread Executor-Service time = " + (stopTime - startTime) 
						+ " , sum = " + sum);
		
		// 4. Future - Callable mechanism
		ExecutorService executor = Executors.newFixedThreadPool(NTHREADS);
		List<Future<Long>> list = new ArrayList<Future<Long>>();
				
		sum = Long.valueOf(0);
		int slot = 0;

		startTime = System.currentTimeMillis();
		for(int it = 0; it < NTHREADS; it++) {
			startIdx = it * (dimVect / NTHREADS);
			stopIdx = (it + 1) * (dimVect / NTHREADS) - 1;
					
			//vectSum[slot] = new Long(0);
			Callable<Long> worker = new MyCallableArray(v, startIdx, stopIdx);
			Future<Long> submit = executor.submit(worker);
			list.add(submit);
		} //end for
						
		for (Future<Long> future : list) {
			try {
				vectSum[slot] = future.get();
				//slot++;
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (ExecutionException ee) {
				ee.printStackTrace();
			}
		} // end for - future

		for (int it = 0; it < NTHREADS; it++) {
			sum += vectSum[it];
		}
				
		executor.shutdown();
		try {
			executor.awaitTermination(Long.MAX_VALUE,
							TimeUnit.NANOSECONDS);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		stopTime = System.currentTimeMillis();
		System.out.println("4. Array Multithreading - thread pool (ExecutorService) + Callable & Future - stopTime - startTime = "
								+ (stopTime - startTime) + " , sum = " + sum);
		
		
		
		// 6. Java 19+ Virtual Threads aka Fabrics
		// set --enable-preview in command line or in VM Arguments of the Run Configuration of Eclipse/IntelliJ
		// please also see: https://github.com/critoma/dad/blob/master/lectures/c01/src/S08_HPC_Threads/eu/ase/threads/ProgMainMultiThreadParallelJava19Fibers.java
		sum = Long.valueOf(0);
		startTime = System.currentTimeMillis();
		
		// Thread[] vectVirtThreads = new Thread[NTHREADS];
		MyMultiThreadArray[] vectVirtRThreads = new MyMultiThreadArray[NTHREADS];
		

		//ThreadFactory factory = Thread.ofVirtual().factory();
		//factory.newThread(vectVirtRThreads[0]).start();
		
		try (
			var executorServ = Executors.newVirtualThreadPerTaskExecutor()
			// var executorServ = Executors.newThreadPerTaskExecutor(factory)
		) {
			
			for (int it = 0; it < NTHREADS; it++) {
				startIdx = it * (dimVect/NTHREADS);
				stopIdx = (it + 1) * (dimVect/NTHREADS) - 1;
				vectSum[it] = Long.valueOf(0);
				vectVirtRThreads[it] = new MyMultiThreadArray(v, startIdx, stopIdx);
				executorServ.execute(vectVirtRThreads[it]);
			}
		}
		
//		for (int it = 0; it < NTHREADS; it++) {
//			startIdx = it * (dimVect/NTHREADS);
//			stopIdx = (it + 1) * (dimVect/NTHREADS) - 1;
//			vectSum[it] = Long.valueOf(0);
//			vectVirtRThreads[it] = new MyMultiThreadArray(v, 
//					startIdx, stopIdx);
//			vectVirtThreads[it] = Thread.ofVirtual().unstarted(vectVirtRThreads[it]);
//		}
//		
//		for (int it = 0; it < NTHREADS; it++) {
//			vectVirtThreads[it].start();
//		}
//		
//		for (int it = 0; it < NTHREADS; it++) {
//			try {
//				vectVirtThreads[it].join();
//			} catch(InterruptedException ie) {
//				ie.printStackTrace();
//			}
//		}
		
//		for (int it = 0; it < NTHREADS; it++) {
//			startIdx = it * (dimVect/NTHREADS);
//			stopIdx = (it + 1) * (dimVect/NTHREADS) - 1;
//			vectSum[it] = Long.valueOf(0);
//			vectVirtRThreads[it] = new MyMultiThreadArray(v, startIdx, stopIdx);
//			vectVirtThreads[it] = Thread.startVirtualThread(vectVirtRThreads[it]);
//		}
//		
//		for(int it = 0; it < NTHREADS; it++) {
//			try {
//				vectVirtThreads[it].join();
//			} catch (InterruptedException e) {
//				e.printStackTrace();
//			}
//		}
		
		for (int it = 0; it < NTHREADS; it++) {
			sum += vectVirtRThreads[it].getSum(); //vectSum[it]; //vectRThreads[it].getSum();
		}
		stopTime = System.currentTimeMillis();
		System.out.println("6. Virtual Threads aka Fabrics time = "
						+ (stopTime - startTime) + " , sum = " + sum);	
		
		/*
		// optional:
		// 5.1 - Fork-Join
		sum = Long.valueOf(0);
		startTime = System.currentTimeMillis();
		sum = SumForkJoin.sumArrays(v);
		stopTime = System.currentTimeMillis();
		System.out.println("5. Fork-Join Parallel Array time = "
						+ (stopTime - startTime) + " , sum = " + sum);	
		*/
		
	} // end main
} // end class

//class SumForkJoin extends /* RecursiveTask<Void> */RecursiveTask<Long> {
//	
//	private static final long serialVersionUID = 1L;
//
//	static final int SEQUENTIAL_THRESHOLD = 5000;
//
//	int low;
//	int high;
//	int[] array;
//
//	SumForkJoin(int[] arrayInput, int lo, int hi) {
//		array = arrayInput;
//		low = lo;
//		high = hi;
//	}
//
//	protected Long /* Void */compute() {
//		if (high - low <= SEQUENTIAL_THRESHOLD) {
//			long sum = 0;
//			for (int i = low; i < high; ++i)
//				sum += array[i];
//			// outarrayres[i] = inparray1[i] + inparray2[i];
//			return sum;
//		} else {
//			int mid = low + (high - low) / 2;
//			SumForkJoin left = new SumForkJoin(array, low, mid);
//			SumForkJoin right = new SumForkJoin(array, mid, high);
//			left.fork();
//			long rightAns = right.compute();
//			long leftAns = left.join();
//			return leftAns + rightAns;
//		}
//		// return null;
//	}
//
//	static long /*Void*/ sumArrays(int[] inparray) {
//		return ForkJoinPool.commonPool().invoke(
//				new SumForkJoin(inparray, 0, inparray.length));
//	}
//}

