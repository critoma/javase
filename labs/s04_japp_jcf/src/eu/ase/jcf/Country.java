package eu.ase.jcf;

public class Country implements Comparable<Country> {
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

	@Override
	public int compareTo(Country c) {
		if(this.idCountry < c.idCountry)
			return -1;
		else if(this.idCountry > c.idCountry)
			return 1;
		
		return 0;
	}
}
