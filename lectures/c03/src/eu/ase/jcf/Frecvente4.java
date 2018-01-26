package eu.ase.jcf;

//java Frecvente if it is to be it is up to me to delegate
import java.util.*;

class Frecvente 
{
	public static void main(String[] args) 
	{
		Map<String, Integer> m = new HashMap<String, Integer>();

		// Initialize frequency table from command line
		for (String a : args) 
		{
			Integer freq = m.get(a);
			m.put(a, (freq == null) ? 1 : freq + 1);
		}

		System.out.println(m.size() + " distinct words:");
		System.out.println(m);

		//utilizand clasa Hashtable rezulta dezavantaj ca:
		//---NU e de actualitate - 1. pentru iterare se foloseste interfata "Enumeration" in loc de interfata colectie "Collection"
		//2. nu se poate itera decat peste chei, valori si nu si peste perechea cheie-valoare
		//3. nu se pot sterge elemente in mod "safe" in mijlocul unei iteratii 
		Map<String, Integer> mh = new Hashtable<String, Integer>();

		// Initialize frequency table from command line
		for (String a : args) 
		{
			Integer freq = mh.get(a);
			mh.put(a, (freq == null) ? 1 : freq + 1);
		}

		System.out.println(mh.size() + " distinct words in hashtable:");
		System.out.println(mh);
                

		//1. get keys
                Set<String> s = mh.keySet();
		for (Iterator<String> k = s.iterator(); k.hasNext();)//putea fi pentru chei mh.keys() si daca se utiliza clasa Vector era doar mh.elements()
		       System.out.println(k.next());
        
                //2. get values
                Collection<Integer> c = mh.values();
                for (Iterator<Integer> v = c.iterator(); v.hasNext();)//putea fi pentru chei mh.keys() si daca se utiliza clasa Vector era doar mh.elements()
		       System.out.println(v.next());
        
	}
}