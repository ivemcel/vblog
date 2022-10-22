(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{424:function(a,t,v){"use strict";v.r(t);var r=v(1),_=Object(r.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h3",{attrs:{id:"运行时数据区域"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#运行时数据区域"}},[a._v("#")]),a._v(" 运行时数据区域")]),a._v(" "),t("h4",{attrs:{id:"程序计数器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#程序计数器"}},[a._v("#")]),a._v(" 程序计数器")]),a._v(" "),t("ul",[t("li",[a._v("程序计数器可以看作是当前线程所执行的字节码的行号指示器，JVM通过改变这个计数器的值来选取下一条执行的字节码指令，分支、循环、跳转、异常处理、线程恢复(可以保存线程的执行现场) 等功能都需要依赖这个计数器来完成。")]),a._v(" "),t("li",[a._v("程序计数器是线程私有的，每个线程拥有自己的计数器，各计数器互不影响，目的是为了线程切换后能恢复到正确的执行位置。")]),a._v(" "),t("li",[a._v("程序计数器是既不会出现垃圾回收也不会出现OutOfMemory错误的地方，它的生命周期随着线程的创建而创建，随着线程的结束而死亡。")])]),a._v(" "),t("h4",{attrs:{id:"栈"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#栈"}},[a._v("#")]),a._v(" 栈")]),a._v(" "),t("p",[t("strong",[a._v("虚拟机栈：")])]),a._v(" "),t("ul",[t("li",[a._v("虚拟机栈是由一个个栈帧组成的，每个方法执行都会生成栈帧压入虚拟机栈中，执行完成栈帧出栈。因此，垃圾回收机制不涉及栈内存。")]),a._v(" "),t("li",[a._v("虚拟机栈是由一个个栈帧组成的，每个方法执行都会生成栈帧压入虚拟机栈中，执行完成栈帧出栈。栈帧存储了方法的局部变量表、操作数栈、动态连接和方法返回地址和其他附加信息。局部变量表用于存放方法参数和方法内部定义的局部变量；各种字节码指令执行时，会对操作数栈进行出栈和入栈的操作；动态连接是指向运行时常量池中该栈帧所属方法的引用；方法返回地址用于恢复调用当前方法的方法的执行状态。")]),a._v(" "),t("li",[a._v("每个线程只能有一个活动栈帧，对应着当前正在执行的方法。栈帧随着方法调用而创建，随着方法结束而销毁。无论方法正常完成还是异常完成都算作方法结束。")]),a._v(" "),t("li",[a._v("会产生：\nstackOverflowError：若栈内存不允许动态扩展，当线程请求的栈深度超过当前虚拟机栈最大深度。函数调用陷入无限循环的话，就会导致栈中被压入太多栈帧而占用太多空间，导致栈空间过深。那么当线程请求栈的深度超过当前 Java 虚拟机栈的最大深度的时候，就抛出 StackOverFlowError 错误。\nOutOfMemoryError：若栈内存大小允许动态扩展，虚拟机栈进行动态扩展时无法申请到足够的内存空间。注意，HotSpot虚拟机的栈容量是不可以动态扩展的，所以在HotSpot虚拟机上是不会由于虚拟机栈无法扩展而导致outOfMemoryError异常——只要线程申请栈空间成功了就不会OOM，但是如果申请时就失败，仍然是会出现OOM异常的。")])]),a._v(" "),t("p",[a._v("**本地方法栈：**一些带有 native 关键字的方法需要JAVA 去调用本地的C或者C++方法。和虚拟机栈类似，本地方法被执行的时候，会创建一个栈帧压入本地方法栈，方法执行完毕后出栈，也会出现StackOverflowError和OutOfMemoryError。")]),a._v(" "),t("h4",{attrs:{id:"堆-gc堆内存分配与回收"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#堆-gc堆内存分配与回收"}},[a._v("#")]),a._v(" 堆-GC堆内存分配与回收")]),a._v(" "),t("p",[a._v("Java堆主要是存放对象实例，几乎所有的对象实例以及数组都在这里分配内存。堆这里最容易出现的就是 OutOfMemoryError。因为堆不需要连续内存，并且可以动态增加其内存，扩展失败会抛出OutOfMemoryError 异常。查看堆内存占用情况jmap - heap 进程id，jconsole 工具。\nJava 堆是垃圾收集器管理的主要区域，也被称作 GC 堆（Garbage Collected Heap）。从分代垃圾收角度，Java堆还新生代和老年代；新生代包括Eden、Survivor。这样划分的目的是更好地回收内存，或者更快地分配内存。\n垃圾回收的理论基础：绝大多数的对象都是“朝生夕灭”的，既创建不久即可消亡。熬过越多此垃圾回收过程的对象就越难以消亡。\n"),t("img",{staticStyle:{zoom:"43%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/image-20221022215206190.png",alt:"image-20221022215206190"}})]),a._v(" "),t("ul",[t("li",[a._v("大多数情况下，对象在新生代中 eden 区分配。当 eden 区内存满了以后，触发一次 Minor GC。没有死亡的对象，年龄+1，存放到from区域。")]),a._v(" "),t("li",[a._v("当Eden再次满了以后再次触发一次Minor GC，没有死亡的对象复制到to区域，from区域没有死亡的对象也复制到to区域，年龄+1。之后每一次Minor GC都会出发一次from和to的交换，哪个区域是空的那个区域就是to。")]),a._v(" "),t("li",[a._v("当survivor区域满了以后，再次触发Minor GC，年龄为15的对象就会移入老年区。")]),a._v(" "),t("li",[a._v("老年区满了以后触发一次Full GC")])]),a._v(" "),t("blockquote",[t("p",[a._v("注意：每一次GC都会给存活的对象的年龄+1，新生代使用标记复制算法，老年代使用标记清除或者标记-整理算法。当老年代空间不足，会先尝试触发Minor GC，如果之后空间仍不足，那么触发Full GC。GC会引发Stop the world，暂停其他用户线程，等垃圾回收结束，用户线程才恢复运行。")])]),a._v(" "),t("h4",{attrs:{id:"堆-什么时候触发full-gc"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#堆-什么时候触发full-gc"}},[a._v("#")]),a._v(" 堆-什么时候触发Full GC？")]),a._v(" "),t("ul",[t("li",[a._v("调用了"),t("code",[a._v("System.gc()")]),a._v("方法")]),a._v(" "),t("li",[a._v("当新生代晋升到老年代的对象大于老年代的剩余空间时，就会触发一个full gc")]),a._v(" "),t("li",[a._v("当永久代的空间不足时，会触发full gc")]),a._v(" "),t("li",[a._v("执行minor gc时，会使用老年代的空间作为担保，如果minor时检查历次minor gc的保留的对象大小大于老年代的剩余空间，就会执行full gc")]),a._v(" "),t("li",[a._v("在并发标记和并发清除的过程中，因为不会暂停用户线程，那么如果为用户线程分配空间不够，就会引发一次full gc")])]),a._v(" "),t("h4",{attrs:{id:"堆-如何避免full-gc"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#堆-如何避免full-gc"}},[a._v("#")]),a._v(" 堆-如何避免Full GC？")]),a._v(" "),t("ul",[t("li",[a._v("禁止调用System.gc方法")]),a._v(" "),t("li",[a._v("减少对象的生命周期，让进入到老年代的对象减少")]),a._v(" "),t("li",[a._v("增大永久代的空间")]),a._v(" "),t("li",[a._v("尽量不要使用太大的对象或数组")])]),a._v(" "),t("h4",{attrs:{id:"堆-对象如何进入老年代"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#堆-对象如何进入老年代"}},[a._v("#")]),a._v(" 堆-对象如何进入老年代？")]),a._v(" "),t("ul",[t("li",[a._v("大对象（字符串、数组等）直接进入老年代。原因是为了避免为大对象分配内存时由于分配担保机制带来的复制而降低效率。")]),a._v(" "),t("li",[a._v("超过 Eden 大小的对象")]),a._v(" "),t("li",[a._v("长期存活的对象将进入老年代。虚拟机采用了分代收集的思想来管理内存，通过给对象设置年龄（Age）计数器识别对象应放在新生代还是老年代中。对象年龄超过虚拟机 MaxTenuringThreshold 的设置值，最大为 15。")]),a._v(" "),t("li",[t("strong",[a._v("新生代分配担保")]),a._v("：在执行 MinorGC 时要将 Eden 区存活的对象复制到 Survivor 区，但是 Survivor 区默认空间是只有新生代的 2/10，实际使用的只有 1/10，当 Survivor 区内存不够所有存活对象分配时，就需要将 Survivor 无法容纳的对象分配到老年代去，这种机制就叫分配担保。")])]),a._v(" "),t("h4",{attrs:{id:"方法区"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#方法区"}},[a._v("#")]),a._v(" 方法区")]),a._v(" "),t("p",[a._v("用于存放已被加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。\n"),t("strong",[a._v("1.8以前用永久代实现")]),a._v("\nJDK1.7字符串常量池和静态变量从永久代移动了Java堆中。主要原因是永久代的 GC 回收效率太低，只有在整堆收集 (Full GC)的时候才会被执行 GC。Java 程序中通常会有大量的被创建的字符串等待回收，将字符串常量池放到堆中，能够更高效及时地回收字符串内存。\n"),t("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/1661331710758-175dbcaa-8c3b-4809-87a0-95204d187883.png",alt:"image.png"}}),a._v(" "),t("strong",[a._v("1.8用元空间实现")]),a._v("\n用元空间实现原因：")]),a._v(" "),t("ul",[t("li",[a._v("整个永久代有一个 JVM 本身设置的固定大小上限，无法进行调整，而元空间使用的是直接内存，受本机可用内存的限制，虽然元空间仍旧可能溢出，但是比原来出现的几率会更小。当元空间溢出时会得到如下错误：java.lang.OutOfMemoryError: MetaSpace")]),a._v(" "),t("li",[a._v("元空间里面存放的是类的元数据，这样加载多少类的元数据由系统的实际可用空间来控制，能加载的类就更多了。")])]),a._v(" "),t("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/1661331758022-109614f2-7f61-4204-a393-86bb4e258b6d-20221022215411112.png",alt:"image.png"}}),a._v('\n**回收方法区**\n方法区垃圾收集的“性价比”通常是比较低的。《Java虚拟机规范》不要求虚拟机在方法区中实现垃圾收集。但目前垃圾回收器也是会回收方法区的。方法区主要回收两部分内容：废弃常量和无用的类。\n回收废弃常量与回收Java堆中的对象非常类似。比如一个字符串“abc”已经进入常量池中,但是当前系统没有任何一个String对象引用常量池中的“abc"常量，也没有其他地方引用这个常量，如果这时发生内存回收，而且必要的话，这个“abc”常量就会被系统清理出常量池。常量池中的其他类(接口)、方法、 字段的符号引用也与此类似。\n“无用的类”需要满足以下三个条件:\n'),t("ul",[t("li",[a._v("该类所有的实例都已经被回收，也就是Java堆中不存在该类的任何实例")]),a._v(" "),t("li",[a._v("加载该类的ClassLoader已经被回收")]),a._v(" "),t("li",[a._v("该类对于的Class对象没有在任何地方被引用，无法再任何地方通过反射访问该类")])]),a._v(" "),t("p",[a._v("虚拟机可以对满足3个条件的无用类进行回收，这里说的仅仅是“可以”，而不是和对象一样,不使用的必然会被回收。HotSpot虚拟机提供了-Xnoclassgc参数进行控制，命令:java -verbose:class看到加载的类的状况，配置-XX:+ TraceClassloading、-XX:+TraceClassUnLoadin参数可以跟踪类加载和卸载的情况。")]),a._v(" "),t("h3",{attrs:{id:"直接内存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#直接内存"}},[a._v("#")]),a._v(" 直接内存")]),a._v(" "),t("p",[a._v("直接内存并不是虚拟机运行时数据区的一部分，也不是虚拟机规范中定义的内存区域，但是这部分内存也被频繁地使用。而且也可能导致 OutOfMemoryError 错误出现。本地直接内存的分配受到本机总内存大小以及处理器寻址空间的限制。直接内存分配回收成本较高，但读写性能高。\n"),t("strong",[a._v("用途：常见于NIO操作时，用于数据缓冲区")]),a._v("。JDK1.4 中新加入的 NIO(New Input/Output) 类，引入了一种基于通道（Channel）与缓存区（Buffer）的 I/O 方式，它可以直接使用 Native 函数库直接分配堆外内存，然后通过一个存储在 Java 堆中的 DirectByteBuffer 对象作为这块内存的引用进行操作。这样就能在一些场景中显著提高性能，因为避免了在 Java 堆和 Native 堆之间来回复制数据。\n**直接内存是否可以被GC？**调用System.gc()强制FULLGC。")]),a._v(" "),t("h3",{attrs:{id:"垃圾收集"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#垃圾收集"}},[a._v("#")]),a._v(" 垃圾收集")]),a._v(" "),t("h4",{attrs:{id:"如何判断对象是否可被回收"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如何判断对象是否可被回收"}},[a._v("#")]),a._v(" 如何判断对象是否可被回收？")]),a._v(" "),t("p",[t("strong",[a._v("引用计数法")]),a._v("：当对象被引用一次计数器加1，对象失去引用计数器减1，计数器为0是就可以判断对象死亡了。这种算法简单高效，但是对于循环引用或其他复杂情况，需要更多额外的开销，因此Java几乎不使用该算法。\n"),t("strong",[a._v("可达性分析算法")]),a._v("：所谓可达性分析是指，从GCRoots对象一直向下搜索（顺藤摸瓜），节点所走过的路径称为引用链，当一个对象到 GC Roots 没有任何引用链相连的话，则证明此对象是不可用的，需要被回收。\n"),t("img",{staticStyle:{zoom:"43%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/1661332182301-1f553690-d9dc-4d25-97a7-c0500e18212a.png",alt:"image.png"}})]),a._v(" "),t("h4",{attrs:{id:"哪些对象可以作为-gc-roots-呢"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#哪些对象可以作为-gc-roots-呢"}},[a._v("#")]),a._v(" 哪些对象可以作为 GC Roots 呢？")]),a._v(" "),t("p",[t("strong",[a._v("原因：GC Roots只会引⽤其他对象，⽽不会被其他对象引⽤。")])]),a._v(" "),t("ul",[t("li",[a._v("虚拟机栈(栈帧中的本地变量表)中引用的对象")]),a._v(" "),t("li",[a._v("本地方法栈(Native 方法)中引用的对象")]),a._v(" "),t("li",[a._v("方法区中类静态属性引用的对象")]),a._v(" "),t("li",[a._v("方法区中常量引用的对象")]),a._v(" "),t("li",[a._v("所有被同步锁持有的对象")])]),a._v(" "),t("h4",{attrs:{id:"引用的两次标记过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#引用的两次标记过程"}},[a._v("#")]),a._v(" 引用的两次标记过程")]),a._v(" "),t("p",[a._v("当一个对象可被回收时，如果需要执行该对象的finalize()方法，那么就有可能在该方法中让对象重新被引用，从而实现自救。自救只能进行一次，如果回收的对象之前调用了finalize()方法自救，后面回收时不会再调用该方法。\n可达性分析算法中，宣告一个对象真正的死亡，需要经历两次标记的过程:")]),a._v(" "),t("ul",[t("li",[a._v("如果对象在进行可达性分析后发现没有与GC root相连的引用链，那么它将会被第一次标记并进行一次筛选，筛选的条件是是否有必要执行finalize()方法，当对象没有覆盖finalize()方法或者finalize()方法已经被虚拟机已经调用过，视为没有必要执行。")]),a._v(" "),t("li",[a._v("如果对象被判定为有必要执行finalize()方法，那么对象将会放到一个F-Queue队列中， 稍后由一个虚拟机自动建立的、低优先级的Finalizer线程 去执行它。finalize()方法是对象逃离死亡的最后一次机会，稍后GC将会对队列中对象进行第二次小规模标记，如果对象要在finalize()拯救自己，只需要与引用链上的任意一个对象建立关联即可，譬如把自己（this关键字）赋值给某个类变量或者对象的成员变量，那在第二次标记时它将被移出即将回收的集合。\n注意:任何一个对象finalize方法只会被系统调用一次")])]),a._v(" "),t("h4",{attrs:{id:"垃圾收集算法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#垃圾收集算法"}},[a._v("#")]),a._v(" 垃圾收集算法")]),a._v(" "),t("p",[a._v("**标记-清除算法：**首先标记出所有需要被回收的对象，然后对标记的对象进行统一清除，清空对象所占用的内存区域。缺点：一是执行效率不可控。如果堆中大部分的对象都可回收的，收集器要执行大量的标记、收集操作。二是产生了许多内存碎片。被回收后的区域内存并不是连续的，当有大对象要分配而找不到满足大小的空间时，要触发下一次垃圾收集。\n"),t("img",{staticStyle:{zoom:"43%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/1661332871559-065029df-14fe-4e5b-9917-d2f56c815d02.png"}}),a._v("\n**标记-复制算法：**将内存分为大小相同的两块，每次使用其中一块。当这一块的内存使用完后，就将还存活的对象复制到另一块去，然后再把使用的空间一次清理掉。这样就使每次的内存回收都是对内存区间的一半进行回收。优点：不会产生内存碎片。缺点：预留一半的内存区域未免有些浪费了，并且如果内存中大量的是存活状态，只有少量的垃圾对象，收集器要执行更多次的复制操作才能释放少量的内存空间，得不偿失。\n**标记-整理算法：**标记过程与“标记-清除”算法一样，但是在整理阶段，算法将存活的对象向内存空间的一端移动，然后将存活对象边界以外的空间全部清空。优点：没有内存碎片问题。缺点：整理过程会产生内存地址移动，效率可能偏低。\n"),t("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/image-20221022220325909.png",alt:"image-20221022220325909"}}),a._v("\n**分代收集算法：**现在的商业虚拟机采用分代收集算法，它根据对象存活周期将内存划分为几块，不同块采用适当的收集算法。一般将java堆分为新生代和老年代，这样我们就可以根据各个年代的特点选择合适的垃圾收集算法。比如在新生代中，每次收集都会有大量对象死去，所以可以选择”标记-复制“算法，只需要付出少量对象的复制成本就可以完成每次垃圾收集。而老年代的对象存活几率是比较高的，而且没有额外的空间对它进行分配担保，所以我们必须选择“标记-清除”或“标记-整理”算法进行垃圾收集。")]),a._v(" "),t("h4",{attrs:{id:"垃圾收集器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#垃圾收集器"}},[a._v("#")]),a._v(" 垃圾收集器")]),a._v(" "),t("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/image-20221022220348252.png",alt:"image-20221022220348252"}}),a._v(" "),t("ul",[t("li",[a._v("新生代收集器：Serial、ParNew、Parallel Scavenge")]),a._v(" "),t("li",[a._v("老年代收集器：Serial Old、Parallel Old、CMS")]),a._v(" "),t("li",[a._v("回收整个Java堆（新生代和老年代）：G1收集器")])]),a._v(" "),t("p",[t("strong",[a._v("Serial和Serial Old收集器")]),a._v(" "),t("img",{staticStyle:{zoom:"50%"},attrs:{src:"/Users/ivem/Library/Application Support/typora-user-images/image-20221022220415524.png",alt:"image-20221022220415524"}})]),a._v(" "),t("ul",[t("li",[a._v("Serial和Serial Old是串行收集器，其余都是并行收集器。")]),a._v(" "),t("li",[a._v("Serial最早诞生的垃圾收集器，以单线程方式进行垃圾收集。简单高效，在单个CPU环境下，由于没有线程交互的开销，单线程也能很高效地进行收集。但是内存大时STW时间会很长。")]),a._v(" "),t("li",[a._v("SerialOld收集器是Serial收集器的老年代版本，主要有两大用途：在JDK1.5以及版本中与Parallel Scanvenge收集器搭配使用。作为CMS收集器的后备方案。")])]),a._v(" "),t("p",[a._v("**ParNew收集器：**ParNew是Serial收集器的多线程版本，是 Server场景下默认的新生代收集器。\n"),t("img",{staticStyle:{zoom:"33%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/image-20221022220435909.png",alt:"image-20221022220435909"}}),a._v(" "),t("strong",[a._v("Parallel Scavenge和Parallel Old收集器：")]),a._v(" "),t("img",{staticStyle:{zoom:"50%"},attrs:{src:"/Users/ivem/Library/Application Support/typora-user-images/image-20221022220459550.png",alt:"image-20221022220459550"}})]),a._v(" "),t("ul",[t("li",[a._v("多线程新生代收集器，通过一个开关参数打开GC自适应的调节策略，就不需要手工指定新生代的大小（-Xmn）、Eden 和 Survivor 区的比例、晋升老年代对象年龄等细节参数了。虚拟机会根据当前系统的运行情况收集性能监控信息，动态调整这些参数以提供最合适的停顿时间或者最大的吞吐量（吞吐量指 CPU 用于运行用户程序的时间占总时间的比值）。")]),a._v(" "),t("li",[a._v("停顿时间越短就越适合需要与用户交互的程序，良好的响应速度能提升用户体验。而高吞吐量则可以高效率地利用 CPU 时间，尽快完成程序的运算任务，适合在后台运算而不需要太多交互的任务。")]),a._v(" "),t("li",[a._v("Parallel Old是Parallel Scavenge 收集器的老年代版本。在注重吞吐量以及 CPU资源敏感的场合，可以优先考虑 Parallel Scavenge 加Parallel Old 收集器。")])]),a._v(" "),t("h4",{attrs:{id:"cms收集器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cms收集器"}},[a._v("#")]),a._v(" CMS收集器")]),a._v(" "),t("p",[a._v("CMS收集器的目标是做到最短回收停顿时间，当关注应用的响应速度时，可以选择这个收集器。CMS收集器是基于标记清除算法来实现的，主要包含以下四个过程：\n"),t("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/1661333243616-cd30aa79-6a84-4604-ae4a-f4733c2c9deb.png",alt:"img"}})]),a._v(" "),t("ul",[t("li",[a._v("初始标记：标记GC Roots 能直接关联到的对象。")]),a._v(" "),t("li",[a._v("并发标记：用户线程和垃圾回收线程同时进行。从GC Roots开始对堆中对象进行可达性分析，找出存活对象。在整个回收过程中耗时最长。")]),a._v(" "),t("li",[a._v("重新标记：修正并发标记期间因用户线程和GC线程同时运行产生的对象引用链变化问题。")]),a._v(" "),t("li",[a._v("并发清除：开启用户线程，同时GC线程开始对未标记的区域做清除。")])]),a._v(" "),t("p",[t("strong",[a._v("优点")]),a._v("：")]),a._v(" "),t("ul",[t("li",[a._v("初始标记和重新标记只需要短暂的STW操作，不会非常耗时。")]),a._v(" "),t("li",[a._v("并发标记和并发清除，垃圾回收线程可以和用户线程一起工作。")])]),a._v(" "),t("p",[t("strong",[a._v("缺点")]),a._v("：")]),a._v(" "),t("ul",[t("li",[a._v("无法处理浮动垃圾，浮动垃圾是指并发清除阶段由于用户线程继续运行而产生的垃圾，这部分垃圾只能到下一次 GC 时才能进行回收。由于浮动垃圾的存在，因此需要预留出一部分内存，意味着 CMS 收集不能像其它收集器那样等待老年代快满的时候再回收。如果预留的内存不够存放浮动垃圾，就会出现 Concurrent Mode Failure，这时虚拟机将临时启用 Serial Old 来替代 CMS。")]),a._v(" "),t("li",[a._v("CMS使用标记-清除算法会产生空间碎片，当碎片过多，往往出现老年代空间剩余，但无法找到足够大连续空间来分配当前对象，不得不提前触发一次 Full GC。")])]),a._v(" "),t("h4",{attrs:{id:"g1收集器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#g1收集器"}},[a._v("#")]),a._v(" G1收集器")]),a._v(" "),t("p",[a._v("被官方称为是全功能的垃圾收集器，也是JDK9之后服务端默认的垃圾收集器。G1把堆划分成多个大小相等的独立区域，新生代和老年代不再物理隔离。\n"),t("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/1661333512727-c5cf7135-1c5f-4192-b868-263156b7e4e3.png"}}),a._v("\nGC的整个操作过程非常复杂，但是思想比较简单。它将整个Java堆分成大小相等的独立区域Region，所有的标记操作，复制操作，整理操作都是基于这个Region的。从而达到将垃圾回收行为化整为零，分而治之。虽然它遵循了分代的概念，但并没有将哪块内存属于哪个分代固定下来，而是根据每个region中的特性来决定region扮演的角色。G1收集器的执行可以分为以下几个步骤：")]),a._v(" "),t("ul",[t("li",[a._v("初始标记，")]),a._v(" "),t("li",[a._v("并发标记")]),a._v(" "),t("li",[a._v("最终标记")]),a._v(" "),t("li",[a._v("筛选回收，对各个Region的回收价值和回收成本进行排序，这一部分从整体上来看，是基于标记-整理的，从局部（两个 Region之间）是基于复制的。")])]),a._v(" "),t("p",[t("strong",[a._v("相比CMS，G1具备以下的优点")]),a._v("：")]),a._v(" "),t("ul",[t("li",[a._v("可以指定最大停顿时间")]),a._v(" "),t("li",[a._v("内存布局上化整为零，可以根据回收Region的收益来动态的进行回收")]),a._v(" "),t("li",[a._v("本质上是基于标记整理和标记复制的，不存在内存空间碎片化的问题")])]),a._v(" "),t("p",[t("strong",[a._v("缺点：")])]),a._v(" "),t("ul",[t("li",[a._v("因为Region的个数很多，每个Region还需要一份卡表来维护信息，所以G1的内存要高于CMS")]),a._v(" "),t("li",[a._v("G1在运行效率上由于算法比CMS更加负载，所以执行负载也要大一些")])]),a._v(" "),t("h3",{attrs:{id:"类加载和创建对象"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#类加载和创建对象"}},[a._v("#")]),a._v(" 类加载和创建对象")]),a._v(" "),t("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/1661333751575-2c615585-3650-4e07-aa9a-9d679fb1bd59.png",alt:"image.png"}}),a._v("\n**类加载过程：**\n"),t("ul",[t("li",[t("strong",[a._v("加载")]),a._v("：把class字节码文件从各个来源通过类加载器装载入内存（方法区）中")]),a._v(" "),t("li",[t("strong",[a._v("链接：")]),a._v(" "),t("ul",[t("li",[a._v("验证阶段会进行文件佫式验证、元数据验证、字节码验证等过程，确保Class文件的字节流中包含的信息符合《Java虚拟机规范》的全部约束要求，保证这些信息被当作代码运行后不会危害虚拟机自身的安全。")]),a._v(" "),t("li",[a._v("准备阶段是为类变量（静态变量，被static修饰的变量）在方法区分配内存，并且赋予初始值。实例变量不会在这阶段分配内存，它会在对象实例化时随着对象一起分配在Java堆中。实例化不是类加载的过程，类加载发生在所有实例化操作之前，并且只加载一次，实例化可以进行多次。")]),a._v(" "),t("li",[a._v("解析阶段目标是将常量池的符号引用替换为直接引用的过程。直接引用可以直接指向目标的指针、相对偏移量或者是一个能定位到目标的句柄。举例来说，对于一个方法调用，编译器会生成一个包含目标方法所在类的名字、目标方法名字、接收参数类型以及返回值类型的符号引用，来指代所要调用的方法。")])])]),a._v(" "),t("li",[t("strong",[a._v("初始化")]),a._v("：对static修饰的变量或语句进行初始化。初始化阶段是类加载的最后一步，这一步 JVM 才开始执行类中定义的 Java 程序代码（字节码）。")])]),a._v(" "),t("p",[t("strong",[a._v("创建对象过程：")])]),a._v(" "),t("ul",[t("li",[a._v("在堆区给对象分配内存")]),a._v(" "),t("li",[a._v("实例变量初始化")]),a._v(" "),t("li",[a._v("设置对象头类型指针找到对象属于哪个类，hashcode，gc分代年龄等。")]),a._v(" "),t("li",[a._v("执行init方法执行init方法(构造方法)把对象按照程序员的意愿进行初始化。")]),a._v(" "),t("li",[a._v("最后有类似于Child c = new Child()形式语句的话，在栈区定义Child类型引用变量c，然后将堆区对象的地址赋值给c。")])]),a._v(" "),t("h3",{attrs:{id:"类加载器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#类加载器"}},[a._v("#")]),a._v(" 类加载器")]),a._v(" "),t("img",{staticStyle:{zoom:"57%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/1661334373895-1b0ac0e6-4446-4a76-ab32-03d6984b537d.png"}}),a._v(" "),t("ul",[t("li",[a._v("类加载就是将一个.class字节码文件实例化成class对象并进行相关初始化过程。ClassLoader即类加载器，负责将类加载到JVM。在Java虚拟机外部实现，以便让应用程序自己决定如何去获取所需要的类。")]),a._v(" "),t("li",[a._v("JVM加载class文件到内存的两种方式：隐式加载：JVM自动加载所需要的类到内存中。显示加载：通过使用ClassLoader加载一个类到内存中。")]),a._v(" "),t("li",[a._v("启动类加载器：最顶层的加载类，由C++实现，负责加载 %JAVA_HOME%/lib目录下的jar包和类或者被-Xbootclasspath参数指定的路径中的所有类。")]),a._v(" "),t("li",[a._v("扩展类加载器：主要负责加载 %JRE_HOME%/lib/ext 目录下的jar包和类，或被java.ext.dirs 系统变量所指定的路径下的jar包。")]),a._v(" "),t("li",[a._v("应用类加载器：面向我们用户的加载器，负责加载当前应用 classpath下的所有jar包和类。")]),a._v(" "),t("li",[a._v("对于任意一个类，都需要由加载它的类加载器和这个类本身一同确立其在Java虚拟机的唯一性。每个类加载器都拥有一个独立的类名称空间。也就是说两个类相等一是类本身相等，二是使用同一个类加载器进行加载。")])]),a._v(" "),t("h4",{attrs:{id:"双亲委派模型工作流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#双亲委派模型工作流程"}},[a._v("#")]),a._v(" 双亲委派模型工作流程")]),a._v(" "),t("ul",[t("li",[a._v("当一个类加载器接受到加载请求时，它首先将加载请求委托给它的父加载器，每一个层次的类加载器都是如此，导致的结果就是所有的类加载请求都会到达最顶层的启动类加载器上")]),a._v(" "),t("li",[a._v("只有父加载器在它的搜索范围内找不到请求加载的类，无法完成类的加载请求，子加载器才会尝试自己去加载类。")]),a._v(" "),t("li",[a._v("自底向上依次检查是否已经被加载过，自顶向下依次加载。")])]),a._v(" "),t("p",[t("strong",[a._v("好处")]),a._v("：")]),a._v(" "),t("ul",[t("li",[a._v("防止重复加载，父加载器已经加载的，将不会被子加载器重复加载。")]),a._v(" "),t("li",[a._v("保证核心类不会被篡改，即使自己实现了同名的类，也不会被加载。")])]),a._v(" "),t("h4",{attrs:{id:"如何破坏双亲委派"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如何破坏双亲委派"}},[a._v("#")]),a._v(" 如何破坏双亲委派？")]),a._v(" "),t("ol",[t("li",[a._v("SPI（Service Provider Inteface）是一种服务发现机制，比如JDBC驱动的接口有启动类加载，启动类加载器是无法加载实现类的，于是SPI将双亲委派模型中应用程序类加载器->引导类加载器的委派，变成了引导类加载器->应用程序类加载器的委派，这样就打破了双亲委派的类加载模式。")])]),a._v(" "),t("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://raw.githubusercontent.com/ivemcel/pictures/main/1661334493210-6dd0dbc9-465b-4f23-82f4-b5e51e5e7938.png",alt:"image.png"}}),a._v(" "),t("ol",{attrs:{start:"2"}},[t("li",[a._v("继承ClassLoader重写loadClass方法")])]),a._v(" "),t("h3",{attrs:{id:"oom问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#oom问题"}},[a._v("#")]),a._v(" OOM问题")]),a._v(" "),t("p",[t("strong",[a._v("内存溢出")]),a._v("（Out Of Memory）：程序申请内存过大，虚拟机无法满足，挂掉了。当JVM没有足够的内存为对象分配空间并且垃圾回收器也没有空间可回收时，就会抛出这个错误。\n"),t("strong",[a._v("内存泄漏")]),a._v("（memory leak）申请了内存用完了不释放，比如一共有1024M的内存，分配了512M的内存一直不回收，那么可以用的内存只有512M了，仿佛泄漏掉了一部分。\n"),t("strong",[a._v("常见OOM：")])]),a._v(" "),t("ol",[t("li",[t("strong",[a._v("Java7 永久代（方法区）溢出：")])])]),a._v(" "),t("ul",[t("li",[a._v("用于存储已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。每当一个类初次加载的时候，元数据都会存放到永久代。")]),a._v(" "),t("li",[a._v("一般出现于大量 Class 对象或者 JSP 页面，或者采用 CgLib 动态代理技术导致")]),a._v(" "),t("li",[a._v("可以通过 -XX：PermSize 和 -XX：MaxPermSize 修改方法区大小")])]),a._v(" "),t("blockquote",[t("p",[a._v("Java8 将永久代变更为元空间，报错：java.lang.OutOfMemoryError: Metadata space，元空间内存不足默认进行动态扩展")])]),a._v(" "),t("ol",{attrs:{start:"2"}},[t("li",[a._v("**虚拟机栈溢出：**一般是由于程序中存在死循环或者深度递归调用造成的。如果栈大小设置过小也会出现溢出，可以通过-Xss设置栈的大小。虚拟机抛出栈溢出错误，可以在日志中定位到错误的类、方法")]),a._v(" "),t("li",[a._v("**Java 堆内存溢出：**溢出的原因一般由于JVM堆内存设置不合理或者内存泄漏导致，内存泄漏的话，可以通过工具查看泄漏对象到 GC Roots 的引用链。掌握了泄漏对象的类型信息以及 GC Roots 引用链信息，就可以精准地定位出泄漏代码的位置。")])]),a._v(" "),t("p",[t("a",{attrs:{href:"https://www.cnblogs.com/jelly12345/p/15007745.html",target:"_blank",rel:"noopener noreferrer"}},[t("strong",[a._v("线上OOM排查")]),t("OutboundLink")],1)]),a._v(" "),t("ul",[t("li",[a._v("使用dmesg命令查看系统日志")]),a._v(" "),t("li",[a._v("使用ps命令查看进程")]),a._v(" "),t("li",[a._v("使用top命令")]),a._v(" "),t("li",[a._v("使用jstat命令")]),a._v(" "),t("li",[a._v("jmap_heap 查看是否内存分配过小 jmap_histo 查看是否有明显的对象分配过多且没有释放情况 jmap_dump 导出 JVM 当前内存快照，使用 JDK 自带或 MAT 等工具分析快照")])])])}),[],!1,null,null,null);t.default=_.exports}}]);