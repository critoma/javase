package eu.ase.generics;

class Box {

        private Object object;

        public void add(Object object) {
            this.object = object;
        }

        public Object get() {
            return object;
        }
}

class BoxDemo1 {

    public static void main(String[] args) {

        // ONLY place Integer objects into this box!
        Box integerBox = new Box();

        //integerBox.add(new Integer(10));
		Integer ti = new Integer(10);
		integerBox.add(ti);
        Integer someInteger = (Integer)integerBox.get();
        System.out.println(someInteger);
    }
}


//Taman problema cu type cast exception din seminarul 2 si cursul 2 - 
//String -> Object -> musai String, altfel eroare
class BoxDemo2 {

    public static void main(String[] args) {

        // ONLY place Integer objects into this box!
        Box integerBox = new Box();

        // Imagine this is one part of a large application, modified by one programmer. 
        integerBox.add("10"); // note how the type is now String

        // ... and this is another, perhaps written by a different programmer
        Integer someInteger = (Integer)integerBox.get();
        System.out.println(someInteger);
    }
}


