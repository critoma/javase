package eu.ase.threads.parallel;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class ProgMainThreadParallel {
	private static final int NTHREADS = 4; //2
	
	public static void main(String[] args) {
		int dimVect = 40_000_000;
		
		int [] v = new int[dimVect];
		Long sum = new Long(0);
		
		for (int i = 0; i < dimVect; i++)
			v[i] = 1 + i;
		
		int startIdx = 0, stopIdx = 0;
		long startTime = 0, stopTime = 0;
		Long[] vectSum = new Long[NTHREADS];
		
		// -----------
		// 1. Sequential
		sum = new Long(0);
		startTime = System.currentTimeMillis();
		for (int i = 0; i < dimVect; i++) {
			sum += v[i];
		}
		stopTime =  System.currentTimeMillis();
		System.out.println("1. Seq time = " + (stopTime - startTime) 
				+ " , sum = " + sum);
		
		// 2. Multi-threading standard
		sum = new Long(0);
		startTime = System.currentTimeMillis();
		
		Thread[] vectThreads = new Thread[NTHREADS];
		MyMultiThreadArray[] vectRThreads = new MyMultiThreadArray[NTHREADS];
		
		for (int it = 0; it < NTHREADS; it++) {
			startIdx = it * (dimVect/NTHREADS);
			stopIdx = (it + 1) * (dimVect/NTHREADS) - 1;
			vectSum[it] = new Long(0);
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
		
		
		// 3. Multi-threading executor-service
		sum = new Long(0);
		startTime = System.currentTimeMillis();
		ExecutorService execThreadPool = Executors.newFixedThreadPool(NTHREADS);	
		MyMultiThreadArray[] workerTask = new MyMultiThreadArray[NTHREADS];
				
		for (int it = 0; it < NTHREADS; it++) {
			startIdx = it * (dimVect/NTHREADS);
			stopIdx = (it + 1) * (dimVect/NTHREADS) - 1;
			vectSum[it] = new Long(0);
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
				
		sum = new Long(0);
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
		// 5.1 - Fork-Join
		sum = new Long(0);
		startTime = System.currentTimeMillis();
		sum = SumForkJoin.sumArrays(v);
		stopTime = System.currentTimeMillis();
		System.out.println("5. Fork-Join Parallel Array time = "
						+ (stopTime - startTime) + " , sum = " + sum);				
	} // end main
} // end class







