package nestedclasses;

/*abstract*/ class Person {
  /*abstract*/ void eat() /*;*/ {System.out.println("eat");}
}

class TestAnnonymousInner {

 public static void main(String args[]) {
  Person p=new Person(){
  	void eat() { System.out.println("nice fruits"); }
  };
  Person p2 = new Person();

  p.eat();
  p2.eat();
 }
}
