package eu.ase.ktest

class Alien {
    var skills : String = "null"
	
   	fun printMySkills() {
    	println(skills)
   	}		
}

fun main(args: Array<String>) {
    var  a1 = Alien()
   	a1.skills = "JAVA"
   	a1.printMySkills()
	
   	var  a2 = Alien()
   	a2.skills = "Kotlin"
   	a2.printMySkills()
	
   	var  a3 = Alien()
   	a3.skills = a1.addMySkills(a2)
   	a3.printMySkills()

    // Exception:
    try {
        var myVar:Int = 12
        println("myVar = " + myVar)
      	val v:String = "Tutorial"
        v.toInt()
    } catch(e:Exception) {
      	e.printStackTrace()
   	} finally {
      	println("Exception Handling in Kotlin")
   	}
    
    println( "Heyyy!!! " + A.show() )
    
}

// function extension:
fun Alien.addMySkills(a: Alien): String {
    var a4 = Alien()
   	a4.skills = this.skills + " " +a.skills
   	return a4.skills
}

// object extension
class A {
   companion object {
      fun show(): String {
         return("You are learning Kotlin!")
      }
   }
}