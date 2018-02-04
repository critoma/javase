package eu.ase.annotations;

import java.io.*;
 
class ProgMainTString {
	@SuppressWarnings({"deprecation"})
	public static void main(String[] args) {
		TString ts1 = new TString("Ana are ");

		char[] tsc2 = new char[]{'c','a','r','t','i'};
		TString ts2 = new TString(tsc2);
		
		ts1.concatenate(ts2);
		System.out.println(ts1.toString());

		TString[] vts = new TString[2];
		for(int i = 0; i < vts.length; i++)
			vts[i] = new TString("Text "+i);

		System.out.println(vts[1].toString());

	}
}
