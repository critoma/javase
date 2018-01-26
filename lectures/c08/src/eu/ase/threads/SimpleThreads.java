package eu.ase.threads;


//exemplu din tutorialele de la Sun
public class SimpleThreads {

    //Display a message, preceded by the name of the current thread
    static void threadMessage(String message) {
        String threadName = Thread.currentThread().getName();
        System.out.format("%s: %s%n", threadName, message);
    }//end static method threadMessage

    private static class MessageLoop implements Runnable {
        public void run() {
            String importantInfo[] = {
                "Mesaj 1",
                "Mesaj 2",
                "Mesaj 3",
                "Mesaj 4"
            };
            //while (true) {//comentariu--daca ramane aici va fi bucla infinita
            //si se pierde de sub control deoarece iese din while(t.isAlive)
            try {
                while (true) {//comentariu--de rulat in ambele varinate
                   for (int i = 0; i < importantInfo.length; i++) {
                    //Pause for 4 seconds
                    Thread.sleep(4000);
                    //Print a message
                    threadMessage(importantInfo[i]);
                   }//end for
                }//end while
            } catch (InterruptedException e) {
                threadMessage("I wasn't done!");
            }
            //}//end while
        }
    }

    public static void main(String args[]) throws InterruptedException {


        //Delay, in milliseconds before we interrupt MessageLoop
        //thread (default one minute).
        long patience = 1000 * 60 * 1;

        //If command line argument present, gives patience in seconds.
        if (args.length > 0) {
            try {
                patience = Long.parseLong(args[0]) * 1000;
            } catch (NumberFormatException e) {
                System.err.println("Argument must be an integer.");
                System.exit(1);
            }
        }

        threadMessage("Starting MessageLoop thread");
        long startTime = System.currentTimeMillis();
        Thread t = new Thread(new MessageLoop());
        t.start();

        threadMessage("Waiting for MessageLoop thread to finish");
        //loop until MessageLoop thread exits
        while (t.isAlive()) {
            threadMessage("Still waiting...");
            //Wait maximum of 1 second for MessageLoop thread to finish.
            t.join(1000);
            if (((System.currentTimeMillis() - startTime) > patience) && t.isAlive()) {
                threadMessage("Tired of waiting!");
                t.interrupt();
                //Shouldn't be long now -- wait indefinitely
                t.join();
            }

        }
        threadMessage("Finally!");
    }//end public static void main

}//end public class SimpleThreads