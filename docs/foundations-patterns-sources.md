# 数据结构与算法、设计模式选题来源

核验日期：2026-09-10。本文记录第一方课程、教材作者／出版社和官方 API 文档。题目应为独立编写的复习问句，不复制教材练习或答案；“常见考点”是编辑选题，不是企业面试频率统计。以下链接均已打开核验。

## 数据结构与算法：10 组、每组 5 题

题册重点为基础概念、复杂度条件、正确性与选型，和已有编程题库互补；分组与题量属于编辑建议。

| 建议分组 | 选题范围 | 第一方依据 |
| --- | --- | --- |
| 复杂度与分析 | 大 O／Θ、最坏／平均／均摊、递归栈、输入规模、测量边界 | [Princeton 算法分析](https://algs4.cs.princeton.edu/14analysis/)、[复杂度速查](https://algs4.cs.princeton.edu/cheatsheet/) |
| 数组与链表 | 随机访问、动态扩容、插删定位、链表反转、快慢指针 | [Princeton 线性容器](https://algs4.cs.princeton.edu/13stacks/) |
| 栈与队列 | LIFO／FIFO、双端队列、括号匹配、单调结构、队列实现 | [Princeton 栈与队列](https://algs4.cs.princeton.edu/13stacks/) |
| 哈希与集合 | 哈希冲突、负载因子、键相等、扩容、缓存组合结构 | [Princeton 哈希表](https://algs4.cs.princeton.edu/34hash/) |
| 树与堆 | 遍历、平衡搜索树、堆、Top K、树的高度与退化 | [Princeton 平衡树](https://algs4.cs.princeton.edu/33balanced/)、[优先队列](https://algs4.cs.princeton.edu/24pq/) |
| 查找与排序 | 二分边界、稳定性、快排退化、归并空间、比较排序界 | [Princeton 快排](https://algs4.cs.princeton.edu/23quicksort/)、[归并](https://algs4.cs.princeton.edu/22mergesort/)、[速查](https://algs4.cs.princeton.edu/cheatsheet/) |
| 图与并查集 | 图表示、BFS／DFS、拓扑、连通性、最短路与生成树区别 | [无向图](https://algs4.cs.princeton.edu/41graph/)、[有向图](https://algs4.cs.princeton.edu/42digraph/)、[并查集](https://algs4.cs.princeton.edu/15uf/)、[最短路](https://algs4.cs.princeton.edu/44sp/)、[最小生成树](https://algs4.cs.princeton.edu/43mst/) |
| 字符串与常用技巧 | 字符串模型、前缀匹配、Trie、双指针／窗口适用性、前缀和 | [Princeton 子串查找](https://algs4.cs.princeton.edu/53substring/)、[Trie](https://algs4.cs.princeton.edu/52trie/)、[算法分析](https://algs4.cs.princeton.edu/14analysis/) |
| 递归、回溯与贪心 | 终止条件、搜索空间、剪枝正确性、局部最优依据、分治 | [Princeton 归并](https://algs4.cs.princeton.edu/22mergesort/)、[最小生成树](https://algs4.cs.princeton.edu/43mst/)、[MIT 6.006 讲义](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/lecture-notes/) |
| 动态规划与综合选型 | 状态定义、转移、边界、记忆化、背包与编辑距离 | [MIT 6.006 讲义，第 19—22 讲](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/lecture-notes/) |

### 算法编辑边界

- 复杂度必须附带实现和输入假设：哈希平均常数时间不是无条件的最坏常数；快排平均与最坏不同；均摊不是随机输入平均。递归空间要说明是否计入调用栈。[Princeton 速查](https://algs4.cs.princeton.edu/cheatsheet/)、[算法分析](https://algs4.cs.princeton.edu/14analysis/)
- 图复杂度需定义 V、E 及邻接表示；BFS 的最少边路径、非负权 Dijkstra 和允许负权的情形不能混为一谈。[Princeton 图](https://algs4.cs.princeton.edu/41graph/)、[最短路](https://algs4.cs.princeton.edu/44sp/)
- 原课程年份固定；不沿用旧教材页面的 JVM 默认内存、对象字节数等历史实现细节作为今天的通用结论。[Princeton 算法分析](https://algs4.cs.princeton.edu/14analysis/)
- 双指针、滑动窗口、前缀和、回溯可作为编辑整合的题型，但不声称上述课程提供了对应题的企业频率；题面宜主动询问负数、重复值、空输入、溢出等适用边界。

## 设计模式：40 题

### GoF 23 种的边界

原书出版社说明是 23 种模式，并明确模式描述含适用条件和权衡；与原作者合作完成的配套教材目录给出完整三类清单。[GoF 原书](https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-9780201633610)、[Smalltalk Companion 目录](https://www.informit.com/store/design-patterns-smalltalk-companion-9780201184624)

- 创建型 5 种：单例、工厂方法、抽象工厂、建造者、原型。
- 结构型 **7 种**：适配器、桥接、组合、装饰器、外观、享元、代理。
- 行为型 11 种：责任链、命令、解释器、迭代器、中介者、备忘录、观察者、状态、策略、模板方法、访问者。

建议 40 题分配：原则与基础 5 题，创建型 5 题，结构型 7 题，行为型 11 题，模式比较与工程场景 12 题。不能把简单工厂、MVC、依赖注入等额外算进 GoF 23 种；它们可以作为独立比较题。

### 原作者内容与官方实例

| 用途 | 已核验的精确来源 |
| --- | --- |
| 抽象工厂的产品族与变化维度 | [原书作者摘录](https://www.informit.com/articles/article.aspx?p=1398599) |
| 适配器的接口转换 | [原书作者摘录](https://www.informit.com/articles/article.aspx?p=1398600) |
| 责任链的处理责任与转发 | [原书作者摘录](https://www.informit.com/articles/article.aspx?p=1398601) |
| 模式是否应强行套用、单例争议、语言影响 | [Gamma／Helm／Johnson 第一方访谈](https://www.informit.com/articles/article.aspx?p=1404056) |
| 策略与函数式表示 | [JDK 17 Comparator](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Comparator.html) |
| 装饰器的委托与附加行为 | [JDK 17 FilterInputStream](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/io/FilterInputStream.html) |
| 迭代协议与修改约束 | [JDK 17 Iterator](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Iterator.html) |
| 可插拔实现与服务加载 | [JDK 17 ServiceLoader](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ServiceLoader.html) |
| 原型／复制与对象图 | [Python 3.13 copy](https://docs.python.org/3.13/library/copy.html) |
| 访问者与节点遍历 | [Python 3.13 ast.NodeVisitor](https://docs.python.org/3.13/library/ast.html#ast.NodeVisitor) |
| 容器单例与 GoF 单例区别 | [Spring Bean Scopes](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html) |
| 代理与自调用边界 | [Spring Proxying Mechanisms](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html) |
| 事件与观察者协作 | [Spring ApplicationContext](https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html) |
| 模板流程与回调 | [Spring JDBC Core](https://docs.spring.io/spring-framework/reference/data-access/jdbc/core.html) |
| 依赖注入与对象协作 | [Spring Dependency Injection](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html) |

上表中“策略”“装饰器”等是根据 API 行为做的教学映射，不宣称每个 API 文档都自称某个 GoF 模式。JDK 固定 17、Python 固定 3.13；Spring 链接为滚动参考文档，核验时显示 7.0.9，题目只采用此处可核验的稳定机制，不杜撰跨版本保证。

### 设计原则的补充第一方来源

如果需要精确追溯单一职责与开闭原则，可用提出／传播者本人的解释：[Robert C. Martin：Single Responsibility](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)、[Open-Closed](https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html)。这是作者第一方材料，不是二手面经博客；也可以不增加其域名，只把原则作为复习提问并引用原书与官方 DI 文档。

### 模式编辑边界

- 每种模式至少问意图、适用变化、代价或失败情形；不能只背类图。模式不是越多越好，作者访谈也讨论了单例的争议。[原作者访谈](https://www.informit.com/articles/article.aspx?p=1404056)
- Spring singleton 的范围是每容器、每 bean，不等同于全进程只存在一个对象；它也不自动提供线程安全。[Bean Scopes](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)
- Spring 基于代理的 AOP 中，自调用绕过 advice；题面不要把代理机制等同于所有织入技术。[Proxying Mechanisms](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html)
- “Prototype bean scope”与 GoF 原型复制不是同一个概念；GoF 原型讨论复制，Python 浅／深拷贝还需考虑共享与循环引用。[Bean Scopes](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)、[copy](https://docs.python.org/3.13/library/copy.html)
- 观察者不等于消息中间件，模板回调不必一定通过继承表达；练习应要求比较同步／异步、生命周期、错误传播与测试成本。[ApplicationContext](https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html)、[JDBC Core](https://docs.spring.io/spring-framework/reference/data-access/jdbc/core.html)

## 推荐最小来源域名集合

新增 `algs4.cs.princeton.edu`、`ocw.mit.edu`、`www.informit.com` 即可覆盖本次主要来源；`docs.oracle.com`、`docs.python.org`、`docs.spring.io` 可复用现有允许列表。不必为了备用原则来源加入 `blog.cleancoder.com`。

## 补充：滑窗、区间查询、位运算与字符边界

以下补充亦于 2026-09-10 核验。分组最终可由实现方整合为：复杂度、线性结构、哈希、树堆、图并查集、排序二分、双指针窗口前缀差分、回溯 DP 贪心、字符串 Trie 树状线段树、综合设计，共 10 组。

- [Antti Laaksonen《Competitive Programmer’s Handbook》作者书站](https://cses.fi/book/index.php)提供[完整教材 PDF](https://cses.fi/book/book.pdf)。核验版为 2018-07-03 草稿：第 8 章涵盖双指针与滑窗最小值，第 9 章包含前缀和、树状数组、线段树及差分，第 10 章是位运算，第 5—7 章可补充回溯、贪心与动态规划。这里作为原创算法教材使用，不作为面试频率依据。数据题引用可直接指向 PDF；如需集中落地这几类来源，增加 `cses.fi` 精确域名。
- [Princeton FenwickTree.java](https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/FenwickTree.java.html)：其代码使用 1-based 索引，`update` 实际为增量相加，区间和由两个前缀结果构成。不能把此处 update 误读为赋值；参考页部分历史注释示例与实现不完全吻合，应以对应代码为准。
- [Princeton SegmentTree.java](https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/SegmentTree.java.html)：包含求和／最小值查询与延迟传播的区间赋值实现。应区分单点／区间修改以及增量／覆盖；不能笼统声称任意聚合和任意操作组合都自动支持相同复杂度。
- [JDK 17 Character](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html)可支持 UTF-16 代码单元与 Unicode 码点的区别；[Unicode UAX #29](https://www.unicode.org/reports/tr29/)进一步定义字素簇。题目必须先说“字符”采用哪种计数，不把 `char`、码点、用户感知字符当作完全相同。若不使用字素专门来源，无需额外放行 Unicode 域名。
- [JLS 17 §15.19 位移](https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-15.19)与[§15.22 位运算](https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-15.22)是 Java 的精确语义来源；C++ 教材中的整型位宽、溢出和位移规则不可直接替换成 Java／Python／Go 的规则。

上述来源适合“为什么能维护窗口／前缀关系”“什么时候不能使用该技巧”的开放问题，不应据此给出没有单调性前提的通用滑窗模板。

## 最终落地与补充核验

两册分别为 50 题和 40 题，数据结构册的最终分组为：复杂度与正确性、数组与链表、哈希与集合、树与堆、图与并查集、排序与二分、双指针与区间、搜索与动态规划、字符串与索引、综合面试场景。栈和队列归入线性结构；题目均为原创问句，只提供空白草稿。已有题册的编号和内容不调整。

实现时另行核验：[二叉搜索树](https://algs4.cs.princeton.edu/32bst/)、[基础排序](https://algs4.cs.princeton.edu/21elementary/)、[字符串排序](https://algs4.cs.princeton.edu/51radix/)、[HttpRequest.Builder](https://docs.oracle.com/en/java/javase/17/docs/api/java.net.http/java/net/http/HttpRequest.Builder.html)、[AbstractList](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/AbstractList.html)。后二者用于构建约束和继承扩展点的教学比较，不把某个 API 的细节当成所有模式实现的要求。

设计原则采用 [Robert C. Martin 对 SOLID 的第一方解释](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html)，实际加入 `blog.cleancoder.com` 精确域名；字符边界加入 `www.unicode.org`，区间技巧加入 `cses.fi`。没有加入子域通配或任意外部链接支持。

实际题目固定使用 Spring 6.2，重新核验的链接包括：[Bean 作用域](https://docs.spring.io/spring-framework/reference/6.2/core/beans/factory-scopes.html)、[依赖注入](https://docs.spring.io/spring-framework/reference/6.2/core/beans/dependencies/factory-collaborators.html)、[代理机制](https://docs.spring.io/spring-framework/reference/6.2/core/aop/proxying.html)、[应用上下文事件](https://docs.spring.io/spring-framework/reference/6.2/core/beans/context-introduction.html)。前述滚动页仅保留为研究过程记录，不作为题目版本前提。
