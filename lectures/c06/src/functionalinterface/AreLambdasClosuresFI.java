package functionalinterface;

// AreLambdasClosuresFunctionalInterface.java
import java.util.function.*;

public class AreLambdasClosuresFI {
    public Function<Integer, Integer> make_fun() {
        // Outside the scope of the returned function:
        int n = 0;
        return arg -> {
            System.out.print(n + " " + arg + ": ");
            arg += 1;
            // n += arg; // Produces error message
            return n + arg;
        };
    }
    public void try_it() {
        Function<Integer, Integer>
            x = make_fun(),
            y = make_fun();
        for(int i = 0; i < 5; i++)
            System.out.println(x.apply(i));
        for(int i = 10; i < 15; i++)
            System.out.println(y.apply(i));
    }
    public static void main(String[] args) {
        new AreLambdasClosuresFI().try_it();
    }
}
