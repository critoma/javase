package Text0;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class CSVScanner {
    public static void main(String[] args) {

        try {
            Scanner sc = new Scanner(new File("persons.csv"));

            // read the header
            if (sc.hasNextLine()) {
                System.out.println("Header: " + sc.nextLine());
            }

            while (sc.hasNextLine()) {
                String linie = sc.nextLine();
                String[] valori = linie.split(",");

                int id = Integer.parseInt(valori[0]);
                String name = valori[1];
                int age = Integer.parseInt(valori[2]);
                double salary = Double.parseDouble(valori[3]);

                System.out.println(id + " | " + name + " | " + age + " | " + salary);
            }

            sc.close();

        } catch (FileNotFoundException e) {
            System.out.println("Fisierul nu a fost gasit!");
        }
    }
}
