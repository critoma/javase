package eu.ase.fi_lambda;

@FunctionalInterface
interface GreetingService {
	void sayMessage(String message);
}

@FunctionalInterface
interface MathOperation {
	int operation(int a, int b);
}

class MathOpClass {
	public int operate(int a, int b, MathOperation mathOperation) {
		return mathOperation.operation(a, b);
	}
}

public class Java8TestFILambda {
	public static void main(String[] args) {

		GreetingService greetingService1 = (String msg) -> {
			System.out.println("Bonjour " + msg);
		}
		GreetingService greetingService2 = m -> System.out.println("Hello " + m);
		
		MathOpClass tester = new MathOpClass();
		
		MathOperation addition = (int a, int b) -> a + b;
		MathOperation substraction = (a, b) -> a - b;
		MathOperation multiplication = (int a, int b) -> {
			return a * b;
		};
		MathOperation division = (int a, int b) -> a/b;

		System.out.println("10 + 5 = " + tester.operate(10, 5, addition));
		System.out.println("10 - 5 = " + tester.operate(10, 5, substraction));
		System.out.println("10 * 5 = " + tester.operate(10, 5, multiplication));
		System.out.println("10 / 5 = " 
				+ tester.operate(10, 5, ( (x1, x2) -> x1/x2) ));
	} // end main method

} // end main class
