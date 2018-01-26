package nashornjs;

import java.io.FileReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

public class HelloWorldJSFile {

  public static void main(String[] args) throws Exception {
    ScriptEngineManager m = new ScriptEngineManager();

    // Sets up Nashorn JavaScript Engine
    ScriptEngine e = m.getEngineByExtension("js");

    // Nashorn JavaScript syntax.
     e.eval("print ('Hello, ')");

    // world.js contents: print('World!\n');
    Path p1 = Paths.get("/home/stud/javase/lectures/c06/src/nashornjs/word.js");

    e.eval(new FileReader(p1.toString()));
  }

}


