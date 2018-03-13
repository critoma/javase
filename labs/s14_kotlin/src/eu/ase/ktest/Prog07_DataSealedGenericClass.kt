package eu.ase.ktest

// data class:
data class Book(val name: String, val publisher: String, var reviewScore: Int)

// sealed (by default final) class:
sealed class MyExample {
   class OP1 : MyExample() // MyExmaple class can be of two types only
   class OP2 : MyExample()
}

// generics:
class genericsExample<T>(input:T) {
   init {
      println("Generics class obj is getting called with the value " + input)
   }
}

fun main(args: Array<String>) {
    // data class:
    val book: Book = Book("Kotlin", "Tutorial", 5)
   	println("Name of the Book is--"+book.name) // "Kotlin"
   	println("Puclisher Name--"+book.publisher) // "Tutorial"
   	println("Review of the book is--"+book.reviewScore) // 5
   	book.reviewScore = 7
   	println("Printing all the info all together = " + book.toString()) 
   	//using inbuilt function of the data class 
   
   	println("Example of the HasCode function = " + book.hashCode())
    
    // sealed (by default final) class:
    val obj: MyExample = MyExample.OP2() 
   
   	val output = when (obj) { // defining the object of the class depending on the inuputs 
    	is MyExample.OP1 -> "Option One has been chosen"
    	is MyExample.OP2 -> "option Two has been chosen"
	}
   
   	println(output)
    
    // generics:
    var object1 = genericsExample<String>("JAVA")
   	var object2 = genericsExample<Int>(10)
}
