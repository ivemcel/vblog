#### DNS协议
查找域名对应的IP地址，一般使用UDP协议传输，端口号53。
DNS域名系统是因特网上域名和IP地址相互映射的一个分布式数据库，能够使用户更方便的去访问互联网。
**DNS解析过程：**

1. 浏览器在自己的缓存中查找是否有该域名对应的 IP 地址，没有命中进行第二步；
2. 通过操作系统查询本地DNS解析器缓存和hosts文件，没有进行第三步；
3. 用户PC中的DNS客户端(DNS解析器)向本地DNS服务器发送DNS查询请求报文（递归查询），若本地DNS服务器有对应的IP地址则直接返回。若没有，进行第四步。
4. 本地DNS服务器依次向根域名服务器(.)、顶级域名服务器(com、cn、net、gov等)、权限/权威域名服务器(qq、baidu、bilibili等)发起查询请求（迭代查询），最终查询到IP地址返回给本地区域名服务器，本地域名服务器将IP地址返回给本地DNS解析器，本地DNS解析器再将IP地址返回给浏览器。

![](https://cdn.nlark.com/yuque/0/2022/jpeg/26499320/1661344724234-100250c5-40b6-486d-ade5-a1b826eaac86.jpeg#clientId=u9edbcb13-a082-4&crop=0&crop=0&crop=1&crop=1&height=291&id=GQf5H&originHeight=484&originWidth=892&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uadf15ba8-ddc8-4b60-9d5f-5fcccda2801&title=&width=537)
**DNS协议在传输层使用TCP还是UDP？**

- DNS 在域名解析的过程中，会根据 DNS 响应报文的大小选择使用 TCP 还是 UDP。但是一般情况下，返回的 DNS 响应报文都不会超过MTU个字节，所以事实上，很多 DNS 服务器进行配置的时候，也仅支持 UDP 查询包；
- DNS 在进行区域传输的时候使用 TCP 协议。区域传输就是辅助域名服务器与主域名服务器通信，并同步数据信息的过程。（主域名服务器用来写，辅助域名服务器用来读，提供负载均衡的能力，缓解主域名服务器的压力。）
- 辅域名服务器会定时向主域名服务器进行查询以便了解数据是否有变动。如有变动，则会执行一次区域传输。区域传输时数据同步传送的数据量比一个DNS请求和响应报文的数据量要多得多，所以使用TCP报文。
#### Web页面请求过程
web页面请求过程实际是主机上的浏览器应用进程与Web服务器应用进程之间基于网络的通信。主要过程：

- DNS域名解析
- 与服务器通过三次握手，建立TCP连接
- 浏览器根据输入的url构建http请求报文通过操作系统向服务器发送HTTP请求。从TCP/IP分层体系角度来看，浏览器将http请求报文交由运输层处理。运输层给HTTP请求报文添加一个TCP首部，使之成为TCP报文段，然后将TCP报文段交付给网络层处理。网络层给TCP报文段添加一个IP首部，使之成为IP数据报，然后将IP数据报交付给数据链路层处理。数据链路层给IP数据报添加一个首部和一个尾部，封装成帧交付给物理层。物理层将帧看作比特流通过层层转发到达Web服务器，在Web服务器上，物理层数据链路层网络层运输层对信号进行层层解封，最终将HTTP请求报文交付给应用层处理。
TCP报文段首部格式作用：区分应用进程以及实现可靠传输；
IP数据报首部格式作用：使IP数据报可以在互联网传输，即能被路由器转发。
- 服务器处理请求，给主机发回响应报文
- 浏览器解析并渲染页面
- TCP四次挥手，连接结束

![](https://cdn.nlark.com/yuque/0/2022/jpeg/26499320/1646834453178-4c903bfc-2612-4f90-be55-0e0b2316140c.jpeg#clientId=u3a943ac4-22cb-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=221&id=qVnrA&margin=%5Bobject%20Object%5D&originHeight=753&originWidth=1846&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u30e502ae-656a-4dc8-b7f4-85f8a507022&title=&width=542)
#### 应用层
为应用程序间提供通信和交互的协议。常用协议：HTTP、FTP、SSH ｜ DHCP、DNS
#### 传输层

- 为两台主机中的进程间提供通用的数据传输服务（横向来看）
- 为上层提供服务：把应用层的报文封装成 TCP 的报文段或 UDP 的用户数据报进行传输（纵向来看）

常用协议：TCP报文段、UDP用户数据报
TCP协议是向上层提供面向连接的可靠传输服务。IP和UDP协议都是向上层提供的是无连接的不可靠传输服务。
##### 端口号
传输层使用端口号区分应用层的不同应用进程。端口号用16比特表示，取值范围0-65535。

- **熟知端口号**：0～1023，这些端口指派给了TCP/IP体系中最重要的一些应用协议，例如HTTP使用80，DNS使用53。
- **登记端口号**：1024～49151，为没有熟知端口号的应用程序使用，这类端口号必须按照规定手续登记，以防止重复。
- **短暂端口号**：49152～65535，留给客户进程选择暂时使用。当服务器进程收到客户进程的报文时，就知道了客户进程所使用的动态端口号。通信结束后，这个端口号可供其他客户进程以后使用。

端口号只具有本地意义，即端口号只是为了标识本计算机应用层的各进程，在因特网中，不同计算机中相同端口号是没有联系的。
##### TCP 和 UDP 可以同时绑定相同的端口吗？
在数据链路层中，通过 MAC 地址来寻找局域网中的主机。在网际层中，通过 IP 地址来寻找网络中互连的主机或路由器。在传输层中，需要通过端口进行寻址，来识别同一计算机中同时通信的不同应用程序。
传输层有两个传输协议分别是 TCP 和 UDP，在内核中是两个完全独立的软件模块。
当主机收到数据包后，可以在 IP 包头的「协议号」字段知道该数据包是 TCP/UDP，所以可以根据这个信息确定送给哪个模块（TCP/UDP）处理，送给 TCP/UDP 模块的报文根据「端口号」确定送给哪个应用程序处理。
因此， TCP/UDP 各自的端口号也相互独立，如 TCP 有一个 80 号端口，UDP 也可以有一个 80 号端口，二者并不冲突。
##### 多个 TCP 服务进程可以绑定同一个端口吗？
如果两个 TCP 服务进程同时绑定的 IP 地址和端口都相同，那么执行 bind() 时候就会出错，错误是“Address already in use”。
注意，如果 TCP 服务进程 A 绑定的地址是  0.0.0.0 和端口 8888，而如果 TCP 服务进程 B 绑定的地址是 192.168.1.100 地址（或者其他地址）和端口 8888，那么执行 bind() 时候也会出错。
这是因为 0.0.0.0  地址比较特殊，代表任意地址，意味着绑定了 0.0.0.0  地址，相当于把主机上的所有 IP 地址都绑定了。
##### 客户端的端口可以重复使用吗？
TCP 连接是由四元组（源IP地址，源端口，目的IP地址，目的端口）唯一确认的，那么只要四元组中其中一个元素发生了变化，那么就表示不同的 TCP 连接的。所以如果客户端已使用端口 64992 与服务端 A 建立了连接，那么客户端要与服务端 B 建立连接，还是可以使用端口 64992 的，因为内核是通过四元祖信息来定位一个 TCP 连接的，并不会因为客户端的端口号相同，而导致连接冲突的问题。
#### 网络层

- 为两台主机提供通信服务。
- 为上层提供服务：把运输层产生的报文段或用户数据报封装成 IP 数据报进行传送。

常用协议：IP（IP数据包或分组）、ARP、ICMP、IGMP、RIP、OSPF
#### 数据链路层

- 还是为两台主机之间的数据传输提供服务，两台主机之间的传输，总是在一段一段的链路上传送的，就需要链路层的协议。
- 为上层提供服务：把 IP 数据报封装成帧，在链路上进行传递。

**链路**是从一个结点到相邻结点的一段物理线路；把实现通信协议的硬件和软件（如网络适配器）加到链路上就构成了**数据链路**。数据链路层以数据帧为单位传输和处理数据。数据链路层的主要职责是将数据帧从网络上的一个节点（节点可以是路由器或者主机）发送往相邻的另一个节点。为了完成这一任务，数据链路层考虑的主要问题有：
**封装成帧**：数据链路层给IP数据报添加一个首部和一个尾部，使之成为帧，首部作用是为了让帧能够在一段链路上或一个网络上传输，能够被相应的目的主机接收。尾部作用是让目的主机检查所接收到的帧是否有误码。不同的物理网络会转发不同格式的数据帧。
![](https://cdn.nlark.com/yuque/0/2022/png/26499320/1646834453848-ce3fd6d9-6688-47d8-8570-95d9b999f94f.png#clientId=u3a943ac4-22cb-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=91&id=WlHvo&margin=%5Bobject%20Object%5D&originHeight=113&originWidth=821&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3d31515b-07c5-41bc-bceb-504cf8e6453&title=&width=664)
MTU：最大传输单元，数据链路层中规定了帧的数据部分最大长度，一般为 1500 字节。例如以太网V2的MAC帧中一共有1518字节，帧头帧尾占18字节，数据载荷部分最大长度是1500字节。这个数据载荷其实是由上层网络层交付的数据，所以MTU描述了网络层能够传输的最大IP数据包。
MSS：TCP数据包每次能够传输的最大长度，一般为1460字节。为了达到最佳的传输效率，TCP协议在建立连接的时候通常要协商双方的MSS值，MSS=MTU-IP Header(20字节)-TCP Header(20字节)=1460字节。实际场景下，TCP Header中会带有12字节的选项–时间戳（用户在发送每一个TCP报文的时候都放置一个时间戳，接受方在确认中返回这个时间戳值。发送方就可以根据这个时间戳来计算往返时延RTT，从而使得RTT更加精确，减少不必要的重传，降低网络的负载。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1661344231209-4deabfbd-8041-435f-a0ee-0c0fa2f1371a.png#clientId=u8ff41e15-beb4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=180&id=u37b52a13&margin=%5Bobject%20Object%5D&name=image.png&originHeight=265&originWidth=651&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17546&status=done&style=none&taskId=u67f00423-8664-4e98-96aa-b29222a3500&title=&width=441.5)
**差错检测**：在数据链路层使用CRC检验，能够实现无比特差错的传输。循环冗余校验 CRC 是一种检错方法，而帧校验序列 FCS 是添加在数据后面的冗余码。
**可靠传输**：发送端发什么，接收端就收到什么；不可靠传输：仅仅丢弃有误码的帧，其他什么也不做。一般情况下，有线链路误码率低，以太网不要求数据链路层向上提供可靠传输服务。无线链路易受干扰，误码率高，因此802.11无线局域网要求数据链路层向上层提供可靠传输服务。
#### 物理层
**物理层考虑的是怎样才能在连接各种计算机的传输媒体上传输数据比特流。**物理层为数据链路层屏蔽了各种传输媒体的差异使数据链路层只需要考虑如何完成本层的协议和服务，而不必考虑具体的传输媒体是什么。

- 在传输媒体上进行传输比特流。
- 为上层提供服务：尽可能为数据链路层屏蔽传输媒体和通信手段的差异，把帧拆分成比特流在传输媒介上进行传输。
#### 路由器、交换机和集线器
|  | **所属网络模型层级** | **功能** |
| --- | --- | --- |
| 路由器 | 网络层 | 识别IP地址并根据IP地址转发数据包；维护数据表并基于数据表进行最佳路径选择 |
| 交换机 | 数据链路层 | 识别MAC地址并根据MAC地址转发数据帧 |
| 集线器 | 物理层 | 信息分发，它把一个端口接收的所有信号向所有端口分发出去。 |

集线器和交换机用于创建网络。路由器用于连接网络。



