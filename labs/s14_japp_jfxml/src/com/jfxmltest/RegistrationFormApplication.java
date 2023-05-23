package com.jfxmltest;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.FileInputStream;
//import java.net.URL;
//import javafx.scene.layout.BorderPane;

// SQLite: https://github.com/xerial/sqlite-jdbc/releases
// Java-JSON: https://github.com/stleary/JSON-java | https://search.maven.org/remotecontent?filepath=org/json/json/20220320/json-20220320.jar
// for GraalVM JS: see Maven file from lib/pom.xml

/*
 * Add *.jar files from lib folder of the JavaFX SDK: https://github.com/critoma/javase/tree/master/tools/JavaFX
 * 
 * in run configuration dialog add the following:
 * --module-path "\path to javafx\lib" --add-modules javafx.controls,javafx.fxml  -Djava.library.path=<path to DLLs>
 * 
 * e.g. for Windows (FXML files and *.dll files from JavaFX bin folder in the root of project):
 * --module-path ".\lib" --add-modules javafx.controls,javafx.fxml -Djava.library.path=.\lib
 * 
 * * e.g. for MacOS/Linux (FXML files in the root of project, but *.dylib/*.so from JavaFX bin directory in lib folder):
 * --module-path ".\lib" --add-modules javafx.controls,javafx.fxml
 * -Dpolyglot.engine.WarnInterpreterOnly=false
 * /Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home/bin/java --module-path ./lib --add-modules javafx.controls,javafx.fxml -cp /Users/ctoma/eclipse-workspace-jee2022/s14_japp_fxml17/bin com.jfxmltest.RegistrationFormApplication 
 */

public class RegistrationFormApplication extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception{
        
    	//Parent root = FXMLLoader.load(getClass().getResource("registration_form.fxml"));
    	
    	FXMLLoader loader = new FXMLLoader();
        //loader.setLocation(new URL("file:////Users/ctoma/Workspaces/EclipseProjects/jdk11/s14_fxml/registration_form.fxml"));
    	//Parent root = loader.load();
    	
    	FileInputStream fxmlStream = new FileInputStream("registration_form.fxml");
    	Parent root = loader.load(fxmlStream);
    	primaryStage.setTitle("Registration Form FXML Application");
        primaryStage.setScene(new Scene(root, 800, 500));
        primaryStage.show();
        
    }


    public static void main(String[] args) {
        launch(args);
    }
}
