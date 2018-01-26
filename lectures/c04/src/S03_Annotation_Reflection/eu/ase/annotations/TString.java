package eu.ase.annotations;

import java.lang.Object;

public class TString extends Object implements Cloneable
{
	private int length;
	//public int length;
	private char[] container;

	public TString() {
		this.length = 0;
		this.container = null;
	}

	public TString(char[] content) {
		this.length = content.length;
		this.container = new char[this.length];
		for(int i = 0; i < this.length; i++)
			this.container[i] = content[i];
	}

	public TString(String content) {
		this.length = content.length();
		this.container = new char[this.length];
		for(int i = 0; i < this.length; i++)
			this.container[i] = content.charAt(i);
	}

	public Object clone() {
		TString newOb = null;
		try {
			newOb = (TString)super.clone(); //nu se recomanda alocare cu "new", conform specificatiilor
		} catch(java.lang.CloneNotSupportedException cnse) {
			cnse.printStackTrace();
		}

		return newOb;
	}	

	//@Override
	//public boolean equals(Object o) {
	@Override
	public boolean equalss(Object o) {//exception at compile time
        	if (!(o instanceof TString))
            		return false;

        	TString no = (TString)o;

		boolean bv = true;
		for(int i = 0; i < this.length; i++)
			if(this.container[i] != no.container[i]) {
				bv = false;
				break;
			}

		return (no.length == this.length) && bv;
    }
	
	public String toString() {
		return "eu.ase.addnotations.TString -> length: "+this.length+" , container = "+new String(this.container);
	}

	public int getLength() {
		return this.length;
	}
	
	@Deprecated
	public TString concatenate(TString ob) {

	//public TString concatenate(TString ob) {
		if(ob != null) {
			int newlen = this.length + ob.length;
			char[] newContainer = new char[newlen];
			int i = 0, j = 0;
			for(i = 0; i < this.length; i++)
				newContainer[i] = this.container[i];//System.arrayCopy(...);
			for(i = this.length, j = 0; i < newlen; i++, j++)
				newContainer[i] = ob.container[j];//System.arrayCopy(...);

			this.length = newlen;
			this.container = newContainer;
		}
		return this;
	}
}
