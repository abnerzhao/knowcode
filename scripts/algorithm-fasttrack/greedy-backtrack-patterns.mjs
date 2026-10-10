const p = (title, signals, idea, java, boundary) => ({ title, signals, idea, java, boundary });
export const greedyBacktrackPatterns = {
  'greedy-stock': p('交易限制决定扫描策略', ['一次交易', '无额外限制的多次交易'], '一次交易只维护此前最低价；不限次数时，把每段上升的收益累加等价于吃到整个上升区间。', `int greedySingleProfit(int[] prices) {
    int low = prices[0], answer = 0;
    for (int price : prices) { answer = Math.max(answer, price - low); low = Math.min(low, price); }
    return answer;
}
int greedyMultiProfit(int[] prices) {
    int answer = 0;
    for (int i = 1; i < prices.length; i++) answer += Math.max(0, prices[i] - prices[i - 1]);
    return answer;
}`, '两种扫描均 O(n) 时间、O(1) 额外空间。121 只用单次版本，122 用多次版本；手续费、冷冻期或最多 k 次交易会改变状态模型。'),
  'greedy-reach': p('可达区间扩张与分层跳跃', ['能否到达终点', '最少跳数'], '维护当前能够覆盖的最远位置。求最少跳数时，把同一次跳跃能覆盖的位置视作一层，扫描完一层后统一增加跳数。', `boolean greedyCanJump(int[] nums) {
    int reach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > reach) return false;
        reach = Math.max(reach, i + nums[i]);
    }
    return true;
}
int greedyJumps(int[] nums) {
    int end = 0, farthest = 0, steps = 0;
    for (int i = 0; i < nums.length - 1; i++) {
        if (i > farthest) return -1;
        farthest = Math.max(farthest, i + nums[i]);
        if (i == end) {
            if (farthest == end) return -1;
            steps++; end = farthest;
            if (end >= nums.length - 1) return steps;
        }
    }
    return steps;
}`, 'O(n) 时间、O(1) 空间，原题值域内 i+nums[i] 不溢出。45 保证可达，模板额外以 -1 处理不可达；长度为 1 时跳数为 0。'),
  'greedy-partition': p('末次位置确定最早切分点', ['同一字符只在一个片段', '尽可能多地切分'], '读到一个字符，就必须把它的最后一次出现纳入本段；当扫描指针追上所有末次位置的最大值，本段才能结束。', `List<Integer> greedyPartitions(String s) {
    int[] last = new int[26];
    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;
    List<Integer> answer = new ArrayList<>();
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
        end = Math.max(end, last[s.charAt(i) - 'a']);
        if (i == end) { answer.add(end - start + 1); start = i + 1; }
    }
    return answer;
}`, 'O(n) 时间，固定字母表的辅助空间 O(1)，输出最多 O(n)。只处理小写英文字母；最早合法切分不会妨碍后续继续切分。'),
  'greedy-gas': p('失败区间排除候选起点', ['环形补给', '每站净收益'], '一段的累计余额首次变负时，起点直到当前站都不可能成功；从下一站重新开始，总收益非负才有解。', `int greedyGas(int[] gas, int[] cost) {
    int total = 0, balance = 0, start = 0;
    for (int i = 0; i < gas.length; i++) {
        int delta = gas[i] - cost[i]; total += delta; balance += delta;
        if (balance < 0) { start = i + 1; balance = 0; }
    }
    return total < 0 ? -1 : start;
}`, 'O(n) 时间、O(1) 空间；原题非空且存在答案时唯一。只看总和可以判断存在性，但起点仍需扫描定位；更宽值域应使用 long 累计。'),
  'greedy-candy': p('双向约束分别满足后合并', ['相邻大小约束', '两侧要求取最大'], '先满足左侧比自己低的要求，再倒序满足右侧要求；每个位置保留两种下界的较大者。', `int greedyCandy(int[] ratings) {
    int n = ratings.length; int[] candy = new int[n]; Arrays.fill(candy, 1);
    for (int i = 1; i < n; i++) if (ratings[i] > ratings[i - 1]) candy[i] = candy[i - 1] + 1;
    for (int i = n - 2; i >= 0; i--) if (ratings[i] > ratings[i + 1]) candy[i] = Math.max(candy[i], candy[i + 1] + 1);
    int total = 0; for (int value : candy) total += value;
    return total;
}`, 'O(n) 时间、O(n) 空间；相同评分不要求相同或不同糖果。每个孩子至少一颗，反向更新必须取 max，不能破坏已有左侧约束。'),
  'greedy-arrows': p('最早结束区间的端点贪心', ['区间尽量共用一点', '最少覆盖点数'], '在最早结束的区间右端放置一个点；这不会比更左的点更难覆盖后续区间，直到遇到完全在点右侧的区间才新增。', `int greedyArrows(int[][] points) {
    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));
    int arrows = 1, position = points[0][1];
    for (int i = 1; i < points.length; i++) {
        if (points[i][0] > position) { arrows++; position = points[i][1]; }
    }
    return arrows;
}`, '非空输入。排序 O(n log n)，扫描 O(n)；Java int[][] 按比较器排序属于对象数组排序，辅助空间最坏 O(n)，不能写 O(1)。会重排输入外层数组；闭区间端点相等仍相交。'),
  'backtrack-subsets': p('从起点扩展的子集枚举', ['所有子集', '顺序不重要且元素不重复'], '每条路径都是合法子集；从当前位置之后选择下一个元素，不回头选择，避免枚举不同排列。', `List<List<Integer>> btSubsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    btSubsetVisit(nums, 0, new ArrayList<>(), result); return result;
}
void btSubsetVisit(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < nums.length; i++) {
        path.add(nums[i]); btSubsetVisit(nums, i + 1, path, result); path.remove(path.size() - 1);
    }
}`, '输出 2^n 个子集，包含路径复制的时间与输出空间 O(n·2^n)，不计输出的辅助空间 O(n)。必须保存副本；输入互不相同。'),
  'backtrack-combinations': p('定长组合与剩余数量剪枝', ['从 n 个数选 k 个', '不关心选取顺序'], '从小到大构造组合，路径长度达到 k 才保存；剩余数字不够填满时提前停止。', `List<List<Integer>> btCombine(int n, int k) {
    List<List<Integer>> result = new ArrayList<>();
    btCombineVisit(n, k, 1, new ArrayList<>(), result); return result;
}
void btCombineVisit(int n, int k, int start, List<Integer> path, List<List<Integer>> result) {
    if (path.size() == k) { result.add(new ArrayList<>(path)); return; }
    for (int value = start; value <= n - (k - path.size()) + 1; value++) {
        path.add(value); btCombineVisit(n, k, value + 1, path, result); path.remove(path.size() - 1);
    }
}`, '时间与输出空间 O(k·C(n,k))，辅助路径和栈 O(k)。本题 1≤k≤n；上界要包含 +1，避免漏掉刚好足够的最后一组。'),
  'backtrack-permutations': p('使用标记与同层去重排列', ['所有排列', '元素可重复但结果不重复'], '每一层选一个尚未用过的下标。先排序后，让相等元素在同一层按固定先后出场，避免生成重复排列。', `List<List<Integer>> btPermutations(int[] nums) {
    int[] sorted = nums.clone(); Arrays.sort(sorted);
    List<List<Integer>> result = new ArrayList<>();
    btPermutationVisit(sorted, new boolean[sorted.length], new ArrayList<>(), result); return result;
}
void btPermutationVisit(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> result) {
    if (path.size() == nums.length) { result.add(new ArrayList<>(path)); return; }
    for (int i = 0; i < nums.length; i++) {
        if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) continue;
        used[i] = true; path.add(nums[i]);
        btPermutationVisit(nums, used, path, result);
        path.remove(path.size() - 1); used[i] = false;
    }
}`, '最坏时间与输出空间 O(n·n!)，不计输出的辅助空间 O(n)，本模板复制输入后排序。46 无重复值也可使用；47 去重依据是同层前一个相等值尚未选，而不是禁止重复数值进入同一路径。'),
  'backtrack-phone': p('按位置选择候选字符', ['每个位置各有候选集', '笛卡尔积枚举'], '数字下标决定这一层的候选字母，追加一个字符进入下一层，返回后删去刚追加的字符。', `List<String> btPhone(String digits) {
    List<String> result = new ArrayList<>();
    if (digits.isEmpty()) return result;
    btPhoneVisit(digits, 0, new StringBuilder(), result); return result;
}
void btPhoneVisit(String digits, int index, StringBuilder path, List<String> result) {
    if (index == digits.length()) { result.add(path.toString()); return; }
    String[] letters = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    for (char ch : letters[digits.charAt(index) - '0'].toCharArray()) {
        path.append(ch); btPhoneVisit(digits, index + 1, path, result); path.deleteCharAt(path.length() - 1);
    }
}`, 'n 个数字时最多 4^n 个结果，含字符串构造的时间与输出空间 O(n·4^n)，辅助空间 O(n)。题目只含 2..9；空输入返回空列表。'),
  'backtrack-sum': p('目标和组合：复用与去重边界', ['目标和', '每次可重选或只能选一次'], '排序后按非递减顺序选数，超出剩余目标便停止；用开关明确递归从 i 还是 i+1 继续。', `List<List<Integer>> btCombinationSum(int[] candidates, int target, boolean reusable) {
    int[] nums = candidates.clone(); Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    btSumVisit(nums, target, 0, reusable, new ArrayList<>(), result); return result;
}
void btSumVisit(int[] nums, int remaining, int start, boolean reusable, List<Integer> path, List<List<Integer>> result) {
    if (remaining == 0) { result.add(new ArrayList<>(path)); return; }
    for (int i = start; i < nums.length && nums[i] <= remaining; i++) {
        if (i > start && nums[i] == nums[i - 1]) continue;
        path.add(nums[i]);
        btSumVisit(nums, remaining - nums[i], reusable ? i : i + 1, reusable, path, result);
        path.remove(path.size() - 1);
    }
}`, '39 传 reusable=true，40 传 false。所有候选数为正；39 深度 D≤target/min，时间可用 O(n log n + (D+1)(n+1)^(D+1)) 作宽松上界；40 可用 O(n log n+n·2^n) 作上界。输出敏感，辅助空间 O(n+D)（含复制数组）；40 的 D≤n。不要误说为多项式时间。'),
  'backtrack-parentheses': p('构造时维护前缀合法性', ['合法括号组合', '选择受到已选数量约束'], '左括号不超过 n，右括号不超过已经放入的左括号；只扩展合法前缀。', `List<String> btParentheses(int n) {
    List<String> result = new ArrayList<>();
    btBracketVisit(n, 0, 0, new StringBuilder(), result); return result;
}
void btBracketVisit(int n, int left, int right, StringBuilder path, List<String> result) {
    if (path.length() == 2 * n) { result.add(path.toString()); return; }
    if (left < n) { path.append('('); btBracketVisit(n, left + 1, right, path, result); path.deleteCharAt(path.length() - 1); }
    if (right < left) { path.append(')'); btBracketVisit(n, left, right + 1, path, result); path.deleteCharAt(path.length() - 1); }
}`, '结果数为第 n 个 Catalan 数 Cn，时间与输出空间 O(n·Cn)，辅助空间 O(n)。每次返回都要删除本层字符；右括号只看是否少于 n 不足以保证合法。'),
  'backtrack-word-search': p('路径访问标记与现场恢复', ['网格拼单词', '当前路径不能复用格子'], '枚举起点，沿四个方向匹配下一个字符，当前格暂时标记为不可用，探索完成恢复。', `boolean btWordSearch(char[][] board, String word) {
    for (int r = 0; r < board.length; r++) for (int c = 0; c < board[0].length; c++) {
        if (btWordVisit(board, word, r, c, 0)) return true;
    }
    return false;
}
boolean btWordVisit(char[][] board, String word, int row, int col, int index) {
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || board[row][col] != word.charAt(index)) return false;
    if (index == word.length() - 1) return true;
    char old = board[row][col]; board[row][col] = '#';
    boolean found = btWordVisit(board, word, row + 1, col, index + 1)
        || btWordVisit(board, word, row - 1, col, index + 1)
        || btWordVisit(board, word, row, col + 1, index + 1)
        || btWordVisit(board, word, row, col - 1, index + 1);
    board[row][col] = old;
    return found;
}`, '设单词长 L，时间宽松上界 O(mn·4^L)，辅助递归栈 O(min(L,mn))。题目网格与单词非空，字符只有英文字母，# 可作标记。找到答案也必须先恢复调用链上的格子。'),
  'backtrack-palindrome': p('预处理合法片段后枚举切分', ['所有回文分割', '枚举下一段终点'], '预先判断每个区间是否回文，回溯只挑合法区间；到达末尾时保存完整切分路径。', `List<List<String>> btPalindromePartitions(String s) {
    int n = s.length(); boolean[][] palindrome = new boolean[n][n];
    for (int left = n - 1; left >= 0; left--) for (int right = left; right < n; right++) {
        palindrome[left][right] = s.charAt(left) == s.charAt(right) && (right - left < 2 || palindrome[left + 1][right - 1]);
    }
    List<List<String>> result = new ArrayList<>();
    btPartitionVisit(s, 0, palindrome, new ArrayList<>(), result); return result;
}
void btPartitionVisit(String s, int start, boolean[][] palindrome, List<String> path, List<List<String>> result) {
    if (start == s.length()) { result.add(new ArrayList<>(path)); return; }
    for (int end = start; end < s.length(); end++) if (palindrome[start][end]) {
        path.add(s.substring(start, end + 1)); btPartitionVisit(s, end + 1, palindrome, path, result); path.remove(path.size() - 1);
    }
}`, '预处理 O(n²)；枚举与结果复制最坏 O(n·2^n)，辅助空间 O(n²)（含表、路径和活跃字符串），输出 O(n·2^n)。substring 的右端为开区间，必须 end+1。'),
  'backtrack-queens': p('按行决策与多约束剪枝', ['不同行列与对角线', '棋盘可行方案'], '每行只放一个皇后，使用三组占用标记快速判断冲突；合法时进入下一行，返回后恢复所有标记。', `List<List<String>> btQueens(int n) {
    char[][] board = new char[n][n]; for (char[] row : board) Arrays.fill(row, '.');
    List<List<String>> result = new ArrayList<>();
    btQueenVisit(0, board, new boolean[n], new boolean[2*n-1], new boolean[2*n-1], result); return result;
}
void btQueenVisit(int row, char[][] board, boolean[] cols, boolean[] diagonal, boolean[] anti, List<List<String>> result) {
    int n = board.length;
    if (row == n) {
        List<String> solution = new ArrayList<>(); for (char[] line : board) solution.add(new String(line)); result.add(solution); return;
    }
    for (int col = 0; col < n; col++) {
        int d = row - col + n - 1, a = row + col;
        if (cols[col] || diagonal[d] || anti[a]) continue;
        cols[col] = diagonal[d] = anti[a] = true; board[row][col] = 'Q';
        btQueenVisit(row + 1, board, cols, diagonal, anti, result);
        cols[col] = diagonal[d] = anti[a] = false; board[row][col] = '.';
    }
}`, '原题 n≥1。按列唯一性可用 O(n·n! + Rn²) 作为此逐行扫描实现的时间上界，R 是解数；辅助空间 O(n²)，输出 O(Rn²)。不要漏算每个解的 n 行字符串复制。'),
};
