---
title: Java并发
date: 2022-10-10
sidebar: 'auto'
# sidebarDepth: 2
categories:
 - Java
tags:
- Java并发
author: ivem
publish: true
---
## 线程
### 创建线程方式

1. **继承或直接使用Thread类**
- 定义Thread类的子类并重写该类的run方法。run方法的方法体代表了线程要完成的任务。
- 创建Thread子类实例，即创建了线程对象。
- 调用线程对象的start方法来启动该线程。
```java
// 构造方法的参数是给线程指定名字，推荐
Thread t1 = new Thread("t1"){
    @Override
    // run 方法内实现了要执行的任务
    public void run() {
        log.debug("hello");
    }
};
t1.start();
```

2. **实现runnable接口+Thread**
- 定义Runnable接口的实现类并重写该接口的run方法。
- 创建Runnable实现类的实例，并以此实例作为Thread类的target参数来创建 Thread对象，该Thread对象是真正的线程对象。
- 调用线程对象的start方法来启动该线程。
这种方式优于继承Thread类，因为Java不支持多重继承，如果继承了Thread类就无法继承其它类，这不利于扩展。
```java
// 创建任务对象
Runnable task = new Runnable() {
    @Override
    public void run() {
        log.debug("hello");
    }
};
// 参数1是任务对象,参数2是线程名字，推荐
Thread t2 = new Thread(task, "t2");
t2.start();
```

3. **Callable+FutureTask+Thread**
- 创建Callable接口的实现类并实现 call 方法。 该call方法将作为线程执行体，并且有返回值。
- 创建Callable实现类的实例，使用 FutureTask类来包装Callable对象，该 FutureTask对象封装了该 Callable 对象的 call 方法的返回值。
- 使用FutureTask对象作为Thread对象的target，创建并启动新线程。
- 调用FutureTask对象的 get 方法来获得线程执行结束后的返回值。
```java
FutureTask<Integer> task3 = new FutureTask<>(new Callable<Integer>() {
    @Override
    public Integer call() throws Exception {
        log.debug("running...");
        Thread.sleep(1000);
        return 1;
    }
});
// 主线程阻塞，同步等待task执行完毕的结果
Thread t3 = new Thread(task3, "t3");
t3.start();
```
**Callable和Runnable区别**

- Runnable 接口 run 方法无返回值；Callable 接口 call 方法有返回值，是个泛型，和Future、FutureTask配合可以用来获取异步执行的结果
- Runnable 接口 run 方法只能抛出运行时异常，且无法捕获处理；Callable 接口 call 方法允许抛出异常，可以获取异常信息
### 线程状态
java.lang.Thread.State 中定义了 6 种不同的线程状态，在给定的一个时刻，线程只能处于其中的一个状态。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1661327132843-e0191580-13a7-4f15-b12b-f4bcc64517e9.png#clientId=uc1cd90e0-d8eb-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=312&id=u4ebb0ec4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=771&originWidth=1155&originalType=binary&ratio=1&rotation=0&showTitle=false&size=305543&status=done&style=none&taskId=u729bfae6-56cc-4f8d-bb82-43b3fc07331&title=&width=467.5)
**新建New**：新创建一个线程对象，还没有调用start()方法。
**运行Runnable：**在操作系统层面，Runnable包含就绪和运行中两种状态。调用了 start 方法之后，线程就进入了就绪阶段。此时线程不会立即执行run方法，而是等待获取CPU资源。当线程获得CPU时间片后，就会进入运行状态，开始执行run方法。一个运行中的线程调用Thread.yield 方法会使当前线程让出CPU时间片，从运行态变成就绪状态，然后和其他线程重新竞争CPU 的使用权。线程调用start 方法会进入就绪状态，获得CPU时间片后进入运行状态，开始执行run方法。run方法是线程的执行体。它包含了要执行的这个线程的内容，run方法运行结束，此线程随即终止。
> start 方法会启动线程，然后 JVM 会让这个线程去执行 run 方法。run 方法是线程的执行体。它包含了要执行的这个线程的内容，run方法运行结束，此线程随即终止。Java 线程是不允许启动两次，第二次调用必然会抛出 IllegalThreadStateException，这是一种运行时异常，多次调用 start 被认为是编程错误。直接调用 Thread 的 run 方法，它的行为就会和普通的方法一样。

**阻塞Blocked：**阻塞状态表示线程在等待获取共享资源的对象锁。synchronized 修饰的方法、代码块同一时刻只允许一个线程执行。因此，如果线程A获取了共享资源的对象锁，那么其他线程处于阻塞状态。
**等待Waiting：**等待状态表示线程进行等待状态，直到被其他线程显式地唤醒。 阻塞是被动的，它是在等待获取对象锁，等待是主动的。比如一个运行中的线程调用了锁对象的wait()方法，该线程会释放当前持有的monitor对象锁，同时进入_WaitSet集合中也就是进入等待状态，等待其他线程调用锁对象的notify() 方法或 notifyAll()方法唤醒它。另一方面，join方法会让线程从Running状态转入Waiting状态。当调用了join方法后，当前线程必须等待调用join方法的线程结束后才能继续执行。

| 进入方法 | 退出方法 |
| --- | --- |
| 没有设置 Timeout 参数的 `Object.wait`方法 | `Object.notify`和`Object.notifyAll` |
| 没有设置 Timeout 参数的 `Thread.join`方法 | 被调用的线程执行完毕 |
| `LockSupport.park`方法（Java 并发包中的锁，都是基于它实现的） | `LockSupport.unpark` |

> wait和notify方法：线程调用了锁对象的wait()方法，那么这个线程会释放当前持有的monitor对象锁，同时这个线程会进入_WaitSet集合中等待其他线程调用锁对象的notify() 方法或 notifyAll()方法唤醒它。wait和notify要放在在synchronized代码块中。
> join方法：会让线程从Running状态转入Waiting状态。当调用了join方法后，当前线程必须等待调用join方法的线程结束后才能继续执行。

**定时等待Timed waiting**
定时等待状态是设置了一个固定等待时间的Waiting状态，它无需等待其它线程显式地唤醒，在一定时间之后会被系统自动唤醒。比如一个运行中的线程调用Thread.sleep方法会让该线程从 Running状态转入Waiting 状态，**但是不会释放锁**，等时间结束后再变为运行状态。

| 进入方法 | 退出方法 |
| --- | --- |
| `Thread.sleep`方法 | 时间结束 |
| 获得`synchronized`隐式锁的线程，调用设置了 Timeout 参数的 `Object.wait`方法 | 时间结束 或`Object.notify`或`Object.notifyAll` |
| 设置了 Timeout 参数的 `Thread.join`方法 | 时间结束 或 被调用的线程执行完毕 |
| `LockSupport.parkNanos`方法 | `LockSupport.unpark` |
| `LockSupport.parkUntil`方法 | `LockSupport.unpark` |

> Thread.sleep 使当前正在执行的线程进入休眠状态。sleep方法会让线程从 Running状态转入Waiting 状态。
> Thread 类的 sleep 和 yield 方法是处理 Running 状态的线程。所以在其他处于非 Running 状态的线程上执行这两个方法是没有意义的。这就是为什么这些方法是静态的。它们可以在当前正在执行的线程中工作，并避免程序员错误的认为可以在其他非运行线程调用这些方法。

**终止Terminated：**线程执行完 run 方法，或者因异常退出了 run 方法。此状态意味着：线程结束了生命周期。
### 多线程代码demo
```java
public class MessageQueue {
    private LinkedList<Message> list = new LinkedList<>();// 消息的队列集合
    private int capacity;//队列容量
    public MessageQueue(int capacity) {
        this.capacity = capacity;
    }

    // 获取消息
    public Message get() {
        // 检查队列是否为空
        synchronized (list) {
            while (list.isEmpty()) {
                try {
                    System.out.println(Thread.currentThread().getName() + ":队列为空，消费者线程等待");
                    list.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            Message message = list.removeFirst(); // 从队列的头部获取消息返回
            System.out.println(Thread.currentThread().getName() + "：已消费消息--" + message);
            list.notifyAll();
            return message;
        }
    }

    // 存入消息
    public void put(Message message) {
        synchronized (list) {
            // 检查队列是否满
            while (list.size() == capacity) {
                try {
                    System.out.println(Thread.currentThread().getName()+":队列为已满，生产者线程等待");
                    list.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            list.addLast(message);  // 将消息加入队列尾部
            System.out.println(Thread.currentThread().getName() + ":已生产消息--" + message);;
            list.notifyAll();
        }
    }

    public static void main(String[] args) {
        MessageQueue queue = new MessageQueue(2);
        for (int i = 0; i < 3; i++) {
            int id = i;
            new Thread(() -> {
                queue.put(new Message(id,"值"+id));
            }, "生产者" + i).start();
        }

        new Thread(() -> {
            while (true) {
                try {
                    Thread.sleep(1000);
                    Message message = queue.get();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"消费者").start();
    }
}
```
```java
public class PrintABC {
    private int num;
    private int maxnum = 10;
    private static final Object LOCK = new Object();

    private void printABC(int targetNum) {
        for(int i = 0; i < 10; i++){
            synchronized (LOCK) {
                while (num % 3 != targetNum) {
                    if(num >= maxnum) break;
                    try {
                        LOCK.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                if(num >= maxnum) break;
                num++;
                System.out.println(Thread.currentThread().getName() + num);
                LOCK.notifyAll();
            }
        }
    }

    public static void main(String[] args) {
        PrintABC printABC = new PrintABC();

        new Thread(() -> {
            printABC.printABC(0);
        }, "A").start();
        new Thread(() -> {
            printABC.printABC(1);
        }, "B").start();
        new Thread(() -> {
            printABC.printABC(2);
        }, "C").start();
    }
}
```
```java
public class PrintOddEven {
    private Object obj = new Object();
    private volatile int count = 1;
    private void printOddEven() {
        synchronized (obj){
            while (count < 10){
                try {
                    System.out.print(Thread.currentThread().getName() + ": ");
                    System.out.println(count++);
                    obj.notifyAll();
                    obj.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            // 防止count=10后，while()循环不再执行，有子线程被阻塞未被唤醒，导致主线程不能退出
            obj.notifyAll();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        PrintOddEven oddEven = new PrintOddEven();
        new Thread(() -> oddEven.printOddEven(), "odd").start();
        Thread.sleep(10); //为了保证线程odd先拿到锁
        new Thread(() -> oddEven.printOddEven(), "even").start();
    }
}
```
**死锁检测**：

- 通过jps确定当前执行任务的进程号
- 执行jstack命令查看当前进程堆栈信息

**死锁预防**：

- 以确定的顺序获得锁
- 超时释放锁
```java
public class DeadLock {
    public static void sleep(double seconds){
        try {
            Thread.sleep((long) seconds*1000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void test(){
        Object A = new Object();
        Object B = new Object();

        Thread t1 = new Thread(()->{
            synchronized (A){
                System.out.println("lock A");
                sleep(1);
                synchronized (B){
                    System.out.println("lock B");
                }
            }
        }, "t1");

        Thread t2 = new Thread(()->{
            synchronized (B){
                System.out.println("lock B");
                sleep(0.5);
                synchronized (A){
                    System.out.println("lock A");
                }
            }
        });
        t1.start();
        t2.start();
    }

    public static void main(String[] args) {
        test();
    }
}
```

### 用户线程与守护线程

- 守护线程是在后台执行并且不会阻止 JVM 终止的线程。当所有非守护线程结束时，程序也就终止，同时会杀死所有守护线程。
- 用户线程可以理解为是系统的工作线程，它会完成这个程序需要完成的业务操作。如果用户线程全部结束了，意味着程序需要完成的业务操作已经结束了，系统可以退出了。所以当系统只剩下守护进程的时候，java虚拟机会自动退出。
- 守护线程的优先级比较低，用于为系统中的其它对象和线程提供服务。典型的应用就是垃圾回收器。

<Vssue />
