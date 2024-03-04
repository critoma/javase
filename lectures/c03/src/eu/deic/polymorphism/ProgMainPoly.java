package eu.deic.polymorphism;

// Interface
interface Animal {
    void makeSound();
    double maxSpeed();
}

// Base class
class Feline implements Animal {
    @Override
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
    @Override
    public double maxSpeed() {
        System.out.println("Animal has max speed");
    }
    
    public void display() {
      System.out.println("Feline::display() "+this);
    }
}

// Derived class 1
class Cat extends Feline {
    @Override
    public void makeSound() {
        System.out.println("Cat meows");
    }
    @Override
    public double maxSpeed() {
        System.out.println("Cat has max speed 50km/h");
    }
    @Override
    public void display() {
      System.out.println("Cat::display() "+this);
    }
}

// Derived class 2
class Tiger extends Feline {
    @Override
    public void makeSound() {
        System.out.println("Tiger roars");
    }
    @Override
    public double maxSpeed() {
        System.out.println("Tiger has max speed 65km/h");
    }
    @Override
    public void display() {
      System.out.println("Tiger::display() "+this);
    }
}

public class ProgMainPoly {
    public static void main(String[] args) {
        // Using "pure" polymorphism/runtime polymorphism
        Animal cat = new Cat();
        Animal tiger = new Tiger();

        cat.makeSound(); // Output: Cat meows
        tiger.makeSound(); // Output: Tiger roars

        // class cast exception:
        Animal a0;
        a0 = tiger; // Tiger -> Animal - up-cast (implicit)
        // 270 lines of code
        try {
            cat = (Cat) a0; // Animal -> Cat - down-cast (explicit)
        } catch(ClassCastException cce) {
            cce.printStackTrace();
        }    
    }
}
