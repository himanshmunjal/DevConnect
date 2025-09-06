public class atoi {
    public static int myAtoi(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }
        int i = 0;
        int n = s.length();
        
        while (i < n && Character.isWhitespace(s.charAt(i))) {
            i++;
        }

        int sign = 1;
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            sign = (s.charAt(i) == '-') ? -1 : 1;
            i++;
        }

        // 3. Parse digits
        long result = 0;
        while (i < n && Character.isDigit(s.charAt(i))) {
            int digit = s.charAt(i) - '0';
            result = result * 10 + digit;
            
            // 4. Handle overflow
            if (sign * result > Integer.MAX_VALUE) {
                return Integer.MAX_VALUE;
            }
            if (sign * result < Integer.MIN_VALUE) {
                return Integer.MIN_VALUE;
            }
            i++;
        }
        
        return (int) (sign * result);
    }

    public static void main(String[] args) {
        String s = "   -042";
        System.out.println(myAtoi(s)); // Prints: -1234567
    }
}