class SyncThreadA1 extends Thread {
	
	static int a = 0, b = 0;
	static Object o = new Object();
	
	public SyncThreadA1(String nume){
		super(nume);
	}
	
	void myMethod() {
		System.out.println(this.getName() + " a=" +a+" b="+b);
		a++;
			try {
				this.sleep((int)(Math.random()*1000));//blocked thread
			} catch(InterruptedException e) {e.printStackTrace();}
		b++; //este atomic?
	}
	
	public void run(){
		for(int i = 0; i < 3; i++){
			synchronized(o) { //mecanism de zavor asociat unui obiect sau clasei
				this.myMethod();	
			}			
		}
		
		System.out.println("READY! " + this.getName());
	}
}

class ProgMainSyncA1 {
	public static void main(String[] args) {
		
		SyncThreadA1 f1 = new SyncThreadA1("f1");//new Thread
		SyncThreadA1 f2 = new SyncThreadA1("f2");//new Thread
		
		f1.start();//runnable thread
		f2.start();//runnable thread
		
		System.out.println("End main()");
		
	}
}
