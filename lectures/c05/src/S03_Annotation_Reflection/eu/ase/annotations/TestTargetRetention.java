package eu.ase.annotations;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@interface Test_Target {
   public String doTestTarget();
}

@Retention(RetentionPolicy.RUNTIME)
@interface Test_Retention {
   String doTestRetention();
}

@Documented
@interface Test_Documented {
   String doTestDocument();
}


class TestAnnotations {
   @Test_Target(doTestTarget="Hello World !")
   //private int field1;//compile error
   public void doTestTarget() {
      System.out.printf("\n\nTesting Target annotation");
   }

   @Test_Retention (doTestRetention="Hello retention test")
   public void doSomeTestRetention() {
      System.out.printf("\n\nTesting annotation 'Retention'");
   }
   @Test_Documented(doTestDocument="Hello document")
   public void doSomeTestDocumented() {
      System.out.printf("\n\nTesting annotation 'Documented'");
   }

}


class ProgMainAnn {
   public static void main(String arg[]) {
      TestAnnotations ta = new TestAnnotations();
      ta.doTestTarget();
      ta.doSomeTestRetention();
      ta.doSomeTestDocumented();
   }
   
}