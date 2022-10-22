---
title: Java基础
date: 2022-10-10
sidebar: 'auto'
# sidebarDepth: 2
categories:
 - Java
tags:
- Java基础
author: ivem
publish: true
---

#### 导图总览

![java基础](https://raw.githubusercontent.com/ivemcel/pictures/main/java%E5%9F%BA%E7%A1%80.png)

### Java基本特性

**面向过程**把问题分解为很多个小步骤(模块化)，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就行了。**面向对象**是把构成的问题抽象为各个对象，然后给对象赋一些属性和方法，然后让每个对象去执行自己的方法，去解决问题。
**封装**：提供对外访问的接口。封装将类的信息隐藏在类内部（设置属性是private类型），不允许外部程序直接访问，但允许通过该类的方法实现对隐藏信息的操作和访问。 
**继承**：继承父类非私有属性和方法。新类继承父类的非私有属性和方法，扩展新的能力，提高程序的复用性和维护性。在Java中，类之间是单继承的，一个类只能有一个直接父类，而父类可以有多个子类。原因是为了简单安全。当类可以多继承类时，被继承的不同的父类可能会有同名同参的方法，如果子类也没有重写这个同名同参的方法，则在子类的实例调用这个方法的时候就会出现冲突。比如class A继承了class B 和class C， 但是 class B和class C中有一个同名同参的方法method，且在A中并没有重写方法method，那在A的实例中调用method方法就会出现冲突，jvm就会不知道到底该调用哪一个方法。
**多态(动态多态)**：事物在运行过程中存在不同的状态。编译器运行期才知道引用变量到底指向哪个类的实例对象。多态条件一是继承关系，二是父类引用指向子类对象。当父类的引用指向子类对象时，就发生了向上转型，即把子类类型对象转成了父类类型。向上转型的好处是隐藏了子类类型，提高了代码的扩展性。 但向上转型也有弊
端，只能使用父类共性的内容，而无法使用子类特有功能，功能有限制。
成员变量和静态方法：编译运行看左边
成员方法：编译看左，运行看右
```java
public class Animal {
    public  int age = 5;
    public void eat(){
        System.out.println("父类eat()方法");
    }
}

public class Cat extends Animal{
    public int age = 3;
    public int num = 6;
    @Override
    public void eat(){
        System.out.println("子类重写父类eat()方法");
    }

    public void catchMouse(){
        System.out.println("子类特有方法catchMouse()");
    }

    public static void main(String[] args) {
        Animal animal = new Cat(); // 多态(向上转型)
        // 引用变量animal指向的成员变量和静态方法都是父类的，编译时父类没有就报错
        System.out.println(animal.age);
        // 编译时查看父类是否有该成员方法，没有报编译异常，有的话【子类发生了复写就与子类一致】。
        animal.eat();
        // 对象一旦向上转型为父类，那么就无法调用子类原本特有的内容。
        // animal.catchMouse(); // 错误写法！
        // 向下转型，进行“还原”动作。将父类对象还原为本来的子类对象
        Cat cat = (Cat) animal;
        cat.catchMouse();

    }
}
```
**Java和C++区别**

- Java 是纯粹的面向对象语言，所有的对象都继承自 java.lang.Object，C++ 兼容 C ，不但支持面向对象也支持面向过程。 
- Java 通过虚拟机从而实现跨平台特性， C++ 依赖于特定的平台。 
- Java 没有指针，它的引用可以理解为安全指针，而 C++ 具有和 C 一样的指针。 
- Java 支持自动垃圾回收，而 C++ 需要手动回收。 
- Java 不支持多重继承，只能通过实现多个接口来达到相同目的，而 C++ 支持多重继承。
### 访问修饰符
**构造方法**：名字与类名**相同**、**没有返回值**（void也不行）、**生成类的对象时自动执行**，无需调用。

| **修饰符** | **当前类** | **同包内** | **子类(不同包)** | **同一个工程** | **说明** |
| --- | --- | --- | --- | --- | --- |
| public | ✔️ | ✔️ | ✔️ | ✔️ | 公共访问权限 |
| protected | ✔️ | ✔️ | ✔️ |  | 子类访问权限 |
| default | ✔️ | ✔️ |  |  | 包访问权限 |
| private | ✔️ |  |  |  | 类访问权限 |

### 重写和重载
**方法**重写（Override）：从父类继承的方法不符合子类的功能需求，子类可以重新实现父类的方法。原则：**一同两小一大**。
一同：方法名和参数列表（方法签名）必须相同；两小：子类方法的返回值类型和父类方法的返回类型相同或者是父类方法返回类型的子类；子类方法声明抛出的异常类型必须和父类方法声明抛出的异常类型相同或者是其子类。一大：子类方法的访问权限与父类方法访问权限相同或者更大。
**方法**重载（Overload）：在同一个类中，方法名字相同，而方法参数不同。（静态多态）

| **区别点** | **方法重写** | **方法重载** |
| --- | --- | --- |
| 参数列表 | 必须相同 | 必须不同 |
| 返回类型 | 两小 | 无限制 |
| 抛出异常 | 两小 | 无限制 |
| 访问权限 | 一大 | 无限制 |

### 接口和抽象类
从语法角度，在Java中被abstract关键字修饰的类称为抽象类，被abstract关键字修饰的方法称为抽象方法，抽象方法只有方法的声明，没有方法体。
**抽象类特点**：

- 抽象类不能被实例化只能被继承；
- 包含抽象方法的一定是抽象类，但是抽象类不一定含有抽象方法；
- 一个子类继承一个抽象类，则子类必须实现父类抽象方法，否则子类也必须定义为抽象类；

**接口特点**：

- 接口不能直接使用，必须有一个实现类实现该接口中的所有抽象方法，然后通过创建实现类的对象进行使用接口。
   - JDK1.8之前，接口中可以包含常量和抽象方法。其中接口中的常量被隐式指定为public static final；(可以省略)，方法被隐式指定为public abstract(可以省略)。
   - 从JDK1.8开始，接口可以有默认方法和静态方法。接口的默认方法，可以通过接口实现类对象直接调用，也可以被接口实现类进行覆盖重写。接口的静态方法，直接通过接口名称调用，不能通过接口实现类的对象调用接口中的静态方法(一个类可以实现多个接口，其他接口中可能也有这样的静态方法，产生冲突)。
- 类与类之间是单继承的，一个类的直接父类只有一个，但是一个类可以同时实现多个接口。
   - 如果实现类所实现的多个接口当中，存在重复的抽象方法，那么只需要覆盖重写一次即可。
   - 如果实现类实现的多个接口当中，存在重复的默认方法，那么实现类一定要对冲突的默认方法进行覆盖重写。
- 接口与接口之间是多继承的，即一个接口可以继承多个接口。
   - 多个父接口当中的抽象方法可以重复。
   - 多个父接口当中的默认方法如果重复，那么子接口必须进行默认方法的覆盖重写。

**共同点**：

- 都不能被实例化。
- 接口的实现类实现接口才能被实例化；继承抽象类的子类实现抽象类中相应的方法才能被实例化。

**不同点：**

- 一个类可以实现多个接口，只能继承一个抽象类。
- 从设计层面来说，抽象是对类的抽象，是一种模板设计；接口是对行为的抽象，是一种行为的规范。
- 抽象类中可以有构造方法，是供子类创建对象时初始化父类成员使用的。
### 数据类型
| **基本数据类型** | **boolean** | **byte** | **short** | **int** | **char** | **long** | **float** | **double** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 占用字节 | 1 | 1 | 2 | 4 | 2 | 8 | 4 | 8 |
| 包装类 | Boolean | Byte | Short | Integer | Character | Long | Float | Double |

浮点数的精度误差，一般不能使用==、 !=比较。最简单的[比较方法](https://bot-man-jl.github.io/articles/?post=2020/Comparing-Floating-Point-Numbers)是直接比较两数差值的绝对值是否小于一个允许的误差值epsilon。
**引用数据类型**：数组、类、接口。引用数据类型封装了数据和处理该数据的方法。引用类型的对象要多储存对象头，比基本数据类型占用更大空间。
**包装类型**：为了能够将这些基本数据类型当成对象操作，Java为每一个基本数据类型都引入了对应的包装类型。Byte,Short,Integer,Long 这 4 种包装类默认创建了数值 [-128,127] 的相应类型的缓存数据，Character 创建了数值在[0,127]范围的缓存数据，Boolean 直接返回 True Or False。
**包装类作用**：

- 拥有了 Object 类的方法、可以存储 null 值。
- 可以把基本数据类型的值转换成字符串类型的值:
   - 调用toString()方法
   - 调用Integer.toString()得到字符串
   - 直接把基本数据类型+空字符串就得到了字符串（推荐）
- 把字符串类型的数值转换成对应的基本数据类型的值（重要）
   - Integer.parseInt(numStr)
   - Integer.valueOf(numStr) （推荐使用）

**装箱**：将基础类型转化为包装类型。**拆箱**：将包装类型转化为基础类型。
**值传递和引用传递：参数传递基本上就是赋值操作**。对于基本数据类型来说，传递的是基本类型的值。对于引用数据类型来说，传递的是它的内存地址值。
### this和super
**this**表示当前对象，**super**表示当前对象的父类对象。子类对象在初始化过程中，必须先调用父类构造器（默认会隐式调用父类无参构造器，如果父类没有提供无参构造器，子类必须显式地通过super调用父类带参构造器）而后再调用子类构造器。
this用法：

- 在本类成员方法中，访问本类的成员变量
- 在本类成员方法中，访问本类的另一个成员方法
- 在本类的构造方法中，访问本类的另一个构造方法

super用法:

- 在子类成员方法中，访问父类的成员变量
- 在子类成员方法中，访问父类的成员方法
- 在子类构造方法中，访问父类的构造方法
```java
public class Fu {
    int num = 10;

    public Fu(){
        System.out.println("父类构造方法执行！");
    }

    public void methodFu() {
        System.out.println("父类方法执行！");
    }

    public void method() {
        System.out.println("父类重名方法执行！");
    }
}
public class Zi extends Fu {
    int num = 20;

    public Zi(){
        //super(); // 必须放在第一行
        this(2); //放在第一行，super和this两种构造调用，不能同时使用
        System.out.println("子类构造方法执行！");
    }

    public Zi(int n){}

    public void methodZi() {
        System.out.println("子类方法执行！");
        int num = 30;
        System.out.println(num); // 30，局部变量
        System.out.println(this.num); // 20，本类的成员变量
        System.out.println(super.num); // 10，父类的成员变量
    }

    public void method(){
        System.out.println("子类重名方法执行！");
    }

}
```
### static
被static关键字修饰的内容都是静态的，而且是全局共享的，只会为其分配一次存储空间。

- 修饰成员变量。类中用static关键字修饰的成员变量称为静态成员变量，也称静态变量、类变量。
- 修饰成员方法。用static关键字修饰的方法称为静态方法，不能被重写。静态方法中只能访问所属类的静态成员变量和静态成员方法。
```java
public class A {
    private static int x;
    private int y;
    public static void func1(){
        int a = x;
        // Non-static field 'y' cannot be referenced from a static context
        // int b = y;  

        // 'A.this' cannot be referenced from a static context
        // int b = this.y;     
    }
}
```

- 修饰代码块。JVM在加载类的时候会执行静态代码块。静态代码块常用于初始化静态变量，只会被执行一次。
```java
public class A {
    static {
        System.out.println("123");
    }
    public static void main(String[] args) {
        A a1 = new A();
        A a2 = new A();
    }
}
```

- 修饰内部类。静态内部类可以不依赖外部类实例对象而被实例化。静态内部类不能与外部类有相同的名字，不能访问普通成员变量，只能访问外部类中的静态成员和静态成员方法。
```java
public class OuterClass {
    class InnerClass {}
    static class StaticInnerClass {}
    public static void main(String[] args) {
        // 'OuterClass.this' cannot be referenced from a static context
        // InnerClass innerClass = new InnerClass(); 
        OuterClass outerClass = new OuterClass();
        InnerClass innerClass = outerClass.new InnerClass();
        StaticInnerClass staticInnerClass = new StaticInnerClass();
    }
}
```
### final、finally、finalize 
**final关键字**表示最终、不可改变的。

- 修饰一个类时，那么这个类将不能够被继承，所以它不能作为父类，不能和Abstract关键字共存
- 修饰一个方法时，这个方法将不能被重写。
- 修饰局部变量时，那么这个变量就是不可变的。对于基本数据类型来说，不可变是变量中的数据不可改变。**对于引用数据类型来说，不可变是变量中的地址值不可改变，但是其中的内容是可以变的。**
- 修饰成员变量时，要么直接赋值，要么通过构造方法赋值

**finally是处理异常时的关键字**，可有可无，一般在需要释放资源时使用。 finally关键字修饰的代码块总会执行，无论是否产生了异常。但当遇到下面情况时不会执行：

- 当程序在进入try语句块之前就出现异常时会直接结束。
- 当程序在try块中强制退出时，如使用System.exit(0)，也不会执行finally块中的代码。

**finalize是Object类中的一个方法**，它会在GC清理对象之前调用一次，也仅仅只会调用一次，如果在这个对象中抛出异常，将会被忽略。
### String、StringBuffer、StringBuilder
**不可变对象**：对象一旦被创建后，对象所有的状态及属性在其生命周期内不会发生任何变化（线程安全）Java 中8种基本类型的包装类对象和 String 对象都属于不可变对象。从JDK1.8中的String类源码可以看出：

- String类用final关键字修饰，说明String类是不可继承的
- String类的成员变量value是个字符类型数组，是用private final进行的修饰。用private修饰说明是类私有的并且String 类没有对外提供修改这个数组的方法，所以它初始化之后外界没有有效的手段去改变它。用final修饰**说明value变量地址值是不变的，但是这个地址存储的数据是可以变的**。
```java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];  // String本质是个char数组，而且用final关键字修饰。
    /** Cache the hash code for the string */
    private int hash; // Default to 0
}
```
因此，当对String类对象进行修改时，会生成一个新的对象，然后将原来指针指向新的String对象
![image-20221022215717880](https://raw.githubusercontent.com/ivemcel/pictures/main/image-20221022215717880.png)
不可变对象的好处：

- 线程安全。同一个字符串实例可以被多个线程共享，因为字符串不可变，本身就是线程安全的。 
- 支持hash映射和缓存。String的hash值经常会使用到，比如作为 Map 的键，不可变的特性使得 hash 值也不会变，不需要重新计算。 
- 字符串常量池优化。String对象创建之后，会缓存到字符串常量池中，下次需要创建同样的对象时，可以直接返回缓存的引用，提高性能和减少内存开销。**字符串常量池**保存着所有字符串字面量，这些字面量在编译时期就确定。字符串常量池位于堆内存中，专门用来存储字符串常量。在创建字符串时，JVM首先会检查字符串常量池，如果该字符串已经存在池中，则返回其引用，如果不存在，则创建此字符串并放入池中，并返回其引用。
```java
String s2 = new String ("java"); // 会创建两个对象，一个在堆中，一个在字符串常量池
String s1 = "java"; // 直接赋值，在字符串常量池创建一个对象
```
**String类中equals()方法：**

1. 先对String对象和比较的对象进行比较，看是否指向同一个对象，如果true则是一个对象，值肯定相等；
2. 判断比较对象是不是String类型的，如果不是就返回False；
3. 如果是String类型，则比较两个String对象长度是否相等，不相等就返回False；
4. 最后再在循环里面一个一个字符进行比较，value是此String类的值的字符数组。

**String类中hashCode()方法**
如果两个对象相同，那么这两个对象的 hash值一定相等；两个对象的 hash 值相等，并不一定表示两个对象相同。
```java
public int hashCode() {
    int h = hash;
    if (h == 0 && value.length > 0) {
        char val[] = value;

        for (int i = 0; i < value.length; i++) {
            h = 31 * h + val[i];
        }
        hash = h;
    }
    return h;
}

public boolean equals(Object anObject) {
    if (this == anObject) {
    	return true;
	}
    if (anObject instanceof String) {
        String anotherString = (String)anObject;
        int n = value.length;
        if (n == anotherString.value.length) {
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
	return false;
}
```
**StringBuffer和StringBuilder是可变的**，在频繁操作字符串的情况下，使用StringBuffer和StringBuilder更加合适。StringBuffer 是线程安全的，内部使用 synchronized 进行同步。StringBuilder线程不安全，不需要同步，减少了开销。因此在单线程情况下，如果需要频繁的操作字符串，使用StringBuilder的效率较高。StringBuilder和StringBuffer应当指定初始容量，如果不指定，将会设置初始容量为16。因为它们的底层实现都是数组，当空间不足时，会触发扩容，然后进行拷贝，会耗时较长。
```java
private int newCapacity(int minCapacity) {
    // overflow-conscious code
    // 新容量=旧容量*2+2
    int newCapacity = (value.length << 1) + 2;
    if (newCapacity - minCapacity < 0) {
        newCapacity = minCapacity;
    }
    return (newCapacity <= 0 || MAX_ARRAY_SIZE - newCapacity < 0)
        ? hugeCapacity(minCapacity)
        : newCapacity;
}
```
### Object类
Java中Object类是其他类的公共最高父类，Object类常见方法：
`Class<?> getClass() `获取对象的运行时类
`wait()`和`notify()`见Java并发中线程知识
`String toString() `返回对象的字符串表示
`int hashCode() `和`boolean equals(Object obj)` 
hashCode()获取对象的 hash 值；equals()默认比较两个引用变量是否指向同一个对象。
【强制】关于 hashCode 和 equals 的处理, 遵循如下规则:

- 只要重㝍 equals, 就心须重写 hashCode。
- 因为 Set 存储的是不重复的对象, 依据 hashCode 和 equals 进行判断, 所以 Set 存储的对象必须重写这两个方法。
- 如果自定义对象作为 Map 的键, 那么必须重写 hashCode 和 equals。
- String 类中重写了 hashCode 和 equals 方法, 所以我们可以非常愉快地使用 String 对象 作为 key 来使用。

**==和equals区别：**对于基本数据类型来说，==比较的是值。对于引用数据类型来说，==比较的是对象的内存地址。equals()不能用于判断基本数据类型的变量，只能用来判断两个对象是否相等。默认是比较地址值，重写equals()了方法则按重写逻辑去比较。
`protected native Object clone()`
**浅拷贝**：对基本数据类型进行值传递，对引用数据类型进行引用的传递(内存地址的赋值)，没有创建一个新的对象。
**深拷贝**：对基本数据类型进行值传递，对引用数据类型创建一个新的对象，并且复制其内容。
对象实现深拷贝:

- 实体类实现Cloneable接口：Cloneable 接口只是规定，如果一个类没有实现 Cloneable 接口又调用了 clone() 方法，就会抛出 CloneNotSupportedException。
- 重写clone()方法：clone() 是 Object 的 protected 方法，它不是 public，一个类不显式去重写 clone()，其它类就不能直接去调用该类实例的 clone() 方法。
```java
public class Address {
    private String city;
}

public class Student implements Cloneable {
    private String name;
    private Integer age;
    private Address address; // address是引用类型
    
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
public class Address implements Cloneable{
    private String  city;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

public class Student implements Cloneable {
    private String name;
    private Integer age;
    private Address address;
   
    @Override
    protected Object clone() throws CloneNotSupportedException {
        Student s = (Student) super.clone();
        s.address = (Address) address.clone();
        return s;
    }
}
```
### 反射
Java 是静态的强类型语言，但是因为提供了类似反射等机制，也具备了部分动态类型语言的能力。
反射的含义就是在运行时动态的获取类的信息。在每一个类加载时，都会生成一个Class类型的对象称之为类对象，类对象是单例的，**在1.6及之前，类对象是存放在方法区中，1.6之后，类对象存放在Java堆中**。通过类对象可以访问类的所有信息(成员变量、构造方法、成员方法等)，包括使用private修饰符进行修饰的。类对象是反射的基础。
**方式：Class.forName()、类名.class、对象.getClass()**
```java
public class Student {
    private String name;
    public int age;

    public Student(){}

    private Student(String studentName) {
        this.name = studentName;
    }
    
    private String show(String message) {
        System.out.println("show: " + name + "," + age + "," + message);
        return "testReturnValue";
    }
}
// 通过全限定名来找到对象的类对象
Class studentClass = Class.forName("demo.Student"); 
// 通过类的class属性
Class studentClass = Student.class;
// 通过对象的getClass()函数
Student student = new Student();
Class studentClass = student.getClass();

// 通过类对象的newInstance()方法来获取类的实例
Student student = (Student) c.newInstance();  

Field studentNameField = studentClass.getDeclaredField("name");
studentNameField.setAccessible(true); // 访问私有属性
studentNameField.set(student, "小明");

Method studentShowMethod = studentClass.getDeclaredMethod("show", String.class);
studentShowMethod.setAccessible(true);
// 使用函数的invoke方法调用此函数
Object result = studentShowMethod.invoke(student, "message");
System.out.println("result: " + result);
```
### 注解
注解可以看成是java中的一种标记记号，用来给java中的类，成员，方法，参数等任何程序元素添加一些额外的说明信息，同时不改变程序语义。注解可以分为三类：标准注解，元注解，自定义注解。

1. **标准注解**
- @Deprecated：该注解用来说明程序中的某个元素（类、方法、成员变量等）已经不再使用，如果使用的话的编译器会给出警告。
- @SuppressWarnings(value=“”)：用来抑制各种可能出现的警告。
- @Override：用来说明子类方法重写了父类的方法，保护覆盖重写方法的正确使用
2. **元注解**（也称为元数据注解，是对注解进行标注的注解，元注解更像是一种对注解的规范说明，用来对定义的注解进行行为的限定。例如说明注解的生存周期，注解的作用范围等）
- @Target(value=“ ”)：该注解是用来限制注解的使用范围的，即该注解可以用于哪些程序元 素。
- @Retention(value=“ ”)：用于说明注解的生存周期
- @Documnent：用来说明指定被修饰的注解可以被javadoc.exe工具提取进入文档中，所有使 用了该注解进行标注的类在生成API文档时都在包含该注解的说明。
- @Inherited：用来说明使用了该注解的父类，其子类会自动继承该注解。
- @Repeatable：java1.8新出的元注解，如果需要在给程序元素使用相同类型的注解，则需将 该注解标注上。 
3. **自定义注解**：用@Interface来声明注解。
### 泛型

- 泛型提供了编译时类型安全检测机制，该机制允许程序员在编译时检测到非法的类型。泛型的本质是参数化类型，也就是说所操作的数据类型被指定为一个参数。
- Java的泛型基本上都是在编译器这个层次上实现的，在生成的字节码中是不包含泛型中的类型信息 的。使用泛型的时候加上类型参数，在编译器编译的时候会去掉，这个过程称为类型擦除。
- 泛型被类型擦除后都变成Object类型。但是Object类型不能指代像int，double这样的基本类型，只能指代Integer，Double这样的引用类型。所以**泛型必须是引用类型，不能是基本类型**。
```java
public static void main(String[] args) throws Exception {
    // 编译之后都会变成List。
    ArrayList<Integer> arrayList1 = new ArrayList<>();
    ArrayList<String> arrayList2 = new ArrayList<>();
    // true
    System.out.println(arrayList1.getClass() == arrayList2.getClass()); 
    ArrayList<Integer> arrayList = new ArrayList<>();
    arrayList.add(1);
    // 反射是在运行期调用的add方法，此时的泛型信息已经被擦除。
    arrayList.getClass().getMethod("add", Object.class).invoke(arrayList, "a");
    System.out.println(arrayList.get(0)); // 1
    System.out.println(arrayList.get(1)); // a
}
```
### 序列化
序列化：将对象写入到IO流中；
反序列化：从IO流中恢复对象。
意义：Java对象转换成字节序列后便于通过网络传输或存储在磁盘上，在需要时可以通过反序列化恢复成原来的对象。
实现方式：

- JDK自带序列化方法。类实现Serializable接口，就通过ObjectOutputStream类将对象变成byte[]字节数组。
- 使用fastJSON将对象变成JSON格式的数据， 可读性强
### Error和Exception
<img src="https://raw.githubusercontent.com/ivemcel/pictures/main/image-20221022215815925.png" alt="image-20221022215815925" style="zoom:33%;" />
**Error：系统内部错误，运行时报错，不能处理**
**Exception**
运行时异常:一般是由程序逻辑错误引起的，会由Java虚拟机自动抛出并自动捕获。

- 空指针异常NullPointerException
- 类型转化异常ClassCastException
- 数组越界异常IndexOutOfBoundsException

编译时异常：除RuntimeException及其子类之外的异常。

- 文件找不到异常FileNotFoundException
- IO异常IOException
- SQL异常SQLException
- 反射时的无对应方法异常，无对应属性异常NoSuchMethodException，NoSuchFieldException

**throw和throws**
throw：用在方法体中抛出一个具体的异常对象。
throws：用于声明该方法可能抛出的异常。如果在方法内部使用throw抛出了某些异常，那么必须在方法体上对排除的异常进行声明(非运行时异常)。在项目中对待异常通常层层向上抛出而不是直接使用try/catch进行处理，然后统一向用户展示错误界面并记录日志。
```java
public void method(String message) throws IOException {
    throw new IOException(message);
}
```
**自定义异常**遵循以下四个步骤：

1. 首先创建自定义异常类，语法格式：自定义异常类名 extends Exception。
2. 在方法中通过关键字throw抛出异常对象。
3. 若是在当前抛出异常的方法中处理异常，可以用try-catch语句捕获并处理；若不是，在方法的声明处通过关键字throws指明要抛出给方法调用的异常。
4. 在出现异常方法的调用中捕获并处理异常。
### 快速失败和安全失败
系统运行中，如果有错误发生，那么系统立即结束，这种设计就是快速失败。
系统运行中，如果有错误发生，系统不会停止运行，它忽略错误（但是会有地方记录下来），继续运行，这种设计就是安全失败。
当多个线程对集合进行结构上的改变，在单线程中用`foreach`循进行元素的增删操作时，可能会产生 fail-fast 机制。
java.util包下的集合类都是快速失败的，不能在多线程下发生并发修改（迭代过程中被修改）
java.util.concurrent 包下的容器都是安全失败，可以在多线程下并发使用。
### Java IO
#### Java BIO
Java 传统IO是面向流的，是单向传输的，是同步阻塞IO。服务器实现模式为一个连接一个线程，即客户端有连接请求时服务器端就需要启动一个线程进行处理当并发数较大时，需要创建大量线程来处理连接，系统资源占用较大。连接建立后，如果当前线程暂时没有数据可读，则线程就阻塞在 Read 操作上，造成线程资源浪费。可以通过线程池机制改善。
```java
public class BIOServer {
    public static void main(String[] args) throws IOException {
        int port = 8089;
        // 声明线程池
        Executor executor = new ThreadPoolExecutor(10, 10000, 5, TimeUnit.SECONDS, new LinkedBlockingQueue<>());
        // 创建一个服务端
        ServerSocket serverSocket = new ServerSocket(port);
        System.out.println("server 启动...");
        while (true) { // 死循环
            // 这里会阻塞，直到有新的连接进来
            Socket socket = serverSocket.accept();
            // 有新的连接，就创建一个新的Task，丢进线程池。
            executor.execute(() -> {
                try(BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {
                    // 读取并打印数据
                    System.out.println("server 收到: " + reader.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }
    }
}
public class BIOClient {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("127.0.0.1", 8089);
        PrintWriter writer = new PrintWriter(socket.getOutputStream(), true);
        writer.println("hi，这是client");
    }
}
```
#### Java NIO
Java NIO是一个面向缓冲区，基于通道（双向传输）的非阻塞IO。服务器实现模式为一个线程处理多个请求（连接），即客户端发送的连接请求都会注册到多路复用器上，多路复用器轮询到连接有I/O请求就进行处理。
**Buffer缓冲区**
Buffer缓冲区是一个对象，它包含一些要写入或者要读出的数据，在NIO库中，所有数据都是用缓冲区处理的。在读取数据时，它是直接读到缓冲区中的；在写入数据时，写入到缓冲区中，任何时候访问NIO中的数据，都是通过缓冲区进行操作。

- 非直接缓冲区:通过 allocate() 方法分配缓冲区，将缓冲区建立在 JVM 的内存之中。
- 直接缓冲区:通过 allocateDirect() 方法分配缓冲区，将缓冲区建立在物理内存之中。

**Channel通道**
通道是在实体（文件、socket等）和缓冲区之间有效传输数据的媒介。也就是说，通道是Java NIO提供的一座桥梁，用于我们的程序和操作系统底层I/O服务进行交互。通道是双向的，流是单向的。在Java NIO中，通道Channel相当于操作系统的内核空间缓冲区，而缓冲区Buffer相当于操作系统的用户空间缓冲区。
<img src="https://raw.githubusercontent.com/ivemcel/pictures/main/image-20221022215918140.png" alt="image-20221022215918140" style="zoom:43%;" />
**Selector选择器**
Selector选择器用于采集各个通道的状态/事件（注：多个Channel以事件的方式可以注册到同一个Selector)，如果有事件发生，便获取事件然后针对每个事件进行相应的处理。这样就可以只用一个线程去管理多个通道，只有在连接/通道 真正有读写事件发生时，才会进行读写，就大大地减少了系统开销。

- ServerSocketChannel 是一个可以监听新进来的TCP连接的通道
- SocketChannel，网络 IO 通道，具体负责进行读写操作。  
                             <img src="https://raw.githubusercontent.com/ivemcel/pictures/main/images" alt="img" style="zoom: 50%;" />

SelectionKey，表示 Selector 和网络通道的注册关系, 共四种:

- int OP_ACCEPT：有新的网络连接可以 accept，值为 16
- int OP_CONNECT：代表连接已经建立，值为 8
- int OP_READ：代表读操作，值为 1
- int OP_WRITE：代表写操作，值为 4
#### Java AIO
用户进程只需要发起一个IO操作便立即返回，等IO操作真正完成以后，应用程序会得到IO操作完成的通知，此时用户进程只需要对数据处理就好了，不需要进行实际的IO读写操作，因为真正的IO操作已经由操作系统内核完成了。
### 设计模式
#### 单例模式
单例类只能有一个实例；必须创建自己的唯一实例；必须给所有其他对象提供这一实例。实现单例类时，需要考虑三个问题：创建单例对象时，是否线程安全。单例对象的创建，是否延时加载。获取单例对象时，是否需要加锁。
**饿汉式：**在类加载的时候就先创建好实例，虚拟机会保证类加载的线程安全，但是如果只是为了加载该类不需要实例，则会造成内存的浪费。
优点：单例对象的创建是线程安全的；获取单例对象时不需要加锁。
缺点：单例对象的创建，不是延时加载。
一般认为延时加载可以节省内存资源。但是延时加载是不是真正的好，还要看实际的应用场景。
```java
public class Singleton {
    private static Singleton Instance = new Singleton();
    private Singleton() {}
    public static Singleton getInstance() {
        return Instance;
    }
}
```
**懒汉式：**懒汉式支持延迟加载，当程序需要这个实例的时候才去创建对象，但为了线程安全，需要在获取对象的操作加锁，并且这把锁只有在第一次创建对象时有用，而之后每次获取对象，这把锁都是一个累赘。
优点：对象的创建是线程安全的。支持延时加载。
缺点：获取对象的操作需加锁，如果单例对象需要频繁使用，这是无法接受的。否则，无伤大雅。
```java
puclic clsss Singleton{
    // 私有静态变量instance存储唯一实例
    private static Singleton instance;
    // 私有构造函数
    private Singleton(){}
    // 第一次调用时才创建对象，需要使用时才创建
    puclic static synchronized Singleton getInstance(){
        // 可能多个线程进入，加锁解决
        if(instance == null){
            instance = new Singleton();
        }
        return instance;
    }
}
```
**双重校验锁：**双重检测单例模式优点：

- 对象的创建是线程安全的。
- 支持延时加载。
- 获取对象时不需要加锁。
```java
public class Singleton{
    private volatile static Singleton singleton;
    private Singleton(){}
    // 只能通过Singleton.getInstance()获取Singleton类的实例对象
    public static Singleton getSingleton(){
        // 如果实例为空，才会对类对象加锁，阻塞其他进程
        if(singleton == null){
            sychronized(Singleton.class){
                if(singleton == null){
                    singleton = new Singleton(); // 会发生指令重排，volatile禁止指令重排
                }
            }
        }
        // 如果instance对象存在，线程可以直接返回实例对象
        return singleton;
    }
}
```
**静态内部类：**Java 加载外部类的时候，不会创建内部类的实例，只有在外部类使用到内部类的时候才会创建内部类实例。InnerClass是一个静态内部类，当外部类Singleton被加载时，并不会创建InnerClass实例对象，只有当调用getInstance()方法时，才会创建InnerClass实例对象。instance 的唯一性、创建过程的线程安全性，都由 JVM 来保证。
```java
public class Singleton {
    private Singleton(){}
    // 静态内部类
    private static class InnerClass{
        private static final Singleton instance = new Singleton();
    }
    // 静态方法
    public static Singleton getInstance(){
        return InnerClass.instance;
    }
}
```
**枚举**：反射无法获取其构造器，线程安全
```java
public enum Singleton{
    INSTANCE;
}
```
#### 代理模式
**代理模式是一种设计模式，提供了对目标对象额外的访问方式，即通过代理对象访问目标对象，这样可以在不修改原目标对象的前提下，提供额外的功能操作，扩展目标对象的功能。**动态代理是在运行时动态生成的，即编译完成后没有实际的class文件，而是**在运行时动态生成类字节码，并加载到JVM中。**
**静态代理**是在编译时就已经实现，编译完成后代理类是一个实际的class文件

- 定义一个接口Rent及其实现类ZhangSan；
- 创建一个代理类ZhangSanAgent同样实现这个接口
- 将目标对象zhangSan注入进代理类ZhangSanAgent，然后在代理类的对应方法调用目标类中的对应方法。这样的话，我们就可以通过代理类屏蔽对目标对象的访问，并且可以在目标方法执行前后做一些自己想做的事情。

静态代理缺点：

- 静态代理只能为一个类服务，如果代理的方法很多，要为每一种方法都进行代理，代码显得非常繁琐冗余。
- 如果接口增加一个方法，除了所有实现类需要实现这个方法外，所有代理类也需要实现此方法，违背了开闭原则。

```java
public interface Rent {
    void rent();
}

// 接口实现类租房
public class ZhangSan implements Rent {
    @Override
    public void rent() {
        System.out.println("我要租房");
    }
}

// 创建代理类Agent并同样实现这个接口
public class ZhangSanAgent implements Rent {
    private ZhangSan zhangSan = new ZhangSan();
    
    @Override
    public void rent() {
        System.out.println("看房");
        zhangSan.rent();
        System.out.println("签合同");
    }
}

public class Main {
    public static void main(String[] args) {
        ZhangSanAgent agent = new ZhangSanAgent();
        agent.rent();
    }
}
```

**动态代理**是在运行时动态生成的，即编译完成后没有实际的class文件，而是在运行时动态生成类字节码，并加载到JVM中。
<img src="https://raw.githubusercontent.com/ivemcel/pictures/main/image-20221022220152127.png" alt="image-20221022220152127" style="zoom:50%;" />
**JDK动态代理-基于接口的动态代理**
JDK动态代理是利用反射机制生成一个实现代理接口的匿名类，在调用具体方法前调用InvokeHandler来处理。核心是实现InvocationHandler接口，使用invoke()方法进行面向切面的处理，调用相应的通知。

- 定义一个接口Rent及其实现类ZhangSan；

- 定义一个AgentHandler 实现InvocationHandler接口并重写其invoke方法，在 invoke 方法中我们会调用原生方法（被代理类的方法）并自定义一些处理逻辑；

- 通过 Proxy.newProxyInstance(ClassLoader loader,Class<?>[] interfaces,InvocationHandler h) 方法帮我们执行了生成代理类——获取构造器——创建代理对象这三步；
   - 生成代理类: Class<?> cl = getProxyClass0(loader, intfs);
   - 获取构造器: final Constructor<?> cons = cl.getConstructor(constructorParams);
   - 创建代理对象: cons.newInstance(new Object[]{h});
   
- 当代理对象生成后，最后由InvocationHandler的invoke()方法调用目标方法:

   ```java
   public class AgentHandler implements InvocationHandler {
       private Object obj;
   
       public AgentHandler(Object obj){
           this.obj = obj;
       }
   
       @Override
       public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
           if(method.getName().equals("rent")){
               System.out.println("租房子啦");
               method.invoke(obj, args);
               System.out.println("签合同啦");
           }
           return null;
       }
   }
   public class Main {
       public static void main(String[] args) {
           AgentHandler agentHandler = new AgentHandler(new ZhangSan());
           Rent rent = (Rent)Proxy.newProxyInstance(Main.class.getClassLoader(), new Class[]{Rent.class}, agentHandler);
           rent.rent();
       }
   }
   ```

<img src="https://cdn.nlark.com/yuque/0/2022/png/26499320/1661495767231-8a3cfba6-23b0-4136-a85d-8e54f5b4d5b5.png?x-oss-process=image%2Fresize%2Cw_1500%2Climit_0" alt="image.png" style="zoom:50%;" />
**为什么JDK动态代理只能代理接口？**通过反射生成代理类的字节码文件并创建代理对象。生成的代理类已经extends了Proxy，而java是不允许多重继承的，但是允许实现多个接口，所以JDK动态代理只能代理接口。
JDK 动态代理存在的问题是其只能代理实现了接口的类，而没有实现接口的类就需要cglib动态代理。
**CGLib动态代理-基于类的动态代理**
CGLib(Code Generation Library)是一个字节码生成库，它允许我们在运行时对字节码进行修改和动态生成。
cglib动态代理是利用asm开源包，对代理对象类的class文件加载进来，通过修改其字节码生成子类来处理。核心是实现MethodInterceptor接口，使用intercept()方法进行面向切面的处理，调用相应的通知。
cglib是针对类来实现代理的，原理是对指定的目标类生成一个子类，并覆盖其中方法实现增强，但因为采用的是继承，所以不能对final修饰的类进行代理。
总结来讲，动态代理非常灵活，可以根据需求为已经定义好的类添加功能。Spring AOP的背后就是动态代理，对于被代理类实现接口时，Spring AOP使用JDK动态代理，也可以使用CGlib。如果被代理对象没有实现接口，那么只能使用CGLIB来实现动态代理了。CGLIB本身是通过ASM框架将被代理类的class字节码文件加载进行并进行修改生成被代理类的子类来实现动态代理。

```java
public class AgentInterceptor implements MethodInterceptor {
    private Object obj;
    public AgentInterceptor(Object obj) {
        this.obj = obj;
    }


    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        if(method.getName().equals("rent")){
            System.out.println("看看房子");
            method.invoke(obj, objects);
            System.out.println("签一下合同");
        }
        return null;
    }
}
public class LiSi {
    public void rent() {
        System.out.println("zufangzi");
    }
}
public static void main(String[] args) {
        AgentInterceptor agentInterceptor = new AgentInterceptor(new LiSi());
        LiSi lisi = (LiSi) Enhancer.create(LiSi.class, agentInterceptor);
        lisi.rent();
    }
```
#### 工厂模式

- 简单工厂模式指一个工厂对象创建实例，适用于工厂类负责创建对象较少的情况。例如Spring中的BeanFactory使用简单工厂模式，产生bean对象。
- 工厂方法模式指定义一个创建对象的接口，让接口的实现类决定创建哪种对象，让类的实例化推迟到子类中进行。例如，Spring的FactoryBean接口的getObject方法也是工厂方法。
- 抽象工厂模式指提供一个创建一系列相关或相互依赖对象的接口，无需指定它们的具体类。例如java.sql.Connection接口。

<Vssue />

