import java.io.FilenameFilter;
import java.io.File;

class FiltruSurseJava implements FilenameFilter {
	public boolean accept(File dir, String nFile) {
		return (nFile.endsWith(".java"));
	}
}

public class ListFiles {
	public static void main(String[] args) {
		String dir = args[0];
		File fDir = new File(dir);
		FiltruSurseJava filtru = new FiltruSurseJava();
		
		String[] listaSurse = fDir.list(filtru);
		if (listaSurse == null) System.out.println("Nu exista surse Java in "+dir);
		else {
			for (int i = 0; i < listaSurse.length; i++)
				System.out.println(listaSurse[i]);
		}
	}
}