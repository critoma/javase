package eu.ase.jaxb;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import eu.ase.jaxb.Book;
import eu.ase.jaxb.BookStore;

public class BookProgMain {

  private static final String BookStore_XML = "./BookStore-jaxb.xml";

  public static void main(String[] args) throws JAXBException, IOException {

    ArrayList<Book> bookList = new ArrayList<Book>();

    // create books
    Book book1 = new Book();
    book1.setIsbn("978-0060554736");
    book1.setName("The Game");
    book1.setAuthor("Neil Strauss");
    book1.setPublisher("Harpercollins");
    bookList.add(book1);

    Book book2 = new Book();
    book2.setIsbn("978-3832180577");
    book2.setName("Feuchtgebiete");
    book2.setAuthor("Charlotte Roche");
    book2.setPublisher("Dumont Buchverlag");
    bookList.add(book2);

    // create BookStore, assigning book
    BookStore bookStore = new BookStore();
    bookStore.setName("Fraport BookStore");
    bookStore.setLocation("Frankfurt Airport");
    bookStore.setBookList(bookList);

    // create JAXB context and instantiate marshaller
    JAXBContext context = JAXBContext.newInstance(BookStore.class);
    Marshaller m = context.createMarshaller();
    m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

    // Write to System.out
    m.marshal(bookStore, System.out);

    // Write to File
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
  }
} 

