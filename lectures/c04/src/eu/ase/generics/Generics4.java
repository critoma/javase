package eu.ase.generics;

class Box<Ty> {

        private Ty object;

        public void add(Ty object) {
            this.object = object;
        }

        public Ty get() {
            return object;
        }
}

class BoxDemo4 {

    public static void main(String[] args) {

        // ONLY place Integer objects into this box!
        Box<Integer> integerBox = new Box<Integer>();

        integerBox.add(new Integer(10));
        Integer someInteger = integerBox.get();
		//200 code lines
		integerBox.add("100");
        System.out.println(someInteger);
    }
}


