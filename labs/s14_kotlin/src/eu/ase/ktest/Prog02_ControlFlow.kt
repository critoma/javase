package eu.ase.ktest

fun main(args: Array<String>) {
    // if-else statement:
    val a1:Int = 5
   	val b1:Int = 2
   	var max1: Int
   
   	if (a1 > b1) {
        max1 = a1
   	} else {
        max1 = b1
   	}
   	println("Maximum of a or b is " + max1)
 
   	// As expression 
   	// val max = if (a > b) a else b

    // when statement:
    val x:Int = 5
   	when (x) {
        1 -> print("x = = 1")
        2 -> print("x = = 2")
        else -> { // Note the block
            println("x is neither 1 nor 2")
        }
    }
    
    // when statements:
    val y: Int = 7
    when (y) {
        1,2 -> print(" Value of y either 1,2")
        else -> { // Note the block
            print("y is neither 1 nor 2")
        }
    }
    
    // for-loop statement:
    val items = listOf(7, 8, 5, 4)
    //var i: Int
    for (i in 0 .. items.lastIndex)
    	println("\n" + items[i])
    
    for (i in items) 
    	println("values of the array " + i)
    
    val itemsL = listOf(1, 22, 83, 4)
    for ((index, value) in itemsL.withIndex()) {
        println("the element at $index is $value")
    }
    
    // while
    var z:Int = 0
    println("Example of While Loop--")
    while(z <= 10) {
        println(z)
        z++
    } 
    
    var a:Int = 0
    do {
        a = a + 10
        println("I am inside Do block--- " + a)
    } while (a <= 50)
    
    var b:Int = 10
   	println("The value of b is-- " + doubleMe(b))

    
}

fun doubleMe(x:Int):Int {
   return 2*x;
}
