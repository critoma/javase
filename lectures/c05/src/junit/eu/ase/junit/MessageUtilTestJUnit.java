package eu.ase.junit;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class MessageUtilTestJUnit {
	
   String message = "Hello World";	
   MessageUtil messageUtil = new MessageUtil(message);

   @Test
   public void testPrintMessage() {
      assertEquals(message, messageUtil.printMessage());
   }

   @Test
   public void testPrintMessageFail() {
      message = "New Word";
      assertEquals(message, messageUtil.printMessage());
   }
}
