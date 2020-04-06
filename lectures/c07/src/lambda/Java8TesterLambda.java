package lambda;

@FunctionalInterface	
interface MathOperation {
   int operation(int a, int b);
}

@FunctionalInterface	
interface GreetingService {
   void sayMessage(String message);
}

class MathOp {
   	
   public int operate(int a, int b, MathOperation mathOperation){
      return mathOperation.operation(a, b);
   }
}

public class Java8TesterLambda {
   public static void main(String args[]){
      Java8TesterLambda tester = new Java8TesterLambda();
      MathOp op = new MathOp();		
      //with type declaration
      MathOperation addition = (int a, int b) -> a + b;
		
      //with out type declaration
      MathOperation subtraction = (a, b) -> a - b;
		
      //with return statement along with curly braces
      MathOperation multiplication = (int a, int b) -> { return a * b; };
		
      //without return statement and without curly braces
      MathOperation division = (int a, int b) -> a / b;
		
      System.out.println("10 + 5 = " + op.operate(10, 5, addition));
      System.out.println("10 - 5 = " + op.operate(10, 5, subtraction));
      System.out.println("10 x 5 = " + op.operate(10, 5, multiplication));
      System.out.println("10 / 5 = " + op.operate(10, 5, division));
		
      //with parenthesis
      GreetingService greetService1 = m -> System.out.println("Hello " + m);
		
      //without parenthesis
      GreetingService greetService2 = (String message) -> {
      	System.out.println("Hi " + message);
      };
		
      greetService1.sayMessage("Jake");
      greetService2.sayMessage("John");
   } //end main


} //end class
