package eu.ase.reactstreams;

import java.util.ArrayList;
import java.util.List;

import java.util.concurrent.Flow.Subscriber;
import java.util.concurrent.Flow.Subscription;

import java.util.concurrent.Flow.Processor;
import java.util.concurrent.SubmissionPublisher;
import java.util.function.Function;

class Employee {

	private int id;
	private String name;
	
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
	
	public Employee(int i, String s) {
		this.id = i;
		this.name = s;
	}
	
	public Employee() {
	}
	
	@Override
	public String toString() {
		return "[id="+id+",name="+name+"]";
	}
}


class EmpHelper {

	public static List<Employee> getEmps() {

		Employee e1 = new Employee(1, "Ralph");
		Employee e2 = new Employee(2, "David");
		Employee e3 = new Employee(3, "Lisa");
		Employee e4 = new Employee(4, "Andreea");
		Employee e5 = new Employee(5, "Andrei");
		
		List<Employee> emps = new ArrayList<>();
		emps.add(e1);
		emps.add(e2);
		emps.add(e3);
		emps.add(e4);
		emps.add(e5);
		
		return emps;
	}

}


class MySubscriber implements Subscriber<Employee> {

	private Subscription subscription;
	
	private int counter = 0;
	
	@Override
	public void onSubscribe(Subscription subscription) {
		System.out.println("Subscribed");
		this.subscription = subscription;
		this.subscription.request(1); //requesting data from publisher
		System.out.println("onSubscribe requested 1 item");
	}

	@Override
	public void onNext(Employee item) {
		System.out.println("Processing Employee "+item);
		counter++;
		this.subscription.request(1);
	}

	@Override
	public void onError(Throwable e) {
		System.out.println("Some error happened");
		e.printStackTrace();
	}

	@Override
	public void onComplete() {
		System.out.println("All Processing Done");
	}

	public int getCounter() {
		return counter;
	}

}


class Freelancer extends Employee {

	private int fid;

	public int getFid() {
		return fid;
	}

	public void setFid(int fid) {
		this.fid = fid;
	}
	
	public Freelancer(int id, int fid, String name) {
		super(id, name);
		this.fid = fid;
	}
	
	@Override
	public String toString() {
		return "[id="+super.getId()+",name="+super.getName()+",fid="+fid+"]";
	}
}



class MyFreelancerSubscriber implements Subscriber<Freelancer> {

	private Subscription subscription;
	
	private int counter = 0;
	
	@Override
	public void onSubscribe(Subscription subscription) {
		System.out.println("Subscribed for Freelancer");
		this.subscription = subscription;
		this.subscription.request(1); //requesting data from publisher
		System.out.println("onSubscribe requested 1 item for Freelancer");
	}

	@Override
	public void onNext(Freelancer item) {
		System.out.println("Processing Freelancer "+item);
		counter++;
		this.subscription.request(1);
	}

	@Override
	public void onError(Throwable e) {
		System.out.println("Some error happened in MyFreelancerSubscriber");
		e.printStackTrace();
	}

	@Override
	public void onComplete() {
		System.out.println("All Processing Done for MyFreelancerSubscriber");
	}

	public int getCounter() {
		return counter;
	}

}


class MyProcessor extends SubmissionPublisher<Freelancer> implements Processor<Employee, Freelancer> {

	private Subscription subscription;
	private Function<Employee,Freelancer> function;
	
	public MyProcessor(Function<Employee,Freelancer> function) {  
	    super();  
	    this.function = function;  
	  }  
	
	@Override
	public void onSubscribe(Subscription subscription) {
		this.subscription = subscription;
		subscription.request(1);
	}

	@Override
	public void onNext(Employee emp) {
		submit((Freelancer) function.apply(emp));  
	    subscription.request(1);  
	}

	@Override
	public void onError(Throwable e) {
		e.printStackTrace();
	}

	@Override
	public void onComplete() {
		System.out.println("Done");
	}

}


public class ProgMainReactiveStreamsWithProcessor {

  public static void main(String[] args) throws InterruptedException {
	/*  	
	// Sample without transformation
	// Create Publisher
	SubmissionPublisher<Employee> publisher = new SubmissionPublisher<>();

	// Register Subscriber
	MySubscriber subs = new MySubscriber();
	publisher.subscribe(subs);

	List<Employee> emps = EmpHelper.getEmps();

	// Publish items
	System.out.println("Publishing Items to Subscriber");
	emps.stream().forEach(i -> publisher.submit(i));

	// logic to wait till processing of all messages are over
	while (emps.size() != subs.getCounter()) {
		Thread.sleep(10);
	}
	// close the Publisher
	publisher.close();
	System.out.println("Exiting the app");
	*/

	// Sample with transformation
	// Create End Publisher
	SubmissionPublisher<Employee> publisher 
		= new SubmissionPublisher<>();

	// Create Processor
	MyProcessor transformProcessor 
		= new MyProcessor(s -> {
		return new Freelancer(s.getId(), s.getId() + 100, s.getName());
	});

	//Create End Subscriber
	MyFreelancerSubscriber subs 
		= new MyFreelancerSubscriber();

	//Create chain of publisher, processor and subscriber
	publisher.subscribe(transformProcessor); // publisher to processor
	transformProcessor.subscribe(subs); // processor to subscriber

	List<Employee> emps = EmpHelper.getEmps();

	// Publish items
	System.out.println("Publishing Items to Subscriber");
	emps.stream().forEach(i -> publisher.submit(i));

	// Logic to wait for messages processing to finish
	while (emps.size() != subs.getCounter()) {
		Thread.sleep(10);
	}

	// Closing publishers
	publisher.close();
	transformProcessor.close();

	System.out.println("Exiting the app");
  }
}

