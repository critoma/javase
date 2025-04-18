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
		log.debug( "entering log" );
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

	public static Trace getTrace(boolean fileTrace, String fName) throws java.io.IOException {
		if(fileTrace == true) {
			return new FileTrace(fName);
		} else {
			return new SystemTrace();
		}
	}
}

class ProgMain2 
{
	public static void main(String[] args) 
	{
		try 
		{
			//... some code ...
			//Trace log = TraceFactory.getTrace("./cucu.log");
			Trace log = TraceFactory.getTrace(true, "./cucu.log");
			//... code ...
			log.setDebug(true);
			log.debug( "entering log - in log file" );
			// ... etc ...

			log = TraceFactory.getTrace(false, "");
			log.setDebug(true);
			log.debug( "entering log - on screen" );
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}

