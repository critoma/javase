package graalvmjs;

import java.io.FileReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

public class HelloWorldJSFile {

  public static void main(String[] args) throws Exception {
    ScriptEngineManager m = new ScriptEngineManager();

    // Sets up Nashorn or GraalVM JavaScript Engine
    ScriptEngine e = m.getEngineByExtension("js");

    // Nashorn JavaScript syntax.
     e.eval("print ('Hello, ')");

    // world.js contents: print('World!\n');
    Path p1 = Paths.get("./hworld.js");
    e.eval(new FileReader(p1.toString()));
    
    Path p2 = Paths.get("./pcallback.js");
    e.eval(new FileReader(p2.toString()));
  }

}