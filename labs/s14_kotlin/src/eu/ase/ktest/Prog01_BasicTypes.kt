package eu.ase.ktest


// 2. Kotlin - Basic Types

fun main(args: Array<String>) {
    println("Basic Types...!")
    
    // numbers
    var a: Int = 10000
    val d: Double = 100.00
    val f: Float = 100.00f
    val l: Long = 1000000004
    val s: Short = 10
    val b: Byte = 1
    
    println("Your Int Value is "+a);
    a++;
    println("Your Int Value is "+a);
    println("Your Double  Value is "+d);
    println("Your Float Value is "+f);
   	println("Your Long Value is "+l);
   	println("Your Short Value is "+s);
   	println("Your Byte Value is "+b);
    
    // chars
    val letter: Char    // defining a variable 
    letter = 'A'        // Assigning a value to it 
    println("$letter")
    
    // boolean
    val myBoolean: Boolean   // defining a variable 
    myBoolean = true         // Assinging a value to it 
    println("Your boolean value is " + myBoolean);
    println("Your character value is "+"$letter")
    
    // Strings
    
    var rawString :String  = "I am Raw String!"
    val escapedString : String  = "I am escaped String!\n"
   
    println("Hello!"+escapedString)
    println("Hey!!"+rawString)
    rawString += "...."
    println("Hey!!"+rawString)
    
    // Arrays
    
    val numbersA: IntArray = intArrayOf(1, 2, 3, 4, 5)
    println("Hey!! I am array Example"+numbersA[2])
    
    //Collection
    
    val numbers: MutableList<Int> = mutableListOf(1, 2, 3)  // mutable List
   	val readOnlyView: List<Int> = numbers                   // immutable list
   	println("my immutable list--"+numbers)    // prints "[1, 2, 3]"
   	numbers.add(4)
   
   	println("my immutable list after addition --"+numbers)// prints "[1, 2, 3, 4]"
   	println(readOnlyView)   
   	//readOnlyView.clear() // compile error
   	
    val items = listOf(1, 2, 3, 4)
   	println("First Element of our list----"+items.first())
   	println("Last Element of our list----"+items.last())
   	println("Even Numbers of our List----"+items.
      filter { it % 2 == 0 })   // returns [2, 4]
   
   	val readWriteMap = hashMapOf("foo" to 1, "bar" to 2)
   	println(readWriteMap["foo"])  // prints "1"
   
   	val strings = hashSetOf("a", "b", "c", "c")
   	println("My Set Values are"+strings)
    
    // Ranges
    val i:Int  = 2
    for (j in 1..4) 
    	print(j) // prints "1234"
    
    if (i in 1..10) { // equivalent of 1 < = i && i < = 10
        println("we found your number --"+i)
    }
}
