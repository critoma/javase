package nestedclasses;

class A {
  interface Message {
   void msg();
  }
}

class TestNestedInterface9 implements A.Message {
 public void msg() { System.out.println("Hello nested interface"); }

 public static void main(String args[]) {
  A.Message message = new TestNestedInterface9();//upcasting here
  message.msg();
 }
}


