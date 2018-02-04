package eu.ase.stax_xml;

import java.util.List;

public class TestRead {
  public static void main(String args[]) {
    StaXParser read = new StaXParser();
    //List<Item> readConfig = read.readConfig("config.xml");
    List<Item> readConfig = read.readConfig(args[0]);
    for (Item item : readConfig) {
      System.out.println(item);
    }
  }
}
