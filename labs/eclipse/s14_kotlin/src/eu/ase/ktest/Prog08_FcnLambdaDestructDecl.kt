package eu.ase.ktest

// destructuring declarations:
data class Student(val a :String, val b: String ) {
   	var name: String = a
   	var subject: String = b
}

fun main(args: Array<String>) {
    // standard function call:
    val fr: String = MyFunction("tutorials!")
   	println(fr)
    
    // lambda functions:
    val mylambda: (String)->Unit = {s: String -> println(s) } 
   	val v:String = "Tutorials!!!"
   	mylambda(v)
    
    // passing lambda as parameter:
    myFun(v, mylambda) //passing lambda as a parameter of another function
    
    // destructuring declarations:
    val s = Student("Student John","Kotlin")
   	val (name, subject) = s
   	println("You are learning " + subject + " from " + name)
}

// standard function call:
fun MyFunction(x: String): String {
   	var c:String  = "Hey!! Welcome To ---"
   	return (c+x)
}

// passing lambda as parameter:
fun myFun(a: String, action: (String)->Unit) { //passing lambda 
   print("Heyyy!!!")
   action(a) // call to lambda function
}