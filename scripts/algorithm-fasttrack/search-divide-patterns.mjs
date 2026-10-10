const p = (title, signals, idea, java, boundary) => ({ title, signals, idea, java, boundary });
export const searchDividePatterns = {
  'search-sqrt': p('二分答案边界', ['单调可行性', '最后一个平方不超过 x 的整数'], '维护闭区间，合法时记录候选并向更大值搜索，不合法时缩小右界。', `int searchSqrt(int x) {
    int left = 0, right = x, answer = 0;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if ((long) mid * mid <= x) {
            answer = mid;
            if (mid == x) break;
            left = mid + 1;
        } else right = mid - 1;
    }
    return answer;
}`, '时间 O(log(x+1))，额外空间 O(1)。输入 x 非负；先转 long 再乘，不能乘完才转换。'),
  'search-flat-matrix': p('展平有序矩阵后二分', ['跨行整体有序', '二维下标转一维'], '把矩阵看作一个排好序的一维数组，不真正复制数据，二分下标后换算行列。', `boolean searchFlatMatrix(int[][] matrix, int target) {
    int rows = matrix.length, cols = matrix[0].length;
    int left = 0, right = rows * cols - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int value = matrix[mid / cols][mid % cols];
        if (value == target) return true;
        if (value < target) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}`, '时间 O(log(mn))，额外空间 O(1)。题目保证矩阵非空、跨行有序，m*n 在 int 范围内。240 不具有这个整体有序条件。'),
  'search-peak': p('利用坡向缩小搜索空间', ['任意峰值', '相邻元素不等'], '向上坡的一侧必然存在峰值，因而可以保留该侧，不必线性找到全局最大值。', `int searchPeak(int[] nums) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < nums[mid + 1]) left = mid + 1;
        else right = mid;
    }
    return left;
}`, '时间 O(log n)，额外空间 O(1)。依赖非空且相邻不等，区间外视为负无穷；闭区间中 left<right 保证 mid+1 有效。'),
  'search-staircase': p('行列有序的阶梯搜索', ['每行每列分别有序', '比较后排除整行或整列'], '从右上角出发：当前值太大，排除这一列；太小，排除这一行。', `boolean searchStaircase(int[][] matrix, int target) {
    int row = 0, col = matrix[0].length - 1;
    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] == target) return true;
        if (matrix[row][col] > target) col--;
        else row++;
    }
    return false;
}`, '时间 O(m+n)，额外空间 O(1)，题目保证矩阵非空。可有重复值；不能把“分别有序”当作“展平后有序”。'),
  'search-border-fill': p('边界连通区域标记', ['不被边界包围', '先找不能修改的区域'], '从所有边界 O 同时扩散，标记可达格子；最后只翻转没有被标记的 O。', `void searchCapture(char[][] board) {
    int rows = board.length, cols = board[0].length;
    Deque<int[]> queue = new ArrayDeque<>();
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if ((r == 0 || c == 0 || r == rows - 1 || c == cols - 1) && board[r][c] == 'O') {
                board[r][c] = '#'; queue.offer(new int[]{r, c});
            }
        }
    }
    int[][] directions = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        for (int[] d : directions) {
            int r = cell[0] + d[0], c = cell[1] + d[1];
            if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] == 'O') {
                board[r][c] = '#'; queue.offer(new int[]{r, c});
            }
        }
    }
    for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {
        if (board[r][c] == 'O') board[r][c] = 'X';
        else if (board[r][c] == '#') board[r][c] = 'O';
    }
}`, '时间 O(mn)，队列最坏 O(mn) 空间。输入非空且只有 X/O，# 是临时标记，结束时必须恢复。入队即标记避免重复入队。'),
  'search-topology': p('入度拓扑排序与依赖判环', ['先修依赖', '有向图能否完成', '可行执行顺序'], '先把没有前置条件的节点入队；处理一个节点便删除其出边，新的零入度节点随后入队。', `int[] searchCourseOrder(int n, int[][] prerequisites) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
    int[] indegree = new int[n];
    for (int[] edge : prerequisites) { graph.get(edge[1]).add(edge[0]); indegree[edge[0]]++; }
    Deque<Integer> queue = new ArrayDeque<>();
    for (int i = 0; i < n; i++) if (indegree[i] == 0) queue.offer(i);
    int[] order = new int[n]; int size = 0;
    while (!queue.isEmpty()) {
        int from = queue.poll(); order[size++] = from;
        for (int to : graph.get(from)) if (--indegree[to] == 0) queue.offer(to);
    }
    return size == n ? order : new int[0];
}
boolean searchCanFinish(int n, int[][] prerequisites) {
    return searchCourseOrder(n, prerequisites).length == n;
}`, '时间、额外空间均 O(V+E)。207 返回是否存在完整顺序，210 返回任意完整顺序；有环时不能把部分结果当答案。'),
  'search-trie': p('前缀路径与词尾标记', ['前缀匹配', '插入与完整单词查找'], '每个字符是一条边，共享前缀共用节点；词尾标记区分完整单词与已有前缀。', `class SearchTrie {
    class Entry { Entry[] next = new Entry[26]; boolean end; }
    private final Entry root = new Entry();
    public void insert(String word) {
        Entry node = root;
        for (char ch : word.toCharArray()) {
            int index = ch - 'a';
            if (node.next[index] == null) node.next[index] = new Entry();
            node = node.next[index];
        }
        node.end = true;
    }
    private Entry find(String text) {
        Entry node = root;
        for (int i = 0; i < text.length(); i++) {
            node = node.next[text.charAt(i) - 'a'];
            if (node == null) return null;
        }
        return node;
    }
    public boolean search(String word) { Entry node = find(word); return node != null && node.end; }
    public boolean startsWith(String prefix) { return find(prefix) != null; }
}`, '长度 L 的操作时间 O(L)；所有不同前缀节点占 O(26S) 空间，S 为总字符数的上界，字母表固定时记 O(S)。模板仅支持小写英文字母；提交时将类名改为 Trie。'),
  'search-word-ladder': p('隐式图 BFS 最短路径', ['每步修改一个字符', '最少变换次数'], '单词是节点，一次合法变换是一条边；逐层 BFS，访问时从未访问词表中删除。', `int searchLadder(String begin, String end, List<String> words) {
    Set<String> remaining = new HashSet<>(words);
    if (!remaining.contains(end)) return 0;
    Deque<String> queue = new ArrayDeque<>(); queue.offer(begin); remaining.remove(begin);
    int length = 1;
    while (!queue.isEmpty()) {
        int size = queue.size();
        while (size-- > 0) {
            String word = queue.poll();
            if (word.equals(end)) return length;
            char[] letters = word.toCharArray();
            for (int i = 0; i < letters.length; i++) {
                char old = letters[i];
                for (char ch = 'a'; ch <= 'z'; ch++) {
                    letters[i] = ch; String next = new String(letters);
                    if (remaining.remove(next)) queue.offer(next);
                }
                letters[i] = old;
            }
        }
        length++;
    }
    return 0;
}`, '设词表 N 个等长 L 的小写单词；Java 构造与哈希字符串需要 O(L)，此实现期望 O(26NL²) 时间、O(NL) 空间，不把生成字符串视为常数。不存在路径返回 0，答案按单词数而非边数计。'),
  'divide-power': p('快速幂：减半与平方合并', ['幂运算', '重复子问题可以复用'], '先求一半指数的幂，再平方；指数为奇数时再乘一个底数，负指数转成倒数。', `double dividePower(double x, int n) {
    long exponent = n;
    if (exponent < 0) { x = 1 / x; exponent = -exponent; }
    return dividePositivePower(x, exponent);
}
double dividePositivePower(double x, long n) {
    if (n == 0) return 1;
    double half = dividePositivePower(x, n / 2);
    return n % 2 == 0 ? half * half : half * half * x;
}`, '时间 O(log(|n|+1))，递归栈同阶。只计算一次 half；若两次递归求 half 会重复工作。先转 long 再取负，遵守题目对 0 与负指数的限制。'),
  'divide-prefix': p('分组求解后合并公共前缀', ['多串公共部分', '合并结果仍是同类问题'], '左右两组各返回公共前缀，最终答案就是两个结果的公共前缀。', `String dividePrefix(String[] strs) {
    return dividePrefixRange(strs, 0, strs.length - 1);
}
String dividePrefixRange(String[] strs, int left, int right) {
    if (left == right) return strs[left];
    int mid = left + (right - left) / 2;
    String a = dividePrefixRange(strs, left, mid), b = dividePrefixRange(strs, mid + 1, right);
    int length = 0;
    while (length < a.length() && length < b.length() && a.charAt(length) == b.charAt(length)) length++;
    return a.substring(0, length);
}`, 'N 个字符串、最大长度 L，时间上界 O(NL)；计入 Java 中间前缀副本，辅助空间保守上界 O(L log N + log N)。输入数组非空但字符串可为空；分治是训练拆分合并，简单纵向扫描也可。'),
  'divide-tree-postorder': p('按遍历区间重建二叉树', ['后序末尾为根', '中序划分左右子树'], '先用中序建立值到下标的映射，再根据左子树长度划分后序区间，递归接出左右孩子。', `TreeNode divideBuildPost(int[] inorder, int[] postorder) {
    Map<Integer, Integer> index = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) index.put(inorder[i], i);
    return dividePostRange(postorder, 0, postorder.length - 1, 0, index);
}
TreeNode dividePostRange(int[] post, int left, int right, int inLeft, Map<Integer, Integer> index) {
    if (left > right) return null;
    TreeNode root = new TreeNode(post[right]);
    int leftSize = index.get(root.val) - inLeft;
    root.left = dividePostRange(post, left, left + leftSize - 1, inLeft, index);
    root.right = dividePostRange(post, left + leftSize, right - 1, inLeft + leftSize + 1, index);
    return root;
}`, '哈希查询平均常数时 O(n) 时间，索引表 O(n)，递归栈最坏 O(n)。题目保证节点值互异且两种遍历合法，不能用于重复值的任意重建。'),
  'divide-quad-tree': p('区域一致性与四路分治', ['正方形区域递归分块', '均匀区域压成叶子'], '先检查整个区域是否相同；若不同，则递归构造四个象限，合成一个非叶节点。', `class DivideQuadNode {
    boolean val, isLeaf;
    DivideQuadNode topLeft, topRight, bottomLeft, bottomRight;
    DivideQuadNode(boolean value, boolean leaf) { val = value; isLeaf = leaf; }
}
DivideQuadNode divideQuad(int[][] grid) { return divideQuadRegion(grid, 0, 0, grid.length); }
DivideQuadNode divideQuadRegion(int[][] grid, int row, int col, int size) {
    boolean same = true;
    for (int r = row; r < row + size && same; r++) {
        for (int c = col; c < col + size; c++) if (grid[r][c] != grid[row][col]) { same = false; break; }
    }
    if (same) return new DivideQuadNode(grid[row][col] == 1, true);
    DivideQuadNode root = new DivideQuadNode(false, false);
    int half = size / 2;
    root.topLeft = divideQuadRegion(grid, row, col, half);
    root.topRight = divideQuadRegion(grid, row, col + half, half);
    root.bottomLeft = divideQuadRegion(grid, row + half, col, half);
    root.bottomRight = divideQuadRegion(grid, row + half, col + half, half);
    return root;
}`, 'n×n 网格、n 为 2 的幂。此扫描版时间上界 O(n² log n)，递归栈 O(log n)，输出节点 O(n²)；二维前缀和可将时间优化为 O(n²)。模板自定义节点为避免命名冲突，提交时按原题 Node 定义改名。'),
};
