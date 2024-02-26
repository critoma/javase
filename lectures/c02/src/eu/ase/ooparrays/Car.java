package eu.ase.ooparrays;

public class Student {
	private static int noStud;
	private String sName;
	private short[] marks;
	private float averageMark;
	
	public Student(String studentName, short[] studentMarks) {
		this.sName = studentName;
		this.marks = studentMarks;
	}
	
	public static int getNoStud() {
		return noStud;
	}
	public static void setNoStud(int noStud) {
		Student.noStud = noStud;
	}
	public String getsName() {
		return sName;
	}
	public void setsName(String sName) {
		this.sName = sName;
	}
	public short[] getMarks() {
		return marks;
	}
	public void setMarks(short[] marks) {
		this.marks = marks;
	}
	public float getAverageMark() {
		this.averageMark = this.calcAvgMark();
		return averageMark;
	}
	private float calcAvgMark() {
		float result = 0.0f;
		for (int j = 0; j < marks.length; j++) {
			result = result + this.marks[j];
		}
		result = result / marks.length;
		return result;
	}
	
	
}
