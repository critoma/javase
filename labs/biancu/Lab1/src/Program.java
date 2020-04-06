
public class Program {
	
	public static void main(String[] args) {
		System.out.println("Hello, World!");
		//Reference types behave like pointers
		//if we don't allocate memory with new
		//the variable is null
		Student s = new Student();
		s.setName("John");
		System.out.println(s.getName());
		
		//if we don't clone s then
		//s2 and s will share the same memory location
		//any change to s will affect s2 and vice-versa
		Student s2 = s.myClone();
		s.setName("George");
		System.out.println(s2.getName());
	}

}
