// Original teaching outline. Each problem has one primary home; cross-topic methods are noted.
export const chapters = [
  {
    name: '数组', core: '先判断问题是在处理位置、连续区间、前缀关系，还是有序性，再选择指针或辅助结构。',
    stages: ['基础扫描：66 → A01 → 1 → 26 → 27 → 283 → 88 → 2149', '指针与窗口：167 → 15 → 11 → 3 → 209', '综合进阶：560 → 53 → 56 → 704 → 33 → 215'],
    questions: [
      [66, 'array-carry', '从最低位向前加一：遇到非 9 加一即返回；连续的 9 置零，全为 9 时新建多一位的数组。不要先转成整数，以免溢出。'],
      ['A01', 'array-frequency', '先统计整个数组中每个值的出现次数，再按原数组顺序寻找次数为 1 的第一个下标；不是找数值最小者，也不是只判断相邻元素。'],
      [1, 'array-hash', '先查询 target - nums[i]，再记录当前下标，避免同一元素用两次。'],
      [26, 'array-compact', '有序数组中只把与上一个保留值不同的元素写入前缀；返回前缀长度。'],
      [27, 'array-compact', '读指针遍历所有元素，写指针只接收不等于 val 的元素。'],
      [283, 'array-compact', '先稳定写入非零元素，再把后面的槽位填零；不可打乱非零元素的相对顺序。'],
      [88, 'array-opposite', '利用 nums1 尾部空位，从两个有效尾部向后合并，避免覆盖未读取元素。'],
      [2149, 'array-alternate', '题目保证正负各半且没有 0；正数依次写入偶数下标，负数依次写入奇数下标，保留各自原有顺序。允许使用新数组。'],
      [167, 'array-opposite', '数组有序：和偏小移动左指针，偏大移动右指针；返回下标从 1 开始。'],
      [15, 'array-opposite', '先排序，再固定一个数并对剩余区间做双指针；固定值、左右指针都要跳过重复值。'],
      [11, 'array-opposite', '面积由较短边和宽度决定；移动短边才可能提高水位。它不要求数组有序。'],
      [3, 'array-window', '遇到重复字符时持续移出左端，直到窗口无重复；不是把左指针无条件重置为右指针。'],
      [209, 'array-window', '本题元素为正数，扩大窗口不会使和变小。达到 target 后尽量收缩，并记录最短长度。'],
      [560, 'array-prefix', '统计之前出现过多少次 prefix - k；允许负数，不能照搬正数滑动窗口。'],
      [53, 'array-dp', '状态是“必须以当前位置结尾”的最大和；全为负数时也必须选一个元素，不能初始化答案为 0。'],
      [56, 'array-interval', '按左端点排序后只与最后一个已合并区间比较；端点相等也算重叠。'],
      [704, 'array-binary', '统一使用一种区间约定；闭区间写 left <= right，找不到返回 -1。'],
      [33, 'array-binary', '每次先判断哪一半有序，再判断 target 是否落在该半区；不能直接套普通二分的大小比较。'],
      [215, 'heap-topk', '第 k 大按出现次数排名，不能去重。维护 k 个最大值的小顶堆是 O(n log k) 基础方案；若严格满足本题 O(n) 要求，应进一步学习选择算法，不能把堆解称作线性解。'],
    ],
  },
  {
    name: '哈希表', core: '先明确键和值分别代表什么：只判断存在用 Set，需要次数、下标或映射关系用 Map；哈希查询快，但不保证原始顺序。',
    stages: ['存在与计数：217 → 349 → 350 → 242 → 383 → 202', '映射与分组：205 → 290 → 49', '关系与设计：219 → 128 → 454 → 380 → 146', '跨章节复习：数组 1（两数之和）、A01（首个唯一值）、560（前缀和计数），堆 347（高频元素）'],
    questions: [
      [217, 'hash-set', '集合的 add 返回 false 表示此前已存在；本题只需判断，不必保存次数或先排序。'],
      [349, 'hash-set', '先把一个数组放入集合，再遍历另一个数组；用结果集合去重，或命中后从原集合删除。同一交集值只输出一次。'],
      [350, 'hash-count', '统计一个数组的频次，扫描另一个数组时仅在剩余次数大于 0 时输出，并扣减一次；每个值输出次数为两边频次的较小者。'],
      [242, 'hash-count', '只含小写英文字母时可用长度 26 的计数数组替代 Map；两串长度不同先失败，计数最终应完全抵消。'],
      [383, 'hash-count', 'magazine 是可消耗的字符库存，ransomNote 每使用一次就扣减；库存可有剩余，不能要求两个字符串频次完全相等。'],
      [202, 'hash-set', '记录每轮各位平方和状态；到达 1 成功，重复状态说明进入非 1 循环。当前数必须按十进制拆位，不能只检查原始输入是否重复。'],
      [205, 'hash-bijection', '两个方向都必须唯一：同一个源字符只能映射到一个目标，两个不同源字符也不能映射到同一目标。映射自己允许。'],
      [290, 'hash-bijection', '把 pattern 的字符与分词后的完整单词建立双向映射；先检查字符数与单词数相等，不要按 s 的单个字符比较。'],
      [49, 'hash-signature', '把排序后的字符序列作为分组键；同组原字符串和重复字符串都要保留，空字符串也应进入对应组。'],
      [128, 'hash-streak', '先去重，只从不存在前驱的数开始向后扩展；不排序，也不要对每个数都重复扫描整段。边界相减、递增需考虑整数溢出。'],
      [454, 'hash-pairs', '把前两组的两数和映射到出现次数，后两组查询相反数并累加；统计的是下标四元组，重复值贡献不能去掉。'],
      [219, 'hash-nearby', '表中记录每个值最近出现的下标；遇到相同值时检查当前下标差不超过 k，再更新最近位置。k=0 时不可能选择两个不同下标。'],
      [380, 'hash-random', '数组提供等概率随机下标，Map 定位元素；删除时把最后一个元素移到待删除位置，并同步更新其下标，避免中间删除导致 O(n) 移动。'],
      [146, 'hash-lru', 'Map 负责按键定位，双向链表维护访问顺序；get 命中和更新已有键都算使用，超容量时淘汰最久未使用节点。模板用访问顺序的 LinkedHashMap 演示，面试可能要求手写链表。'],
    ],
  },
  {
    name: '链表', core: '链表主要考察连接关系：改指针前先保存下一节点，涉及头节点变化时先考虑哑节点。',
    stages: ['基础操作：206 → 21 → 19 → 876', '指针关系：141 → 142 → 160 → 234', '组合操作：2 → 24 → 25 → 138'],
    questions: [
      [206, 'list-reverse', '每次修改 cur.next 前保存 next；循环结束后 prev 才是新头。'],
      [21, 'list-dummy', '用 dummy 和 tail 接出新链，最后一次性接上未用完的链表。'],
      [141, 'list-fastslow', '比较节点引用而不是节点值；先检查 fast 和 fast.next，避免空指针。'],
      [142, 'list-fastslow', '先找到快慢指针相遇点，再让一个指针回到头部，两者同步走到环入口。'],
      [160, 'list-switch', '两个指针分别走 A+B、B+A；相交看对象身份，不是值相等，不相交时同时到 null。'],
      [19, 'list-dummy', '先让快指针领先 n 步，借助 dummy 找到待删除节点的前驱；删除头节点也能统一处理。'],
      [876, 'list-fastslow', '快指针每次两步，慢指针一步；偶数节点时该写法落在第二个中间节点。'],
      [234, 'list-reverse', '找中点，反转后半段并比较；面试时可主动说明比较后把链表恢复。'],
      [2, 'list-dummy', '循环条件包括进位 carry；两条链都结束后仍可能产生一个新节点。'],
      [24, 'list-reverse', '画清前驱、第一节点、第二节点和后继四个引用，再局部交换连接关系。'],
      [25, 'list-reverse', '先确认剩余节点够 k 个再反转；不足一组保持原样，记录每组前驱与新尾。'],
      [138, 'list-copy', '原节点到新节点建立映射后，再连接 next 和 random；不要把新链的 random 指回原节点。'],
    ],
  },
  {
    name: '堆', core: '堆让当前最优候选留在堆顶；先回答“堆里保留谁、堆顶代表谁”，再决定大小顶堆。',
    stages: ['堆操作与 Top K：1046 → 703 → 347（另见数组 215）', '多路归并：23 → 373 → 378', '双堆平衡：295'],
    questions: [
      [347, 'heap-topk', '先统计频次，再按频次维护候选。堆解为 O(n log k)，不是对所有 k 都严格优于 O(n log n)；进阶可用桶排序。'],
      [23, 'heap-merge', '堆中每条链只放当前头节点；弹出节点后仅加入该节点的后继。'],
      [295, 'heap-median', '左侧大顶堆，右侧小顶堆；保持左侧大小等于右侧或多 1，且左侧最大值不大于右侧最小值。'],
      [373, 'heap-merge', '每一行 nums1[i] + nums2[j] 都有序；初始化前 min(k, m) 行的 j=0，弹出后只推进该行。'],
      [1046, 'heap-max', '用大顶堆反复取出两个最大值；差为 0 不必放回。'],
      [703, 'heap-topk', '大小最多 k 的小顶堆持续保存最大的 k 个数；题目保证查询时已有至少 k 个元素。'],
      [378, 'heap-merge', '可把每一行视为一个有序流，累计弹出 k 次。重复值按元素出现次数计入排名；也可进一步学习值域二分。'],
    ],
  },
  {
    name: '栈', core: '很多栈题都可以理解为：当前元素暂时无法处理，先压栈；后面出现可处理它的元素时，再从栈顶弹出。不同题型仍需各自的不变量。',
    stages: ['普通栈基础：20 → 155 → 232 → 150', '嵌套与模拟：921 → 225 → 1381 → 1047 → 71 → 394 → 735', '表达式与进阶：227 → 224 → 32', '单调栈：496 → 739 → 503 → 84 → 42'],
    questions: [
      [20, 'stack-brackets', '右括号只与栈顶匹配；栈空或类型不匹配立即失败，结束时栈也必须为空。'],
      [32, 'stack-brackets', '最长长度不能只存括号字符。用下标栈，初始压入 -1，失配右括号更新边界，匹配后用 i - 栈顶计算长度。'],
      [921, 'stack-brackets', '只有一种括号时可用未匹配左括号计数；没有左括号可配对的右括号需要补一个左括号。'],
      [155, 'stack-design', '辅助最小栈记录每层对应的最小值；重复最小值弹出时不能丢失仍在栈中的最小值。'],
      [232, 'stack-design', '输入栈负责 push，输出栈负责 pop/peek；只在输出栈为空时搬运，单次可能 O(n)，均摊 O(1)。'],
      [225, 'stack-design', '用队列实现栈可在入队后把旧元素轮转到新元素后面，使新元素位于队首。'],
      [1381, 'stack-design', '维护容量限制；基础版增量操作 O(k)，进阶用延迟增量，在弹出时向下一层传递。并非一定需要两个栈。'],
      [150, 'stack-expression', '先弹出的是右操作数，后弹出的是左操作数；减法和除法不能交换，Java 整数除法向零截断。'],
      [224, 'stack-expression', '只有加减和括号，可用结果、符号和栈保存进入括号前的状态；处理一元负号，不能直接套逆波兰模板。'],
      [227, 'stack-expression', '扫描数字时聚合多位数；先处理乘除，保留加减项，最后求和。这里没有括号。'],
      [1047, 'stack-simulation', '字符串末尾就是栈顶，当前字符等于末尾时删除，否则追加；注意结果不是出栈顺序的倒序。'],
      [735, 'stack-simulation', '仅当栈顶向右（正数）且当前向左（负数）才碰撞；当前小行星可能连续撞碎多个栈顶。'],
      [71, 'stack-simulation', '按 / 分段，忽略空段与 .；.. 回到上级但不能越过根，... 等其他名字是普通目录。'],
      [394, 'stack-simulation', '遇到 [ 保存重复次数与外层字符串，遇到 ] 还原一层；次数可能是多位数，括号可嵌套。'],
      [496, 'stack-monotonic', '先为 nums2 求下一个更大值并建映射，再按 nums1 回答；本题数值互异，才可直接按值映射。'],
      [739, 'stack-monotonic', '栈中存下标，弹出时记录 i - previous；温度相同不是更暖，不弹出。'],
      [503, 'stack-monotonic', '用 i % n 扫描两遍，只有第一遍压入下标；扫描第二遍只处理循环后继，未找到保留 -1。'],
      [84, 'stack-monotonic', '改用单调递增栈；遇到更矮柱子确定被弹柱的右边界，宽度为 i - 新栈顶 - 1，末尾用哨兵触发结算。'],
      [42, 'stack-monotonic', '单调栈解中弹出的柱子是槽底；还需要左墙，水高为 min(左右墙) - 槽底，高乘宽才是本层水量。也可用双指针，别和容器面积混淆。'],
    ],
  },
  {
    name: '队列', core: '普通队列按到达顺序处理；BFS 按层推进；单调队列只保留仍可能成为窗口最优值的候选。',
    stages: ['队列接口与时间窗口：933 → 622 → 641', '单调队列：239', '网格广搜：994 → 200（另见二叉树 102）'],
    questions: [
      [239, 'queue-monotonic', '先移除离开窗口的下标，再从队尾删去不可能成为最大值的候选；队首始终是当前最大值下标。'],
      [933, 'queue-window', '时间严格递增，只需删去小于 t - 3000 的时间点；区间两端都包含。'],
      [622, 'queue-ring', '用 head 与 size 区分空、满，队尾插入下标是 (head + size) % capacity；取 Rear 前先判断非空。'],
      [641, 'queue-ring', '在循环队列上增加两端操作；向前移动用 (index - 1 + capacity) % capacity，避免 Java 负余数。'],
      [994, 'queue-bfs', '所有初始腐烂橘子同时入队，这是多源 BFS；按层记录分钟，最后仍有新鲜橘子则不可达。'],
      [200, 'queue-bfs', '每次从尚未访问的陆地发起 BFS，岛屿数加一；入队时就标记，避免同一格被反复加入。'],
    ],
  },
  {
    name: '二叉树', core: '先问“当前节点需要孩子返回什么”。按层统计用队列；需要子树结果时用递归返回值或后序遍历。',
    stages: ['遍历与深度：102 → 104 → 94 → 144 → 145', '结构与路径：226 → 101 → 110 → 543 → 199', '搜索树与综合：98 → 230 → 236 → 105 → 124'],
    questions: [
      [102, 'tree-bfs', '每层开始记录当前队列大小，恰好处理这一层的节点；空树直接返回空结果。'],
      [104, 'tree-postorder', '空树高度为 0；当前高度是左右高度较大值加 1，也可用层序遍历计层数。'],
      [226, 'tree-recursion', '交换左右孩子，再递归处理子树；空节点直接返回，必须清楚返回的是子树根。'],
      [101, 'tree-recursion', '比较两个节点时是镜像配对：左的左对右的右、左的右对右的左，而不是各自原样遍历。'],
      [94, 'tree-traversal', '中序是左、根、右；显式栈把递归调用路径保存下来。'],
      [144, 'tree-traversal', '前序是根、左、右；迭代时先压右孩子再压左孩子，出栈才是先左后右。'],
      [145, 'tree-traversal', '后序是左、右、根；可用“节点+访问状态”模拟调用栈，不能直接照搬中序模板。'],
      [543, 'tree-postorder', '返回给父节点的是高度，更新全局答案的是左右高度之和；直径按边数计，路径未必经过根。'],
      [110, 'tree-postorder', '返回高度时用 -1 表示已失衡，可提早终止；不要在每个节点重复递归求高度。'],
      [98, 'tree-bst', '合法范围来自所有祖先，不是只比较左右孩子；边界用 long，重复值不满足严格 BST 条件。'],
      [230, 'tree-bst', 'BST 中序递增，按访问顺序计数到 k；普通二叉树不具备这个性质。'],
      [236, 'tree-recursion', '当前节点等于 p 或 q 时返回它；左右子树分别找到目标时当前节点就是公共祖先。题目保证两节点存在。'],
      [105, 'tree-build', '前序第一个值确定根，中序根的位置确定左右子树规模；索引表避免反复线性查找。'],
      [124, 'tree-postorder', '返回父节点只能选择一条向下路径，全局答案可连接左右两条贡献；负贡献舍弃，全负树仍要选择一个节点。'],
      [199, 'tree-bfs', '按层从左到右遍历，记录每层最后一个节点；并不等于只沿右孩子一直向下。'],
    ],
  },
];

const p = (title, signals, idea, java, boundary) => ({ title, signals, idea, java, boundary });
export const patterns = {
  'hash-set': p('集合判重与存在性', ['是否出现过', '去重交集', '重复状态检测'], '只需要知道存在与否时，用 HashSet 记录已经见过的值或状态。重复状态可用于识别循环。', `boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int num : nums) {
        if (!seen.add(num)) return true;
    }
    return false;
}`, '在哈希分布合理时，n 次操作期望 O(n)，空间 O(n)。Set 不保证插入顺序；349 的结果必须去重，202 需要反复计算新状态，不能直接把数组判重代码作为答案。'),
  'hash-count': p('频次表与多重集合', ['字符数量匹配', '可消耗库存', '重复次数也要保留'], '把值映射到出现次数；匹配或使用一次就扣减一次。小而固定的字符集可以用数组充当频次表。', `boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] counts = new int[26];
    for (int i = 0; i < s.length(); i++) {
        counts[s.charAt(i) - 'a']++;
        counts[t.charAt(i) - 'a']--;
    }
    for (int count : counts) {
        if (count != 0) return false;
    }
    return true;
}`, '此字母模板只适用于 a-z，时间 O(n)，额外空间 O(26)。350 的整数频次用 Map，期望时间 O(m+n)、空间 O(min(m,n))（不含结果，统计较短数组）；383 只要求库存足够，不必相等。'),
  'hash-bijection': p('双向映射约束', ['一一对应', '同构', '字符与单词规律'], '同时维护正向和反向映射：既不能一对多，也不能多对一。', `boolean isIsomorphic(String s, String t) {
    if (s.length() != t.length()) return false;
    Map<Character, Character> forward = new HashMap<>();
    Map<Character, Character> backward = new HashMap<>();
    for (int i = 0; i < s.length(); i++) {
        char a = s.charAt(i), b = t.charAt(i);
        if (forward.containsKey(a) && forward.get(a) != b) return false;
        if (backward.containsKey(b) && backward.get(b) != a) return false;
        forward.put(a, b);
        backward.put(b, a);
    }
    return true;
}`, '对 205 的字符输入，时间期望 O(n)，空间 O(u)，u 为不同字符数。290 应换成 Character 与 String 的双向 Map，比较字符串内容用 equals，先验证单词数。这里只按 Java char 处理，不是通用 Unicode 码点算法。'),
  'hash-signature': p('规范化键分组', ['异位词分组', '不同表示归为一类', '按特征聚合'], '为等价对象计算相同且无歧义的键，再使用 Map<键, 列表> 聚合原对象。', `List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();
    for (String str : strs) {
        char[] letters = str.toCharArray();
        Arrays.sort(letters);
        String key = new String(letters);
        groups.computeIfAbsent(key, ignored -> new ArrayList<>()).add(str);
    }
    return new ArrayList<>(groups.values());
}`, 'n 个字符串、最大长度 L 时，排序键总时间 O(n L log(L+1))，键和结果引用空间 O(n(L+1))。也可用 26 维计数签名；拼接计数需分隔符，避免歧义。输出组顺序不保证，重复字符串不能去重。'),
  'hash-streak': p('集合中的连续段起点', ['无序数组', '最长连续而非连续子数组', '要求线性时间'], '集合用于常数期望时间查询，只让没有前驱的元素启动扩展，每个不同的数至多属于一段扩展。', `int longestConsecutive(int[] nums) {
    Set<Integer> values = new HashSet<>();
    for (int num : nums) values.add(num);
    int longest = 0;
    for (int start : values) {
        if (start != Integer.MIN_VALUE && values.contains(start - 1)) continue;
        int end = start, length = 1;
        while (end != Integer.MAX_VALUE && values.contains(end + 1)) {
            end++;
            length++;
        }
        longest = Math.max(longest, length);
    }
    return longest;
}`, '时间期望 O(n)，空间 O(n)。外层遍历去重后的集合而非原数组，否则重复起点可能反复扩展；空数组返回 0。完整 int 值域时要防止 MIN_VALUE-1 与 MAX_VALUE+1 溢出。'),
  'hash-pairs': p('分组求和与补数计数', ['四组数组', '四数和为零', '按下标组合计数'], '把四重枚举拆成两组二重枚举：先统计前半的和，再为后半查找互补和的频次。', `int fourSumCount(int[] a, int[] b, int[] c, int[] d) {
    Map<Integer, Integer> sums = new HashMap<>();
    for (int x : a) for (int y : b) {
        sums.put(x + y, sums.getOrDefault(x + y, 0) + 1);
    }
    int total = 0;
    for (int x : c) for (int y : d) {
        total += sums.getOrDefault(-(x + y), 0);
    }
    return total;
}`, '四组长度均为 n，时间期望 O(n²)，空间 O(n²)。454 的 n≤200、值范围 [-2^28,2^28] 使两数和及最多 n^4 个答案均能用 int；扩展输入范围时需对和、相反数和答案使用 long。重复值仍对应不同下标组合。'),
  'hash-nearby': p('最近位置与距离约束', ['重复元素下标差', '距离不超过 k', '维护最近一次出现'], '每个值只保存最近下标：它与当前下标的距离最小，若最近的都太远，更早的也不满足。', `boolean containsNearbyDuplicate(int[] nums, int k) {
    Map<Integer, Integer> latest = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        Integer previous = latest.put(nums[i], i);
        if (previous != null && i - previous <= k) return true;
    }
    return false;
}`, 'k≥0，时间期望 O(n)，空间 O(n)。最近下标可以每轮覆盖；若换成窗口 Set，必须同步移出窗口外的元素，才能把空间控制到 O(min(n,k))。'),
  'hash-random': p('哈希定位与动态数组', ['平均 O(1) 插入删除', '等概率随机取值', '集合无需有序'], 'Map 保存值到数组下标的映射；删除时与末尾交换，随机时均匀选择数组下标。', `class RandomSet {
    private final List<Integer> values = new ArrayList<>();
    private final Map<Integer, Integer> positions = new HashMap<>();
    private final Random random = new Random();
    boolean insert(int value) {
        if (positions.containsKey(value)) return false;
        positions.put(value, values.size());
        values.add(value);
        return true;
    }
    boolean remove(int value) {
        Integer index = positions.get(value);
        if (index == null) return false;
        int last = values.get(values.size() - 1);
        values.set(index, last);
        positions.put(last, index);
        values.remove(values.size() - 1);
        positions.remove(value);
        return true;
    }
    int getRandom() {
        return values.get(random.nextInt(values.size()));
    }
}`, '哈希操作平均 O(1)，ArrayList 扩容使插入为均摊 O(1)，总空间 O(n)。题目保证 getRandom 时非空；删除最后一项也必须正确更新映射。RandomSet 是教学类名，提交时使用 RandomizedSet 和 public 接口。'),
  'hash-lru': p('哈希表与访问顺序链表', ['LRU 缓存', '最近最少使用', '按键访问同时维护顺序'], '哈希表按键快速定位，双向链表把最近使用项移到一端，满容量淘汰另一端。Java LinkedHashMap 的访问顺序模式已实现这种组合。', `class Lru {
    private final int capacity;
    private final LinkedHashMap<Integer, Integer> cache = new LinkedHashMap<>(16, 0.75f, true);
    Lru(int capacity) {
        this.capacity = capacity;
    }
    int get(int key) {
        return cache.getOrDefault(key, -1);
    }
    void put(int key, int value) {
        cache.put(key, value);
        if (cache.size() > capacity) {
            int oldest = cache.keySet().iterator().next();
            cache.remove(oldest);
        }
    }
}`, '容量为正；哈希分布合理时 get/put 平均 O(1)，空间 O(capacity)。构造参数 true 表示访问顺序，默认插入顺序不等于 LRU。命中 get 和更新旧值都会刷新顺序；若要求手写，应改为 Map<键,节点> + 带哨兵的双向链表，不能用线性查找的 List.remove。'),
  'array-carry': p('逐位进位', ['数字以数组表示', '加一', '低位向高位进位'], '模拟竖式运算，从右向左处理进位；遇到无需继续进位的一位就结束。', `int[] plusOne(int[] digits) {
    for (int i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    int[] result = new int[digits.length + 1];
    result[0] = 1;
    return result;
}`, '最坏时间 O(n)；除返回结果外辅助空间 O(1)，全为 9 时新数组占 O(n)。输入非空，数字为 0 至 9；会修改原数组，不能把百位大整数装进 int 或 long。'),
  'array-frequency': p('频次统计与原序查找', ['第一个不重复的元素', '全局只出现一次', '返回原下标'], '第一遍统计全局频次，第二遍按原顺序找频次为 1 的值。先数清，再确定第一个。', `int firstUniqueIndex(int[] nums) {
    Map<Integer, Integer> counts = new HashMap<>();
    for (int num : nums) {
        counts.put(num, counts.getOrDefault(num, 0) + 1);
    }
    for (int i = 0; i < nums.length; i++) {
        if (counts.get(nums[i]) == 1) return i;
    }
    return -1;
}`, '在哈希操作期望 O(1) 下，总时间期望 O(n)，空间 O(n)。第二遍遍历原数组而非 HashMap；空数组或没有唯一值返回 -1。取元素前先检查索引不为 -1，合法元素本身也可能是 -1。'),
  'array-alternate': p('按类别稳定写入', ['正负交替', '保持同类相对顺序', '正数开头'], '为两类元素分别维护写入位置，正数写偶数位、负数写奇数位，各自每次前进两格。', `int[] rearrangeArray(int[] nums) {
    int[] result = new int[nums.length];
    int positive = 0, negative = 1;
    for (int num : nums) {
        if (num > 0) {
            result[positive] = num;
            positive += 2;
        } else {
            result[negative] = num;
            negative += 2;
        }
    }
    return result;
}`, '时间 O(n)，新数组空间 O(n)。仅适用于没有 0、正负数量相等且正数开头的契约；正负数量不等时不能直接套用。顺序扫描并分别追加保证稳定性，不需排序。'),
  'array-hash': p('哈希查找', ['寻找配对', '元素是否已经出现'], '用空间换查询时间，把“回头找”变成哈希查询。', `int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        Integer j = seen.get(target - nums[i]);
        if (j != null) return new int[] {j, i};
        seen.put(nums[i], i);
    }
    return new int[0];
}`, '哈希表操作按通常均摊 O(1) 分析，整体通常 O(n) 时间、O(n) 空间；不能排序后直接返回原数组下标。'),
  'array-compact': p('读写双指针', ['原地删除', '原地去重', '稳定保留元素'], '读指针检查元素，写指针指向下一个可用位置。', `int removeElement(int[] nums, int val) {
    int write = 0;
    for (int read = 0; read < nums.length; read++) {
        if (nums[read] != val) nums[write++] = nums[read];
    }
    return write;
}`, 'O(n) 时间、O(1) 额外空间。模板以删除指定值为例；去重的保留条件不同，移动零还要填充尾部。'),
  'array-opposite': p('相向指针与有序合并', ['有序数组两数和', '固定一个元素后找另两个', '从两端缩小区间'], '利用单调性，每一步排除一批不可能的候选。', `int[] twoSumSorted(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        long sum = (long) nums[left] + nums[right];
        if (sum == target) return new int[] {left + 1, right + 1};
        if (sum < target) left++;
        else right--;
    }
    return new int[0];
}`, '本模板要求有序数组，O(n) 时间、O(1) 空间。三数之和需外层循环与去重；合并数组用尾指针；容器题移动短边的理由不同，不能混套。'),
  'array-window': p('滑动窗口', ['连续子串或子数组', '窗口约束可随左右端点调整'], '右端纳入新元素，约束不满足时移动左端恢复合法性。', `int longestUnique(String s) {
    Set<Character> window = new HashSet<>();
    int left = 0, best = 0;
    for (int right = 0; right < s.length(); right++) {
        while (window.contains(s.charAt(right))) {
            window.remove(s.charAt(left++));
        }
        window.add(s.charAt(right));
        best = Math.max(best, right - left + 1);
    }
    return best;
}`, '两指针只向右，总计 O(n) 次移动；Set 空间最多为窗口不同字符数。这里按 Java char 处理，不是完整 Unicode 字素。正数最短和窗口与本例收缩条件不同；有负数时不能直接套。'),
  'array-prefix': p('前缀和与计数', ['连续区间的和等于 k', '有负数', '求区间数量'], '当前前缀为 sum，寻找之前有多少前缀等于 sum - k。', `long countSum(int[] nums, int k) {
    Map<Long, Integer> counts = new HashMap<>();
    counts.put(0L, 1);
    long sum = 0, answer = 0;
    for (int value : nums) {
        sum += value;
        answer += counts.getOrDefault(sum - k, 0);
        counts.merge(sum, 1, Integer::sum);
    }
    return answer;
}`, '通常 O(n) 时间、O(n) 空间。先查询后记录，防止把空区间算入；0 前缀出现一次代表从下标 0 开始的区间。'),
  'array-dp': p('以当前位置结尾的动态规划', ['最大连续子数组和', '旧结果是否值得继续保留'], '要么接上之前的连续区间，要么从当前元素重新开始。', `int maxSubArray(int[] nums) {
    int ending = nums[0], best = nums[0];
    for (int i = 1; i < nums.length; i++) {
        ending = Math.max(nums[i], ending + nums[i]);
        best = Math.max(best, ending);
    }
    return best;
}`, '要求数组非空；O(n) 时间、O(1) 空间。ending 必须包含当前元素，best 是所有已处理位置的最大值；数值可能溢出时改用 long。'),
  'array-interval': p('排序后合并区间', ['重叠区间', '合并时间段'], '按起点排序，新区间只需与已合并结果的最后一个比较。', `int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> result = new ArrayList<>();
    for (int[] interval : intervals) {
        if (result.isEmpty() || result.get(result.size() - 1)[1] < interval[0]) {
            result.add(interval.clone());
        } else {
            int[] last = result.get(result.size() - 1);
            last[1] = Math.max(last[1], interval[1]);
        }
    }
    return result.toArray(new int[0][]);
}`, '排序 O(n log n)，结果占 O(n) 空间；此例会改变输入数组的排列顺序。比较器不要用 a[0] - b[0]，避免整数溢出。'),
  'array-binary': p('二分搜索', ['有序数组', '一半候选可被排除'], '维护一个明确的候选区间，每次排除中点及一侧。', `int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`, '闭区间模板，O(log n) 时间、O(1) 空间。旋转数组需要额外判断有序半区；含重复值时还要处理无法判定的一侧。'),
  'list-reverse': p('反转与局部重连', ['反转链表', '交换相邻节点', '每 k 个一组'], '先保存未处理部分，再反向连接；局部反转时还要记住两侧边界。', `ListNode reverse(ListNode head) {
    ListNode prev = null, cur = head;
    while (cur != null) {
        ListNode next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
}`, 'O(n) 时间、O(1) 空间；假设无环。模板反转整条链，局部/K 组题需额外保存前驱和后继，不能直接把整条链反转。'),
  'list-dummy': p('哑节点与尾指针', ['删除头节点也要统一处理', '合并链表', '构造结果链'], '在真实头部前放一个 dummy，把修改头节点变成普通的 next 修改。', `ListNode mergeLists(ListNode a, ListNode b) {
    ListNode dummy = new ListNode(0), tail = dummy;
    while (a != null && b != null) {
        if (a.val <= b.val) { tail.next = a; a = a.next; }
        else { tail.next = b; b = b.next; }
        tail = tail.next;
    }
    tail.next = a != null ? a : b;
    return dummy.next;
}`, '合并两个有序且无共享节点的链表，O(m+n) 时间、O(1) 额外空间；会重用并改动输入节点。加法题要新建节点并处理进位。'),
  'list-fastslow': p('快慢指针', ['是否有环', '中间节点', '环入口'], '不同速度的指针携带位置关系；先证明停止或相遇条件。', `ListNode middle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`, '本模板只适用于无环链表的中点，O(n) 时间、O(1) 空间。判环应在每次移动后比较 fast == slow；有环时不能直接调用本中点模板。'),
  'list-switch': p('双链表路径对齐', ['两条链表相交', '长度不同但共享尾部'], '两个指针各走完两条链表，总路程相同，抵消长度差。', `ListNode intersection(ListNode headA, ListNode headB) {
    ListNode a = headA, b = headB;
    while (a != b) {
        a = a == null ? headB : a.next;
        b = b == null ? headA : b.next;
    }
    return a;
}`, '假设两条链表无环，O(m+n) 时间、O(1) 空间；比较引用，不修改链表。'),
  'list-copy': p('对象映射与深拷贝', ['节点带随机引用', '复制后不能共享原节点'], '先创建所有副本，再依据映射恢复引用关系。', `Node copyRandomList(Node head) {
    Map<Node, Node> copies = new IdentityHashMap<>();
    for (Node cur = head; cur != null; cur = cur.next) {
        copies.put(cur, new Node(cur.val));
    }
    for (Node cur = head; cur != null; cur = cur.next) {
        copies.get(cur).next = copies.get(cur.next);
        copies.get(cur).random = copies.get(cur.random);
    }
    return copies.get(head);
}`, 'O(n) 时间、O(n) 额外空间。这里 Node 具有 val、next、random 字段且 next 链无环；random 可以为 null 或指向链中任意节点。'),
  'heap-topk': p('Top K 与数据流', ['第 k 大', '保留最大的 k 个候选'], '小顶堆保留最大的 k 个数，堆顶是这些候选中最小的，即第 k 大。', `int kthLargest(int[] nums, int k) {
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    for (int value : nums) {
        heap.offer(value);
        if (heap.size() > k) heap.poll();
    }
    return heap.peek();
}`, '要求 1 <= k <= nums.length。O(n log k) 时间、O(k) 空间，是入门堆模板，不满足 215 严格 O(n) 的进阶要求。高频元素需按频次比较，而不是按值比较。'),
  'heap-max': p('反复取最大值', ['每轮处理当前最大的两个元素'], '大顶堆用反序比较器，把最大元素放在堆顶。', `int lastStoneWeight(int[] stones) {
    PriorityQueue<Integer> heap = new PriorityQueue<>(Comparator.reverseOrder());
    for (int stone : stones) heap.offer(stone);
    while (heap.size() > 1) {
        int a = heap.poll(), b = heap.poll();
        if (a != b) heap.offer(a - b);
    }
    return heap.isEmpty() ? 0 : heap.peek();
}`, 'O(n log n) 时间、O(n) 空间。不要用 b - a 编写比较器；PriorityQueue 的迭代顺序不是排序顺序。'),
  'heap-merge': p('多路有序归并', ['多个已排序序列', '每次取全局最小候选'], '每一路只放一个候选，弹出后只推进这一条路。', `ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> heap = new PriorityQueue<>(Comparator.comparingInt(n -> n.val));
    for (ListNode node : lists) if (node != null) heap.offer(node);
    ListNode dummy = new ListNode(0), tail = dummy;
    while (!heap.isEmpty()) {
        ListNode node = heap.poll();
        if (node.next != null) heap.offer(node.next);
        tail.next = node;
        tail = node;
    }
    return dummy.next;
}`, '总节点 N、路数 k：O(N log k) 时间、O(k) 额外空间；各链有序、无环且互不共享节点。二维数组场景需在堆里存行列坐标，和可能超 int 时用 long。'),
  'heap-median': p('双堆维护中位数', ['持续插入', '随时查询中位数'], '较小的一半放大顶堆，较大的一半放小顶堆，维护数量平衡与跨堆有序。', `class Median {
    PriorityQueue<Integer> left = new PriorityQueue<>(Comparator.reverseOrder());
    PriorityQueue<Integer> right = new PriorityQueue<>();
    void add(int value) {
        left.offer(value);
        right.offer(left.poll());
        if (right.size() > left.size()) left.offer(right.poll());
    }
    double median() {
        if (left.isEmpty()) throw new IllegalStateException("empty");
        if (left.size() > right.size()) return left.peek();
        return ((long) left.peek() + right.peek()) / 2.0;
    }
}`, '插入 O(log n)、查询 O(1)、总空间 O(n)。先转 long 再相加防溢出；查询前必须至少插入一个值。'),
  'stack-brackets': p('括号匹配与嵌套结构', ['括号是否合法', '最后打开的结构最先关闭'], '后出现的左括号必须先配对，因此只看栈顶。', `boolean valid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '[' || c == '{') stack.push(c);
        else {
            if (stack.isEmpty()) return false;
            char left = stack.pop();
            if ((c == ')' && left != '(') || (c == ']' && left != '[')
                    || (c == '}' && left != '{')) return false;
        }
    }
    return stack.isEmpty();
}`, '输入仅含六种括号，O(n) 时间、O(n) 空间。32 求最长长度需下标与失配边界，921 只有一种括号可用计数器，本布尔模板不能直接求长度或添加次数。'),
  'stack-design': p('自定义栈、栈与队列转换', ['特殊栈接口', 'O(1) 取最小值', '用一种结构模拟另一种'], '用额外状态维持操作语义；两栈只是常用手段，不是所有设计题的统一答案。', `class TwoStackQueue {
    Deque<Integer> input = new ArrayDeque<>(), output = new ArrayDeque<>();
    void push(int value) { input.push(value); }
    void move() {
        if (output.isEmpty()) while (!input.isEmpty()) output.push(input.pop());
    }
    int pop() { move(); return output.pop(); }
    int peek() { move(); return output.peek(); }
    boolean empty() { return input.isEmpty() && output.isEmpty(); }
}`, 'pop/peek 要求队列非空；均摊 O(1)，但搬运那次是 O(n)，空间 O(n)。最小栈需要同步维护最小值；增量栈可用延迟标记。ArrayDeque 不允许 null。'),
  'stack-expression': p('表达式计算', ['逆波兰表达式', '运算符优先级', '括号中的局部结果'], '操作数暂存，运算时按顺序取出；右操作数先弹，左操作数后弹。', `int evalRPN(String[] tokens) {
    Deque<Integer> stack = new ArrayDeque<>();
    for (String token : tokens) {
        if (!Set.of("+", "-", "*", "/").contains(token)) {
            stack.push(Integer.parseInt(token));
        } else {
            int right = stack.pop(), left = stack.pop();
            switch (token) {
                case "+": stack.push(left + right); break;
                case "-": stack.push(left - right); break;
                case "*": stack.push(left * right); break;
                case "/": stack.push(left / right); break;
            }
        }
    }
    return stack.pop();
}`, '假设合法逆波兰表达式且除数非零，O(n) 时间、O(n) 空间。Java 整数除法向零截断；224/227 是中缀表达式，需额外处理符号、数字聚合和优先级。'),
  'stack-simulation': p('字符串消除与模拟', ['相邻元素消除', '碰撞', '路径与嵌套解码'], '保存尚未处理的前缀，当前元素只与最近的待处理状态发生作用。', `String removeDuplicates(String s) {
    StringBuilder stack = new StringBuilder();
    for (char c : s.toCharArray()) {
        int n = stack.length();
        if (n > 0 && stack.charAt(n - 1) == c) stack.setLength(n - 1);
        else stack.append(c);
    }
    return stack.toString();
}`, '本相邻消除模板 O(n) 时间、O(n) 空间。例如 abbaca 依次抵消 bb、aa 后得 ca。碰撞可能连续弹栈，解码要保存次数和外层字符串，不能统一用一次 if 消除。'),
  'stack-monotonic': p('单调栈', ['右边第一个更大/更小', '最近的更大元素', '柱子可延伸多远'], '保持候选值单调，当前元素到来时结算被它首次解决的栈顶。', `int[] nextGreater(int[] nums) {
    int[] answer = new int[nums.length];
    Arrays.fill(answer, -1);
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < nums.length; i++) {
        while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
            int previous = stack.pop();
            answer[previous] = nums[i];
        }
        stack.push(i);
    }
    return answer;
}`, '每个下标最多进出一次，O(n) 时间、O(n) 空间。每日温度改写为距离 i - previous，未找到填 0。严格更大用 >；等高如何弹出取决于题义。84 与 42 的结算公式不同。'),
  'queue-window': p('按时间过期的普通队列', ['请求按时间到达', '统计最近一段时间'], '队尾加入新请求，队首移除已经过期的请求。', `class Recent {
    Deque<Integer> queue = new ArrayDeque<>();
    int ping(int t) {
        queue.offerLast(t);
        while (!queue.isEmpty() && queue.peekFirst() < t - 3000) queue.pollFirst();
        return queue.size();
    }
}`, '要求时间严格递增。每个请求入队出队各一次，均摊 O(1)，空间与窗口请求数有关；本题时间范围保证 t - 3000 不溢出。'),
  'queue-ring': p('循环队列与双端队列', ['固定容量', '头尾复用空间', '区分空和满'], '下标按容量取模，用 size 明确区分空队列和满队列。', `class RingQueue {
    int[] values;
    int head = 0, size = 0;
    RingQueue(int capacity) { values = new int[capacity]; }
    boolean offer(int value) {
        if (size == values.length) return false;
        values[(head + size) % values.length] = value;
        size++;
        return true;
    }
    boolean poll() {
        if (size == 0) return false;
        head = (head + 1) % values.length;
        size--;
        return true;
    }
}`, '要求容量 > 0；每次操作 O(1)，空间 O(capacity)。这是核心入队/出队模板，不是 622/641 全部接口；取队尾用 (head + size - 1) % capacity。'),
  'queue-monotonic': p('单调队列', ['滑动窗口最大值', '左端过期，右端加入'], '队列存下标，队首处理过期，队尾淘汰被新元素压过的候选。', `int[] maxSlidingWindow(int[] nums, int k) {
    Deque<Integer> deque = new ArrayDeque<>();
    int[] result = new int[nums.length - k + 1];
    for (int i = 0; i < nums.length; i++) {
        while (!deque.isEmpty() && deque.peekFirst() <= i - k) deque.pollFirst();
        while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) deque.pollLast();
        deque.offerLast(i);
        if (i >= k - 1) result[i - k + 1] = nums[deque.peekFirst()];
    }
    return result;
}`, '要求 1 <= k <= n；O(n) 时间、O(k) 空间。这里相等时保留较新的下标，因为它更晚过期；队列保存的不是完整窗口。'),
  'queue-bfs': p('网格 BFS 与多源扩散', ['最少扩散轮数', '四方向连通块', '多起点同时出发'], '先把起点入队并标记，再逐层扩展；入队时标记，避免重复。', `void flood(char[][] grid, int row, int col) {
    int rows = grid.length, cols = grid[0].length;
    Deque<int[]> queue = new ArrayDeque<>();
    queue.offerLast(new int[] {row, col});
    grid[row][col] = '0';
    int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    while (!queue.isEmpty()) {
        int[] cell = queue.pollFirst();
        for (int[] d : directions) {
            int r = cell[0] + d[0], c = cell[1] + d[1];
            if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] == '1') {
                grid[r][c] = '0';
                queue.offerLast(new int[] {r, c});
            }
        }
    }
}`, '这是 200 的单个岛屿淹没过程，起点需为合法陆地、网格非空，会修改输入；全图总时间与队列最坏空间均 O(mn)。994 需把所有初始腐烂点一并入队并按层计时。'),
  'tree-bfs': p('层序遍历', ['逐层处理', '右视图', '每层统计'], '每轮固定本层大小，下一层的新节点留到下一轮处理。', `List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Deque<TreeNode> queue = new ArrayDeque<>();
    queue.offerLast(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.pollFirst();
            level.add(node.val);
            if (node.left != null) queue.offerLast(node.left);
            if (node.right != null) queue.offerLast(node.right);
        }
        result.add(level);
    }
    return result;
}`, 'O(n) 时间，队列 O(w) 空间，w 为最大层宽，不含结果。不要把 null 放进 ArrayDeque；右视图只保留每层最后一个值。'),
  'tree-traversal': p('前中后序与显式栈', ['按访问顺序输出节点', '递归改迭代'], '栈模拟尚未返回的递归路径，访问时机决定遍历顺序。', `List<Integer> inorder(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode cur = root;
    while (cur != null || !stack.isEmpty()) {
        while (cur != null) { stack.push(cur); cur = cur.left; }
        cur = stack.pop();
        result.add(cur.val);
        cur = cur.right;
    }
    return result;
}`, '模板是中序，O(n) 时间、O(h) 栈空间，不含输出；前序在访问根时输出，后序要等左右子树处理完。退化链状树 h 可达 n。'),
  'tree-postorder': p('子树返回值与全局答案', ['高度', '直径', '是否平衡', '最大路径和'], '先定义子树返回给父节点什么，再定义当前节点如何更新最终答案。', `int height(TreeNode root) {
    if (root == null) return 0;
    int left = height(root.left);
    int right = height(root.right);
    return Math.max(left, right) + 1;
}`, '求高度 O(n) 时间、O(h) 调用栈空间。543 返回高度却更新直径；124 返回单支贡献却更新跨节点路径；深链可能导致递归栈溢出，可改显式栈。'),
  'tree-recursion': p('结构递归与祖先关系', ['交换左右子树', '镜像比较', '两个节点的公共祖先'], '写清空节点、命中目标等终止条件，再组合子树结果。', `TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
}`, '要求 p、q 都存在于树中，按引用比较；O(n) 时间、O(h) 空间。对称题递归参数应是两个节点，翻转题应修改左右连接，不能直接套本祖先模板。'),
  'tree-bst': p('BST 的范围与中序性质', ['二叉搜索树', '第 k 小', '合法性判断'], '每个节点必须满足祖先传下来的范围，而不只是和直接孩子比较。', `boolean validBST(TreeNode root) {
    return within(root, Long.MIN_VALUE, Long.MAX_VALUE);
}
boolean within(TreeNode node, long low, long high) {
    if (node == null) return true;
    if (node.val <= low || node.val >= high) return false;
    return within(node.left, low, node.val) && within(node.right, node.val, high);
}`, '严格 BST，不允许重复值；O(n) 时间、O(h) 栈空间。230 可利用中序升序计数，但不能把该性质用于普通二叉树。'),
  'tree-build': p('根据遍历序列重建', ['前序加中序', '根的位置决定左右规模'], '前序取根，中序定位，再根据左子树节点数切分两个序列。', `TreeNode build(int[] preorder, int preStart, int left, int right,
               Map<Integer, Integer> inorderIndex) {
    if (left > right) return null;
    int value = preorder[preStart], middle = inorderIndex.get(value);
    TreeNode root = new TreeNode(value);
    int leftSize = middle - left;
    root.left = build(preorder, preStart + 1, left, middle - 1, inorderIndex);
    root.right = build(preorder, preStart + leftSize + 1, middle + 1, right, inorderIndex);
    return root;
}`, '假设两序列合法且值互异；先为中序建立值到下标的表，再调用 build(preorder, 0, 0, n-1, map)。O(n) 时间，索引表 O(n) 加调用栈 O(h)，不含结果树。'),
};
