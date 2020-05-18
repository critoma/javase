class NonSyncThreadA1 extends Thread {
	
	static int a = 0, b = 0;
	
	public NonSyncThreadA1(String nume){
		super(nume);
	}
	
	void myMethod() {
		System.out.println(this.getName() + " a=" +a+" b="+b);
		a++;
			try {
				sleep((int)(Math.random()*1000));//blocked thread
			} catch(InterruptedException e) {e.printStackTrace();}
		b++; //este atomic?
	}
	
	public void run(){
		for(int i = 0; i < 3; i++){
			this.myMethod();			
		}
		
		System.out.println("READY! " + this.getName());
	}
}

class ProgMainNonSyncA1 {
	public static void main(String[] args) {
		
		NonSyncThreadA1 f1 = new NonSyncThreadA1("f1");//new Thread
		NonSyncThreadA1 f2 = new NonSyncThreadA1("f2");//new Thread
		
		f1.start();//runnable thread
		f2.start();//runnable thread
		
		System.out.println("End main()");
		
	}
}
