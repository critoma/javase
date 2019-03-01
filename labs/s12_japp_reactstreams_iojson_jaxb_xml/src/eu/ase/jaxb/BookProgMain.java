package eu.ase.jaxb;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

public class BookProgMain {

	private static final String BookStore_XML = "./BookStore-jaxb.xml";
	
	public static void main(String[] args) {
		ArrayList<Book> bookList = new ArrayList<>();

		Book book1 = new Book();
		book1.setIsbn("1234");
		book1.setName("The game");
		book1.setAuthor("Neil");
		book1.setPublisher("H1");
		
		Book book2 = new Book();
		book2.setIsbn("3333");
		book2.setName("The maze");
		book2.setAuthor("Gigel");
		book2.setPublisher("H2");
		
		bookList.add(book1);
		bookList.add(book2);
		
		BookStore bookStore = new BookStore();
		bookStore.setName("Fraport BookStore");
		bookStore.setLocation("Frankfurt am Main Airport");
		bookStore.setBookList(bookList);
		
		try {
			JAXBContext context = JAXBContext.newInstance(BookStore.class);
			Marshaller m = context.createMarshaller();
			m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			
			m.marshal(bookStore, System.out);
			m.marshal(bookStore, new File(BookStore_XML));

			// get variables from our xml file, created before
		    System.out.println();
		    System.out.println("Output from our XML File: ");
		    Unmarshaller um = context.createUnmarshaller();
		    BookStore bookStore2 = (BookStore) um.unmarshal(new FileReader(BookStore_XML));
		    ArrayList<Book> list = bookStore2.getBooksList();
		    for (Book book : list) {
		      System.out.println("Book: " + book.getName() + " from "
		          + book.getAuthor());
		    }
		} catch (JAXBException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
	}

}





