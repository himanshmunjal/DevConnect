public class Stack {
    private int size;
    private int[] stack;
    private int top;
    public Stack(int max){
        size = max;
        stack = new int[max];
        top = -1;
    }
    public void push(int value){
        if(top==size-1){
            System.out.println("Stack overflow");
            return;
        }
        stack[++top] = value;
    }
    public int pop(){
        if(top==-1){
            System.out.println("Stack underflow");
            return -1;
        }
        int ele = stack[top--];
        return ele;
    }
    public int top(){
        if(top==-1){
            System.out.println("Stack underflow");
            return -1;
        }
        int ele = stack[top];
        return ele;
    }
    public boolean isEmpty() {
        return (top == -1);
    }
    public int search(int value) {
        for (int i = top; i >= 0; i--) {
            if (stack[i] == value) {
                return top - i;
            }
        }
        return -1;
    }

    public int searchByIndex(int index) {
        if (index >= 0 && index <= top) {
            return stack[top - index];
        }
        System.out.println("Invalid index");
        return -1;
    }
    public void printStack() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return;
        }
        System.out.print("Stack elements: ");
        for (int i = top; i >= 0; i--) {
            System.out.print(stack[i] + " ");
        }
        System.out.println();
    }
    public static void main(String[] args){
        Stack st = new Stack(10);
        st.push(1);
        st.push(2);
        st.printStack();
    }
}
