public class Test {
    public static void main(String[] args) {

        // 1. Default constructor (capacity = 16)
        StringBuilder sb1 = new StringBuilder();
        sb1.append("Hello");
        System.out.println("sb1: " + sb1);

        // 2. Constructor with capacity
        StringBuilder sb2 = new StringBuilder(50);
        sb2.append("This has initial capacity 50");
        System.out.println("sb2: " + sb2);

        // 3. Constructor with String input
        StringBuilder sb3 = new StringBuilder("Geeks");
        sb3.append("ForGeeks");
        System.out.println("sb3: " + sb3);

        // 4. Constructor with CharSequence input
        CharSequence cs = "Java";
        StringBuilder sb4 = new StringBuilder(cs);
        sb4.append("Programming");
        System.out.println("sb4: " + sb4);
    }
}