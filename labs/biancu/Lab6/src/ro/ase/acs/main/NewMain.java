package ro.ase.acs.main;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Scanner;

import ro.ase.acs.classes.Car;

public class NewMain {

	public static void main(String[] args) {
		//Reading information from the Console example
		Scanner scanner = new Scanner(System.in);
		
		String yourName = "";
		System.out.print("Name: ");
		yourName = scanner.nextLine();
		
		System.out.print("Age: ");
		int age = scanner.nextInt();
		
		System.out.println("Name = " + yourName);
		System.out.println("Age = " + age);
		
		scanner.close();
		
		Car car = new Car("Renault", 90, "blue", 1500);
		
		//writing values into a text file
		try {
			FileOutputStream fileOutputStream =
					new FileOutputStream("car.txt");
			OutputStreamWriter outputWriter =
					new OutputStreamWriter(fileOutputStream);
			BufferedWriter writer =
					new BufferedWriter(outputWriter);
			writer.write(car.getName());
			writer.write(System.lineSeparator());
			Integer speed = car.getSpeed();
			writer.write(speed.toString());
			writer.write(System.lineSeparator());
			writer.write(car.getColor());
			writer.write(System.lineSeparator());
			Integer capacity = car.getCapacity();
			writer.write(capacity.toString());
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		//reading values from a text file
		try {
			FileInputStream fileInputStream =
					new FileInputStream("car.txt");
			InputStreamReader inputStreamReader = new
					InputStreamReader(fileInputStream);
			BufferedReader reader = 
					new BufferedReader(inputStreamReader);
			String name = reader.readLine();
			int speed = Integer.parseInt(reader.readLine());
			String color = reader.readLine();
			int capacity = Integer.parseInt(reader.readLine());
			reader.close();
			Car c1 = new Car(name, speed, color, capacity);
			System.out.println(c1);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		//writing data into a binary file
		//field-by-field approach
		try {
			FileOutputStream binaryOutputStream =
					new FileOutputStream("car.bin");
			DataOutputStream dataOutputStream =
					new DataOutputStream(binaryOutputStream);
			dataOutputStream.writeUTF(car.getName());
			dataOutputStream.writeInt(car.getSpeed());
			dataOutputStream.writeUTF(car.getColor());
			dataOutputStream.writeInt(car.getCapacity());
			dataOutputStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		//reading data from a binary file
		//field-by-field approach
		try(FileInputStream binaryInputStream =
				new FileInputStream("car.bin"); DataInputStream dataInputStream =
				new DataInputStream(binaryInputStream)) {
			//the try from above is called "try with resources"
			//because it automatically closes all the streams specified
			//between the round brackets
			String name = dataInputStream.readUTF();
			int speed = dataInputStream.readInt();
			String color = dataInputStream.readUTF();
			int capacity = dataInputStream.readInt();
			Car c2 = new Car(name, speed, color, capacity);
			System.out.println(c2);	
		}
		catch(IOException e) {
			e.printStackTrace();
		}
		
		//object serialization
		//we don't need try-catch because the exception
		//is handled in the Car class
		car.serialize();
		
		//object deserialization
		//we need try-catch because the exception
		//is thrown further by the method
		try {
			Car c3 = Car.deserialize();
			System.out.println(c3);
		} catch (ClassNotFoundException | IOException e) {
			e.printStackTrace();
		}
	}

}
