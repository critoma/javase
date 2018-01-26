package eu.ase.jcf;

import java.util.*;

class FindDups 
{
	public static void main(String[] args) 
	{
		String[] vs= {"eu", "vin", "eu", "vad", "eu", "plec"};

		Set<String> hs = new HashSet<String>();
		Set<String> lhs = new LinkedHashSet<String>();//HashSet <=> cu ordinea din stiva
		Set<String> ts = new TreeSet<String>();

		for (String a : vs)
			if (!hs.add(a))
			System.out.println("Au fost detectate duplicate: " + a);

		System.out.println(hs.size() + " cuvinte distincte HashSet: " + hs);

		for (String a : vs)
			if (!lhs.add(a))
			System.out.println("Au fost detectate duplicate: " + a);

		System.out.println(lhs.size() + " cuvinte distincte LinkedHashSet: " + lhs);

		for (String a : vs)
			if (!ts.add(a))
			System.out.println("Au fost detectate duplicate: " + a);

		System.out.println(ts.size() + " cuvinte distincte si ordonate TreeSet: " + ts);


		//bulk operation
		String[] ss1 = {"eu", "vin", "vad", "plec"};
		String[] ss2 = {"tu", "vii", "vezi", "plec"};

		Set<String> s1 = new HashSet<String>();
		for (String a : ss1) s1.add(a);
		Set<String> s2 = new HashSet<String>();
		for (String a : ss2) s2.add(a);
		
		Set<String> union = new HashSet<String>(s1);
		union.addAll(s2);
		System.out.println("reuniune: "+union);

		Set<String> intersection = new HashSet<String>(s1);
		intersection.retainAll(s2);
		System.out.println("intersectie: "+intersection);

		Set<String> difference = new HashSet<String>(s1);
		difference.removeAll(s2);
		System.out.println("diferenta: "+difference);
	}
}