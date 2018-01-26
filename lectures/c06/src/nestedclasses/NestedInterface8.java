package nestedclasses;

interface Showable {

  void show();

  interface Message {
   void msg();
  }
}

class TestNestedInterface8 implements Showable.Message {

 public void msg() { System.out.println("Hello nested interface"); }

 public static void main(String args[]){
  Showable.Message message=new TestNestedInterface8();//upcasting here
  message.msg();
 }

}



