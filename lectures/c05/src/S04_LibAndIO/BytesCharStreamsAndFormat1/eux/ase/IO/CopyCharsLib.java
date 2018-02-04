package eu.ase.IO;

import java.io.FileReader;
import java.io.FileWriter;

import java.io.BufferedReader;
import java.io.PrintWriter;

import java.io.IOException;

public class CopyCharsLib {
    public void copyFiles(String inName, String outName) throws IOException {
        FileReader inputStream = null;
        FileWriter outputStream = null;

        try {
            inputStream = new FileReader(inName);
            outputStream = new FileWriter(outName);

            int c;
            while ((c = inputStream.read()) != -1) {
                outputStream.write(c);
            }
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
            if (outputStream != null) {
                outputStream.close();
            }
        }
    }


    //character stream + buffered streams (flush - property)
    //Buffered: BufferedInputStream / BufferedOutputStream <=> 4 byte level
    //          BufferedReader      / BufferedWriter <=> 4 character level
    public void copyFilesWithCharset(String inName, String outName, String charsetName) throws IOException {
        BufferedReader inputStream = null;
        PrintWriter outputStream = null;

        try {
            inputStream = new BufferedReader(new FileReader(inName));
	    //outputStream = new PrintWriter(new FileWriter(outName));
            outputStream = new PrintWriter(outName, charsetName);

            String linie;
            while ((linie = inputStream.readLine()) != null) {
                outputStream.println(linie);
            }
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
            if (outputStream != null) {
                outputStream.close();
            }
        }
    }
}