public class seive {
    public static void checkPrime(int num){
        boolean prime[] = new boolean[num+1];
        for(int i=2;i<=num;i++){
            prime[i] = true;
        }

        for(int i=2;i*i<=num;i++){
            if(prime[i]){
                for(int j=i;j*i<=num;j++){
                    prime[j*i] = false; 
                }
            }
        }

        for(int i=2;i<=num;i++){
            if(prime[i]){
                System.out.println(i+" ");
            }
        }
    }
    public static void main(String args[]){
        checkPrime(20);
    }
}
