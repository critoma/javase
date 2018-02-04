package eu.ase.reflection;

import java.io.*;
 
class ProgMainTString {
	public static void main(String[] args) {
		TString ts1 = new TString("Ana has ");

		char[] tsc2 = new char[]{'b','o','o','k','s'};
		TString ts2 = new TString(tsc2);
		
		ts1.concatenate(ts2);
		System.out.println(ts1.toString());

		TString[] vts = new TString[2];
		for(int i = 0; i < vts.length; i++)
			vts[i] = new TString("Text "+i);

		System.out.println(vts[1].toString());

	}
}
