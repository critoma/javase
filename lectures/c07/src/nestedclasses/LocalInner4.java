package nestedclasses;

public class LocalInner4 {

 private int data=30;//instance variable

 void display() {

  class Local{
   void msg(){System.out.println(data);}
  }
  Local l=new Local();
  l.msg();

 }

 public static void main(String args[]){
  LocalInner4 obj=new LocalInner4();
  obj.display();
 }

}

