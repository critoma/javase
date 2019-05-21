package eu.ase.fi_lambda;

@FunctionalInterface
interface MathOperation {
	int operation(int a, int b);
}

@FunctionalInterface
interface GreetingService {
	void sayMessage(String message);
}

class MathOpImpl {
	public int operate(int a, int b, MathOperation mathOperation) {
		return mathOperation.operation(a, b);
	}
}

public class Java8TestFILambda {
	public static void main(String[] args) {
		MathOpImpl tester = new MathOpImpl();
		
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
	
		GreetingService greetingService1 = message ->
		System.out.println("Hello " + message);
		
		GreetingService greetingService2 = (String msg) ->
		{
			System.out.println("Bonjour " + msg);
		};
		
		greetingService1.sayMessage("Jake");
		greetingService2.sayMessage("Jean-Yves");
	}
	
	
}
