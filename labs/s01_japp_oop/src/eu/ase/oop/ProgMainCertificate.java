package eu.ase.oop;

public class ProgMainCertificate {
	public static void main(String[] args) {
		Certificate c1 = new Certificate(777, "Verisign");
		Certificate c2 = new Certificate(999, "GoDaddy");
		
		System.out.println("c1 - id = " + c1.getIdCert() + ", iName = " + c1.getIssuerName());
		System.out.println("c2 - id = " + c2.getIdCert() + ", iName = " + c2.getIssuerName());
		
		//c2 = c1;
		c2 = c1.myClone();
		c2.setIdCert(333);
		
		System.out.println("c1 - id = " + c1.getIdCert() + ", iName = " + c1.getIssuerName());
		System.out.println("c2 - id = " + c2.getIdCert() + ", iName = " + c2.getIssuerName());		

	}
}
