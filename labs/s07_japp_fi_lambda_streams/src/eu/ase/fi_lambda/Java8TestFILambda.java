package eu.deic.lambda.fi;

@FunctionalInterface
interface MyInterfaceStr {
    // abstract method
    String processString(String n);
}

@FunctionalInterface
interface GenericInterface<T> {
    // generic abstract method
    T func(T t);
}

@FunctionalInterface
interface MathOperation<T1, T2, E> {
	E doCalculation(T1 a, T2 b);
}

class MathClass<T1, T2, TR> {
	public TR operate(T1 a, T2 b, MathOperation<T1, T2, TR> mathOperation) {
		return mathOperation.doCalculation(a, b);
	}
}

public class Java8PlusLambdaFI {

	public static void main(String[] args) {
		var idx = 0;
		MyInterfaceStr refLambdaReverseStr = (String str) -> {
            // i++; // not working, because of SECURITY and because lambda is pointing to byte-code
            // "it is NOT a Bug, it is a Feature"
            System.out.println(" idx in lambda expression byte-code = " + idx);
            
            String result = "";
            for (int i = str.length()-1; i >= 0 ; i--)
            result += str.charAt(i);
            return result;
        };
        System.out.println("Lambda reversed = " + refLambdaReverseStr.processString("Lambda"));
        
        MyInterfaceStr refLambda2UprCaseStr = s -> s.toUpperCase();
        System.out.printf("\nLambda with diffrent business logic, make it uppercase = %s \n\n", 
        		refLambda2UprCaseStr.processString("Lambda"));
		
        
        GenericInterface<String> reverse = s -> {
            StringBuffer r = new StringBuffer("");
            for (int i = s.length()-1; i >= 0 ; i--)
            	r.append(s.charAt(i));
            return r.toString();
        };
        System.out.println("Lambda <T> reversed = " + reverse.func("Lambda"));

        // declare another reference to GenericInterface
        // the GenericInterface operates on Integer data
        // assign a lambda expression to it
        GenericInterface<Integer> factorial = (n) -> {
            int result = 1;
            for (int i = 1; i <= n; i++)
            result = i * result;
            return result;
        };

        System.out.println("factorial of 7 = " + factorial.func(7));
        
        
		MathClass<Double, Integer, Double> objMathTester = new MathClass<>();
		
		MathOperation<Double, Integer, Double> addition = (Double x, Integer y) -> {
			Double r = Double.valueOf(x.doubleValue() + y.intValue());
			return r;
		};
		MathOperation<Double, Integer, Double>  substraction = (a, b) -> a - b;
		MathOperation<Double, Integer, Double> multiplication = (Double a, Integer b) -> {
			return a * b;
		};
		MathOperation<Double, Integer, Double> division = (Double a, Integer b) -> a/b;
		
		System.out.println("10 + 5 = " + objMathTester.operate(Double.valueOf(10), Integer.valueOf(5), addition));
		System.out.println("10 - 15 = " + objMathTester.operate(Double.valueOf(10), Integer.valueOf(15), substraction));
		System.out.println("10 * 25 = " + objMathTester.operate(Double.valueOf(10), Integer.valueOf(25), multiplication));
		System.out.println("10 / 3 = " + objMathTester.operate(Double.valueOf(10), Integer.valueOf(3), division));
		System.out.println("2 ^ 10 = " + objMathTester.operate(Double.valueOf(2), Integer.valueOf(10), ( (x1, x2) -> Math.pow(x1, x2)) ));
	
	} // end main

} // end main class
