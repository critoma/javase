//this class is in the default package
//the usage of the default package is not recommended

//classes can be either public
//either package (the default one) in Java
public class Student {
	//String is an immutable reference type
	private String name;
	//float is a primitive
	private float grade;
	
	public Student() {
		name = "";
		grade = 1;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getGrade() {
		return grade;
	}

	public void setGrade(float grade) {
		this.grade = grade;
	}
	
	//a custom clone method to avoid shallow copies
	public Student myClone() {
		Student copy = new Student();
		copy.name = this.name;
		copy.grade = grade;
		return copy;
	}
}
