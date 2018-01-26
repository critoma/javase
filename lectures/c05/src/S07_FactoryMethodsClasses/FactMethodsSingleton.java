interface Trace {
	public void setDebug( boolean debug );
	public void debug( String message );
	public void error( String message );
}

class FileTrace implements Trace 
{
	private java.io.PrintWriter pw;
	private boolean debug;

	public FileTrace(String fName) throws java.io.IOException {
		this.pw = new java.io.PrintWriter( new java.io.FileWriter( fName ) );
	}
	
	public void setDebug( boolean debug ) {
		this.debug = debug;
	}
	public void debug( String message ) {
		if( debug ) {
			pw.println( "DEBUG: " + message );
			pw.flush();
		}
	}
	public void error( String message ) {
		// always print out errors
		pw.println( "ERROR: " + message );
		pw.flush();
	}
}

class SystemTrace implements Trace 
{
	private boolean debug;

	public void setDebug( boolean debug ) {
		this.debug = debug;
	}
	public void debug( String message ) {
		if( debug ) {  // only print if debug is true
			System.out.println( "DEBUG: " + message );
		}
	}
	public void error( String message ) {
		// always print out errors
		System.out.println( "ERROR: " + message );
	}
}

class ProgMain1 {
	public static void main(String[] args) {
		Trace log = new SystemTrace();
		//... code ...
		log.setDebug(true);
		log.debug( "entering loog" );
		// ... etc ...
	}
}

class TraceFactory {
	//factory methods which returns "interface as type" objects

	public static Trace getTrace() {
		return new SystemTrace();
	}

	public static Trace getTrace(String fName) throws java.io.IOException {
		return new FileTrace(fName);
	}
}

class ProgMain2 
{
	public static void main(String[] args) 
	{
		try 
		{
			//... some code ...
			Trace log = TraceFactory.getTrace("d:\\cucu.log");
			//... code ...
			log.setDebug(true);
			log.debug( "entering loog" );
			// ... etc ...
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}


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

