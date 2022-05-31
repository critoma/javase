package euase.jrobots;
import robocode.*;

/**
 * Using just the ahead and turnRight/turnLeft methods create a robot that travels in a 
 * complete square once, beginning from its starting position. Make the robot travel 150 units for 
 * each side of the square.
 */

/**
 * MyClass - a class by (your name here)
 */
public class MyExercices_1_1 extends Robot 
{
public void run() {
			//first side
			ahead(150);
			turnRight(90);
			//second side
			ahead(150);
			turnRight(90);
			//third side
			ahead(150);
			turnRight(90);
			//fourth side
			ahead(150);
			turnRight(90);						
	}

}
