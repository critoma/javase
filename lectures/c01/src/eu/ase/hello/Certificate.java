package eu.ase.hello;

public class Certificate
{
 private int uid;
 private String issuerName;

 public Certificate() {
   this.uid = 0;
   this.issuerName = null;
 }

 public Certificate(int uidp, String issuerNamep) {
  this.uid = uidp;
  this.issuerName = issuerNamep;
 }

 public int getUid() {
   return this.uid;
 }

 public void setUid(int c) {
  this.uid = c;
 }

 public String getIssuerName() {
   return this.issuerName;
 }

 public void setIssuerName(String n) {
  this.issuerName = n;
 }

 public String toString() {
   return new String("\tUid = "+this.uid+" , Issuer = "+this.issuerName);
 }

 public Certificate cloneaza() {
  Certificate temp = new Certificate();
  temp.uid = this.uid;
  //temp.issuerName = this.issuerName;
  temp.issuerName = new String(this.issuerName);
  return temp;
 }

 @Override
 public boolean equals(Object o) {
	if(this.uid == o.uid)
		return true;
	else
		return false;
 }

} //end class Certificate
