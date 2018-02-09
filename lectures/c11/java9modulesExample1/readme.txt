1.
http://www.oracle.com/technetwork/java/javase/downloads/jdk9-downloads-3848520.html

2.
https://dzone.com/articles/java-9-tutorial-step-by-step-from-zero-to-modules

https://blog.codefx.org/java/java-module-system-tutorial/
https://examples.javacodegeeks.com/core-java/java-9-modules-tutorial/


MacOS:
Cristians-MacBook-Pro:testproj001 ctoma$ export PATH=/Library/Java/JavaVirtualMachines/jdk1.8.0_74.jdk/Contents/Home/bin:$PATH
Cristians-MacBook-Pro:testproj001 ctoma$ javac -version
javac 1.8.0_74
Cristians-MacBook-Pro:testproj001 ctoma$ export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
Cristians-MacBook-Pro:testproj001 ctoma$ javac -version
javac 9.0.1
Cristians-MacBook-Pro:testproj001 ctoma$ java -version
java version "9.0.1"
Java(TM) SE Runtime Environment (build 9.0.1+11)
Java HotSpot(TM) 64-Bit Server VM (build 9.0.1+11, mixed mode)
Cristians-MacBook-Pro:testproj001 ctoma$ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

Linux Ubuntu:
stud@stud-VirtualBoxU16x64:~/javase$ export JAVA_HOME=/opt/software/java/jdks/jdk1.8.0_161
stud@stud-VirtualBoxU16x64:~/javase$ export JAVA_HOME=/opt/software/java/jdks/jdk-9.0.4

export PATH=$PATH:.:$JAVA_HOME/bin

cd /home/stud/javase/lectures/c01/testprojmodulesj9

MacOS:

mkdir testproj001
cd testproj001/

Cristians-MacBook-Pro:testproj001 ctoma$ pwd
/Users/ctoma/Workspaces/EclipseProjects/jdk9/testproj001

mkdir src
mkdir src/com.me.mymodule




Cristians-MacBook-Pro:testproj001 ctoma$ ls src
com.me.mymodule

Cristians-MacBook-Pro:testproj001 ctoma$ touch src/com.me.mymodule/module-info.java
Cristians-MacBook-Pro:testproj001 ctoma$ ls src/com.me.mymodule/
module-info.java

mkdir -p src/com.me.mymodule/com/me/mymodule
touch src/com.me.mymodule/com/me/mymodule/Main.java

Cristians-MacBook-Pro:testproj001 ctoma$ ls src/com.me.mymodule/
com			module-info.java
Cristians-MacBook-Pro:testproj001 ctoma$ ls src/com.me.mymodule/com/me/mymodule/
Main.java

mkdir -p mods/com.me.mymodule


javac -d mods/com.me.mymodule \
           src/com.me.mymodule/module-info.java \
           src/com.me.mymodule/com/me/mymodule/Main.java

java --module-path mods -m com.me.mymodule/com.me.mymodule.Main


3. 
http://www.baeldung.com/new-java-9
https://www.journaldev.com/13121/java-9-features-with-examples
https://www.journaldev.com/13106/java-9-modules
https://blog.codefx.org/java/java-module-system-tutorial/
