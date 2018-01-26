class CommonResources {
	int a = 0, b = 0;
	
	void myMethod(String nume) {
		Thread t = Thread.currentThread();
		System.out.println(nume + " a=" +a+" b="+b);
		a++;
			try {
				t.sleep((int)(Math.random()*1000));//blocked thread
			} catch(InterruptedException e) {e.printStackTrace();}
		b++; //este atomic?
	}
}

class NonSyncThreadA2 extends Thread {
	
	CommonResources rc;
	
	public NonSyncThreadA2(String nume, CommonResources x){
		super(nume);
		this.rc = x;
	}
		
	public void run(){
		for(int i = 0; i < 3; i++){
			rc.myMethod(this.getName());			
		}
		
		System.out.println("READY! " + this.getName());
	}
}

class ProgMainNonSyncA2 {
	public static void main(String[] args) {
	
		CommonResources rcd = new CommonResources();
		
		NonSyncThreadA2 f1 = new NonSyncThreadA2("f1", rcd);//new Thread
		NonSyncThreadA2 f2 = new NonSyncThreadA2("f2", rcd);//new Thread
		
		f1.start();//runnable thread
		f2.start();//runnable thread
		
		System.out.println("End main()");
		
	}
}
