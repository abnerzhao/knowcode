# 算法题速通：来源与编辑说明

核验日期：2026-09-27 至 2026-09-28。

本册定位是六类数据结构的编程练习，与既有「数据结构与算法」概念问答册互补。选题和模式分组是教学编辑建议，不是企业面试频率统计或 LeetCode 官方排名。识别信号只帮助提出候选思路，不能替代适用条件和正确性论证。

新增题面在 `scripts/algorithm-fasttrack/supplements.mjs` 中以原创中文重述任务、接口和约束，并构造简短示例；不复制官方题解、插图或整段原题描述。原题链接保留，空白 Java 模板仅含接口与 TODO，不预填解答。其余题目复用项目已有题库，既有题号、标识与个人草稿不迁移。

## 六类模式与适用边界

下列模式名称、识别信号和分组是编者对官方题目契约的归纳，不宣称官方题页给出了同样的分类或唯一解法。

| 结构 | 建议模式及识别信号 | 代表题与一手依据 |
| --- | --- | --- |
| 数组 | 原地写入／双指针：有序、相向查找、过滤元素；滑窗：连续区间与可维护条件；前缀和：区间和、计数；排序合并区间；二分：有序或可证明的单调判定 | [167 两数之和 II](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)、[209 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)、[560 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)、[56 合并区间](https://leetcode.cn/problems/merge-intervals/)、[704 二分查找](https://leetcode.cn/problems/binary-search/) |
| 链表 | 反转与局部重连：修改 next；快慢指针：中点、环；哨兵节点与删除：头节点也可能变化；合并：多个有序链；双指针身份判断：相交而非值相同 | [206 反转链表](https://leetcode.cn/problems/reverse-linked-list/)、[876 中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/)、[141 环形链表](https://leetcode.cn/problems/linked-list-cycle/description/)、[21 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/) |
| 堆 | Top K／第 K 大：只保留候选；多路归并：每路只取当前最小候选；动态最值：反复取当前最大或最小；双堆：数据流中位数 | [703 数据流第 K 大](https://leetcode.cn/problems/kth-largest-element-in-a-stream/)、[23 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)、[1046 最后一块石头](https://leetcode.cn/problems/last-stone-weight/description/)、[295 数据流中位数](https://leetcode.cn/problems/find-median-from-data-stream/)、[Princeton 优先队列](https://algs4.cs.princeton.edu/24pq/) |
| 栈 | 括号与嵌套；特殊栈／容器转换；表达式；字符串消除与状态模拟；单调栈的最近更大／更小与边界结算 | 全部 19 题官方链接及边界见下一节；栈的 LIFO 语义见 [Java Deque](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Deque.html) |
| 队列 | FIFO 时间窗口：淘汰过期请求；循环结构：复用容量；BFS：逐层推进；单调双端队列：窗口最值及过期下标 | [933 最近请求](https://leetcode.cn/problems/number-of-recent-calls/)、[622 循环队列](https://leetcode.cn/problems/design-circular-queue/)、[994 腐烂的橘子](https://leetcode.cn/problems/rotting-oranges/)、[239 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/) |
| 二叉树 | DFS 遍历；后序汇总高度／平衡／贡献；BFS 层序；BST 全局边界；递归分解结构与祖先关系 | [144 前序](https://leetcode.cn/problems/binary-tree-preorder-traversal/description/)、[145 后序](https://leetcode.cn/problems/binary-tree-postorder-traversal/description/)、[104 最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)、[110 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)、[102 层序](https://leetcode.cn/problems/binary-tree-level-order-traversal/)、[98 验证 BST](https://leetcode.cn/problems/validate-binary-search-tree/) |

### 必须说明的模板陷阱

- **数组：**209 的元素是正数，扩张和收缩对区间和有明确方向；560 允许负数，不能把“和大就缩、和小就扩”的模板直接照搬。167 的相向指针依赖已排序；56 的端点相接也属于重叠。以上结论由各题输入条件推得。[209](https://leetcode.cn/problems/minimum-size-subarray-sum/)、[560](https://leetcode.cn/problems/subarray-sum-equals-k/)、[167](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)、[56](https://leetcode.cn/problems/merge-intervals/)
- **链表：**改写 `current.next` 前要保存后继，否则会丢失未处理链；快指针前进两步前需检查节点和后继是否为空。环检测中的相遇指节点引用相同，而非值相等；`pos` 只是题面表示法，不是函数入参。[206](https://leetcode.cn/problems/reverse-linked-list/)、[141](https://leetcode.cn/problems/linked-list-cycle/description/)
- **堆：**维护最大的 K 个元素时，容量 K 的最小堆便于淘汰其中最小者；不是建最大堆后把堆顶当第 K 大。重复值要计数，输入不足 K 个时不能宣称堆顶是第 K 大。Java `PriorityQueue` 默认堆顶为最小者，遍历它不会得到排序序列；增删顶端 O(log n)、查看顶端 O(1)。[703](https://leetcode.cn/problems/kth-largest-element-in-a-stream/)、[Java PriorityQueue](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/PriorityQueue.html)
- **215 的复杂度：**官方题面要求 O(n)。固定容量堆的 O(n log k) 是可学习的基础方法，但不能称它满足线性要求；可对照选择算法继续进阶。数据流堆模板用 703 解释更直接。[215](https://leetcode.cn/problems/kth-largest-element-in-an-array/)
- **队列：**933 的窗口是闭区间 `[t-3000,t]`，淘汰条件是 `< t-3000` 而不是 `<=`；239 保存下标才能判断过期。BFS 分层应先固定当前层的节点数；图／网格通常在入队时标记，避免重复入队。[933](https://leetcode.cn/problems/number-of-recent-calls/)、[239](https://leetcode.cn/problems/sliding-window-maximum/)、[994](https://leetcode.cn/problems/rotting-oranges/)、[102](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
- **二叉树：**递归先定义返回值与空节点边界；“高度”“路径节点数”“路径边数”不要混用。98 约束的是整个左右子树，不能只比较直接孩子。DFS 递归空间取决于高度，BFS 队列取决于宽度，不能无条件写 O(log n)。[104](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)、[98](https://leetcode.cn/problems/validate-binary-search-tree/)、[102](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
- **Java 容器：**栈可统一为 `Deque<Integer> stack = new ArrayDeque<>()`，使用 `push/pop/peek`；FIFO 队列使用 `offer/poll/peek`。`ArrayDeque` 不允许 null，树 BFS 只能把非空孩子入队。[Deque](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Deque.html)、[ArrayDeque](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html)

## 用户指定的全部 19 道栈题

“暂时处理不了就压栈，后面再弹出”是有用的记忆比喻，但不是所有栈题的统一算法。特殊栈维护额外状态、表达式还原语法、单调栈确定边界，分别需要不同的不变量。下面按用户给定的五类完整收录。

| 类别 | 官方题目 | 需要保留的区别 |
| --- | --- | --- |
| 括号匹配与嵌套 | [20 有效的括号](https://leetcode.cn/problems/valid-parentheses/) | 多种括号要求类型、顺序都匹配，不能只统计数量 |
| 同上 | [32 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/) | 求最长连续长度，而非仅判断合法；下标／边界状态不能被字符栈代替 |
| 同上 | [921 使括号有效的最少添加](https://leetcode.cn/problems/minimum-add-to-make-parentheses-valid/description/) | 只有圆括号，目标是最少插入；可用计数，不必强行使用栈 |
| 特殊栈与容器转换 | [155 最小栈](https://leetcode.cn/problems/min-stack/) | 最小值也要常数时间；重复最小值弹出后仍需正确保留 |
| 同上 | [232 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/) | 两栈转换中只在输出栈为空时搬运；均摊 O(1) 不等于每次 O(1) |
| 同上 | [225 用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/) | 只能使用队列允许的操作，不能直接从双端队列尾部弹出作弊 |
| 同上 | [1381 设计一个支持增量操作的栈](https://leetcode.cn/problems/design-a-stack-with-increment-operation/) | 容量上限、底部 k 项增量、空栈 -1；不能假设普通双栈足以直接得到所有性能目标 |
| 表达式计算 | [150 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/) | 先弹的是右操作数，负数 token 不是运算符；除法向零截断 |
| 同上 | [224 基本计算器](https://leetcode.cn/problems/basic-calculator/description/) | 加减、括号与一元负号；不同于 227 的语法 |
| 同上 | [227 基本计算器 II](https://leetcode.cn/problems/basic-calculator-ii/) | 无括号但有乘除优先级；扫描结束仍须处理末尾数字 |
| 字符串消除与模拟 | [1047 删除字符串中的所有相邻重复项](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/) | 消除后还可能出现新的可消除相邻对 |
| 同上 | [735 小行星碰撞](https://leetcode.cn/problems/asteroid-collision/) | 只有左侧向右、右侧向左才碰撞；一次新元素可能连续击碎多个栈顶。官方中文名为“小行星碰撞” |
| 同上 | [71 简化路径](https://leetcode.cn/problems/simplify-path/) | 按目录段而不是单字符处理；三个点是普通目录名；根目录不能继续向上 |
| 同上 | [394 字符串解码](https://leetcode.cn/problems/decode-string/) | 保存嵌套上下文与重复次数；多位数字，且输出长度可能大于输入 |
| 单调栈 | [496 下一个更大元素 I](https://leetcode.cn/problems/next-greater-element-i/) | 右边第一个严格更大；无解为 -1；查询数组是主数组子集 |
| 同上 | [739 每日温度](https://leetcode.cn/problems/daily-temperatures/) | 返回下标距离而非温度，无解为 0 |
| 同上 | [503 下一个更大元素 II](https://leetcode.cn/problems/next-greater-element-ii/) | 环形遍历，要限制轮次，避免重复入栈与自身匹配 |
| 同上 | [84 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/) | 面积依赖左右边界，宽度不能漏减 1；需处理末尾未结算柱子 |
| 同上 | [42 接雨水](https://leetcode.cn/problems/trapping-rain-water/) | 栈算法按凹槽分层结算，不同于逐柱双指针的水位公式；弹出槽底后仍需有左边界 |

### 单调栈比较符号不能盲背

以下是对题意和扫描方向的推导，而非引用一个万能解法：

- 从左向右扫描、为待处理下标寻找“右侧第一个严格更大值”时，当前值必须 `>` 栈顶值才能结算；相等不满足题意。739 的无解默认值为 0，496／503 需要显式初始化为 -1。[496](https://leetcode.cn/problems/next-greater-element-i/)、[739](https://leetcode.cn/problems/daily-temperatures/)、[503](https://leetcode.cn/problems/next-greater-element-ii/)
- 如果从右向左扫描、维护可作为答案的候选栈，则寻找严格更大时可以先弹出 `<= 当前值` 的候选。同一目标因扫描方向和栈含义不同，条件并不相同。[496 的严格更大定义](https://leetcode.cn/problems/next-greater-element-i/)
- 84 的等高柱子可采用不同保留策略，但比较符号、边界解释、宽度计算必须配套；至少用全相等、递增、递减三类样例验证。不要把所有 `>` 改成 `>=` 视为通用优化。[84 的矩形定义](https://leetcode.cn/problems/largest-rectangle-in-histogram/)

## 离线补充的 20 题契约核验

以下官方页用于核对题号、标题、难度、方法语义和约束。源码 `source` 均指向中文原题的 `/description/` URL。

| ID | 官方题目 | 补充注意 |
| --- | --- | --- |
| 704 | [二分查找](https://leetcode.cn/problems/binary-search/) | 升序无重复，O(log n)，返回 0-based 下标或 -1 |
| 876 | [链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/) | 偶数长度取第二个中点，返回节点 |
| 1046 | [最后一块石头的重量](https://leetcode.cn/problems/last-stone-weight/description/) | 每轮取最重两块，无剩余返回 0 |
| 703 | [数据流中的第 K 大元素](https://leetcode.cn/problems/kth-largest-element-in-a-stream/) | 不去重，构造时允许只有 k-1 项 |
| 378 | [有序矩阵中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/) | 行列非递减且允许重复，额外空间优于 O(n²) |
| 921 | [使括号有效的最少添加](https://leetcode.cn/problems/minimum-add-to-make-parentheses-valid/description/) | 只可插入 |
| 232 | [用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/) | 完整 push/pop/peek/empty 接口 |
| 225 | [用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/) | 完整 push/pop/top/empty 接口 |
| 1381 | [支持增量操作的栈](https://leetcode.cn/problems/design-a-stack-with-increment-operation/) | 使用 Java `increment(int k,int val)`；中文正文的 inc 简写与示例命名不一致，按接口／示例命名 |
| 227 | [基本计算器 II](https://leetcode.cn/problems/basic-calculator-ii/) | 不允许 eval，字面量非负，整数除法截断 |
| 1047 | [删除相邻重复项](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/) | 每次删一对，结果唯一 |
| 735 | [小行星碰撞](https://leetcode.cn/problems/asteroid-collision/) | 非零整数编码方向和大小 |
| 496 | [下一个更大元素 I](https://leetcode.cn/problems/next-greater-element-i/) | 无重复、nums1 为 nums2 子集 |
| 503 | [下一个更大元素 II](https://leetcode.cn/problems/next-greater-element-ii/) | 允许重复、环形 |
| 933 | [最近的请求次数](https://leetcode.cn/problems/number-of-recent-calls/) | t 严格递增，窗口两端包含 |
| 622 | [设计循环队列](https://leetcode.cn/problems/design-circular-queue/)／[官方英文页](https://leetcode.com/problems/design-circular-queue/description/) | 保留 Front/Rear 大写签名；中文页最多 1000 次操作，英文页为 3000，练习以中文页约束为准 |
| 641 | [设计循环双端队列](https://leetcode.cn/problems/design-circular-deque/description/)／[官方英文页](https://leetcode.com/problems/design-circular-deque/description/) | 中文页正文提取为空，使用官方英文页核验；两个插入方法都有 int value 参数 |
| 144 | [二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/description/) | 根、左、右；进阶迭代 |
| 145 | [二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/description/) | 左、右、根；进阶迭代 |
| 110 | [平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)／[官方英文页](https://leetcode.com/problems/balanced-binary-tree/description/) | 全树每个节点都要求高度平衡，空树为 true |

设计题示例中的 `null` 表示构造器或 void 方法无返回值；布尔值和整数按每次调用顺序一一对应。链表和树的 Java 节点定义保留为注释，因为 LeetCode 环境提供这些类；单独本地编译时需提供对应类型。模板中的 TODO 异常仅为合法占位，不是答案。
