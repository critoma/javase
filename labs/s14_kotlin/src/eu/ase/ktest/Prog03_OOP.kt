package eu.ase.ktest

class myClass {
    // property (data member)
    private var name: String = "data field of myClass"
    
    init {
        println("\n Init block ")
    }
    
    
    // member function - method
    fun printMe() {
        print("\n You are at the best Learning website Named-" + name + ", this = " + this)
    }
}

// https://kotlinlang.org/docs/reference/classes.html
// https://stackoverflow.com/questions/19299525/kotlin-secondary-constructor
// Technique 2: Define default values for parameters
class myClasss(nameStr: String? = null) {
    private var name: String? = nameStr
    
    init {
        println("\n Init block 2")
    }
    
    
    // member function - method
    fun printMe() {
        print("\n You are at the best Learning website Named 2 -" + name + ", this = " + this)
    }
}

// Technique 3: (when you need encapsulation) Use a factory method defined in a companion object
class myClassWithCtrs constructor (nameStr: String? = null, len: Int? = 0) {
    private var name: String? = nameStr
    private var length: Int? = len
    
    init {
        println("\n Init block 3")
    }
    
    companion object {
        fun new(s: String) = myClassWithCtrs(s, s.length)
    }
    
    // member function - method
    fun printMe() {
        print("\n Kotlin printMe Named 3 = " + this.name + ", length = " + this.length
              + ", this = " + this)
    }
}

class myClassWithCtrsK {
    private var name: String = ""
    private var length: Int = 0
    
    init {
        println("\n Init block K 4")
    }
    
    //constructor(nameStr: String) {
    //    this.name = nameStr
    //    this.len = this.name.length
    //}
    
    constructor(nameStr: String, len: Int? = 0) {
        this.name = nameStr
        if (this.name.length != len) {
            this.length = this.name.length
        } else {
        	this.length = len
        }
    }
    
    // member function - method
    fun printMe() {
        print("\n Kotlin printMe Named 4 = " + this.name + ", length = " + this.length
              + ", this = " + this)
    }
}

class Person(val firstName: String, var age: Int) {
}

class Human(val firstName: String, var age: Int) {
   	var message:String  = "Hey!!!"
	constructor(name: String, age: Int, msg: String):this(name, age) {
        this.message = msg
   	}
}

class MyTime {

    val hours: Int
    val minutes: Int
    val seconds: Int

    constructor() {
        this.hours = 0
        this.minutes = 0
        this.seconds = 0
    }
    
    constructor(hours: Int, minutes: Int, seconds: Int) {
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
    }
    
    constructor(hours: Int, minutes: Int, seconds: Int, nanoSec: Int) {
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
    }

    constructor(serializedString: String) {
       val subs = serializedString.split(":")
       this.hours = subs[0].toInt()
       this.minutes = subs[1].toInt()
       this.seconds = subs[2].toInt()
    }

    fun serialize(): String {
        return "{%02d}:{%02d}:{%02d}".format(hours, minutes, seconds)
    }
}

fun main(args: Array<String>) {
   	val obj = myClass() // create obj object of myClass class
   	obj.printMe()
    
    val obj2 = myClasss("ups") // create obj object of myClass class
   	obj2.printMe()
    
    var obj3 = myClassWithCtrs.new("Data field Test 3")
    obj3.printMe()
    
    //var obj3 = myClassWithCtrs("Data field Test 3", 17)
    //obj3.printMe()
    
    var obj4 = myClassWithCtrsK("Test 4")
    obj4.printMe()
    
    var obj5 = myClassWithCtrsK("Test 5", 20)
    obj5.printMe()
    
    
    val person1 = Person("Kotlin Dev Person", 15)
   	println("\nFirst Name = ${person1.firstName}")
   	println("\nAge = ${person1.age}")
    
    val human = Human("NotRobot", 25)
   	print("\n"+"${human.message} "+"${human.firstName} "+
      ", Your Age is-${human.age}")
    
    var human2 = Human("NotRobot 2", 26, "Hello ")
    print("\n"+"${human2.message} "+"${human2.firstName} "+
      ", Your Age is-${human2.age}")
    
    var t1 = MyTime("2:22:38")
    println("\n t1 = " + t1.serialize())
    
    var t2 = MyTime(2, 39, 45, 28)
    println("\n t2 = " + t2.serialize())
    
    var t3 = MyTime()
    println("\n t3 = " + t3.serialize())
	
	var t4: MyTime?
	// after 200 line of code
	if (t2.hours == 2) {
		t4 = null
	} else {
		t4 = MyTime()
	}
	//if (t4 != null) //not necessary
		println(t4?.serialize())
    
}