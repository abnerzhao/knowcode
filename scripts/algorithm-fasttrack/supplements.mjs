// Official problem contracts checked on 2026-09-27. Wording and examples are original.
// These are practice starters, not solutions; see docs/algorithm-fasttrack-sources.md.
const source = slug => `https://leetcode.cn/problems/${slug}/description/`;
const listNode = `/**
 * LeetCode 提供的单链表节点：
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
`;
const treeNode = `/**
 * LeetCode 提供的二叉树节点：
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val; this.left = left; this.right = right;
 *     }
 * }
 */
`;
const solution = (signature, definition = '', imports = '') => `${imports}${definition}class Solution {
    public ${signature} {
        // TODO: 在这里实现
        throw new UnsupportedOperationException("TODO");
    }
}
`;
const example = (input, output, explanation) => `<h3>示例</h3><pre>输入：${input}\n输出：${output}</pre><p>解释：${explanation}</p>`;
const limits = text => `<h3>约束</h3><p>${text}</p>`;
const problem = (id, slug, title, englishTitle, difficulty, tags, content, java) => ({
  id: String(id), slug, title, englishTitle, difficulty, tags, content, java, source: source(slug),
});

export const supplements = [
  problem(217, 'contains-duplicate', '存在重复元素', 'Contains Duplicate', 'easy', ['数组', '哈希表', '排序'],
    '<p>给定整数数组 <code>nums</code>，判断是否有某个值出现在至少两个不同下标上。只要找到一组重复就返回 <code>true</code>；所有值都只出现一次时返回 <code>false</code>。</p>' +
    example('nums = [8,-2,5,8]', 'true', '下标 0 和 3 的值都是 8。') +
    example('nums = [0,-4,9]', 'false', '三个元素互不相同。') +
    limits('1 ≤ nums.length ≤ 100000；-10⁹ ≤ nums[i] ≤ 10⁹。'),
    solution('boolean containsDuplicate(int[] nums)')),

  problem(349, 'intersection-of-two-arrays', '两个数组的交集', 'Intersection of Two Arrays', 'easy', ['数组', '哈希表', '双指针', '二分查找', '排序'],
    '<p>给定整数数组 <code>nums1</code> 和 <code>nums2</code>，返回同时出现在两者中的所有不同值。结果中的每个值只能保留一次，排列顺序不限；没有共同值时返回空数组。</p>' +
    example('nums1 = [6,3,6,8], nums2 = [8,6,6,1]', '[6,8]', '6 虽然重复出现，结果中仍只保留一个；[8,6] 也正确。') +
    example('nums1 = [0,4], nums2 = [2,2,7]', '[]', '两个数组没有共同值。') +
    limits('1 ≤ nums1.length, nums2.length ≤ 1000；0 ≤ nums1[i], nums2[i] ≤ 1000。'),
    solution('int[] intersection(int[] nums1, int[] nums2)')),

  problem(350, 'intersection-of-two-arrays-ii', '两个数组的交集 II', 'Intersection of Two Arrays II', 'easy', ['数组', '哈希表', '双指针', '二分查找', '排序'],
    '<p>给定整数数组 <code>nums1</code> 和 <code>nums2</code>，返回它们能够逐个配对的共同元素。一个值在结果中出现的次数，等于它在两个数组中出现次数的较小值。结果顺序不限，没有配对时返回空数组。</p><p>进阶：分别考虑输入已排序、两个数组长度相差很大，以及较大数组存于磁盘且不能全部载入内存的情形。</p>' +
    example('nums1 = [6,3,6,8], nums2 = [6,6,6,8]', '[6,6,8]', '6 在两边分别出现 2 次和 3 次，能配对 2 次；8 能配对 1 次。') +
    example('nums1 = [0,0,4], nums2 = [0,4,4]', '[0,4]', '0 和 4 都只能各配对一次，[4,0] 也正确。') +
    limits('1 ≤ nums1.length, nums2.length ≤ 1000；0 ≤ nums1[i], nums2[i] ≤ 1000。'),
    solution('int[] intersect(int[] nums1, int[] nums2)')),

  problem(454, '4sum-ii', '四数相加 II', '4Sum II', 'medium', ['数组', '哈希表'],
    '<p>给定四个长度均为 <code>n</code> 的整数数组 <code>nums1</code>、<code>nums2</code>、<code>nums3</code> 和 <code>nums4</code>。从每个数组各选择一个下标，统计四个对应元素之和为 0 的下标组合数量。不同数组中的下标彼此独立；即使选出的数值相同，只要下标组合不同就要分别计数。</p>' +
    example('nums1 = [2,2], nums2 = [-2,-2], nums3 = [5,5], nums4 = [-5,-5]', '16', '每个数组都有 2 个下标可选，全部 2 × 2 × 2 × 2 个组合都满足和为 0。') +
    example('nums1 = [3], nums2 = [-1], nums3 = [2], nums4 = [-3]', '0', '唯一组合的和为 1，因此没有符合条件的组合。') +
    limits('四个数组长度相同；1 ≤ n ≤ 200；每个元素在 [-2²⁸, 2²⁸] 内。'),
    solution('int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4)')),

  problem(2149, 'rearrange-array-elements-by-sign', '按符号重排数组', 'Rearrange Array Elements by Sign', 'medium', ['数组', '双指针', '模拟'],
    '<p>给定偶数长度的整数数组 <code>nums</code>，其中正数与负数数量相等，且没有 0。请返回一个重新排列后的数组：正数在第一个位置，此后正负交替；所有正数之间、所有负数之间的相对顺序分别保持不变。不要求原地修改。</p>' +
    example('nums = [-3,4,2,-7,-1,6]', '[4,-3,2,-7,6,-1]', '正数顺序仍为 4、2、6，负数顺序仍为 -3、-7、-1，两类依次交替。') +
    example('nums = [-5,8]', '[8,-5]', '从正数开始排列。') +
    limits('2 ≤ nums.length ≤ 200000，长度为偶数；1 ≤ |nums[i]| ≤ 100000；正负元素数量相等。'),
    solution('int[] rearrangeArray(int[] nums)')),

  {
    id: 'A01', slug: 'first-unique-array-element', title: '查找第一个不重复的数组元素 / 索引',
    englishTitle: 'First Unique Element in an Array', difficulty: 'easy', tags: ['数组', '哈希表', '计数'],
    contentOrigin: 'original-exercise',
    source: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html',
    references: [{ title: 'Java 17 HashMap API（方法参考，非原题）', url: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html' }],
    content: '<p>本站自编练习，编号 A01，不对应 LeetCode 题号。</p><p>给定整数数组 <code>nums</code>，找到在整个数组中只出现一次、且原始下标最小的元素。实现 <code>firstUniqueIndex</code> 返回它的下标（从 0 开始）；不存在时返回 <code>-1</code>。数组允许为空、允许负数，不要修改输入数组。</p><p>若需要返回元素值，先判断返回的索引是否为 -1；存在时读取 <code>nums[index]</code>。不要用元素值 -1 表示不存在，因为它也可能是合法答案。</p>' +
      example('nums = [4,2,4,7,2,9]', '3', '7 和 9 各出现一次，最先出现的是 7，其下标为 3；元素值为 nums[3] = 7。') +
      example('nums = [5,5,2,2]', '-1', '所有元素都重复。') +
      example('nums = [-1,3,3]', '0', '唯一值是 -1，但返回的是有效下标 0。') +
      example('nums = []', '-1', '空数组没有可选元素。') +
      limits('0 ≤ nums.length ≤ 100000；元素为 Java int 范围内的整数；争取达到期望 O(n) 时间复杂度。'),
    java: solution('int firstUniqueIndex(int[] nums)'),
  },

  problem(704, 'binary-search', '二分查找', 'Binary Search', 'easy', ['数组', '二分查找'],
    '<p>在严格递增的整数数组 <code>nums</code> 中查找 <code>target</code>。找到时返回它的下标，否则返回 <code>-1</code>。要求时间复杂度为 O(log n)。</p>' +
    example('nums = [-4,0,2,8,13], target = 8', '3', '数组从下标 0 开始，8 位于下标 3；若 target 改为 7，则返回 -1。') +
    limits('1 ≤ nums.length ≤ 10000；元素互不相同并已升序排列；-9999 ≤ nums[i] ≤ 9999。'),
    solution('int search(int[] nums, int target)')),

  problem(876, 'middle-of-the-linked-list', '链表的中间结点', 'Middle of the Linked List', 'easy', ['链表', '双指针'],
    '<p>给定非空单链表的头节点 <code>head</code>，返回中间节点本身，而不是节点值。长度为偶数时，选择中间两个节点中靠后的那个。</p>' +
    example('head = [2,4,6,8]', '[6,8]', '返回值为 6 的节点；输出数组表示从该节点开始的剩余链表。') +
    limits('链表含 1 至 100 个节点；1 ≤ Node.val ≤ 100。'),
    solution('ListNode middleNode(ListNode head)', listNode)),

  problem(1046, 'last-stone-weight', '最后一块石头的重量', 'Last Stone Weight', 'easy', ['数组', '堆'],
    '<p>数组 <code>stones</code> 记录石头重量。每轮必须取当前最重的两块：重量相同则都消失；否则较轻的一块消失，较重的一块变为两者的重量差。重复直到不足两块，返回剩余重量，没有石头时返回 0。</p>' +
    example('stones = [9,3,2]', '4', '9 与 3 碰撞留下 6；6 再与 2 碰撞留下 4。') +
    limits('1 ≤ stones.length ≤ 30；1 ≤ stones[i] ≤ 1000。'),
    solution('int lastStoneWeight(int[] stones)')),

  problem(703, 'kth-largest-element-in-a-stream', '数据流中的第 K 大元素', 'Kth Largest Element in a Stream', 'easy', ['堆', '设计', '数据流'],
    '<p>实现 <code>KthLargest</code>，持续维护一个整数流的第 k 大元素。重复值分别占据排序名次，不要去重。</p><ul><li><code>KthLargest(int k, int[] nums)</code>：用已有数据初始化。</li><li><code>int add(int val)</code>：加入 val 后，返回整个数据流中第 k 大的值。</li></ul>' +
    example('操作 = ["KthLargest","add","add","add"]\n参数 = [[2,[3,8]],[5],[10],[4]]', '[null,5,8,8]', '加入 5 后第二大是 5；加入 10 后第二大变成 8；再加入 4 不改变第二大。') +
    limits('0 ≤ nums.length ≤ 10000；1 ≤ k ≤ nums.length + 1；元素和 val 在 [-10000,10000] 内；add 最多调用 10000 次，首次调用后元素数量足以确定第 k 大。'),
    `class KthLargest {
    public KthLargest(int k, int[] nums) {
        // TODO: 初始化
    }

    public int add(int val) {
        throw new UnsupportedOperationException("TODO");
    }
}
`),

  problem(378, 'kth-smallest-element-in-a-sorted-matrix', '有序矩阵中第 K 小的元素', 'Kth Smallest Element in a Sorted Matrix', 'medium', ['数组', '堆', '二分查找', '矩阵'],
    '<p>给定 n × n 的整数矩阵 <code>matrix</code>，每一行、每一列都按非递减顺序排列。将全部元素按从小到大计数，返回第 k 个值；相同的值要重复计数。额外空间必须优于 O(n²)。</p>' +
    example('matrix = [[1,3],[2,3]], k = 3', '3', '全部元素排序后为 [1,2,3,3]，第三个值是 3。') +
    limits('1 ≤ n ≤ 300；-10⁹ ≤ matrix[i][j] ≤ 10⁹；1 ≤ k ≤ n²。'),
    solution('int kthSmallest(int[][] matrix, int k)')),

  problem(921, 'minimum-add-to-make-parentheses-valid', '使括号有效的最少添加', 'Minimum Add to Make Parentheses Valid', 'medium', ['栈', '字符串', '贪心'],
    '<p>字符串 <code>s</code> 只含圆括号。一次操作允许在任意位置插入一个左括号或右括号。返回使整串括号正确配对、嵌套的最少插入次数；不能删除或交换原有字符。</p>' +
    example('s = ")("', '2', '开头的右括号前补一个左括号，末尾的左括号后补一个右括号，可得到 ()()。') +
    limits('1 ≤ s.length ≤ 1000；s 只包含 ( 和 )。'),
    solution('int minAddToMakeValid(String s)')),

  problem(232, 'implement-queue-using-stacks', '用栈实现队列', 'Implement Queue using Stacks', 'easy', ['栈', '队列', '设计'],
    '<p>只用两个栈模拟先进先出的队列。只能使用栈的入栈、出栈、查看栈顶、查询大小和判空操作。</p><ul><li><code>MyQueue()</code>：初始化空队列。</li><li><code>void push(int x)</code>：把 x 加到队尾。</li><li><code>int pop()</code>：移除并返回队首元素。</li><li><code>int peek()</code>：返回队首元素但不移除。</li><li><code>boolean empty()</code>：判断队列是否为空。</li></ul><p>进阶：使每次操作的均摊时间复杂度为 O(1)，不是要求所有单次操作都为 O(1)。</p>' +
    example('操作 = ["MyQueue","push","push","peek","pop","empty","pop","empty"]\n参数 = [[],[4],[7],[],[],[],[],[]]', '[null,null,null,4,4,false,7,true]', '4 比 7 先入队，因此先出队；两次 pop 后队列为空。') +
    limits('1 ≤ x ≤ 9；最多 100 次操作；pop 和 peek 只在非空队列上调用。'),
    `class MyQueue {
    public MyQueue() {
        // TODO: 初始化
    }

    public void push(int x) {
        // TODO: 实现入队
    }

    public int pop() {
        throw new UnsupportedOperationException("TODO");
    }

    public int peek() {
        throw new UnsupportedOperationException("TODO");
    }

    public boolean empty() {
        throw new UnsupportedOperationException("TODO");
    }
}
`),

  problem(225, 'implement-stack-using-queues', '用队列实现栈', 'Implement Stack using Queues', 'easy', ['栈', '队列', '设计'],
    '<p>使用两个队列模拟后进先出的栈。只能从队尾入队、从队首出队或查看队首，并查询大小、判空，不能直接操作队尾元素。</p><ul><li><code>MyStack()</code>：初始化空栈。</li><li><code>void push(int x)</code>：将 x 压入栈顶。</li><li><code>int pop()</code>：移除并返回栈顶。</li><li><code>int top()</code>：查看栈顶但不移除。</li><li><code>boolean empty()</code>：判断栈是否为空。</li></ul><p>进阶：只用一个队列实现。</p>' +
    example('操作 = ["MyStack","push","push","top","pop","empty","pop","empty"]\n参数 = [[],[4],[7],[],[],[],[],[]]', '[null,null,null,7,7,false,4,true]', '7 后入栈、先出栈；随后弹出 4，栈变空。') +
    limits('1 ≤ x ≤ 9；最多 100 次操作；pop 和 top 只在非空栈上调用。'),
    `class MyStack {
    public MyStack() {
        // TODO: 初始化
    }

    public void push(int x) {
        // TODO: 实现入栈
    }

    public int pop() {
        throw new UnsupportedOperationException("TODO");
    }

    public int top() {
        throw new UnsupportedOperationException("TODO");
    }

    public boolean empty() {
        throw new UnsupportedOperationException("TODO");
    }
}
`),

  problem(1381, 'design-a-stack-with-increment-operation', '设计一个支持增量操作的栈', 'Design a Stack With Increment Operation', 'medium', ['栈', '数组', '设计'],
    '<p>实现一个有容量上限、可以批量增加底部元素的栈。</p><ul><li><code>CustomStack(int maxSize)</code>：设置最大容量。</li><li><code>void push(int x)</code>：未满时入栈，已满则忽略。</li><li><code>int pop()</code>：弹出栈顶并返回其当前值；空栈返回 -1。</li><li><code>void increment(int k, int val)</code>：把栈底开始的前 k 个元素都增加 val；不足 k 个时增加所有元素。</li></ul>' +
    example('操作 = ["CustomStack","push","push","push","increment","pop","pop","pop"]\n参数 = [[2],[4],[7],[9],[1,3],[],[],[]]', '[null,null,null,null,null,7,7,-1]', '容量为 2，push(9) 被忽略；仅底部的 4 加 3 变为 7，因此连续两次弹出都是 7。') +
    limits('1 ≤ maxSize,x,k ≤ 1000；0 ≤ val ≤ 100；push、pop、increment 各最多调用 1000 次。'),
    `class CustomStack {
    public CustomStack(int maxSize) {
        // TODO: 初始化
    }

    public void push(int x) {
        // TODO: 实现入栈
    }

    public int pop() {
        throw new UnsupportedOperationException("TODO");
    }

    public void increment(int k, int val) {
        // TODO: 实现增量操作
    }
}
`),

  problem(227, 'basic-calculator-ii', '基本计算器 II', 'Basic Calculator II', 'medium', ['栈', '字符串', '数学'],
    '<p>计算字符串 <code>s</code> 表示的有效表达式。表达式由非负整数、空格和 +、-、*、/ 组成，不含括号。遵守先乘除后加减、同级从左到右的规则；整数除法向零截断。不得使用 eval 等直接求值函数。</p>' +
    example('s = "14 - 3 * 2 + 5 / 2"', '10', '3×2 得到 6，5/2 截断为 2，最终 14-6+2=10。') +
    limits('1 ≤ s.length ≤ 300000；输入总是有效的；数值字面量在 [0,2³¹-1] 内，所有中间结果和答案均可由 32 位有符号整数表示。'),
    solution('int calculate(String s)')),

  problem(1047, 'remove-all-adjacent-duplicates-in-string', '删除字符串中的所有相邻重复项', 'Remove All Adjacent Duplicates In String', 'easy', ['栈', '字符串'],
    '<p>对小写字母字符串 <code>s</code>，每次可以删除一对相邻且相同的字符。删除后新相邻的字符也可以继续消除。返回无法再消除时的字符串，题目保证最终结果唯一。</p>' +
    example('s = "abccbaq"', '"q"', '依次删除 cc、bb、aa，最后只剩 q。') +
    limits('1 ≤ s.length ≤ 100000；s 仅含小写英文字母。'),
    solution('String removeDuplicates(String s)')),

  problem(735, 'asteroid-collision', '小行星碰撞', 'Asteroid Collision', 'medium', ['栈', '数组', '模拟'],
    '<p>数组 <code>asteroids</code> 按从左到右的位置给出小行星。绝对值是大小，正数向右、负数向左，所有小行星速度相同。发生碰撞时较小者消失，大小相等则都消失；幸存者继续运动。返回全部碰撞结束后的序列，保持相对顺序。</p>' +
    example('asteroids = [4,6,-8,3]', '[-8,3]', '-8 依次击碎左侧的 6 和 4；它向左、3 向右，两者远离，不会相撞。') +
    limits('2 ≤ asteroids.length ≤ 10000；-1000 ≤ asteroids[i] ≤ 1000，且元素不为 0。'),
    solution('int[] asteroidCollision(int[] asteroids)')),

  problem(496, 'next-greater-element-i', '下一个更大元素 I', 'Next Greater Element I', 'easy', ['栈', '数组', '哈希表', '单调栈'],
    '<p><code>nums1</code> 是 <code>nums2</code> 的子集，两数组内部均无重复值。对 nums1 中的每个值，先定位它在 nums2 中的位置，再找其右边第一个严格更大的值；没有则记为 -1。答案顺序与 nums1 一致。</p>' +
    example('nums1 = [2,5], nums2 = [2,4,5,3]', '[4,-1]', '2 右边第一个更大的值是 4，而不是 5；5 的右边没有更大的值。') +
    limits('1 ≤ nums1.length ≤ nums2.length ≤ 1000；数值在 [0,10000] 内。进阶：总时间 O(nums1.length + nums2.length)。'),
    solution('int[] nextGreaterElement(int[] nums1, int[] nums2)')),

  problem(503, 'next-greater-element-ii', '下一个更大元素 II', 'Next Greater Element II', 'medium', ['栈', '数组', '单调栈'],
    '<p>把数组 <code>nums</code> 看成首尾相接的环。对每个位置，沿原顺序向后查找，必要时从末尾回到开头，返回遇到的第一个严格更大的值；绕一圈仍不存在则返回 -1。</p>' +
    example('nums = [3,1,2]', '[-1,2,3]', '3 没有更大元素；1 后面遇到 2；2 需要绕回开头才能遇到 3。') +
    limits('1 ≤ nums.length ≤ 10000；-10⁹ ≤ nums[i] ≤ 10⁹；重复值不属于“严格更大”。'),
    solution('int[] nextGreaterElements(int[] nums)')),

  problem(933, 'number-of-recent-calls', '最近的请求次数', 'Number of Recent Calls', 'easy', ['队列', '设计', '数据流'],
    '<p>实现 <code>RecentCounter</code>，统计最近 3000 毫秒内的请求。</p><ul><li><code>RecentCounter()</code>：初始化，无历史请求。</li><li><code>int ping(int t)</code>：记录时刻 t 的新请求，再返回闭区间 [t-3000,t] 内的请求数，包括当前请求和恰好发生在 t-3000 的请求。</li></ul><p>每次调用传入的 t 严格递增。</p>' +
    example('操作 = ["RecentCounter","ping","ping","ping","ping"]\n参数 = [[],[100],[200],[3100],[3101]]', '[null,1,2,3,3]', '在 3100 时，时刻 100 仍位于窗口左端点；到 3101 时，100 被排除，但 200、3100、3101 都计入。') +
    limits('1 ≤ t ≤ 10⁹；ping 最多调用 10000 次。'),
    `class RecentCounter {
    public RecentCounter() {
        // TODO: 初始化
    }

    public int ping(int t) {
        throw new UnsupportedOperationException("TODO");
    }
}
`),

  problem(622, 'design-circular-queue', '设计循环队列', 'Design Circular Queue', 'medium', ['队列', '数组', '设计'],
    '<p>自行实现容量固定的循环队列，出队释放的空间可以再次使用；不能直接用内置队列库完成本题。</p><ul><li><code>MyCircularQueue(int k)</code>：创建容量为 k 的空队列。</li><li><code>boolean enQueue(int value)</code>：队尾插入；满时返回 false，否则返回 true。</li><li><code>boolean deQueue()</code>：删除队首；空时返回 false，否则返回 true。</li><li><code>int Front()</code>、<code>int Rear()</code>：读取队首、队尾，空时均返回 -1。</li><li><code>boolean isEmpty()</code>、<code>boolean isFull()</code>：判断是否为空、是否已满。</li></ul>' +
    example('操作 = ["MyCircularQueue","enQueue","enQueue","enQueue","Front","Rear","isFull","deQueue","enQueue","Front","Rear","isEmpty"]\n参数 = [[2],[4],[7],[9],[],[],[],[],[9],[],[],[]]', '[null,true,true,false,4,7,true,true,true,7,9,false]', '先装入 4、7 后队列已满；移除 4 后可插入 9，此时队首为 7、队尾为 9。') +
    limits('1 ≤ k ≤ 1000；0 ≤ value ≤ 1000；最多 1000 次操作。'),
    `class MyCircularQueue {
    public MyCircularQueue(int k) {
        // TODO: 初始化
    }

    public boolean enQueue(int value) {
        throw new UnsupportedOperationException("TODO");
    }

    public boolean deQueue() {
        throw new UnsupportedOperationException("TODO");
    }

    public int Front() {
        throw new UnsupportedOperationException("TODO");
    }

    public int Rear() {
        throw new UnsupportedOperationException("TODO");
    }

    public boolean isEmpty() {
        throw new UnsupportedOperationException("TODO");
    }

    public boolean isFull() {
        throw new UnsupportedOperationException("TODO");
    }
}
`),

  problem(641, 'design-circular-deque', '设计循环双端队列', 'Design Circular Deque', 'medium', ['队列', '数组', '设计'],
    '<p>实现固定容量的循环双端队列，允许在两端插入和删除。</p><ul><li><code>MyCircularDeque(int k)</code>：初始化容量为 k 的空双端队列。</li><li><code>boolean insertFront(int value)</code>、<code>boolean insertLast(int value)</code>：分别在队首、队尾插入；满时返回 false，成功返回 true。</li><li><code>boolean deleteFront()</code>、<code>boolean deleteLast()</code>：分别删除队首、队尾；空时返回 false，成功返回 true。</li><li><code>int getFront()</code>、<code>int getRear()</code>：读取两端元素；空时返回 -1。</li><li><code>boolean isEmpty()</code>、<code>boolean isFull()</code>：判断空、满。</li></ul>' +
    example('操作 = ["MyCircularDeque","insertLast","insertFront","insertLast","getFront","getRear","isFull","deleteLast","insertLast","deleteFront","getFront","isEmpty"]\n参数 = [[2],[4],[7],[9],[],[],[],[],[9],[],[],[]]', '[null,true,true,false,7,4,true,true,true,true,9,false]', '队列先变为 [7,4]；删除尾部 4，再插入 9 得到 [7,9]；删除头部后只剩 9。') +
    limits('1 ≤ k ≤ 1000；0 ≤ value ≤ 1000；上述方法合计最多调用 2000 次。'),
    `class MyCircularDeque {
    public MyCircularDeque(int k) {
        // TODO: 初始化
    }

    public boolean insertFront(int value) {
        throw new UnsupportedOperationException("TODO");
    }

    public boolean insertLast(int value) {
        throw new UnsupportedOperationException("TODO");
    }

    public boolean deleteFront() {
        throw new UnsupportedOperationException("TODO");
    }

    public boolean deleteLast() {
        throw new UnsupportedOperationException("TODO");
    }

    public int getFront() {
        throw new UnsupportedOperationException("TODO");
    }

    public int getRear() {
        throw new UnsupportedOperationException("TODO");
    }

    public boolean isEmpty() {
        throw new UnsupportedOperationException("TODO");
    }

    public boolean isFull() {
        throw new UnsupportedOperationException("TODO");
    }
}
`),

  problem(144, 'binary-tree-preorder-traversal', '二叉树的前序遍历', 'Binary Tree Preorder Traversal', 'easy', ['栈', '树', '深度优先搜索', '二叉树'],
    '<p>给定二叉树根节点 <code>root</code>，返回前序遍历的节点值列表：先访问当前节点，再遍历左子树，最后遍历右子树。空树返回空列表。完成递归版本后，再尝试迭代版本。</p>' +
    example('root = [5,2,8,null,3]', '[5,2,3,8]', '输入为层序表示，null 表示缺失节点；3 是 2 的右孩子。前序依次访问根 5、左子树 2 与 3、右子树 8。') +
    limits('节点数量在 [0,100] 内；-100 ≤ Node.val ≤ 100。'),
    solution('List<Integer> preorderTraversal(TreeNode root)', treeNode, 'import java.util.*;\n\n')),

  problem(145, 'binary-tree-postorder-traversal', '二叉树的后序遍历', 'Binary Tree Postorder Traversal', 'easy', ['栈', '树', '深度优先搜索', '二叉树'],
    '<p>给定二叉树根节点 <code>root</code>，返回后序遍历的节点值列表：先遍历左子树，再遍历右子树，最后访问当前节点。空树返回空列表。完成递归版本后，再尝试迭代版本。</p>' +
    example('root = [5,2,8,null,3]', '[3,2,8,5]', '输入为层序表示，null 表示缺失节点；先完成左子树中的 3、2，再访问右子树 8，最后访问根 5。') +
    limits('节点数量在 [0,100] 内；-100 ≤ Node.val ≤ 100。'),
    solution('List<Integer> postorderTraversal(TreeNode root)', treeNode, 'import java.util.*;\n\n')),

  problem(110, 'balanced-binary-tree', '平衡二叉树', 'Balanced Binary Tree', 'easy', ['树', '深度优先搜索', '二叉树'],
    '<p>判断二叉树是否高度平衡：对树中的每一个节点，其左右子树高度之差的绝对值都不能超过 1。只检查根节点是不够的；空树视为平衡。</p>' +
    example('root = [1,2,null,3]', 'false', '输入为层序表示；根的左侧是一条长度为 2 的链，右子树为空，两边高度差为 2。') +
    limits('节点数量在 [0,5000] 内；-10000 ≤ Node.val ≤ 10000。'),
    solution('boolean isBalanced(TreeNode root)', treeNode)),
];
