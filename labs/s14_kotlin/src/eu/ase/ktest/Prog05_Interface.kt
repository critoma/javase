package eu.ase.ktest

// interface:

interface ExampleInterface  {
    var myVar: Int            // abstract property
   	fun absMethod():String    // abstract method
   
   	fun hello() {
    	println("Hello there, Welcome to Default Method in the interface!")
    }
}

class InterfaceImp : ExampleInterface {
   	override var myVar: Int = 25
   	override fun absMethod() = "Happy Learning "
    // hello() meth is not override here
}

fun main(args: Array<String>) {
   	val obj = InterfaceImp()
   	println("My Variable Value is = ${obj.myVar}")
   	print("Calling hello(): ")
   	obj.hello()
   
   	print("Message from the Website-- ")
   	println(obj.absMethod())
}