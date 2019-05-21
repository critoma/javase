package com.jfxmltest;

import java.util.concurrent.Flow;
import java.util.concurrent.SubmissionPublisher;
import java.util.concurrent.Flow.Subscription;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Window;

public class RegistrationFormController {
    @FXML
    private TextField nameField;

    @FXML
    private TextField emailField;

    @FXML
    private PasswordField passwordField;

    @FXML
    private Button submitButton;
    
    @FXML
    private Button submitMThButton;
    
    @FXML
    private Button submitReactStreamsButton;
    
    @FXML
    private Button displayButton;
    
    
    private static int objectRegisteredUsersCount = 0;
    private SqlDAO sqlObj;
    
    public RegistrationFormController() {
    	super();
    	sqlObj = new SqlDAO();
    }
    
    
    
    private void doValidationGUI(Window owner) {
        if(nameField.getText().isEmpty()) {
            AlertHelper.showAlert(Alert.AlertType.ERROR, owner, "Form Error!", 
                    "Please enter your name");
            return;
        }
        if(emailField.getText().isEmpty()) {
            AlertHelper.showAlert(Alert.AlertType.ERROR, owner, "Form Error!", 
                    "Please enter your email id");
            return;
        }
        if(passwordField.getText().isEmpty()) {
            AlertHelper.showAlert(Alert.AlertType.ERROR, owner, "Form Error!", 
                    "Please enter a password");
            return;
        }
    }
    
    @FXML
    protected void handleSubmitButtonAction(ActionEvent event) {
    	Window owner = submitButton.getScene().getWindow();
    	doValidationGUI(owner);

    	objectRegisteredUsersCount++;
    	
    	System.out.println("\n Registered User - " + nameField.getText() + ", " + emailField.getText() + ", " + passwordField.getText());
    	
    	sqlObj.insertIntoDB(objectRegisteredUsersCount, nameField.getText(), emailField.getText(), passwordField.getText());
        
		
        AlertHelper.showAlert(Alert.AlertType.CONFIRMATION, owner, "Registration Successful std!", 
                "Welcome " + nameField.getText());
    }
    
    @FXML
    protected void handleSubmitMThButtonAction(ActionEvent event) {
    	Window owner = submitButton.getScene().getWindow();
    	doValidationGUI(owner);

    	objectRegisteredUsersCount++;
    	
    	System.out.println("\n Registered User multi - " + nameField.getText() + ", " + emailField.getText() + ", " + passwordField.getText());
    	
    	Runnable rth = () -> {
    		sqlObj.insertIntoDB(objectRegisteredUsersCount, nameField.getText(), emailField.getText(), passwordField.getText());
    	};
    	Thread th = new Thread(rth);
    	th.start();
		
        AlertHelper.showAlert(Alert.AlertType.CONFIRMATION, owner, "Registration Successful multi!", 
                "Welcome " + nameField.getText());
    }
    
    @FXML
    protected void handleSubmitReactStreamsButtonAction(ActionEvent event) {
    	Window owner = submitButton.getScene().getWindow();
    	doValidationGUI(owner);

    	objectRegisteredUsersCount++;
    	
    	System.out.println("\n Registered User react- " + nameField.getText() + ", " + emailField.getText() + ", " + passwordField.getText());
    	
    	try (SubmissionPublisher<User> usersPublisher = new SubmissionPublisher<User>()) {
    		User u = new User(objectRegisteredUsersCount, nameField.getText(), emailField.getText(), passwordField.getText());
    		UsersSubscriber usersSubscriber = new UsersSubscriber(sqlObj);
    		usersPublisher.subscribe(usersSubscriber);
    		usersPublisher.submit(u);
    	} catch(Exception reacte) {
    		reacte.printStackTrace();
    	}
    	
        AlertHelper.showAlert(Alert.AlertType.CONFIRMATION, owner, "Registration Successful react!", 
                "Welcome " + nameField.getText());
    }
    
    @FXML
    protected void handleDisplayButtonAction(ActionEvent event) {
    	sqlObj.displayDB();
    }
    
    
}

class User {
	private int id;
	private String name;
	private String email;
	private String password;
	public User(int id, String name, String email, String password) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "user [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + "]";
	}
}

class UsersSubscriber implements Flow.Subscriber<User> {
	 
	private SqlDAO sqlOb;
    private Subscription subscription;
    
    public UsersSubscriber() {
    	super();
    }
    
    public UsersSubscriber(SqlDAO sqlObject) {
    	super();
    	this.sqlOb = sqlObject;
    }
 
    @Override
    public void onSubscribe(Subscription subscription) {
      System.out.printf("onSubscribe(...) - new subscription %s\n", subscription);
      this.subscription = subscription;
      subscription.request(1);
    }
 
    @Override
    public void onNext(User item) {
      System.out.printf("onNext(...) - user received: %s \n", item.toString());
      
      sqlOb.insertIntoDB(item.getId(), item.getName(), item.getEmail(), item.getPassword());
      //subscription.request(1);
      subscription.cancel();
    }
 
    @Override
    public void onError(Throwable throwable) {
      System.err.printf("error occurred fetching user: %s\n", throwable.getMessage());
      throwable.printStackTrace(System.err);
 
    }
 
    @Override
    public void onComplete() {
      System.out.println("fetching user completed");
    }
  }
