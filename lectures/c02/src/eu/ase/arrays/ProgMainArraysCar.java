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
				
		for (int i = 0; i < carsNo; i++) {
			carsAvgKm[i] = 0;
			for (int j = 0; j < daysNo; j++) {
				carsAvgKm[i] += carsKmDaily[i][j];
			}
			carsAvgKm[i] /= carsNo;
		}
		
		for (int i = 0; i < carsNo; i++) {
			System.out.println("The average km for the car "+ i +" is = "+
					carsAvgKm[i]);
		}

	}

}
