package methodreference;

// Abstraction over Behavior
// InternalVsExternalIteration.java
import java.util.*;

interface Pet {
    void speak();
}

class Rat implements Pet {
    public void speak() { System.out.println("Squeak!"); }
}

class Frog implements Pet {
    public void speak() { System.out.println("Ribbit!"); }
}

public class InternalVsExternalIteration {
    public static void main(String[] args) {
        List<Pet> pets = Arrays.asList(new Rat(), new Frog());
        for(Pet p : pets) // External iteration
            p.speak();
        pets.forEach(Pet::speak); // Internal iteration
    }
}
