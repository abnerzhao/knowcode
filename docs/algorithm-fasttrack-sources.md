# 算法题速通：来源与编辑说明

核验日期：2026-09-27 至 2026-09-28；排序章节补充核验：2026-10-09。

本册定位是数据结构与常见算法的编程练习，与既有「数据结构与算法」概念问答册互补。2026-10-10 新增搜索、分治、贪心、回溯、动态规划 50 题，当前共 170 题；新增算法的契约核验见[五类算法技巧来源](algorithm-techniques-sources.md)，下文保留历次补充记录。选题和模式分组是教学编辑建议，不是企业面试频率统计或 LeetCode 官方排名。识别信号只帮助提出候选思路，不能替代适用条件和正确性论证。

新增题面在 `scripts/algorithm-fasttrack/supplements.mjs` 中以原创中文重述任务、接口和约束，并构造简短示例；不复制官方题解、插图或整段原题描述。原题链接保留，空白 Java 模板仅含接口与 TODO，不预填解答。其余题目复用项目已有题库，既有题号、标识与个人草稿不迁移。

## 面试重点星标

本册原有 30 道数据结构重点题，五类算法新增 23 道，当前共 53 道。学习理由维护在 `scripts/algorithm-fasttrack/outline.mjs` 的 `interviewFocus` 及其合并的 `techniques.mjs` 中。它是基于题型基础性、综合性与代表性的编辑判断，不是实际面试频率、企业题库排名或保证命中的预测。没有星标的题目仍值得练习；标记不参与排序、难度或随机抽题权重，也不关联用户掌握状态。

## 七类模式与适用边界

下列模式名称、识别信号和分组是编者对官方题目契约的归纳，不宣称官方题页给出了同样的分类或唯一解法。

| 结构 | 建议模式及识别信号 | 代表题与一手依据 |
| --- | --- | --- |
| 哈希表 | 存在性／频次；双向映射；规范化分组；连续段起点；补数计数；最近下标；动态数组与访问顺序链表的组合设计 | [217 重复元素](https://leetcode.cn/problems/contains-duplicate/)、[49 异位词分组](https://leetcode.cn/problems/group-anagrams/)、[128 连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)、[146 LRU](https://leetcode.cn/problems/lru-cache/)；全部 14 题与边界见文末核验表 |
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

## 数组基础题补充核验（2026-09-28）

以下题意、难度和约束取自官方题页；66、2149 的 Java 签名另核对同页公开 `codeSnippets` 数据。题面继续使用原创中文重述。

| 题目与来源 | 难度／Java 接口 | 必须保留的契约 |
| --- | --- | --- |
| [66 加一](https://leetcode.cn/problems/plus-one/) | 简单；`public int[] plusOne(int[] digits)` | 高位在左，返回加一后的数字数组；长度 1～100，每位 0～9，无前导零。全为 9 时结果会多一位，不能先转成 `int` 或 `long` 再加一。 |
| [2149 按符号重排数组](https://leetcode.cn/problems/rearrange-array-elements-by-sign/) | 中等；`public int[] rearrangeArray(int[] nums)` | 长度为偶数且在 2～200000 之间；正负数等量，元素绝对值 1～100000，不含零。正数开头、正负交替，同号元素保持原有相对顺序；官方明确允许使用新数组，不要求原地修改。 |
| [88 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/) | 简单；结果写回 `nums1`，方法无返回值 | 两段有效元素均非递减；`nums1` 长度为 `m+n`，只有前 `m` 项参与合并，尾部 `n` 个零是占位。`m` 或 `n` 可为 0，总长度至少 1；进阶为 O(m+n)。不能把占位零也当成待合并元素。 |
| [215 数组中的第 K 个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/) | 中等；返回第 K 大的值 | 排名保留重复值，并非第 K 个不同值；`1 <= k <= nums.length <= 100000`，元素为 -10000～10000。中文官方题面明确要求 O(n)；排序 O(n log n) 和堆 O(n log k) 可作思路对照，但不满足该复杂度要求。 |

“数组中第一个不重复元素”（`first-unique-array-element`）是本项目自编数组练习，不是 LeetCode 387，难度“简单”为本项目教学评级。契约为返回原数组中第一个**在全数组仅出现一次**的元素下标；不存在时返回 -1，不能把首次遇见某个值误认为它全局唯一。

此自编题的计数思路依据 Java 17 [`Map.getOrDefault`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Map.html#getOrDefault(java.lang.Object,V))：键无映射时返回指定默认值，因此非空整数计数可用 `count.getOrDefault(value, 0) + 1`。官方 [`HashMap`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html) 不保证迭代顺序，所以“第一个”的判断应按原数组下标顺序进行第二遍扫描；不能直接取哈希表遍历到的首个计数为 1 的键。两遍扫描是针对自编题契约作出的编辑推导，并非官方题解。

## 哈希表章节：14 题来源与边界（2026-09-28）

本节补充哈希表练习：复用既有题库的 242、383、202、205、290、49、128、219、380、146，原创重述新增 217、349、350、454。题意、难度和约束核对以下官方题页；新增四题的 Java 接口另核对官方中文页公开 `codeSnippets`。两数之和仍在数组章节，可作为补数查询的跨章节复习题，不计入此处 14 题。分组表达的是常见解题模式，不是面试频率统计。

| 官方题目 | 难度 | 需要保留的契约或边界 |
| --- | --- | --- |
| [217 存在重复元素](https://leetcode.com/problems/contains-duplicate/) | 简单 | 长度 1～100000，值在 ±10⁹ 内；不同下标有相同值就成立，无距离限制。Java：`boolean containsDuplicate(int[] nums)`。 |
| [242 有效的字母异位词](https://leetcode.com/problems/valid-anagram/) | 简单 | 两串长度各 1～50000，只含小写英文字母；字符种类和每种数量都必须相同。26 项计数数组依赖这个字符集约束，Unicode 是进阶问题。 |
| [383 赎金信](https://leetcode.com/problems/ransom-note/) | 简单 | 两串长度各 1～100000，只含小写英文字母；来源中的每个字符只能使用一次，允许有剩余，不能把它误写成频次完全相等。 |
| [349 两个数组的交集](https://leetcode.com/problems/intersection-of-two-arrays/) | 简单 | 两数组长度各 1～1000，值在 0～1000 内；结果必须去重，顺序不限。Java：`int[] intersection(int[] nums1, int[] nums2)`。 |
| [350 两个数组的交集 II](https://leetcode.com/problems/intersection-of-two-arrays-ii/) | 简单 | 范围同 349；结果保留多重性，每个值出现 `min(次数1, 次数2)` 次，顺序不限。Java：`int[] intersect(int[] nums1, int[] nums2)`。 |
| [202 快乐数](https://leetcode.com/problems/happy-number/) | 简单 | 输入为 1～2³¹−1 的正整数；重复执行各位平方和，终止于 1 才成功，否则检测重复状态避免死循环。 |
| [205 同构字符串](https://leetcode.com/problems/isomorphic-strings/) | 简单 | 两串等长、长度 1～50000，可含任意有效 ASCII 字符；必须一一映射，两个源字符不能映射到同一目标字符。不能只用 26 个槽位。 |
| [290 单词规律](https://leetcode.com/problems/word-pattern/) | 简单 | 模式长 1～300，字符串长 1～3000；单词以单个空格分隔、无首尾空格。模式字符与完整单词必须双向一一对应，单词数也要匹配。 |
| [49 字母异位词分组](https://leetcode.com/problems/group-anagrams/) | 中等 | 1～10000 个字符串，每串长 0～100，只含小写英文字母；允许空串和重复字符串，分组不能丢掉重复项。 |
| [454 四数相加 II](https://leetcode.com/problems/4sum-ii/) | 中等 | 四数组等长，1 ≤ n ≤ 200，元素在 ±2²⁸ 内；统计下标四元组，重复数值对应的不同组合都要计数。Java：`int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4)`。 |
| [128 最长连续序列](https://leetcode.com/problems/longest-consecutive-sequence/) | 中等 | 长度 0～100000，值在 ±10⁹ 内；求数值连续序列长度，非原数组连续子数组；重复值不延长序列，要求 O(n)。 |
| [219 存在重复元素 II](https://leetcode.com/problems/contains-duplicate-ii/) | 简单 | 长度 1～100000，值在 ±10⁹ 内，0 ≤ k ≤ 100000；相同值还要求不同下标距离 ≤ k，距离恰好 k 仍有效，k=0 必为 false。 |
| [380 O(1) 时间插入、删除和获取随机元素](https://leetcode.com/problems/insert-delete-getrandom-o1/) | 中等 | `RandomizedSet` 不保存重复值；插入和删除返回是否发生变更。每个操作要求平均 O(1)，随机返回现存值且各值等概率，调用 getRandom 时保证非空；值可覆盖完整 int 范围，最多 200000 次调用。 |
| [146 LRU 缓存](https://leetcode.com/problems/lru-cache/) | 中等 | 正容量 1～3000；get 未命中返回 -1，put 更新或插入，超容量淘汰最久未使用项；get/put 要求平均 O(1)。key 在 0～10000，value 在 0～100000，最多 200000 次调用。 |

### 哈希模板的推导边界

以下是基于上述契约的编辑推导，不宣称官方规定必须使用这一种实现。

- **集合与频次表：**349 输出的是不同值的集合交集，350 输出的是多重交集。350 匹配一次就消耗一次库存，库存为 0 时不能继续添加；若只使用 Set，会丢失应保留的重复项。[349](https://leetcode.com/problems/intersection-of-two-arrays/)、[350](https://leetcode.com/problems/intersection-of-two-arrays-ii/)
- **规范化分组键：**49 的计数键需要编码全部 26 项并使用分隔符，例如 `#1#11` 与 `#11#1` 不能拼成同一个无分隔字符串。Java 数组默认不能按内容作为可互换的 HashMap 键；应转换成稳定的内容键，且不能只保存可能冲突的哈希值来判等。这是对分组正确性的实现要求。[49](https://leetcode.com/problems/group-anagrams/)、[Java Arrays.equals](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Arrays.html#equals(int%5B%5D,int%5B%5D))
- **成对和计数：**454 将前两数组的所有下标对累加到频次表，再查询后两数组的相反和；同一个和出现多次必须累计，不能去重。由官方范围推得，二数和绝对值最多 2²⁹，取相反数安全；四数和绝对值最多 2³⁰，答案最多 200⁴ = 1,600,000,000，均在 Java int 范围内。若将模板扩展到更大 n 或完整 int 元素，需要重新估算，并在加法前转 long。[454 的约束](https://leetcode.com/problems/4sum-ii/)
- **连续序列：**128 先去重，再遍历集合；只从不存在前驱 `x-1` 的序列头向右扩展。遍历原数组会使重复的序列头反复扫描整段，从每个值向右扩展也可能退化为 O(n²)。官方 ±10⁹ 范围使 `x±1` 不溢出，但通用 int 模板仍需考虑边界。[128 的线性要求与范围](https://leetcode.com/problems/longest-consecutive-sequence/)
- **最近下标：**219 保存每个值的最近一次位置；先检查与当前位置的距离，再更新位置。只保存第一次出现的位置会错过更近的重复对。若改用滑动集合，窗口范围与移除时机要匹配 `≤ k` 的闭边界。[219](https://leetcode.com/problems/contains-duplicate-ii/)
- **随机集合：**380 的数组保存每个现存值一次，Map 保存值到数组下标；删除时以末位补洞并同步被移动值的下标，再删除尾部与目标映射。删除本来就在末位的元素也要成立。对紧凑数组下标均匀抽样才能得到等概率；不能以 HashSet 的固定迭代首项替代随机抽样，数组中间直接移除也无法满足平均 O(1)。[380](https://leetcode.com/problems/insert-delete-getrandom-o1/)
- **LRU 访问顺序：**146 的成功读取、写入已有键都刷新最近使用次序。Java `LinkedHashMap` 默认是插入顺序；若用于 LRU，应使用 `new LinkedHashMap<>(16, 0.75f, true)` 开启 access-order，并在超容量时删除最久未访问项，或覆盖 `removeEldestEntry`。仅更新 value、却不移动访问顺序会淘汰错误条目。它与手写哈希表加双向链表是可对照的实现方式。[146](https://leetcode.com/problems/lru-cache/)、[Java LinkedHashMap](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/LinkedHashMap.html)

## 按 HOT100 数据结构标签补齐（2026-09-28）

本轮依据项目已有 `public/data/questions.json` 中的官方题面、Java 接口、`category` 与 `tags` 核验，数据标注采集于 2026-09-07，来源为 [LeetCode HOT100 学习计划](https://leetcode.cn/studyplan/top-100-liked/)。这是对本地官方题库快照的覆盖核对，未重新抓取题目，也不宣称当前线上题单完全未变。下面逐题链接指向该快照记录的官方原题。

仅按「数组、哈希表、链表、堆（优先队列）、栈、队列、单调队列、二叉树」任一标签筛选，会得到 91 题；补齐前已覆盖 49 题，尚缺 42 题。标签可同时表示输入结构和主要解题方法，不能据此把矩阵、回溯或动态规划全部放进数组章节。

按本轮确认的范围，新增候选排除官方分类「图论」（含 208 Trie）、「贪心算法」、「回溯」、「动态规划」、「多维动态规划」、「矩阵」，并排除任何带「矩阵」标签的题目（如二分分类的 74）。该范围共 64 题，原有 46 题，新增下表 18 题后覆盖完整。原先已收录的 200、994、32 继续保留，因此全册 HOT100 交集为 67 题（原 49 + 新增 18），全册总题数为 110（原 92 + 新增 18）。这里的“补齐”指本轮约定的结构范围，不表示已经收录完整 HOT100；73、54、48、240 等矩阵题留待独立分类。

以下实现边界是从题意、约束和相应算法不变量推导出的编辑说明，不代表官方要求只能采用该实现。

| 官方题目 | 已有题面契约与 Java 实现边界 |
| --- | --- |
| [438 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/) | 两串长度 1～30000，仅小写字母；返回所有匹配子串的起始下标，允许重叠，顺序不限。固定窗口长度为 `p.length()`，比较 26 项频次而非字符集合；`p` 比 `s` 长时直接返回空列表。检验 `s="abab", p="ab"` 应包含 0、1、2。 |
| [76 最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/description/) | 两串长度 1～100000，含大小写英文字母；覆盖必须包含 `t` 的重复字符，无解返回空串，答案唯一，进阶 O(m+n)。ASCII 计数可用 128 项，不能沿用 438 的 `c-'a'`；只有频次跨越需求阈值时才改变满足状态，满足后持续收缩。`s="a", t="aa"` 无解；答案截取的右端为 Java `substring` 的排他边界。 |
| [189 轮转数组](https://leetcode.cn/problems/rotate-array/description/) | 数组长度 1～100000、元素覆盖 int 范围，`k` 为 0～100000；方法 `void rotate(int[] nums, int k)` 将结果写回原数组，方向是向右。先取 `k %= n`；整段、前 k 项、剩余项三次反转可达 O(n) 时间和 O(1) 空间。`k=0`、整圈轮转、单元素都必须成立；本题保证 n 非零。 |
| [238 除了自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/description/) | 长度 2～100000，元素 -30～30；要求 O(n)，禁止除法，保证前后缀乘积及结果在 int 范围内，输出数组不计入进阶额外空间。答案先存左侧乘积，再乘右侧累积；空侧乘积初始化为 1，两遍都要先使用累积再纳入当前元素，避免包含自身。零、多个零、负数无需另设除法分支。 |
| [41 缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/description/) | 长度 1～100000，元素覆盖 int 范围；必须 O(n) 时间、O(1) 额外空间。答案在 1～n+1，原地归位只处理 1～n；条件应先检验范围，再访问 `nums[value-1]`。目标位置已有相同值时停止交换，避免重复值死循环；一次交换后继续检查当前槽位。 |
| [148 排序链表](https://leetcode.cn/problems/sort-list/description/) | 节点数 0～50000，值 -100000～100000；返回升序链表头，空链与单节点直接返回。递归归并应切断左右链的连接，并确保两个节点时仍严格缩小子问题。递归归并占 O(log n) 调用栈，不满足 O(1) 额外空间进阶；要求严格常数空间时用自底向上归并，处理最后一段不足步长、合并后尾指针与余下链重连。 |
| [108 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/) | 长度 1～10000，元素 -10000～10000且严格递增；返回高度平衡 BST，合法结果不唯一。闭区间递归以 `left > right` 返回 null，并排除已选中点；不要混用半开区间的结束条件。取左右中点均可，测试应检查中序结果与高度平衡，不能只认一种序列化形状；平衡递归调用栈为 O(log n)，生成节点占 O(n)。 |
| [114 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/) | 节点数 0～2000，值 -100～100；`void flatten(TreeNode root)` 沿用原树节点，所有 left 置 null，right 链严格等于原树先序序列。重连前保存原右子树，不能覆盖后丢失；前驱接法应把原右子树接到左子树最右节点，再把左子树移到 right。递归或显式栈需要 O(h) 空间，不能称为 O(1) 进阶；空树无需处理。 |
| [437 路径总和 III](https://leetcode.cn/problems/path-sum-iii/description/) | 节点数 0～1000，值在 ±10⁹ 内，目标在 ±1000 内；统计任意起点到任意终点的向下非空路径，不要求根或叶。Java 路径前缀必须使用 long 和 `Map<Long, Integer>`；初始化空前缀 `0L -> 1`，先查询 `prefix-target` 再加入当前前缀，退出节点时扣回频次，防止零长度路径与兄弟分支串接。负数允许出现，不能按“超过目标”剪枝；空树返回 0。 |
| [35 搜索插入位置](https://leetcode.cn/problems/search-insert-position/description/) | 长度 1～10000，严格升序且无重复，值和目标在 ±10000 内；要求 O(log n)。求第一个 `>= target` 的位置，可能为 n；采用 `[left,right)` 时初始化 right=n，循环用 `left < right`，不能把越界插入位当成失败 -1。 |
| [34 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/) | 长度 0～100000，非递减，值和目标在 ±10⁹ 内；要求 O(log n)，不存在返回 `[-1,-1]`。分别求第一个 `>= target` 和第一个 `> target` 的边界；先验证左边界未越界且命中，再把后一边界减 1。空数组、所有元素相等和目标在两端外侧要成立；围绕命中点线性扩展会失去复杂度保证。 |
| [153 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/) | 长度 1～5000，元素 -5000～5000且互不相同，严格升序数组旋转 1～n 次；必须 O(log n)，返回最小值而非下标。与右端比较时，`nums[mid] > nums[right]` 排除 mid，否则保留 mid，令 right=mid；已经有序（旋转整圈）和单元素同样有效。此判定不能直接套用于含重复值的 154。 |
| [4 寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/description/) | 每数组长度 0～1000，总长度 1～2000，值在 ±10⁶ 内；返回 double，要求 O(log(m+n))。在较短数组二分分割点，左右部分大小按总长奇偶确定；分割点可在 0 或数组长度，缺失邻居用哨兵。允许一个数组为空、重复值；偶数答案必须除以 `2.0`，不可整数截断。合并扫描是 O(m+n)，不满足要求；若扩展到完整 int 范围，应先转 long 或 double 再加中间两值。 |
| [136 只出现一次的数字](https://leetcode.cn/problems/single-number/description/) | 非空数组长度最多 30000，值在 ±30000 内；仅一个元素出现一次，其余每个恰好两次，要求线性时间和常数空间。从 0 累积异或即可消去成对元素，负数与零同样成立。结论依赖“其余恰好两次”，不能当成任意频次的唯一元素模板；HashMap 计数不满足该空间要求。 |
| [169 多数元素](https://leetcode.cn/problems/majority-element/description/) | 非空数组长度最多 50000，值在 ±10⁹ 内；保证存在出现次数严格大于 n/2 的元素，进阶 O(n) 时间、O(1) 空间。摩尔投票计数为零时重设候选，最后候选依赖存在性保证；投票余额不是实际出现次数。扩展到不保证存在多数元素的接口时，还需第二遍验证。 |
| [75 颜色分类](https://leetcode.cn/problems/sort-colors/description/) | 长度 1～300，每项仅为 0、1、2；原地排序且禁止调用内置 sort，进阶一趟扫描和常数空间。三路划分中，当前值为 2 时与右边界交换并缩短未知区，但不能推进当前指针，因为换入值仍未分类；循环应覆盖当前指针等于右边界的最后一项。 |
| [31 下一个排列](https://leetcode.cn/problems/next-permutation/description/) | 长度 1～100，值 0～100，允许重复；原地修改且额外空间为 O(1)，没有更大排列时回到最小排列。从右找第一个严格上升断点，再从右找严格大于断点值的元素交换，最后反转后缀；寻找断点时应跳过相等值。完全非递增、全相等、单元素都走得通，不能只找到任意一个更大排列。 |
| [287 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/description/) | 长度 n+1，1≤n≤100000，每项属于 1～n；只有一种数重复，但它可出现两次或更多次。必须不修改输入且使用 O(1) 额外空间，线性时间是进阶；排序、原地交换归位或取负标记均违背只读要求。将下标映射为 `i -> nums[i]` 做 Floyd 判圈时，两阶段初始化要配套；若从下标 0 出发，第二阶段重置一指针到 0，再同步单步前进到入口。不可把第一次相遇直接当重复数。 |

复习与验证优先覆盖上述边界，尤其是 76 重复需求字符、41 重复值归位、148 断链与空间说明、437 long 前缀及回溯、4 单空数组与偶数长度、75 换入未知值、31 非递增序列、287 输入未被修改。复杂度中的“常数额外空间”不包含结果对象时应明确注明；递归调用栈不能省略不算。

## 十大排序算法：来源与适用边界（2026-10-09）

排序章收录 S01～S10 十道原创实现练习，分别对应冒泡、选择、插入、希尔、归并、快速、堆、计数、桶、基数排序；题号和难度属于项目教学编排，不是 LeetCode 官方题号或评级。算法描述与示例自行编写，以下大学课程资料用于核验原理与分析边界，不复制其代码或整段题面。

稳定性指相等键的记录仍保持输入时的相对顺序，单纯 `int[]` 的相同值无法展示这种区别。表中性质针对所注明的常规实现；更换相等时的处理、增量序列、桶内排序或递归策略，需要重新分析。[Princeton：排序应用与稳定性](https://algs4.cs.princeton.edu/25applications/)

| 练习 | 核验结论与一手来源 |
| --- | --- |
| S01 冒泡排序 | 仅交换严格逆序的相邻元素时稳定，额外空间 O(1)；加上“本轮无交换则结束”后最佳 O(n)，平均／最坏 O(n²)。[Bubble 源码与说明](https://algs4.cs.princeton.edu/21elementary/Bubble.java.html)、[复杂度表](https://algs4.cs.princeton.edu/cheatsheet/) |
| S02 选择排序 | 常规“找最小值后与当前位置交换”不稳定；最好／平均／最坏均 Θ(n²)，额外空间 O(1)，交换次数 O(n)。[初等排序](https://algs4.cs.princeton.edu/21elementary/)、[稳定性反例](https://algs4.cs.princeton.edu/25applications/) |
| S03 插入排序 | 只将严格大于待插入值的项右移时稳定；有序输入 Θ(n)，随机互异输入平均 Θ(n²)，最坏 Θ(n²)，额外空间 O(1)。[初等排序](https://algs4.cs.princeton.edu/21elementary/) |
| S04 希尔排序 | 本章固定 `gap=n/2`、每轮 `gap/=2`，最终包含 1；不稳定，额外空间 O(1)。其最坏 O(n²)，有序输入最佳 Θ(n log n)，不为平均复杂度填入未经证明的统一指数。Princeton 的 `Shell` 使用 Knuth 序列 1、4、13……，其 Θ(n^(3/2)) 最坏界不能移植到本章。[Shell API](https://algs4.cs.princeton.edu/code/javadoc/edu/princeton/cs/algs4/Shell.html)、[增量序列课程讲义](https://www.cs.princeton.edu/courses/archive/spr03/cs226/lectures/sorting.4up.pdf) |
| S05 归并排序 | 常规数组归并稳定，前提是相等时先取左半段；时间 Θ(n log n)，辅助数组 O(n)，递归栈 O(log n)。若加入“边界已排序便跳过归并”，最佳时间须按新实现重算。[Merge API](https://algs4.cs.princeton.edu/code/javadoc/edu/princeton/cs/algs4/Merge.html) |
| S06 快速排序 | 随机枢轴／预先洗牌配合三路划分，期望 O(n log n)，最坏仍 O(n²)，不稳定；全相等时三路划分只扫描一轮，为 Θ(n)。普通双侧递归栈期望 O(log n)、最坏 O(n)。[随机性与三路划分](https://algs4.cs.princeton.edu/23quicksort/)、[三路快排复杂度表](https://algs4.cs.princeton.edu/lectures/keynote/24PriorityQueues-2x2.pdf) |
| S07 堆排序 | 自底向上建堆 O(n)，完整排序最坏 O(n log n)，迭代下沉额外空间 O(1)，不稳定。有提前结束的下沉在全相等输入上可以 Θ(n) 完成，不能无条件将最佳写成 Θ(n log n)。[Princeton 复杂度表及互异键注释](https://algs4.cs.princeton.edu/cheatsheet/) |
| S08 计数排序 | 稳定版本时间 O(n+k)、辅助空间 O(n+k)，k 是值域宽度；并非所有整数输入均可忽略 k。负数可通过 `value-min` 映射到非负下标。[MIT 计数与基数排序讲义](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/bf7d79105762bf79bbc0925438e1468a_MIT6_006F11_lec07.pdf)；偏移是基于其整数键模型的编辑推导。 |
| S09 桶排序 | 桶内采用插入排序时，只有输入独立、均匀落入各桶且桶数 m=Θ(n) 等前提成立，才有 O(n) 期望时间；最坏 O(n²+m)，辅助空间 O(n+m)。稳定性依赖按输入顺序入桶与桶内稳定排序。[Princeton 分桶练习](https://algs4.cs.princeton.edu/51radix/)、[MIT 6.006 桶排序讲义](https://courses.csail.mit.edu/6.006/fall08/notes/lecture11.pdf) |
| S10 基数排序 | 本章使用非负 int 的十进制 LSD：从低位到高位，每一位必须稳定排序。d 位、基数 b 时为 O(d(n+b))，额外空间 O(n+b)；本章 b=10。非负限制属于本练习契约，不代表所有基数排序都不能处理负数。[MIT LSD 与稳定性分析](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/bf7d79105762bf79bbc0925438e1468a_MIT6_006F11_lec07.pdf) |

以下是针对本章实现的编辑推导与检查点：

- **希尔的复杂度口径：**减半增量共 Θ(log n) 轮，有序时每轮仍扫描 Θ(n) 项，故最佳 Θ(n log n)；每轮分组插入的上界 O(n²/gap)，对减半序列求和得到 O(n²)。当 n 为 2 的幂时，前面的偶数增量可能始终隔离奇偶位置，最后 gap=1 才处理大量逆序对；这解释了二次最坏情况。[增量序列课程讲义](https://www.cs.princeton.edu/courses/archive/spr03/cs226/lectures/sorting.4up.pdf)
- **计数的稳定性和负数：**以累计计数表示结束位置时，从右向左扫描输入并递减计数写入输出，才能保持等值记录顺序。本题值域限制为 [-10000,10000]，`max-min+1` 不会溢出；如果扩展输入范围，应先用 `k=(long)max-min+1` 计算并检查可分配范围。“能偏移负数”不代表适合完整 int 值域。仅按频次重写整数值不能证明携带其他字段时也稳定。[MIT 稳定排序与计数排序](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2008/0c8bb24ef91668bfe85f1eaee80e72a0_lec11.pdf)
- **桶的期望不是无条件保证：**均匀独立分配时，桶内插入排序的二次项期望为 O(n+n²/m)，总计 O(n+m+n²/m)；m=Θ(n) 才简化为 O(n)。集中到少量桶时会退化，固定十个桶不能据此宣称任意 n 均线性。本模板仅处理非负整数，求最大值后用 `value*n/(max+1)` 映射到 n 个桶，中间算术使用 long，处理全相等、最大值落桶、空桶等边界。[MIT 分桶前提](https://courses.csail.mit.edu/6.006/fall08/notes/lecture11.pdf)
- **LSD 位权：**每轮从稳定的计数输出复制回数组，位权用 long，避免十进制位权乘 10 溢出；空数组、全零直接结束也必须保持正确。负数若要支持，需要另行设计符号处理，不能直接将负余数用作十个桶的下标。[MIT LSD 逐位稳定性](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/bf7d79105762bf79bbc0925438e1468a_MIT6_006F11_lec07.pdf)

### 关联力扣练习的范围

S05 归并、S06 快速、S07 堆排序关联 [912 排序数组](https://leetcode.cn/problems/sort-an-array/description/) 供在线练习，仍保留原创 S 系列标识。官方题目难度为中等，要求禁用内置排序、时间 O(n log n)、空间尽可能小；长度 1～50000，值 -50000～50000，允许重复。官方不指定使用上述哪一种算法，不能把三个独立算法练习都改称官方 912 原题。随机快排的 O(n log n) 是期望界，最坏 O(n²)，不能宣称其具有最坏 O(n log n) 保证。
