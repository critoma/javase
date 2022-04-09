package graalvmjs;

import javax.script.ScriptEngineManager; 
import javax.script.ScriptEngine; 
import javax.script.ScriptException;

// https://golb.hplar.ch/2020/04/java-javascript-engine.html
// https://mvnrepository.com/artifact/org.graalvm.js/js/22.0.0.2
// view all: https://repo1.maven.org/maven2/org/graalvm/js/js/22.0.0.2/
// https://github.com/ralscha/blog2020/blob/master/jsengine/pom.xml#L15-L24

// mvn dependency:copy-dependencies -DoutputDirectory="c:\temp"

// export MVN_HOME=/opt/software/apache-maven-3.5.0 
// ctoma@Cristians-MacBook-Pro-2015 lib % export PATH=.:$MVN_HOME/bin:$PATH
// ctoma@Cristians-MacBook-Pro-2015 lib % pwd
// /Users/ctoma/eclipse-workspace-jee2022/japp_j2js/lib
// mvn dependency:copy-dependencies -DoutputDirectory="."


public class JSTester {

	public static void main(String args[]) {

	      ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
	      ScriptEngine nashornOrGraal = scriptEngineManager.getEngineByName("graal.js"); //getEngineByName("nashorn");

	      String name = "Hello name ";
	      Integer result = null;

	      try {
	    	 nashornOrGraal.eval("print('" + name + "')");
	         result = (Integer) nashornOrGraal.eval("10 + 2");     
	      } catch(ScriptException e) {
	         System.out.println("Error executing script: "+ e.getMessage());
	      }

	      System.out.println(result.toString());

	   }

}

