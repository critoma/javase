package eu.ase.streams_lambda;

import java.util.Arrays;
import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.Random;
import java.util.function.Predicate;
//import java.util.Random;
import java.util.stream.Collectors;

public class Java8TestProcessingStreams {
   public static void main(String args[]) {
   	System.out.println("======= Using Java 8+: ");

		// List of strings
		// Count empty strings
		List<String> strings = Arrays.asList("abc", "", "bc", "efg", "abcd", "", "jkl");
		System.out.println("List: " + strings);

		long tstart = 0L, tstop = 0L;

		tstart = System.nanoTime();
		var co1 = 0;
		for (var i = 0; i < strings.size(); i++) {
			if (strings.get(i) != null && strings.get(i).length() == 0)
				// if(strings.get(i) != null && strings.get(i).equals(""))
				co1++;
		}
		tstop = System.nanoTime();
		System.out.printf("\n co1 = %d, ns = %d \n", co1, (tstop - tstart));

		tstart = System.nanoTime();
		var co2 = 0;
		for (var s : strings) {
			if (s.isEmpty())
				co2++;
		}
		tstop = System.nanoTime();
		System.out.printf("\n co2 = %d, ns = %d \n", co2, (tstop - tstart));

		tstart = System.nanoTime();
		Predicate<String> predEmptyStr = (String s) -> {
			boolean res = s.isEmpty();
			return res;
		};
		long countEmptyStr = strings.stream().filter(predEmptyStr).count();
		tstop = System.nanoTime();
		System.out.printf("\n co3 = %d, ns = %d \n", countEmptyStr, (tstop - tstart));
		
		tstart = System.nanoTime();
		long count = strings.stream().filter(s -> s.isEmpty()).count();
		// System.out.println("Empty Strings: " + count);
		tstop = System.nanoTime();
		System.out.printf("\n co4 = %d, ns = %d \n", count, (tstop - tstart));
		
		count = strings.stream().filter(string -> string.length() == 3).count();
        System.out.println("Strings of length 3: " + count);
        
        List<String> filtered = strings.stream().filter(string ->!string.isEmpty()).collect(Collectors.toList());
      	System.out.println("Filtered List: " + filtered);

      	String mergedString = strings.stream().filter(string ->!string.isEmpty()).collect(Collectors.joining(", "));
      	System.out.println("Merged String: " + mergedString);
	
      	List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);
      	List<Integer> squaresList = numbers.stream().map( i ->i*i).distinct().collect(Collectors.toList());
      	System.out.println("Squares List: " + squaresList);
      
      	List<Integer> integers = Arrays.asList(1,2,13,4,15,6,17,8,19);
      	System.out.println("List: " +integers);
      	
      	IntSummaryStatistics stats = integers.stream().mapToInt((x) ->x).summaryStatistics();
      	System.out.println("Highest number in List : " + stats.getMax());
      	System.out.println("Lowest number in List : " + stats.getMin());
      	System.out.println("Sum of all numbers : " + stats.getSum());
      	System.out.println("Average of all numbers : " + stats.getAverage());
      	System.out.println("Random Numbers: ");
      	
      	// print ten random numbers
//	      Random random = new Random();
//	      for(int i=0; i < 10; i++){
//	         System.out.println(random.nextInt());
//	      }

//	      random.ints().limit(10).sorted().forEach(System.out::println);

	//parallel processing
      	count = strings.parallelStream().filter(string -> string.isEmpty()).count();
      	System.out.println("Empty Strings - Parallel: " + count);
      	
   } // end main method
} // end class
