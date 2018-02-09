package com.hello.client;

// Video:
// http://www.logicbig.com/tutorials/core-java-tutorial/modules/getting-started-in-eclipse/
// Incomplete text:
// https://www.journaldev.com/13630/javase9-helloworld-module-ides-part4


import com.hello.HelloWorld;

public class HelloWorldClient {

  public static void main (String arg[]) {

    HelloWorld hello = new HelloWorld();
    System.out.println(hello.sayHelloWorld());
	
  }

}
