### 为什么使用数据库
| 数据保存方式 | 优点 | 缺点 |
| --- | --- | --- |
| 数据保存在内存 | 存取速度快	 | 数据无法永久保存 |
| 数据保存在文件 | 数据可永久保存 | 查询数据不方便；操作速度比内存操作慢，频繁的 IO 操作 |
| 数据保存在数据库 | 数据可永久保存且数据安全性高；使用 SQL 语句，查询方便效率高；便于数据管理和数据分析 | 数据库移植不方便；不支持集群；不擅长业务逻辑的处理 |

总而言之，面对庞大的网络数据量，使用数据库可以高效且条理分明地存储数据，它使人们能够更加迅速和方便地管理数据。
### 数据库三大范式
数据库范式是设计数据库时，需要遵循的一些规范。各种范式是条件递增的联系，越高的范式数据库冗余越小。常用的数据库三大范式为：

- 第一范式：每个列都不可以再拆分，强调的是列的原子性。第一范式要求数据库中的表都是二维表。
- 第二范式：在第一范式的基础上，一个表必须有一个主键，非主键列完全依赖 于主键，而不能是依赖于主键的一部分。
- 第三范式：在第二范式的基础上，非主键列只依赖（直接依赖）于主键，不依赖于其他非主键。
### MySQL 结构

- 服务层：

1. 连接器：管理连接、权限验证。
	2. 查询缓存：命中缓存直接返回，mysql8.0废除。
	3. 分析器：对sql进行词法分析和语法分析
	4. 优化器：执行计划生成、选择索引
	5. 执行器：操作引擎，返回结果

- 存储引擎层：存储数据，提供读写接口。MySQL 5.1之前采用 MyISAM 作为默认存储引擎；MySQL 5.1 之后采用 InnoDB作为默认存储引擎。MyISAM和InnoDB都是使用B+树索引。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1661414693359-735aa962-39a1-4234-8fb7-ca0d22977133.png#clientId=u59ee9fbb-0af3-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=454&id=ud7465d8e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1546&originWidth=1240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=187283&status=error&style=none&taskId=ufeb0f6f0-7106-4a91-9b7a-5485a0f5fc6&title=&width=364)
### InnoDB 和 MyISAM 的区别

- InnoDB 支持事务，MyISAM 不支持事务
- InnoDB 支持外键，MyISAM不支持。
- InnoDB 最小的锁粒度是行锁，MyISAM 最小的锁粒度是表锁。一个更新语句会锁住整张表，导致其他查询和更新都会被阻塞，因此并发访问受限。
- InnoDB 的主键是聚簇索引，MyISAM的主键是非聚簇索引
- InnoDB 不保存表的具体行数，执行 select count(*) from table 时需要全表扫描。而MyISAM 用一个变量保存了整个表的行数，执行上述语句时只需要读出该变量即可，速度很快
### 关系型和非关系型数据库区别
关系型数据库是指采用了关系模型来组织数据的数据库。比如MySQL。

- 使用表结构，格式一致，易于维护。
- 支持SQL查询，使用方便。
- 支持事务，能保证系统中事务的正确执行
- 数据存储在硬盘

像常用的Redis键值对数据库是非关系型数据库。

- 数据存储在内存中，速度快，效率高。
- 格式灵活，存储数据的形式多种多样
### 索引
索引是存储引擎用于提高数据库表的访问速度的一种数据结构。索引就是数据的目录，便于存储引擎快速的定位数据。不同的存储引擎有不同的索引。
#### 为什么要使用索引？
当查询一个数据时，如果不使用索引，需要进行全表扫描，从头到尾逐行遍历，直到找到需要的数据。当数据量大的时候，效率非常低下。
**索引优点：**加快数据查找速度、加快表之间的连接、加快分组和排序。
**索引缺点：**索引需要占据物理空间、降低表增删改的效率（每次对表记录进行增删改，需要花费额外时间动态维护索引）。
#### 索引底层数据结构
**有序数组：**使用有序数据作为索引结构的话，那么等值查询和范围查询的性能都十分优秀，但是插入和删除的成本太大。只适合静态存储引擎，如果我们要存储以某种有序编号为序的不轻易增删的历史数据，我们可以使用有序数组作为索引结构。
**哈希**：Hash索引只能用于对等比较（=、in），不支持排序操作，不支持范围查询。
**B树和B+树：**索引是存储在硬盘中的，每次对数据进行检索时，需要从硬盘中将索引加载到内存中，这是一次磁盘IO操作。磁盘IO操作本身是非常耗时的，为了减少IO，应当使用更加矮的树作为索引。
**B 树每个节点既存放键也存放数据。**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1649150020493-dd0b5e96-490b-41e1-9f77-a9956ed25a04.png#clientId=u23948915-4dad-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=215&id=ue998c537&margin=%5Bobject%20Object%5D&name=image.png&originHeight=543&originWidth=1424&originalType=binary&ratio=1&rotation=0&showTitle=false&size=250990&status=error&style=none&taskId=uaf4e1302-25f8-4552-a04a-f16d57df351&title=&width=564)
B+树只有叶子节点存放数据，非叶子节点存放键值和指向数据页的指针，同时每个数据页之间都通过一个双向链表来进行链接。

- 在相同的空间情况下B+树比B树可以存储更多的节点，也可以减少磁盘IO的次数。
- 相邻的叶子节点之间通过指针连接，支持顺序访问，范围操作。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1649150915528-9b0fbd31-4cb8-4d09-be7f-4ee3f370a78c.png#clientId=ucff62602-d8d7-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=183&id=uda103388&margin=%5Bobject%20Object%5D&name=image.png&originHeight=429&originWidth=1367&originalType=binary&ratio=1&rotation=0&showTitle=false&size=313323&status=error&style=none&taskId=u0ec843dc-9744-4518-aae0-bfcd94af2db&title=&width=583.5)
#### B+树能存多少数据？

- **InnoDB存储引擎最小存储单位是页，默认每页大小为16KB。B+树里的每个节点都是一个页**。B+树叶子节点存放的是整行记录数据，在非叶子节点上存放的是键值以及指向数据页的指针。
假设B+树高度为2,表中一行记录的数据大小为1k, 那么B+树一个叶子节点（一个数据页）可以存储16k/1k=16行数据。B+树非叶子节点存储的是键值以及指向数据页的指针，设主键id类型是bigint, 占用8字节(int类型4字节), 指针占用 6 字节, 设根节点存储的key个数为n，那么根节点存储的指针个数为n+1，n×8+(n+1)×6=16×1024,算出来n约为1170，有1771个指针指向叶子节点，一个节点存储16行数据的话，因此,一棵高度为 2 的B+树, 就能存放1170×16=18720条这样的数据记录。同理一棵高度为3的B+树, 能存放1170×1170×16=21902400, 大概可以存放两千万左右的记录。
- IO次数取决树的高度h。设当前数据表的数据为N，每个节点(页、磁盘块)数据项的数量是m，h≈log(m)N，N一定的情况下，m越大，树的高度h越小。m是页中数据个数=页大小/页中存储的数据大小，B+树只在最后一层存放整行数据，降低了树的高度。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1650873218845-ad8166f8-cecd-45de-86e5-f10e040de7cc.png#clientId=ub807136f-215e-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=390&id=ua6a94e37&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1164&originWidth=1740&originalType=binary&ratio=1&rotation=0&showTitle=false&size=367088&status=error&style=none&taskId=u567bdf49-e5c7-4414-a56d-0dbfe85b722&title=&width=583)
**按索引的存储形式分类**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1649152084627-7fe87bbc-377c-4412-8f4d-5b64e4e469d9.png#clientId=ucff62602-d8d7-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=101&id=x8cbO&margin=%5Bobject%20Object%5D&name=image.png&originHeight=217&originWidth=1387&originalType=binary&ratio=1&rotation=0&showTitle=false&size=121473&status=error&style=none&taskId=u9d882f32-8172-46d9-9b9f-14634652ad0&title=&width=648.5)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1649152732996-97852a3b-18e9-4b40-ba48-20485843dd0a.png#clientId=ucff62602-d8d7-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=310&id=OtNcU&margin=%5Bobject%20Object%5D&name=image.png&originHeight=669&originWidth=1398&originalType=binary&ratio=1&rotation=0&showTitle=false&size=436964&status=error&style=none&taskId=uafd210dc-1bc8-48ac-9a66-79de10a0a8c&title=&width=647)
**按索引的功能分类**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1649151940251-93b6b46d-ba6a-442c-8f6d-3bd860b4f194.png#clientId=ucff62602-d8d7-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=171&id=llxde&margin=%5Bobject%20Object%5D&name=image.png&originHeight=359&originWidth=1379&originalType=binary&ratio=1&rotation=0&showTitle=false&size=168835&status=error&style=none&taskId=u57e4f76d-47e1-430a-898e-6142d562f48&title=&width=656.5)
#### 聚集/聚簇索引(有且只有一个)

- 聚集索引是一种数据存储方式。聚集索引是把索引结构和数据放到一起，找到索引也就找到了数据。在 Mysql 中，InnoDB 引擎的表的 .ibd文件就包含了该表的索引和数据。对于 InnoDB 引擎表来说，聚集索引就是按照每张表的主键构造一颗B+树，叶子节点存放的是整行记录数据，在非叶子节点上存放的是键值以及指向数据页的指针，同时每个数据页之间都通过一个双向链表来进行链接。
- 聚集索引选取规则：数据表如果存在主键，主键索引就是聚集索引(一张数据表有只能有一个主键，并且主键不能为 null，不能重复)。当没有指定表的主键时，InnoDB 会使用表中第一个唯一索引作为聚集索引，否则 InnoDB 会自动创建一个rowid的自增主键作为聚集索引。

**聚集索引的优点**：查询速度非常快（因为整个 B+树本身就是一颗多叉平衡树，叶子节点也都是有序的，定位到索引的节点，就相当于定位到了数据）
**聚集索引的缺点**

- 依赖于有序的数据 ：B+树是多路平衡树，如果索引的数据不是有序的，那么就需要在插入时排序，如果数据是整型还好，否则类似于字符串或 UUID 这种又长又难比较的数据，插入或查找的速度肯定比较慢。
- 更新代价大 ： 如果对索引列的数据被修改时，那么对应的索引也将会被修改，而且聚集索引的叶子节点还存放着数据，修改代价肯定是较大的，所以对于主键索引来说，主键一般都是不可被修改的。
#### 非聚集索引/二级索引(可存在多个)
非聚集索引是把索引结构和数据分开存储，索引的叶子节点存储的数据是主键。通过二级索引，可以定位主键的位置，根据主键再回表查数据。

- 唯一索引：索引列的值必须唯一，但允许有空值。
- 组合索引：多个列创建组合索引
- 普通(常规)索引：为了快速查询数据，一张表允许创建多个普通索引，并允许数据重复和 NULL。
- 全文索引：可以检索大文本数据中的关键字的信息，只能用于text类型。

**非聚集索引的优点：**更新代价比聚集索引要小 。非聚集索引的更新代价没有聚集索引那么大，非聚集索引的叶子节点是不存放数据的。
**非聚集索引的缺点：**

- 和聚集索引一样，非聚集索引也依赖于有序的数据
- **可能会二次查询(回表查询)** ： 先走二级索引找到对应的主键值，再到聚集索引中通过主键值拿到行数据。

**为什么二级索引的叶子节点存储的数据是主键？**保证数据一致性和节省存储空间，已经维护了主键索引+数据的B+Tree结构，都通过主键索引来找到最终的数据，避免维护多份数据导致不一致的情况。
二级索引的叶子节点存储的数据是主键，通过二级索引，可以定位主键的位置，根据主键再回表查数据。
#### 覆盖索引
**覆盖索引即需要查询的字段正好在索引字段中，那么直接根据该索引，就可以查到数据了， 而无需回表查询。**如主键索引，如果一条 SQL 需要查询主键，那么正好根据主键索引就可以查到主键；如普通索引，如果一条 SQL 需要查询 name，name 字段正好有索引，那么直接根据这个索引就可以查到数据，也无需回表。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1649169589444-c0d9bc05-eb2b-47b2-9721-f4b219543139.png#clientId=ucff62602-d8d7-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=250&id=u1cffebda&margin=%5Bobject%20Object%5D&name=image.png&originHeight=672&originWidth=1452&originalType=binary&ratio=1&rotation=0&showTitle=false&size=370986&status=error&style=none&taskId=u3fc6be24-37f6-47b6-8440-854e7496a97&title=&width=541)
#### 联合索引
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1649171252047-f95daf28-206c-49ef-970d-d489a1c0cc44.png#clientId=ucff62602-d8d7-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=232&id=IIfr7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=602&originWidth=1378&originalType=binary&ratio=1&rotation=0&showTitle=false&size=496165&status=error&style=none&taskId=ubc3ad782-dc25-4302-b949-89129c88575&title=&width=532)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1649171455359-4fb92025-18d2-4439-bc71-d42509084894.png#clientId=ucff62602-d8d7-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=196&id=ufc5ee4c6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=506&originWidth=1362&originalType=binary&ratio=1&rotation=0&showTitle=false&size=342884&status=error&style=none&taskId=uc9da6b35-c5a7-438d-b777-fe65eb3f418&title=&width=528)
**最左匹配原则：**

- 在查询数据时从联合索引的最左列开始，并且不跳过索引中的列。如果跳过某一列，后面的字段索引失效。
- 查询时必须包含索引最左边的列（与顺序无关），如果其不存在，索引全部失效。
- 联合索引中，出现范围查询(>、<)，范围查询右侧的列索引失效。尽量使用>=、<=
#### 索引设计原则

- 频繁查询的字建立索引
- 常作为查询条件(where)、排序(order by)、分组(group by)操作的字段建立索引
- 尽量选择区分度高的列作为索引，尽量建立唯一索引，区分度越高，使用索引的效率越高。
- 尽量使用联合索引，减少单列索引，查询时联合索引很多时候可以覆盖索引，避免回表，提高查询效率。
- **被频繁更新的字段应该慎重建立索引**

虽然索引能带来查询上的效率，但是维护索引的成本也是不小的。 如果一个字段不被经常查询，反而被经常修改，那么就更不应该在这种字段上建立索引了。
#### 索引失效情况：模型数空运最快

- 模糊查询like以%开头
- 数据类型错误，数据类型出现隐式转化，比如varchar类型123不加单引号将会变成整型导致索引无效
- 对索引字段使用内部函数或者进行计算操作
- 索引列是NULL
- 不满足联合索引的最左匹配原则
- 当优化器认为进行全表扫描要比使用索引快时，将不会使用索引
- or连接的前后列没有同时使用索引
- 在索引字段上使用not，<>，!=。不等于操作符是永远不会用到索引的，因此对它的处理只会产生全表扫描。 优化方法： key<>0 改为 key>0 or key<0。
#### 如何优化慢查询sql？

- 首先通过慢日志定位查询时间过长的sql
- 使用explain关键字对慢sql进行分析，重点关心type和extra两列的信息
- 修改sql，让查询尽量通过索引
#### 索引下推
索引下推(Index Condition Pushdown)能减少回表查询次数，提高查询效率。比如有一张用户表user，在表里对(name, age)字段创建了联合索引，查询表中名字第一个字是张，而且年龄大于10岁的所有用户。
`select * from user where name like '张%' and age=10;`
在MySQL 5.6之前，没有使用ICP：存储引擎根据通过联合索引找到name like'张%' 的主键id（1、4），逐一进行回表扫描，去聚簇索引找到完整的行记录，server层再对数据根据age=10进行筛选。可以看到需要回表两次，把我们联合索引的另一个字段age浪费了。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1661417554143-657086a5-71be-4e3a-81af-ee5d37706cfa.png#clientId=u59ee9fbb-0af3-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=310&id=u83496032&margin=%5Bobject%20Object%5D&name=image.png&originHeight=619&originWidth=902&originalType=binary&ratio=1&rotation=0&showTitle=false&size=139552&status=error&style=none&taskId=u74cfb588-ea2d-457f-88c8-75c456709bb&title=&width=451)
MySQL5.6以后，使用ICP：存储引擎根据（name，age）联合索引，找到name like'张%'，由于联合索引中包含age列，所以存储引擎直接再联合索引里按照age=10过滤。按照过滤后的数据再进行回表扫描。对于上述举例只回表了一次。
**索引下推使用条件：**

- 只能用于InnoDB和 MyISAM存储引擎及其分区表；
- 对InnoDB存储引擎来说，索引下推只适用于二级索引（辅助索引）;对于InnoDB的聚簇索引来说，数据和索引是在一起的，不存在回表这一说。
- 引用了子查询的条件不能下推；
- 引用了存储函数的条件不能下推，因为存储引擎无法调用存储函数。

索引条件下推默认是开启的，可以使用系统参数optimizer_switch来控制器是否开启。
### 事务
事务把所有的命令作为一个整体向系统提交或撤销操作请求，即这一组数据库命令要么都执行，要么都不执行，因此事务是一个不可分割的工作逻辑单元。如果任意一个操作失败，那么整组操作即为失败，会回到操作前状态或者是上一个节点。
#### 事务特性ACID

- 原子性（Atomicity）：事务是不可分割的最小的操作单位，要么全部成功，要么全部失败。
- 一致性（Consistency）：执行事务前后，数据保持一致。例如转账业务中，无论事务是否成功，转账者和收款人的总额应该是不变的；
- 隔离性（Isolation）：并发访问数据库时，一个用户的事务不被其他事务所干扰，各个并发事务之间是独立的；
- 持久性（Durability）：事务一旦提交或回滚，它对数据的修改就是永久的。
#### 事务并发问题
多个事务并发运行，操作相同的数据可能会导致以下问题：

- **脏读:** 一个事务读取了另一个事务还没提交的数据。例如事务A更新了id=1的数据还未提交，这时事务B读取这个数据，这次读取就是脏读。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1649132346664-b6a5fc91-ac71-4c68-8bd6-48fa377d1e49.png#clientId=u5e24c51c-a677-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=115&id=ub9e422a6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=230&originWidth=796&originalType=binary&ratio=1&rotation=0&showTitle=false&size=87708&status=error&style=none&taskId=uf5a5e629-febf-477a-ab4c-546442e3145&title=&width=398)

- **不可重复读:** 一个事务先后读取同一条记录，但两次读取的数据不同，这是因为在此间隔内其他事务此数据进行了修改。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1649132782748-b170b888-719f-43fa-814f-820535dbc660.png#clientId=u5e24c51c-a677-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=109&id=u6c5ae420&margin=%5Bobject%20Object%5D&name=image.png&originHeight=217&originWidth=979&originalType=binary&ratio=1&rotation=0&showTitle=false&size=109338&status=error&style=none&taskId=ub8834de1-dc8f-412f-904c-109a885e98e&title=&width=489.5)

- **幻读：**一个事务按照条件查询数据时，没有对应的数据行，但是在插入数据时，又发现这行数据已经存在，好像出现了幻觉一样。例如事务A查询id=1的数据，这个数据不存在；这时事务B正好插入了这条数据。然后事务A再插入这个数据时会报主键冲突错误，发现这行数据已经存在，这种现象称为幻读。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1649134284414-a6143b86-3766-4d95-ac21-7b78b80505a7.png#clientId=u5e24c51c-a677-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=109&id=u5cd86f9e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=218&originWidth=975&originalType=binary&ratio=1&rotation=0&showTitle=false&size=100437&status=error&style=none&taskId=uc2659b8c-1b19-4684-b1e1-82c30288a34&title=&width=487.5)
**不可重复读和幻读的最大区别**在于，不可重复读是update/delete修改了查询的数据，而幻读是insert插入了新的数据，之前查询的数据没有变，但是会多出来数据。

- 丢失修改**:** 两个事务同时读取同一条记录，事务 A 先修改记录，事务 B 也修改记录（B 是不知道 A 修改过），当 B 提交数据后，其修改结果覆盖了 A 的修改结果，导致事务 A 更新丢失。
#### 事务隔离级别

- 读取未提交：指一个事务还没提交时，它做的变更就能被其他事务看到。最低的隔离级别，所有的并发事务问题都会发生。
- 读取已提交：指一个事务提交之后，它做的变更才能被其他事务看到，可能导致不可重复读和幻读。。
- 可重复读(mysql默认)：指一个事务执行过程中看到的数据，一直跟这个事务启动时看到的数据是一致的，可能导致幻读问题，但InnoDB不会出现此问题。MySQL InnoDB 存储引擎的默认支持的隔离级别是可重复读。但是它通过next-key lock锁（行锁和间隙锁的组合）来锁住记录之间的“间隙”和记录本身，防止其他事务在这个记录之间插入新的记录，这样就避免了幻读现象。
- 可串行化：事务**串行化执行**，隔离级别最高，完全服从 ACID，牺牲了系统的并发性，也就是说，所有事务依次逐个执行，并发事务的脏读、不可重复读和幻读问题都不会出现。
| **隔离级别** | **脏读** | **不可重复读** | **幻读** |
| --- | --- | --- | --- |
| 读取未提交 | ✓ | ✓ | ✓ |
| 读取已提交 | × | ✓ | ✓ |
| 可重复读 | × | × | ✓ |
| 可串行化 | × | × | × |

为什么MySQL InnoDB 存储引擎的默认支持的隔离级别是可重复读？
在Mysql5.1版本之前，binlog默认是statement格式，不是RR隔离级别的话，binlog记录的顺序可能与实际不一致(主从复制不一致)。在RR隔离级别下，引入临键锁实现了binlog语句串行化，保证了主从一致。在5.1版本之后，我们使用binlog的row模式配合RC隔离级别也可以实现更好的并发性能。
#### 隔离级别底层实现

- **对于读未提交**隔离级别的事务来说，因为可以读到未提交事务修改的数据，所以直接读取最新的数据就好了；
- **对于读已提交**和**可重复读**隔离级别的事务来说，它们是通过 Read View 来实现的，区别在于创建 Read View 的时机不同。「读已提交」隔离级别是在「每个语句执行前」都会重新生成一个 Read View，而「可重复读」隔离级别是「启动事务时」生成一个 Read View，然后整个事务期间都在用这个 Read View。
- **对于串行化**隔离级别的事务来说，通过加读写锁的方式来避免并行访问；

在 MySQL 有两种开启事务的命令，分别是：

- begin/start transaction 命令：只有在执行这个命令后，执行了增删查改操作的 SQL 语句，事务才真正启动
- start transaction with consistent snapshot 命令：执行了此命令，就会马上启动事务
### MVCC和日志
**当前读：**读取的是记录的最新版本，读取时还要保证其他并发事务不能修改当前记录，会对读取的记录进行加锁。对于我们日常的操作，如insert、delete、update、select.. .lock in share mode、select...for update都是一种当前读。
**快照读：**像不加锁的select操作就是快照读，即不加锁的非阻塞读，读取的是记录数据的可见版本，有可能是历史数据。

- Read Commited：每次selcet，都生成一个快照读
- Repeatable Read：开启事务后第一个select语句才是快照读的地方
- Serializable：快照读会退化为当前读

**MVCC**也就是多版本并发控制：维护一个数据的多个版本，使得读写操作没有冲突，只是一个抽象概念。
多版本并发控制是一种用来解决读-写冲突的无锁并发控制方案，也就是为事务分配单向增长的时间戳，为每个修改保存一个版本，版本与事务时间戳关联，读操作只读该事务开始前的数据库的快照。MVCC具体实现依赖于数据库记录中的三个隐式字段、undo log、ReadView。
#### 记录中的三个隐藏字段

- DB_TRX_ID最近修改事务ID：当一个事务对某条聚簇索引记录进行改动时，就会把该事务id记录在trx_id隐藏列里；trx_id保存了创建这条记录/最后一次修改该记录的事务ID。
- DB_ ROLL_PTR回滚指针：每次对某条聚簇索引记录进行改动时，都会把旧版本的记录写入到undo日志中，回滚指针指向这条记录的上一个版本，通过它找到修改前的记录。
- DB_ ROW_ID：隐藏主键，如果数据表没有指定主键，会生成该隐藏字段

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1651716557555-d7d070d9-94dd-4788-a96a-58963431fbff.png#clientId=u657e33d2-4592-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=323&id=TaM7L&margin=%5Bobject%20Object%5D&name=image.png&originHeight=646&originWidth=2176&originalType=binary&ratio=1&rotation=0&showTitle=false&size=276953&status=error&style=none&taskId=u24bdb5b5-c434-46b9-ac14-709ddc83cdb&title=&width=1088)
#### undo log
undo log也就是回滚日志，在进行insert、delete、update时，InnoDB引擎产生的便于数据回滚的日志，用于事务回滚和MVCC。

- 每当 InnoDB 引擎对一条记录进行操作（增删改）时，要把回滚时需要的信息都记录到 undo log 里，在插入一条记录时，要把这条记录的主键值记下来，这样之后回滚时只需要把这个主键值对应的记录删掉就好了；在删除一条记录时，要把这条记录中的内容都记下来，这样之后回滚时再把由这些内容组成的记录插入到表中就好了；在更新一条记录时，要把被更新的列的旧值记下来，这样之后回滚时再把这些列更新为旧值就好了。总的来说通过undolog实现事务回滚，保证了事务的原子性。
- 通过 ReadView + undo log 实现 MVCC。undo log 为每条记录保存多份历史数据，MySQL 在执行快照读的时候，会根据事务的 Read View 里的信息，顺着 undo log 的版本链找到满足其可见性的记录。

**undo log版本链：**不同事务或相同事务对同一条记录进行修改，会导致该记录的undolog生成一条记录版本链表，链表的头部是最新的旧记录，链表尾部是最早的旧记录。比如事务1在表中新插入一条id=30的记录，提交事务。然后事务2开始执行，将id=30这条记录中age改为3，在修改之前InnoDB引擎会先保存一条这个记录的undo log日志，然后将这条记录中age改为3，trx-id变为当前事务id=2，回滚指针roll—ptr指向了这条undo log日志，这样如果提交数据失败了，就可以通过回滚指针把数据还原到上一个版本。同样地，事务3再对这个记录进行修改时，事务2的undo log中的回滚指针会指向事务3产生的undo log日志，这样就形成了一个该记录的undo log版本链。
比如：1. 新插入一条id=30的记录
![](https://cdn.nlark.com/yuque/0/2022/png/26499320/1661420399298-546956f6-8d38-4bdc-834a-3a49a8245917.png#clientId=u59ee9fbb-0af3-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&height=99&id=ozt1G&originHeight=165&originWidth=679&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ue59b861f-792e-446c-b251-087b86a27cc&title=&width=406)

2. 事务2，3，4，5同时开启，各事务执行过程如下图所示

![](https://cdn.nlark.com/yuque/0/2022/png/26499320/1661420420245-a1a3e55c-11b7-4068-a5a0-f3a22487ae99.png#clientId=u59ee9fbb-0af3-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&height=184&id=cbnXg&originHeight=303&originWidth=720&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u4c18ee55-e196-4156-a4a8-05a71733745&title=&width=437) 

3. 事务2开始执行，要将id=30这条记录中age改为3，在修改之前InnoDB引擎会先保存一条这个记录undo log日志，然后将这条记录中age改为3，trx-id变为当前事务id=2，回滚指针roll—ptr指向了这条undo log日志，如果提交数据失败了，就可以通过回滚指针把数据还原到上一个版本。

![](https://cdn.nlark.com/yuque/0/2022/png/26499320/1661420440492-3027cf6c-a462-48ad-b0d0-247659a2b377.png#clientId=u59ee9fbb-0af3-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&height=222&id=Ki0la&originHeight=430&originWidth=716&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u333ba403-7b08-4df3-9906-fff3c701551&title=&width=369) 

4. 事务3执行更新操作之前，先生成一条undo log日志，保存当前这条记录的数据，然后进行更新操作，执行完成，提交事务。

![](https://cdn.nlark.com/yuque/0/2022/png/26499320/1661420468356-08649782-0857-4c28-b7c5-adb2248af480.png#clientId=u59ee9fbb-0af3-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&height=218&id=sfQbL&originHeight=427&originWidth=696&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u045fe4d2-0f9a-4328-ae98-c02d80dcf53&title=&width=356) 

5. 事务4生成一条undo log日志 

![](https://cdn.nlark.com/yuque/0/2022/png/26499320/1661420504191-1de1dfaf-5012-4088-851a-e2398be32697.png#clientId=u59ee9fbb-0af3-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&height=188&id=ZXM8G&originHeight=720&originWidth=2346&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u2bd1e2f7-5848-479f-8d0c-d2803425af3&title=&width=614)
#### ReadView
ReadView（读视图）是快照读SQL执行时MVCC提取数据的依据，记录并维护系统当前活跃的事务（未提交的）id。ReadView包含四个核心字段：

- m_ids活跃事务id集合：在创建ReadView时，当前数据库中活跃的事务id集合。活跃事务指的是启动了但还没提交的事务。
- min_trx_id最小活跃事务id：在创建Read View时，当前数据库中「活跃事务」中id 最小的事务，也就是 m_ids 的最小值。
- max_trx_id预分配事务id：创建 ReadView时，当前数据库中分配给下一个事务的id值，也就是全局事务中最大的事务 id 值 + 1（事务ID是自增的）
- creator_trx_id：创建ReadView的事务ID

在创建Read View后，我们可以将记录中的 trx_id划分这三种情况：
![](https://cdn.nlark.com/yuque/0/2022/webp/26499320/1661420647412-f8c1d8d3-6b8e-4895-bd7e-9abcfdd9db9e.webp#clientId=u59ee9fbb-0af3-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&height=103&id=Mxm4b&originHeight=242&originWidth=707&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u908e206e-86b4-4c21-b869-d085a775826&title=&width=300)
**一个事务去访问记录的时候，规则如下：**

- 如果这条记录中的trx_id是creator_trx_id(创建ReadView的事务id)，那么可以访问该版本
- 如果记录的 trx_id 值小于 Read View 中的 min_trx_id 值，表示这个版本的记录是在创建 Read View 前 已经提交的事务生成的，所以该版本的记录对当前事务可见。
- 如果记录的 trx_id 值大于 Read View 中的 max_trx id 值，表示这个版本的记录是在创建 Read View 后才启动的事务生成的，所以该版本的记录对当前事务不可见。
- 如果记录的 trx_id 值在 Read View 的 min_trx_id 和 max_trx_id 之间，需要判断 trx_id 是否在 m_ids 列表中：如果记录的 trx_id 在 m ids 列表中，表示生成该版本记录的活跃事务依然活跃着（还没提交事务），所以该版本的记录对当前事务不可见。如果记录的 trx_id 不在 m_ids列表中，表示生成该版本记录的活跃事务已经被提交，所以该版本的记录对当前事务可见。
如果都不满足，沿着版本链找到第二个版本的记录按照上述规则进行判断。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1651718666758-28ff1748-bf2f-4233-93a6-bda5b964bc56.png#clientId=u657e33d2-4592-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=249&id=LECZK&margin=%5Bobject%20Object%5D&name=image.png&originHeight=609&originWidth=1355&originalType=binary&ratio=1&rotation=0&showTitle=false&size=303691&status=error&style=none&taskId=u08b94092-825f-4e44-bda9-1239bcb7c2d&title=&width=553.5)
#### MVCC解决幻读了吗？
严谨来说并没有解决，MVCC利用版本链，undo log，Read View可以在快照读模式下解决幻读问题，并且不用加锁解决读写冲突问题，极大的增加了数据库的并发量。另一方面，在当前读的模式下，仅仅依靠MVCC不能解决幻读问题，必须依赖next-key锁(行锁+gap锁)来解决，这是因为当前读必须获取最新数据。而行锁是把符合条件的数据上锁，放置update，delete操作，间隙所则是把符合条件的附近区间锁住，解决insert插入，即可解决幻读问题。
#### redo log
redo log（重做日志）是InnoDB存储引擎独有的，用来保证数据的持久性。在mysql中，每执行一条DML语句，先将记录写入redo log buffer，后续某个时间点再一次性将多个操作记录写到redo log file—WAL(Write-Ahead Logging) 预写日志技术。
redo log 记录了此次事务「完成后」的数据状态，记录的是更新之「后」的值；
undo log 记录了此次事务「开始前」的数据状态，记录的是更新之「前」的值；
如果事务提交之前发生了崩溃，重启后会通过 undo log 回滚事务，保证事务的原子性；事务提交之后发生了崩溃，重启后会通过 redo log 恢复事务，保证事务的持久性。
#### bin log
bin log归档日志是属于MySQL Server层面的，记录所有数据库表结构变更和表数据修改的日志，不会记录查询类的操作，比如 SELECT 和 SHOW 操作。bin log 用于备份恢复、主从复制。
**binlog工作模式：**

1. Row：日志中会记录每一行数据被修改的情况，然后在slave端对相同的数据进行修改。优点：能清楚的记录每一行数据修改的细节。缺点：数据量太大。
2. Statement （默认）：每一条被修改数据的sql都会记录到master的bin-log中，slave在复制的时候sql进程会解析成和原来master端执行过的相同的sql再次执行。缺点：容易出现主从复制不一致。优点：不需要记录每一行的数据变化，减少bin-log日志量，节约磁盘IO。
3. Mixed（混合模式）：结合了Row level和Statement level的优点，同时binlog结构也更复杂。

**主从复制**是指将主数据库的DDL和DML操作通过二进制日志传到从库服务器中，然后在从库上对这些日志重新执行（重做），从而使得从库和主库的数据保持同步。MySQL支持一台数据库同时向多台从库进行复制，从库同时也可以作为其他从服务器的主库，实现链状复制。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1661421146345-dc4e9cea-5a63-43cd-9cdf-aa19cc4bd3aa.png#clientId=u59ee9fbb-0af3-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=306&id=ufe96f906&name=image.png&originHeight=612&originWidth=921&originalType=binary&ratio=1&rotation=0&showTitle=false&size=169348&status=error&style=none&taskId=u4c2a6717-a926-4648-a492-e8bb297547f&title=&width=460.5)
**主从复制优点**：

- 主库出现问题, 可以快速切换到从库提供服务。
- 实现读写分离, 降低主库的访问压力。
- 可以在从库中执行备份, 以避免备份期间影响主库服务。

**binlog和redolog有何区别呢？**
redo log用于保证事务的持久性，binlog用于主从复制。
redo log属于InnoDB引擎层面，而bin log属于MySQL实例层面，并不受限于引擎。
redo log是循环写的，空间固定会用完；binlog 是追加写，写满一个文件，就创建一个新的文件继续写，不会覆盖以前的日志，保存的是全量的日志。
### MySQL锁
在 MySQL 里，根据加锁的范围分为全局锁、表级锁和行锁三类。
#### 全局锁
全局锁是对整个数据库实例加锁，加锁后整个实例处于**只读**状态，这时其他线程对数据执行增删查改或者对表结构执行更改操作，都会被阻塞。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1650369594310-66e2ae4d-ce0b-48dc-bce1-a5ad80aba8ec.png#clientId=u7f804a08-9b67-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=190&id=u2883fec3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=423&originWidth=1085&originalType=binary&ratio=1&rotation=0&showTitle=false&size=118588&status=error&style=none&taskId=uc09154ba-a3c8-46e7-8d28-14051c5b0f9&title=&width=487.5)
DML是增删改操作；DQL是查询操作：关键字select，where等 。
应用场景：主要应用于做全库逻辑备份，这样在备份数据库期间，不会因为数据或表结构的更新，而出现备份文件的数据与预期的不一样。使用全局锁虽然能够备份，但是备份期间整个数据库都是只读状态，不能执行更新，造成业务停滞。
InnoDB 存储引擎默认的事务隔离级别是可重复读，那么在备份数据库之前先开启事务，会先创建 Read View，然后整个事务执行期间都在用这个 Read View，而且由于 MVCC 的支持，备份期间业务依然可以对数据进行更新操作。使用 mysqldump 时加上 –single-transaction 参数的时候，就会在备份数据库之前先开启事务。
#### 表级锁
##### 表锁
表锁从对数据操作的类型分为读锁（共享锁）和写锁（独占锁、排它锁）
对一个表**加读锁**意味着本线程和其他线程可以读取表数据，但是不能更新表数据。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1650370642272-9789c11f-4a79-4892-bd3d-7de60345cf02.png#clientId=u7f804a08-9b67-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=121&id=ubb0ea50e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=394&originWidth=1528&originalType=binary&ratio=1&rotation=0&showTitle=false&size=239208&status=error&style=none&taskId=u3363f710-a509-4872-a534-363c3f74ea6&title=&width=471)
对一个表**加写锁**意味着本线程可以读写表数据，但是其他线程不能读写表数据。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1650371367535-dfa5084d-555a-4a4a-b470-790d5dba8b61.png#clientId=u7f804a08-9b67-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=118&id=u4a927ae1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=235&originWidth=912&originalType=binary&ratio=1&rotation=0&showTitle=false&size=114814&status=error&style=none&taskId=uf4b8b72b-4607-4b85-a122-98af6f6a1c1&title=&width=456)
##### 元数据锁
元数据锁(meta data lock,MDL)加锁过程由系统自动控制，无需显式使用，主要作用是维护表元数据的一致性，避免DML和DDL冲突，保证读写的正确性。在MySQL5.5中引入元数据锁，当对一张表进行增删改查时，申请加MDL读锁(share_read、share_read)；当对表结构进行变更操作时，申请加MDL写锁(exclusive)。申请MDL锁的操作会形成一个队列，队列中**写锁获取优先级高于读锁**。一旦出现写锁等待，不但当前操作会被阻塞，同时还会阻塞后续该表的所有操作。事务一旦申请到MDL锁后，直到事务执行完（事务提交后）才会将锁释放。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1650372863246-99dbc2f1-0290-4df4-9ff7-19d05df5df8a.png#clientId=u7f804a08-9b67-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=116&id=u00454c8c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=231&originWidth=1533&originalType=binary&ratio=1&rotation=0&showTitle=false&size=151083&status=error&style=none&taskId=ua901ed09-99ea-4134-81e1-e544be57da8&title=&width=766.5)
##### **意向锁**
**意向锁作用是快速判断表里是否有记录被加锁。**如果没有意向锁，对一个表加锁时，就需要遍历表里每一行数据，查看是否有每一条记录是否加锁，这样效率会很低。有了意向锁，直接检查该表的意向锁和当前加的表锁是否兼容就行了，如果是兼容的，直接加表锁，否则一直阻塞到行锁释放意向锁释放，再加表锁。
例如线程A开启事务，执行update操作先加行锁，再对表加意向锁 ，线程B加表锁，检查该表意向锁和当前加的表锁不兼容的话，一直阻塞到线程A事务提交，线程B拿到表锁。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1650376225870-90124b9a-76e0-4a7d-a2a2-82108fa66415.png#clientId=u7f804a08-9b67-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=210&id=u18c8b3c2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=420&originWidth=1353&originalType=binary&ratio=1&rotation=0&showTitle=false&size=375963&status=error&style=none&taskId=u660b1ce6-8f42-463c-a014-4b0f2d09400&title=&width=676.5)
意向共享锁（IS）执行select...lock in share mdoe语句添加，与表锁共享锁（读锁）兼容，与表锁排它锁（写锁）互斥。
意向排它锁（IX）执行insert、update、delete、select...for update语句添加，与表锁共享锁及排它锁都互斥
**意向共享锁和意向独占锁是表级锁，不会和行级的共享锁和独占锁发生冲突，而且意向锁之间也不会发生冲突，只会和共享表锁和独占表锁发生冲突。**
表锁和行锁满足读读共享、读写互斥、写写互斥。
#### 行级锁
每次操作锁住对应的行数据。锁的粒度最小，发生锁冲突的概率最低，并发度最高，应用在InnoDB存储引擎中。行锁通过对索引上的索引项加锁来实现的，而不是对记录加的锁。行级锁从锁的粒度上分为以下三种：

- 行锁(Record Lock)：锁定单个行记录的锁，防止其他事务对此进行update和delete。在RC、RR隔离级别下都支持
- 间隙锁(Gap Lock)：锁定记录之间的间隙（范围），但是不包含记录本身，防止其他事务在这个间隙进行insert，产生幻读。在RR隔离级别下支持。
- 临键锁(Next-Key Lock)：行锁和间隙锁的组合，锁定一个范围，并且锁定记录本身。在RR隔离级别下支持。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26499320/1650380007511-0e3c2434-0961-4a3b-8545-201469da2a14.png#clientId=u7f804a08-9b67-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=140&id=uce7c06d5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=267&originWidth=1373&originalType=binary&ratio=1&rotation=0&showTitle=false&size=122862&status=error&style=none&taskId=u04a601f6-077e-4e3f-a82d-72b18057485&title=&width=717.5)
默认情况下，InnoDB在REPEATABLE READ事务隔离级别运行，InnoDB使用临键锁(next-key lock)进行搜索和索引扫描，以防止幻读。

1. 针对唯一索引进行检索时，对已存在的记录进行等值匹配时，将会自动优化为行锁
2. InnoDB行锁是针对索引加的锁，不是通过索引条件检索数据，那么InnoDB将对表中的所有记录加锁，此时会升级为表锁。

针对唯一索引等值查询：

- 当查询的记录是存在的，next-key lock 会退化成「记录锁」。
- 当查询的记录是不存在的，next-key lock 会退化成「间隙锁」。

针对非唯一索引等值查询：

- 当查询的记录存在时，除了会加 next-key lock 外，还额外加间隙锁，也就是会加两把锁。
- 当查询的记录不存在时，只会加 next-key lock，然后会退化为间隙锁，也就是只会加一把锁。
