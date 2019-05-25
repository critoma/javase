package eu.ase.jfxmltest;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.FileInputStream;
//import java.net.URL;
//import javafx.scene.layout.BorderPane;

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
