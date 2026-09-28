// Original teaching templates for the direct data-structure HOT 100 additions.
const p = (title, signals, idea, java, boundary) => ({ title, signals, idea, java, boundary });
export const hot100Patterns = {
  'array-rotation': p('数组轮转与区间反转', ['原地轮转', '末尾 k 项移到前面'], '先整体反转，再分别反转两段，恢复每段内部的顺序。', `void rotateArray(int[] nums, int k) {
    if (nums.length == 0) return;
    k %= nums.length;
    reverseArrayRange(nums, 0, nums.length - 1);
    reverseArrayRange(nums, 0, k - 1);
    reverseArrayRange(nums, k, nums.length - 1);
}
void reverseArrayRange(int[] nums, int left, int right) {
    while (left < right) {
        int value = nums[left]; nums[left++] = nums[right]; nums[right--] = value;
    }
}`, 'k 非负，时间 O(n)，额外空间 O(1)。必须先取模；k=0、k=n、单元素数组均应保持正确。'),
  'array-product': p('前后缀乘积', ['排除当前位置', '不能使用除法', '左右两部分贡献'], '答案先保存当前位置左边的乘积，再从右向左乘上右边的乘积。', `int[] productExceptSelf(int[] nums) {
    int[] result = new int[nums.length];
    int prefix = 1;
    for (int i = 0; i < nums.length; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    int suffix = 1;
    for (int i = nums.length - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
}`, '时间 O(n)，除结果数组外 O(1) 空间。乘积初始值为 1，天然支持 0 和负数；按本题保证使用 int，扩展输入范围时需重新评估溢出。'),
  'array-placement': p('原地索引归位', ['缺失最小正数', '线性时间', '常数额外空间'], '长度为 n 时答案在 1..n+1，把范围内的每个值 x 尽量放到下标 x-1。', `int firstMissingPositive(int[] nums) {
    int n = nums.length;
    for (int i = 0; i < n; i++) {
        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
            int target = nums[i] - 1;
            int value = nums[i]; nums[i] = nums[target]; nums[target] = value;
        }
    }
    for (int i = 0; i < n; i++) if (nums[i] != i + 1) return i + 1;
    return n + 1;
}`, '时间 O(n)，空间 O(1)，会修改输入。每次有效交换至少归位一个值；先判断范围，再访问 nums[x-1]。重复值必须停止交换。'),
  'array-lower-bound': p('二分左右边界', ['插入位置', '第一个或最后一个', '有序数组有重复'], '用左闭右开区间找单调判定的第一个成立位置；找等值区间时分别定位 >=target 与 >target。', `int boundIndex(int[] nums, int target, boolean upper) {
    int left = 0, right = nums.length;
    while (left < right) {
        int middle = left + (right - left) / 2;
        if (nums[middle] < target || (upper && nums[middle] == target)) left = middle + 1;
        else right = middle;
    }
    return left;
}
int[] searchRange(int[] nums, int target) {
    int first = boundIndex(nums, target, false);
    if (first == nums.length || nums[first] != target) return new int[]{-1, -1};
    return new int[]{first, boundIndex(nums, target, true) - 1};
}`, '每次二分 O(log n) 时间、O(1) 空间。35 返回 boundIndex(nums,target,false)；34 需要验证确实命中。空数组、全相同、目标越界都能统一处理，不使用 target+1。'),
  'array-median-partition': p('两个有序数组的分割线', ['两个有序序列的中位数', '要求对数时间'], '在短数组上二分切分位置，使左侧总数为总长的一半（奇数时多一个），并满足左边所有值不大于右边。', `double medianOfSortedArrays(int[] a, int[] b) {
    if (a.length > b.length) return medianOfSortedArrays(b, a);
    int m = a.length, n = b.length;
    if (m + n == 0) throw new IllegalArgumentException("empty input");
    int left = 0, right = m;
    while (left <= right) {
        int i = left + (right - left) / 2, j = (m + n + 1) / 2 - i;
        int aLeft = i == 0 ? Integer.MIN_VALUE : a[i - 1];
        int aRight = i == m ? Integer.MAX_VALUE : a[i];
        int bLeft = j == 0 ? Integer.MIN_VALUE : b[j - 1];
        int bRight = j == n ? Integer.MAX_VALUE : b[j];
        if (aLeft > bRight) right = i - 1;
        else if (bLeft > aRight) left = i + 1;
        else {
            if ((m + n) % 2 == 1) return Math.max(aLeft, bLeft);
            return ((long) Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2.0;
        }
    }
    throw new IllegalArgumentException("inputs must be sorted");
}`, '输入有序且合并后非空。时间 O(log(min(m,n)+1))，空间 O(1)；先确保 a 较短以保证 j 合法。偶数情况先转 long 再相加，避免 int 溢出；除以 2.0 保留小数。'),
  'array-xor': p('异或抵消', ['一个数出现一次', '其他数恰好出现两次', '常数空间'], '相同数异或为 0，0 与任意数异或仍为该数；把所有元素异或后只剩唯一值。', `int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) result ^= num;
    return result;
}`, '时间 O(n)，空间 O(1)。依赖“其余恰好两次”的保证；不能用于 A01 那种任意重复次数且要求第一个的题。'),
  'array-majority': p('摩尔投票', ['超过半数', '保证多数元素存在', '常数额外空间'], '不同元素两两抵消，真正超过半数的元素最终会成为候选。', `int majorityElement(int[] nums) {
    int candidate = 0, votes = 0;
    for (int num : nums) {
        if (votes == 0) candidate = num;
        votes += num == candidate ? 1 : -1;
    }
    return candidate;
}`, '时间 O(n)，空间 O(1)。题目保证非空且存在超过 n/2 的值；若没有这个保证，必须重新统计候选次数并判断是否有解。'),
  'array-three-way': p('三路划分', ['只有 0、1、2', '原地分类', '不能直接排序'], '维护左侧 0 区、右侧 2 区，中间扫描指针处理未知元素，遇到 2 与右侧未知值交换后继续检查当前位置。', `void sortColors(int[] nums) {
    int zero = 0, current = 0, two = nums.length - 1;
    while (current <= two) {
        if (nums[current] == 0) {
            int value = nums[zero]; nums[zero++] = 0; nums[current++] = value;
        } else if (nums[current] == 2) {
            int value = nums[two]; nums[two--] = 2; nums[current] = value;
        } else current++;
    }
}`, '时间 O(n)，空间 O(1)，原地修改。仅适用于 0/1/2 的输入；与 two 交换时不能同时 current++，因为换回来的值未检查。'),
  'array-next-permutation': p('字典序后继', ['下一个排列', '原地修改', '尽量小地增大'], '从右找到可以变大的位置，换成后缀中最小的更大值，再把后缀变成最小顺序。', `void nextPermutation(int[] nums) {
    int pivot = nums.length - 2;
    while (pivot >= 0 && nums[pivot] >= nums[pivot + 1]) pivot--;
    if (pivot >= 0) {
        int next = nums.length - 1;
        while (nums[next] <= nums[pivot]) next--;
        int value = nums[pivot]; nums[pivot] = nums[next]; nums[next] = value;
    }
    int left = pivot + 1, right = nums.length - 1;
    while (left < right) {
        int value = nums[left]; nums[left++] = nums[right]; nums[right--] = value;
    }
}`, '时间 O(n)，空间 O(1)。后缀已非递增，因此找交换值后只需反转；没有拐点时整体反转。相等值要跳过，处理重复元素。'),
  'array-index-cycle': p('数组映射成指针环', ['值域 1..n、长度 n+1', '找重复但不能修改数组', '常数空间'], '把数组看成 index→nums[index] 的指针结构，重复值对应环入口；先找相遇点，再同步走到入口。', `int findDuplicate(int[] nums) {
    int slow = 0, fast = 0;
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    int finder = 0;
    while (finder != slow) {
        finder = nums[finder];
        slow = nums[slow];
    }
    return finder;
}`, '时间 O(n)，空间 O(1)，不修改输入。依赖本题长度和值域约束，且只有一个数重复（可多于两次）；不能将此模板用于任意整数数组。'),
  'hash-fixed-window': p('定长窗口频次匹配', ['所有异位词起点', '窗口长度固定', '只看字符频次'], '维护与目标串等长的窗口，移入右端字符并移出过期左端字符，比较两组频次。', `List<Integer> findAnagrams(String s, String p) {
    List<Integer> result = new ArrayList<>();
    if (p.isEmpty() || s.length() < p.length()) return result;
    int[] target = new int[26], window = new int[26];
    for (char c : p.toCharArray()) target[c - 'a']++;
    for (int right = 0; right < s.length(); right++) {
        window[s.charAt(right) - 'a']++;
        if (right >= p.length()) window[s.charAt(right - p.length()) - 'a']--;
        if (right >= p.length() - 1 && Arrays.equals(target, window)) result.add(right - p.length() + 1);
    }
    return result;
}`, '本题只含 a-z。时间 O(26n+m)，固定字符集下为 O(n+m)；除输出外空间 O(26)。匹配结果允许重叠，s 比 p 短时无解。'),
  'hash-cover-window': p('最短覆盖窗口', ['覆盖全部需求字符', '含重复需求', '求最短子串'], '维护还缺多少个字符；右端扩张直到满足需求，再反复缩小左端并更新最短答案。', `String minWindow(String s, String t) {
    if (t.isEmpty()) return "";
    int[] need = new int[128];
    for (char c : t.toCharArray()) need[c]++;
    int missing = t.length(), left = 0, bestStart = 0, bestLength = Integer.MAX_VALUE;
    for (int right = 0; right < s.length(); right++) {
        if (need[s.charAt(right)]-- > 0) missing--;
        while (missing == 0) {
            if (right - left + 1 < bestLength) { bestStart = left; bestLength = right - left + 1; }
            if (++need[s.charAt(left++)] > 0) missing++;
        }
    }
    return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);
}`, '本题为大小写英文字母，区分大小写；128 项表不是通用 Unicode 方案。时间 O(n+m)，除结果外固定空间 O(128)。负频次表示窗口里有多余字符，移出多余字符不会使覆盖失效。'),
  'list-merge-sort': p('链表归并排序', ['链表排序', 'O(n log n)', '不能随机下标访问'], '快慢指针把链表断成两半，分别排序，再用双指针归并。', `ListNode sortList(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode slow = head, fast = head.next;
    while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }
    ListNode right = slow.next;
    slow.next = null;
    return mergeSortedParts(sortList(head), sortList(right));
}
ListNode mergeSortedParts(ListNode left, ListNode right) {
    ListNode dummy = new ListNode(0), tail = dummy;
    while (left != null && right != null) {
        if (left.val <= right.val) { tail.next = left; left = left.next; }
        else { tail.next = right; right = right.next; }
        tail = tail.next;
    }
    tail.next = left != null ? left : right;
    return dummy.next;
}`, '时间 O(n log n)，递归栈 O(log n)，不是常数空间。148 的 O(1) 空间进阶需自底向上迭代归并。一定要断链，否则子问题不会缩小。'),
  'tree-balanced-build': p('有序数组构建平衡搜索树', ['有序数组转 BST', '高度平衡'], '选择中点为根，左半和右半分别构造子树；每次都近似平分节点数量。', `TreeNode sortedArrayToBST(int[] nums) {
    return buildBalanced(nums, 0, nums.length - 1);
}
TreeNode buildBalanced(int[] nums, int left, int right) {
    if (left > right) return null;
    int middle = left + (right - left) / 2;
    TreeNode root = new TreeNode(nums[middle]);
    root.left = buildBalanced(nums, left, middle - 1);
    root.right = buildBalanced(nums, middle + 1, right);
    return root;
}`, '严格递增数组，时间 O(n)，递归空间 O(log n)，结果树 O(n)。偶数长度可选左中点或右中点，所以合法答案不唯一。'),
  'tree-flatten': p('前序遍历与原地重连', ['二叉树展开为链表', '复用原节点', 'left 全部为空'], '用栈保存前序待访问节点，前一个节点的 right 指向当前节点。先保存原孩子，后改写连接。', `void flattenTree(TreeNode root) {
    if (root == null) return;
    Deque<TreeNode> stack = new ArrayDeque<>();
    stack.push(root);
    TreeNode previous = null;
    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        if (node.right != null) stack.push(node.right);
        if (node.left != null) stack.push(node.left);
        if (previous != null) previous.right = node;
        node.left = null;
        previous = node;
    }
    previous.right = null;
}`, '时间 O(n)，显式栈空间 O(h)，最坏 O(n)。没有创建替代节点，结果顺序为前序。若要求 O(1) 空间进阶，可将左子树最右节点接上原右子树，再整体移到右侧。'),
  'tree-prefix-path': p('树上路径前缀和', ['向下路径和', '可不从根开始', '统计路径数量'], '当前前缀减去目标值，等于某个祖先前缀时得到合法路径；表只保留当前递归路径的前缀次数。', `int pathSum(TreeNode root, int targetSum) {
    Map<Long, Integer> prefixes = new HashMap<>();
    prefixes.put(0L, 1);
    return countTreePaths(root, 0L, targetSum, prefixes);
}
int countTreePaths(TreeNode node, long prefix, int target, Map<Long, Integer> prefixes) {
    if (node == null) return 0;
    prefix += node.val;
    int count = prefixes.getOrDefault(prefix - target, 0);
    prefixes.put(prefix, prefixes.getOrDefault(prefix, 0) + 1);
    count += countTreePaths(node.left, prefix, target, prefixes);
    count += countTreePaths(node.right, prefix, target, prefixes);
    int remaining = prefixes.get(prefix) - 1;
    if (remaining == 0) prefixes.remove(prefix);
    else prefixes.put(prefix, remaining);
    return count;
}`, '时间期望 O(n)，当前路径表和递归栈 O(h)，最坏 O(n)。路径和可能超出 int，所以键与累加值用 long；必须先查再加且离开时撤销，不能把兄弟分支或空路径算入答案。'),
};
