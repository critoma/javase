//clasa singleton cu metode factory
class ClassicSingleton {
	private int membru;
	private static ClassicSingleton instance = null;
   
	private ClassicSingleton() {
      		// Exists only to defeat instantiation.
	  	this.membru = 0;
	}
	public static ClassicSingleton getInstance() {
      		if(instance == null) {
         		instance = new ClassicSingleton();
      		}
      		return instance;
	}   
	public void setMembru(int x) {this.membru = x;}
	public int getMembru() {return this.membru;}
}

class ProgMain3 { //test clasa singleton
	public static void main(String[] args) {
		ClassicSingleton s1 = ClassicSingleton.getInstance();
		ClassicSingleton s2 = ClassicSingleton.getInstance();
		s1.setMembru(9);
		s2.setMembru(7);
		System.out.println("s1="+s1.getMembru()+" s2="+s2.getMembru());
	}
}
