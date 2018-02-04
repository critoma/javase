package eu.ase.oop;

//import java.lang.Object;
//import java.lang.String;

public class Certificate /*extends Object*/ {
	private int idCert;
	private String issuerName;
	
	public Certificate(int id, String iName) {
		this.idCert = id;
		this.issuerName = iName;
	}
	
	public int getIdCert() {
		return this.idCert;
	}
	
	public String getIssuerName() {
		return this.issuerName;
	}
	
	public void setIdCert(int id) {
		this.idCert = id;
	}
	
	
	public Certificate myClone() {
		Certificate t = new Certificate(this.idCert, this.issuerName);
		return t;
	}
}
