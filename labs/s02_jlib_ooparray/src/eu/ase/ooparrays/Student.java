package eu.ase.ooparrays;

import java.util.Arrays;

// File -> Export: Java -. JAR files to s02_japp_usejlib_ooparray/lib folder

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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Float.floatToIntBits(averageMark);
		result = prime * result + Arrays.hashCode(marks);
		result = prime * result + ((sName == null) ? 0 : sName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Student other = (Student) obj;
		if (Float.floatToIntBits(averageMark) != Float.floatToIntBits(other.averageMark))
			return false;
		if (!Arrays.equals(marks, other.marks))
			return false;
		if (sName == null) {
			if (other.sName != null)
				return false;
		} else if (!sName.equals(other.sName))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Student [sName=" + sName + ", marks=" + Arrays.toString(marks) + ", averageMark=" + averageMark + "]";
	}

	@Override
	protected Object clone() throws CloneNotSupportedException {
		Student cloneObj = (Student)super.clone();
		
		cloneObj.sName = new String(this.sName);
		
		cloneObj.marks = this.marks.clone();
		this.averageMark = this.calcAvgMark();
		
		cloneObj.averageMark = this.averageMark;
		
		Student.noStud++;
		return cloneObj;
	}

	
}
