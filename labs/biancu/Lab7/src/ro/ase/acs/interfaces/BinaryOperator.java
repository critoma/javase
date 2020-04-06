package ro.ase.acs.interfaces;

//a functional interface has exactly one abstract method
@FunctionalInterface
public interface BinaryOperator {
	public double operate(double operand1, double operand2);
}
