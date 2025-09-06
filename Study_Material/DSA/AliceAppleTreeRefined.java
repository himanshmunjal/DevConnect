import java.util.Scanner;

public class AliceAppleTreeRefined {
    public static int findTreeLevel(int appleCount) {
        int n = 0;
        long sum = 0;
        while (sum < appleCount) {
            n++;
            sum += 12L * n * n;
        }
        return n;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter the number of apples: ");
        int apples = scanner.nextInt();
        
        int treeLevel = findTreeLevel(apples);
        
        System.out.println("The result is: " + (8 * treeLevel));
        scanner.close();
    }
}