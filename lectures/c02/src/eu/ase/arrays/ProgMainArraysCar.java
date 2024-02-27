package eu.ase.arrays;

public class ProgMainArraysCar {

	public static void main(String[] args) {
		// Find out the average km of each car
		// 2 cars, 3 days of monitoring each
		int carsNo = 2;
		int daysNo = 3;
		short[][] carsKmDaily = 
				new short[][] {{51, 50, 92}, {94, 10, 19}};
		float[] carsAvgKm = new float[carsNo];
				
		int i = 0; 
		while(i < carsNo) {
			carsAvgKm[i] = 0;
			int j = 0;
			while (j < daysNo) {
				carsAvgKm[i] += carsKmDaily[i][j];
				j++; // j = j + 1;
			} // end inner while
			carsAvgKm[i] /= carsNo;
			i = i + 1;
		} // end outter while
		
		for (int i = 0; i < carsNo; i++)
			System.out.println("The average km for the car " + i + " is = " + carsAvgKm[i]);

	} // end main method

} // end class
