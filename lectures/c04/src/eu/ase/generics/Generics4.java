package eu.ase.generics;

class Box<T> {

        private T object;

        public void add(T object) {
            this.object = object;
        }

        public T get() {
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


