#!/bin/sh

export JAVA_HOME=/opt/software/java/jdks/jdk1.8.0_161
export PATH=$JAVA_HOME/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games
export CLASSPATH=.:$JAVA_HOME/jre/lib
export JSE=/home/stud/javase/lectures

cd $JSE/c03/src
javac eu/ase/polimorfism/IMiscare.java
javac eu/ase/polimorfism/Vehicul.java
javac eu/ase/polimorfism/IAuto.java
javac eu/ase/polimorfism/Auto.java
javac eu/ase/polimorfism/Avion.java
javac eu/ase/polimorfism/ProgMain.java

java eu/ase/polimorfism/ProgMain
