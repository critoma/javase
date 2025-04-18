package functionalinterface;

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;
import java.util.Comparator;


public class Java8TesterLambdaFullComparatorFI {

   public static void main(String args[]){
      List<String> names1 = new ArrayList<String>();
      names1.add("Mary "); names1.add("Sam ");
      names1.add("Robert ");names1.add("Nick "); 

      List<String> names2 = new ArrayList<String>();
      names2.add("Mary "); names2.add("Sam ");
      names2.add("Robert "); names2.add("Nick "); 		

      Java8TesterLambdaFullComparatorFI tester = new Java8TesterLambdaFullComparatorFI();

      System.out.println("Sort using Java 7 syntax: ");
      tester.sortUsingJava7(names1);
      System.out.println(names1);


      System.out.println("Sort using Java 8 syntax: ");
      tester.sortUsingJava8(names2);
      System.out.println(names2);

   } //end main


  //sort using java 7
  private void sortUsingJava7(List<String> names){   

      Collections.sort(names, new Comparator<String>() {
         @Override
         public int compare(String s1, String s2) {
            return s1.compareTo(s2);
         }
      });

   } //end sort7 method

   
   //sort using java 8
   private void sortUsingJava8(List<String> names) {
      Collections.sort(names, (s1, s2) -> s1.compareTo(s2));
   } // end sort8 method - Lambda, Closure, Functional Interface java.util.Comparator

} // end class




