package eu.ase.ktest

import java.util.Arrays
/*
// inheritance
open class Vehicle {
    open fun printMe() {
        println("Vehicle class")
    }
}

class Auto: Vehicle() {
    override fun printMe() {
        println("Auto class")
    }
}

class Plane: Vehicle() {
    override fun printMe() {
        println("Plane class")
    }
}

fun main(args: Array<String>) {
    var a = Auto()
    var p = Plane()
    
    a.printMe()
    p.printMe()
}
*/

// inheritance
open class Vehicle {
    private var weight: Float
    var weightProperty: Float
    	get() = weight
    	set(value) { weight = value }
    
    constructor(weight: Float = 0.0f) {
        this.weight = weight
    }
    
    open fun printMe():String {
        val r:String = "Vehicle class - weight = " + this.weight
        println(r)
        return r
    }
    
    
}

class Auto: Vehicle {
    
    private var doorsNo: Int
    var doorsNoProperty: Int
    	get() = doorsNo
    	set(value) { doorsNo = value }
    
    constructor(weight: Float = 0.0f, doorsNo: Int = 0):super(weight) {
        this.doorsNo = doorsNo
    }
    
    override fun printMe():String {
        val r:String = "Auto class - weight = " + this.weightProperty + ", doorsNo = " + this.doorsNo
        println(r)
        return r
    }
}

class Plane: Vehicle {
    private var capacity: Float
    var capacityProperty: Float
    	get() = capacity
    	set(value) { capacity = value }
    
    private var enginesNo: Int
    
    constructor(weight: Float = 0.0f, capacity: Float = 0.0f, enginesNo: Int = 0) : super(weight) {
        this.capacity = capacity
        this.enginesNo = enginesNo
    }
    
    override fun printMe():String {
        val r:String = "Plane class - w = " + this.weightProperty + ", capacity = " + capacity + 
               ", enginesNo = " + enginesNo
        println(r)
        return r
    }
}

fun main(args: Array<String>) {
    var a = Auto(1200.0f, 3)
    var p = Plane(11500.0f, 300.0f, 4)
    
    a.printMe()
    val ss:String = p.printMe()
    println("ss = " + ss)
    
    var p2 = p
    p2.capacityProperty = 2018.0f
    println("p ---")
    p.printMe()
    println("p2 ---")
    p2.printMe()
    println("When you are learning a language: " +
            "\n 1. Translate the business logic reqs into logic dataflow" +
            "\n 2. Generate simple sequential code for implementing the logic dataflow" +
            "\n 3. Translate the code into proper paradigm: OOP, Functional programming, etc." +
            "\n 4. Understand the synthax and the language internals with the debugger and memory layout")
}