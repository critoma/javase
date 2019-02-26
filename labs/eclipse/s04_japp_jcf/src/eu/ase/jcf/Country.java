package eu.ase.jcf;

public class Country {
	private int idCountry;
	private String name; //"DE", "RO", "US"
	
	public Country(int idCountry, String codeNameCountry) {
		this.idCountry = idCountry;
		this.name = codeNameCountry;
	}
	
	public void print() {
		System.out.println("Country - id = " + idCountry 
				+ ", codeNameCountry = " + name);	
	}
}
