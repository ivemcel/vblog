---
title: Java容器
date: 2022-10-10
sidebar: 'auto'
sidebarDepth: 2
categories:
 - Java
tags:
- Java容器
author: ivem
publish: true
---
### 导图总览

<img src="https://raw.githubusercontent.com/ivemcel/pictures/main/1Java%E5%AE%B9%E5%99%A8.png" alt="1Java容器" style="zoom:37%;" />

**List：存储的元素是有序(元素存入和取出顺序相同)、可重复的，可存储多个null。**
**Set：存储的元素是无序(元素存入和取出顺序不一定相同)、不可重复的，只能存储一个null。**
**Map：使用键值对的方式对元素进行存储，key是无序且不重复的，每个键最多映射到一个值。**
**若无特别说明，源码都是用的JDK1.8。**

### ArrayList
**扩容方式：**ArrayList中维护了一个Object类型的数组elementData`transient Object[] elementData` ，当创建ArrayList对象时，如果使用的是无参构造器，则初始 elementData对象扩容为10，再次扩容的话，直接扩容为elementData长度的1.5倍，10→15→22...；如果使用的是指定大小的构造器，则初始elementData容量为指定大小，如果需要扩容，则直接扩容为elementData长度的1.5倍。
数组的元素在内存中是连续存储的，改查快。
```java
public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, java.io.Serializable{
    private static final long serialVersionUID = 8683452581122892189L;
    private static final int DEFAULT_CAPACITY = 10;
    private static final Object[] EMPTY_ELEMENTDATA = {};
    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
    // transient 的作用是不希望 elementData 数组被序列化，重写了writeObject方法
    // 先序列化ArrayList中非transient元素，然后遍历elementData，只序列化已存入的元素
    // 这样既加快了序列化的速度，又减小了序列化之后的文件大小。
    transient Object[] elementData; 
    private int size;
    
    public ArrayList(int initialCapacity) {
        if (initialCapacity > 0) {
            this.elementData = new Object[initialCapacity];
        } else if (initialCapacity == 0) {
            this.elementData = EMPTY_ELEMENTDATA;
        } else {
            throw new IllegalArgumentException("Illegal Capacity: "+
                                               initialCapacity);
        }
    }
    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }
}
```
**ArrayList为什么线程不安全？**在多个线程进行add操作时会：

- 判断elementData数组容量是否满足需求
- 在elementData对应位置上设置新值

这两个操作可能会出现数组越界或添加元素出现值覆盖的情况。
```java
// 向指定index位置处添加元素O(n)
public void add(int index, E element) {
    rangeCheckForAdd(index);
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    // 将index到最后一个位置的所有元素向后移动一个位置
    System.arraycopy(elementData, index, elementData, index + 1, size - index);
    elementData[index] = element;
    size++;
}

// 向尾部添加元素O(1)
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  // Increments modCount!!
	elementData[size++] = e; // 不是原子操作，线程不安全
	// add(size, e); // 调用add(int index, E element)方法实现尾部添加元素
	return true;
}

// 动态扩容
private void grow(int minCapacity) {
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1); // 扩容操作
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
}

// 删除index位置处的元素 O(n)
public E remove(int index) {
    rangeCheck(index);
    modCount++;
    E oldValue = elementData(index);

    int numMoved = size - index - 1;
    if (numMoved > 0)
        // 将index后面的每一个元素往前移动一个位置
        System.arraycopy(elementData, index+1, elementData, index,numMoved);
    elementData[--size] = null; // clear to let GC do its work
    return oldValue;
}

// 删除元素e
public boolean remove(Object o) {
// 核心思路：查找元素对应的索引，调用remove(int index)方法
}

/* System.arraycopy()声明
 * src-源数组,srcPos-源数组中的起始位置。
 * dest-目标数组,destPos-目标数据中的起始位置。
 * length-要复制的数组元素的数量。
 */
public static native void arraycopy(Object src,int srcPos, Object dest, int destPos,int length);

```
```java
// 修改index位置处的元素
public E set(int index, E element) {
    rangeCheck(index);
    E oldValue = elementData(index);
    elementData[index] = element;
    return oldValue;
}
// 查找index位置处的元素，根据数组的索引快速查询元素
public E get(int index) {
    rangeCheck(index);
return elementData(index);
}
```
### LinkedList
链表中的元素在内存中是不连续存储的。链表由一系列节点(元素)组成，每个节点都是Node类型的对象。LinkedList底层维护了一个双向链表，增删快。双向链表类中有两个属性first 和 last，分别指向首节点和尾结点。每个Node节点中有prev、next、item属性。
**LinkedList为什么线程不安全？**调用add方法时向尾部添加节点时，多个线程可能出现节点覆盖。
### ArrayList和LinkedList比较
|  | ArrayList | LinkedList |
| --- | --- | --- |
| 底层实现 | 数组 | 双向链表 |
| 内存占用 | 存在一定的空间浪费 | 每个元素存储前驱、后继节点和数据，更占内存 |
| 线程安全 | 不安全 | 不安全 |
| 扩容机制 | 扩容为原容量的1.5倍 | 无 |
| 特性 | 改查快 | 增删快 |

### 线程安全的List
**Vector**：性能最差，全部使用synchronized关键字来修饰达到同步的目的，保证线程安全
**CopyOnWriteArrayList：**底层基于数组，对写操作加锁，使用的是ReentrantLock，添加元素时，先加锁，然后复制原数组到新数组中，在新数组中添加元素，添加完成后将引用指向新的容器，最后再释放锁。而对于读操作是不加锁的，它的读操作存在以下几种情况：

- 如果写操作尚未完成，那么直接读取原数组的数据
- 如果复制操作完成，但是指针并未更新，则读取原数组的数据
- 如果写操作完成，读取新数组的数据

`CopyOnWriteArrayList`特点 

- 写操作加锁，读操作不加锁，是一种读写分离的操作，适用于读多写少的场景
- 无法做到实时读取，从上面的情况来看，如果此时写操作未全部完成，则会读取到原来未更新的数据。但是可以保证最终的一致性。
- 因为写操作需要进行复制，并且一般情况下无法预知到底要放多少数据，在数据量较大的情况下，会频繁触发GC

**Collections.SynchronziedList**：Collections类中的静态内部类，它能将所有的List接口的实现类转换成线程安全的List，相对比Vector来讲具有更好的扩展性和兼容性。
### HashMap
```java
public class HashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>, Cloneable, Serializable {
    // 和JDK1.7的Entry<K,V>结构一样，只是将名字改为了Node<K,V>
    static class Node<K,V> implements Map.Entry<K,V> {
        final int hash;
        final K key;
        V value;
        Node<K,V> next;
        ...
    }
    // 缺省默认table初始长度16，太小可能频繁发生扩容，影响效率。太大又浪费空间。
    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;
    static final int MAXIMUM_CAPACITY = 1 << 30; // 数组table最大长度
    static final float DEFAULT_LOAD_FACTOR = 0.75f;    // 缺省默认负载因子0.75
    // 树化阈值，链表节点个数大于8且数组长度大于64时链表转为红黑树
    static final int TREEIFY_THRESHOLD = 8;
    static final int MIN_TREEIFY_CAPACITY = 64;
    static final int UNTREEIFY_THRESHOLD = 6;  // 树降级为链表的阈值
    transient Node<k,v>[] table;   // 存储元素的数组，总是2的幂次倍
    transient Set<map.entry<k,v>> entrySet;   // 存放具体元素的集合
    transient int size;     // 数组中存放的元素个数
    transient int modCount;      // 记录哈希表结构修改次数，替换Node元素的value不计数
    final float loadFactor;   // 负载因子
    int threshold;    // threshold = capacity（数组长度）*loadFactor（负载因子）
}
```
#### 扩容操作

- 调用无参构造函数创建一个HashMap对象时，默认加载因子为0.75，此时threshold=0；使用put方法时首次添加元素时会调用resize()触发扩容，扩容后数组容量为16，新扩容阈值threshold为16*0.75=12。
- 调用有参构造函数创建一个HashMap对象时，会根据传入的初始大小initialCapacity计算一个大于其值的2^n的数作为数组初始长度。使用put方法首次添加元素时，会将数组扩容到初始长度大小。
- 初始化完成后继续添加元素，再次触发扩容时会将数组的个数扩充为原来的两倍，扩容阈值threshold 也变为原来的两倍。

在添加元素过程中，如果数组中某个索引位置发生了哈希冲突，此时如果该位置的链表长度 > 8 而且数组长度 < 64时，会先扩容，直到数组长度 > 64时，才会将这个索引位置的链表转化为红黑树；当红黑树节点个数<=6时又会退化为链表。
#### put方法

1. **通过哈希函数计算key的哈希值，通过(n-1)&hash计算key的索引位置。**hash函数其实是让key的hashCode()与hashCode()的高16位进行异或运算，来降低hash碰撞的概率，使得数据分布更平均，这样的操作称为**扰动**。
                                    ![](https://cdn.nlark.com/yuque/0/2022/png/26499320/1661325106696-fdb9adce-83b4-4a58-bc61-7619baba165a.png#clientId=u05b5c0c8-aabd-4&crop=0&crop=0&crop=1&crop=1&height=271&id=WXnk9&originHeight=336&originWidth=586&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u36e6a39e-71bc-4bdd-8470-b394cdabd24&title=&width=473)
2. 判断数组table是否为空，是的话执行resize()进行扩容；
3. 判断当前key的hash值的索引是否为空，是的话直接创建一个key、vakue、hash的Node节点插入到当前索引位置处。如果当前索引位置不为空，进行下一步。
4. 判断当前索引位置的元素p与要插入的key是否完全一致，是的话进行替换操作，否则进行下一步。
5. 判断是否是红黑树，如果是红黑树，则直接在树中插入键值对，否则进行下一步。
6. 说明当前索引位置的元素p是一个链表（头节点）。遍历链表，如果找到了一个与要插入的key相同的Node元素，进行替换操作。没有找到，将当前key对应的Node元素插入到该链表末尾。
> 注意：put方法，如果key值不存在返回值是null；key值存在返回被替换掉的value值。(map中的key和value都允许是null)

#### get方法

1. 计算key的哈希值，通过(n-1)&hash计算key的索引位置
2. 如果要查找的key和数组中该索引位置对应的节点相等（key相等和key的内容也相同），直接返回该节点。
3. 判断是否是红黑树，是的话调用红⿊树中的getTreeNode方法获取节点
4. 判断链表中是否存在该key，存在返回这个节点，都不存在返回null。
#### 数组长度为什么是2的幂次方？
key的hash值范围是int类型的，我们不可能建立一个这么大的数组来覆盖所有hash值，还需对hash值取模得到key对应的哈希桶。在源码中，取模是通过(n-1)&hash(n是数组元素个数)计算的，只有数组长度n是2的整数次幂， 才能保证n-1 的二进制全是 1，这样使用与运算才能达到取模的效果。(只有这样(n-1)&hash才等同于n%hash)
#### HashMap默认负载因子为什么选择0.75？
空间利用率和查询成本的一种折衷选择。如果加载因子过高，空间利用率高，但会使得哈希冲突的概率增加；如果加载因子过低，会频繁扩容，哈希冲突概率降低，但是会使得空间利用率变低。0.75这个值是基于数学分析和行业规定一起得到的一个结论。threshold = capacity（数组长度）*loadFactor（负载因子）
#### 为什么要将链表中转红黑树的阈值设为8？红黑树什么时候退化为链表？

- 红黑树的节点所占空间多（是普通链表节点的两倍），但查找时间复杂度低，所以只有当节点特别多时，红黑树优点才体现出来。至于为什么是8，是基于数据分析统计得出的一个结果。链表长度达到8的概率是很低的，综合链表和红黑树的优缺点考虑将大于8的链表转化为红黑树。
- 链表长度大于8和HashMap中的数组长度大于64链表才转化为红黑树。
- 红黑树节点个数降到6时退化为链表
#### 为什么HashMap中String、Integer这样的包装类适合作为Key？

- 都是final类型，是不可变的，保证了key的不可更改性，不会存在同一对象获取hash值不同的情况
- 内部已重写了equals()、hashCode()等方法，遵守了HashMap的内部规范，不易出现Hash值计算错误的情况
#### 如果使用Object作为HashMap的Key，应该怎么办？

- 重写hashCode()方法，因为需要计算hash值确定存储位置
- 重写equals()，因为需要保证 key 的唯一性
#### HashMap线程为什么不安全？

- 在1.7中，在transfor方法中使用头插法将将元素迁移到新数组中，可能会形成环形链表。此时如果对一个不存在的key进行查找，就会出现死循环问题，从而引发CPU空转。
- 在1.8中，多线程put 操作可能会出现数据覆盖。比如两个线程同时put()不同的值，但是hash一样，就会覆盖掉原来线程put的值。
#### 线程安全的Map？

- HashTable: 大量使用sychronized关键字加锁，虽然实现了同步，但是性能较低
- Collections.sychronizedMap，对传入的Map进行加对象锁，内部类SynchronizedMap想要对元素进行操作都需要先获取对象锁（也是使用sychronized关键字实现），性能和HashTable相近。
- ConcurrentHashMap：使用哈希桶和分段锁来实现，jdk8又加入了红黑树和cas操作来提高性能,在JDK8中锁住的是节点。
#### 手写MyHashMap
```java
public class MyHashMap {
    static class Node {
        int key, value; //保存该节点的Key、Value
        Node next; //指向下一个节点
        public Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }
    private final int CAPACITY = 10000;
    Node[] nodes = new Node[CAPACITY];

    public static int hashCode(int value) {
        return value;
    }

    private int getIndex(int key) {
        int hash = Integer.hashCode(key);
        //高16位异或低16位
        hash ^= (hash >>> 16);
        //与数组长度取模，得到对应的索引下标
        return hash % CAPACITY;
    }

    public int get(int key) {
        int idx = getIndex(key);
        Node now = nodes[idx];

        if (now != null) {
            if (now.key == key) {
                return now.value;
            } else {
                while (now != null) {
                    if (now.key == key) {
                        return now.value;
                    }
                    now = now.next;
                }
            }
        }
        return -1;
    }

    public void put(int key, int value) {
        int idx = getIndex(key);
        Node now = nodes[idx], tmp = now;

        if (tmp != null) {
            Node prev = null;
            while (tmp != null) {
                if (tmp.key == key) {
                    tmp.value = value;
                    return;
                }
                prev = tmp;
                tmp = tmp.next;
            }
            tmp = prev;
        }

        Node node = new Node(key, value);
        if (tmp != null) {
            tmp.next = node;
        } else {
            nodes[idx] = node;
        }
    }

    public void remove(int key) {
        //得到索引
        int idx = getIndex(key);
        //拿到首节点
        Node now = nodes[idx];
        //非空判断
        if (now != null) {
            //保存前节点
            Node prev = null;
            //遍历查找
            while (now != null) {
                //如果找到
                if (now.key == key) {
                    //这里有两种情况
                    //1. 如果要删除的节点是首节点，那么直接让当前数组下标对应的首节点位为其下一个节点
                    //2. 如果不是，那么让前一个节点的下一个节点指向当前要删除节点的下一个节点就实现了删除效果
                    if (prev != null) {
                        prev.next = now.next;
                    }else {
                        nodes[idx] = now.next;
                    }
                    //不管是怎么删除的，都让当前节点的下一个节点为null，方便垃圾挥手（加分点哦）
                    now.next = null;
                    return;
                }
                //如果没找到，让前节点指向当前节点，当前节点指向其下一个节点
                prev = now;
                now = now.next;
            }
        }
    }

    public static void main(String[] args) {
        MyHashMap map = new MyHashMap();
        map.put(1,1);
        map.put(2,2);
        map.put(3,40);
        System.out.println(map.get(1));
        System.out.println(map.get(2));
        map.remove(2);
        System.out.println(map.get(2));
    }
}
```
### HashTable
Hashtable的底层数据结构和HashMap相同，只是其中的方法都用 synchronized进行了修饰，所以 Hashtable 是线程安全的。由于锁住了整个数组，锁的粒度太大，锁的竞争非常激烈，效率很低。
### ConcurrentHashMap(JDK1.8)
#### 底层结构
在JDK1.8中，ConcurrentHashMap使用与HashMap相同的Node数组+链表+红黑树的数据结构。
如果调用无参构造函数，使用put方法后会扩容为默认容量16。如果调用有参构造器方法`ConcurrentHashMap(int initialCapacity)` ，使用put方法后会扩容为一个`initialCapacity`值大的2的幂次方数`cap`作为初始长度。比如初始化参数为32，那么获得的数组初始化长度为64。这个初始长度`cap`赋给了`volatile`修饰的`sizeCtl`变量，`sizeCtrl`的更新是对所有线程可见的。
#### 如何保证线程安全？

1. 使用volatile保证Node中的值变化时对于其他线程是可见的
2. 使用cas操作+synchronized关键字保证数据正确写入，在非空ConcurrentHashMap中使用put方法添加一个元素时：
- 第一步：判断table数组是否初始化，没有则进行初始化，否则进行第二步。
- 第二步：计算key的hash值的索引位置，如果该位置没有元素，那么会使用cas将当前元素放到这个桶中
- 第三步：如果key的hash值为MOVED（-1），说明当前ConcurrentHashMap正在进行扩容操作，那么当前线程需要协助进行扩容
- 第四步：key的hash值对应的桶中存在元素并且没有进行扩容操作时， 会使用synchronized对当前哈希桶中的节点加锁。如果是普通链表节点，将元素添加到链表尾部；如果是红黑树节点则添加到红黑树。
- 第五步：判断是否需要树化。如果当前位置的桶中链表元素个数超过了阈值8（默认为8），将会触发树化。在树化中，如果当前数组的长度小于64，则会先进行扩容避免链表过长，否则才会将链表转为红黑树。
- 第六步：更新集合长度；检查是否需要扩容或是否正在扩容
#### get方法

1. 计算key的哈希值，通过(n-1)&hash计算key的索引位置，如果要查找的key和数组中该索引位置对应的节点相等（key相等和key的内容也相同），直接返回该节点。
2. 如果key的hash值为负说明该节点正在扩容，使用ForwardingNode的find方法查找
3. 如果该节点是红黑树，调用红⿊树中的getTreeNode方法查找
4. 判断链表中是否存在该key，存在返回这个节点。都不存在返回null

**正常情况get()操作全程不需要加锁，原因**：get()方法中访问的大多数变量是volatile关键字修饰的，比如：Node.val、Node.next、count，volatile保证了这些值的修改对其他线程是可见的。但是当节点是红黑树的时候，如果树正在变色旋转并且要查询的值不是红黑树的头节点，会加一个读写锁。
#### 什么时候扩容？

- 调用put方法或putAll方法添加元素后，如果当前哈希桶中的元素数量大于树化阈值而且当前数组的长度小于64，则会调用tryPresize方法将数组长度扩大到原来的两倍，并触发transfer方法，重新调整节点的位置。
- 在put方法添加元素完成后，会调用addCount方法更新元素个数，并检查是否需要进行扩容，当数组元素个数达到阈值时，会触发transfer方法进行扩容。
#### 如何扩容？
首先多线程通过读取`sizeCtl`属性，来判断ConcurrentHashMap当前所处的状态。

- sizeCtl为0时，表示表示数组未初始化，并且数组的默认长度为16
- sizeCtl为正数时：
   - 如果数组已经初始化，那么这个值记录的是扩容阈值（扩容阈值=数组当前容量*0.75）
   - 如果数组未初始化，那么此时这个值记录的就是数组的初始容量。
- 当sizeCtl为-1时，表示这个数组正在进行初始化。
- 当sizeCtl小于-1时，此时这个值记录就是正在参与扩容的线程个数。

**整体思路**：

1. 分配任务：把一个大的数组切分成多个小份，然后每个线程处理其中每一小份
2. 处理任务：复制部分主要有两点，第一点就是加锁，第二点就是处理完之后置为ForwardingNode来占位标识这个位置被迁移过了。

**具体过程**：

1. 根据CPU核数和数组长度计算每个线程处理桶的个数，默认每个线程处理 16个桶。。
2. 初始化临时变量 nextTable。将其在原有基础上扩容两倍。
3. 修改transferIndex标志位，每个线程领取完任务就减去多少，比如初始大小是transferIndex=table.length= 64，每个线程领取的桶个数是16，第一个线程领取完任务后transferIndex = 48，也就是说第二个线程这时进来是从第48个桶开始处理，再减去16，依次类推，这就是多线程协作处理的原理
4. 领取完任务之后就开始处理，如果桶为空就设置为ForwardingNode，如果不为空使用synchronized关键字加锁拷贝（防止拷贝的过程有其他线程在put元素进来），拷贝完成之后也设置为ForwardingNode节点。
5. 某个线程分配的桶处理完了之后再去领取，发现transferlndex=0说明所有的桶都领取完了，该线程会将sizeCtl减1，表示扩容的线程少一个。如果减完这个数以后，sizeCtl回归了初始状态，表示没有线程再扩容了，该方法所有的线程扩容结束了。
6. 扩容结束后，才会将旧数组干掉，用新数组覆盖，并且会重新设置sizeCtl为新数组的扩容阈值。
#### 统计元素个数？
在ConcurrentHashMap内部使用一个`baseCount`的量来做元素数量的统计，`baseCount`是一个使用volatile关键字修饰的长整型变量，当没有线程竞争时，使用这个变量来进行计数。当发生线程竞争时，通过维护一个最长长度为CPU核心数目的CountCell数组来统计元素数量。元素数量的维护过程：

- 当前线程想要对元素数量进行修改，尝试使用cas去更新`baseCount`变量
- 如果更新失败，将通过线程ID来计算哈希值，访问`CountCell`数组（初始长度为2）的索引，来对其中的值进行更新，依旧使用CAS策略
- 如果对`CountCell`数组的更新失败，那么会重新计算索引值再次进行更新，当多次更新失败之后，说明`CountCell`数组的长度太小了，会对这个数组进行扩容操作。

那么在某一时刻，ConcurrentHashMap中元素的数量就可以通过将CountCell数组和baseCount相加获得。调用size()方法时，会在内部调用sumCount()方法。
### HashSet
HashSet的底层是 HashMap，默认构造函数是构建一个初始容量为16，负载因子为0.75 的HashMap。HashSet的值存放于HashMap 的 key 上， HashMap的 value 统一为 PRESENT 。
**HashSet如何检查重复？HashSet是如何保证数据不可重复的？**
HashSet的特点是存储元素时无序且唯一。在向 HashSet中添加对象时，HashSet 会先计算对象的 HashCode来确定对象的存储位置，如果该位置没有其他对象，直接将该对象添加到该位置；如果该存储位置有存储其他对象（新添加的对象和该存储位置的对象的 HashCode 值相同），这时会调用 equals方法判断两个对象是否相同，如果相同，则添加对象失败；如果不相同，则会将该对象重新散列到其他位置。
### HashSet和HashMap比较
|  | HashMap | HashSet |
| --- | --- | --- |
| 父接口 | 实现了Map接口 | 实现Set接口 |
| 存储数据 | 存储键值对 | 仅存储对象 |
| 添加元素 | 调用put()向map中添加元素 | 调用add()方法向Set中添加元素 |
| 计算哈希值 | HashMap使用键（Key）计算hashcode | HashSet使用对象来计算hashcode值，对于两个对象来说hashcode可能相同，需要用equals()方法用来判断对象的相等性，如果两个对象不同的话，那么返回false |
| 获取元素的速度 | HashMap相对于HashSet较快，因为它是使用唯一的键获取对象 | HashSet较HashMap来说比较慢 |


<Vssue />
