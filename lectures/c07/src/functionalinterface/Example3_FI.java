package functionalinterface;

import java.util.UUID;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class Example3_FI {

    public static void main(String[] args) {

        Predicate<String> nameStartWithS = name -> name.startsWith("s");
	if (nameStartWithS.test("ssstest")) 
		System.out.println("String starts with s");

        Consumer<String> sendEmail = message -> System.out.println("Sending email >> " + message);
	sendEmail.accept("Consumer text...");

        Function<String, Integer> stringToLength = name -> name.length();
	String myStr = "My text length ...";
	int lenStr = stringToLength.apply(myStr);
	System.out.println("myStr = " + myStr + " has length = " + lenStr);

        Supplier<String> uuidSupplier = () -> UUID.randomUUID().toString();
	System.out.println("UUID = " + uuidSupplier.get());

    }
}
