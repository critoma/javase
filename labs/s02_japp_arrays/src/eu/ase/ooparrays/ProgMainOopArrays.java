package eu.ase.ooparrays;

public class ProgMainOopArrays {

	public static void main(String[] args) {
		//Student.setNoStud(2);
//		Student s0 = new Student("S0", new short[] {5, 5, 9});
//		Student s1 = new Student("S1", new short[] {9, 10, 9});
//		
//		Student[] classStudents = new Student[Student.getNoStud()];
//		classStudents[0] = s0;
//		classStudents[1] = s1;
		
		//Student[] classStudents = new Student[Student.getNoStud()];
		Student[] classStudents = new Student[2];
//		classStudents[0] = new Student("S0", new short[] {5, 5, 9});
//		classStudents[1] = new Student("S1", new short[] {9, 10, 9});
		
		//for (int i = 0; i < Student.getNoStud(); i++) {
		for (int i = 0; i < 2; i++) {
			if ( i == 0 ) {
				classStudents[i] = new Student("S0", new short[] {5, 5, 9});
			} else {
				classStudents[i] = new Student("S1", new short[] {9, 10, 9});
			}
		}
		
		for (int i = 0; i < 2; i++) {
			System.out.println("The average mark for the student "+ i +" is = "+
					classStudents[i].getAverageMark());
		}

	}

}
