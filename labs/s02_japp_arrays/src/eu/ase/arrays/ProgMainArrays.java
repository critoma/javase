package eu.ase.arrays;

public class ProgMainArrays {

	public static void main(String[] args) {
		// Find out the average mark of the class
		// 2 students, 3 disciplines
		int studentsNo = 2;
		int lectNo = 3;
		short[][] studentsMarksAtDisciplines = 
				new short[][] {{5, 5, 9}, {9, 10, 9}};
		float[] avgStudMark = new float[studentsNo];
				
		for (int i = 0; i < studentsNo; i++) {
			avgStudMark[i] = 0;
			for (int j = 0; j < lectNo; j++) {
				avgStudMark[i] += studentsMarksAtDisciplines[i][j];
			}
			avgStudMark[i] /= lectNo;
		}
		
		for (int i = 0; i < studentsNo; i++) {
			System.out.println("The average mark for the student "+ i +" is = "+
					avgStudMark[i]);
		}

	}

}
