const p = (title, signals, idea, java, boundary) => ({ title, signals, idea, java, boundary });
export const dpPatterns = {
  'dp-linear': p('线性递推与滚动状态', ['前几个状态决定当前', '选择与不选择', '逐行构造'], '先定义每个位置存什么，再从已知边界往后算；只保留实际会被下一步读取的旧状态，输出本身不能被压缩掉。', `int dpClimb(int n) {
    int previous = 1, current = 1;
    for (int i = 2; i <= n; i++) { int next = previous + current; previous = current; current = next; }
    return current;
}
int dpRob(int[] nums) {
    int beforePrevious = 0, previous = 0;
    for (int value : nums) {
        int current = Math.max(previous, beforePrevious + value);
        beforePrevious = previous; previous = current;
    }
    return previous;
}
List<List<Integer>> dpPascal(int n) {
    List<List<Integer>> result = new ArrayList<>();
    for (int row = 0; row < n; row++) {
        List<Integer> line = new ArrayList<>();
        for (int col = 0; col <= row; col++) {
            line.add(col == 0 || col == row ? 1 : result.get(row - 1).get(col - 1) + result.get(row - 1).get(col));
        }
        result.add(line);
    }
    return result;
}`, '70 和 198：O(n) 时间、O(1) 额外空间；118：时间与输出空间 O(n²)，输出之外仅常数工作变量。原题的 n/数值范围保证 int 可表示结果；不能对任意大的爬楼梯 n 沿用 int。'),
  'dp-coins': p('完全背包：最少选取数量', ['面额可重复使用', '恰好凑齐且数量最少'], '每个金额尝试最后选择的一枚硬币，取前一金额最优值加一；完全平方数可以转成一组硬币面额。', `int dpCoinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1]; Arrays.fill(dp, amount + 1); dp[0] = 0;
    for (int value = 1; value <= amount; value++) {
        for (int coin : coins) if (coin <= value) dp[value] = Math.min(dp[value], dp[value - coin] + 1);
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
int dpSquares(int n) {
    int[] squares = new int[(int) Math.sqrt(n)];
    for (int i = 0; i < squares.length; i++) squares[i] = (i + 1) * (i + 1);
    return dpCoinChange(squares, n);
}`, '322 面额种数 m、金额 A：O(mA) 时间、O(A) 空间；279 有 O(√n) 个平方数，故 O(n√n) 时间、O(n) 空间。面额必须为正，不能用 Integer.MAX_VALUE 再加一作不可达状态；0 金额答案为 0。'),
  'dp-word-break': p('前缀可拆分与断点枚举', ['字符串可由词典拼接', '同一单词可重用'], '枚举最后一个单词的起点，只要之前前缀可拆且最后一段在词典中，当前前缀就可拆。', `boolean dpWordBreak(String s, List<String> wordDict) {
    Set<String> dictionary = new HashSet<>(wordDict);
    int maxLength = 0; for (String word : wordDict) maxLength = Math.max(maxLength, word.length());
    boolean[] dp = new boolean[s.length() + 1]; dp[0] = true;
    for (int end = 1; end <= s.length(); end++) {
        for (int start = Math.max(0, end - maxLength); start < end; start++) {
            if (dp[start] && dictionary.contains(s.substring(start, end))) { dp[end] = true; break; }
        }
    }
    return dp[s.length()];
}`, '设 n 为串长、L 为 min(n,最长词长)、D 为词典总字符数。计入 Java substring 与哈希成本，期望时间上界 O(D+nL²)，空间上界 O(D+n+L)。不限制词长的双重循环最坏 O(n³)，不能直接宣称 O(n²)。'),
  'dp-lis': p('序列 DP 的最小尾值与二分优化', ['严格递增子序列', '不要求连续'], '同样长度的子序列，尾值越小越容易接上后续元素；用二分替换第一个不小于当前数的尾值。', `int dpLIS(int[] nums) {
    int[] tails = new int[nums.length]; int length = 0;
    for (int value : nums) {
        int left = 0, right = length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (tails[mid] < value) left = mid + 1;
            else right = mid;
        }
        tails[left] = value;
        if (left == length) length++;
    }
    return length;
}`, '时间 O(n log n)，空间 O(n)。基础 DP 可定义以 i 结尾的 LIS 并用 O(n²) 枚举前驱；tails 是长度状态的最小尾值，不一定连成原数组中的一条真实子序列。相等值不能增长严格递增长度。'),
  'dp-product': p('同时维护结尾最大值和最小值', ['连续乘积', '负数会翻转优劣'], '当前位置既可重新开始，也可接在上一段后；因为乘负数会交换大小，两个极值都要留下。', `int dpMaxProduct(int[] nums) {
    int high = nums[0], low = nums[0], answer = nums[0];
    for (int i = 1; i < nums.length; i++) {
        int value = nums[i], oldHigh = high, oldLow = low;
        high = Math.max(value, Math.max(oldHigh * value, oldLow * value));
        low = Math.min(value, Math.min(oldHigh * value, oldLow * value));
        answer = Math.max(answer, high);
    }
    return answer;
}`, 'O(n) 时间、O(1) 空间。输入非空，官方保证所有子数组乘积可用 32 位整数表示。更新 low 时不能使用已更新的 high；答案允许是负数，不能初始化为 0。'),
  'dp-subset': p('0/1 背包：容量倒序更新', ['每个元素最多一次', '能否凑出指定和'], '总和一半能被某个子集凑出，就能分成等和两组；倒序容量保证本轮不会重复使用同一个数。', `boolean dpEqualSubset(int[] nums) {
    int sum = 0; for (int value : nums) sum += value;
    if (sum % 2 != 0) return false;
    int target = sum / 2; boolean[] dp = new boolean[target + 1]; dp[0] = true;
    for (int value : nums) for (int capacity = target; capacity >= value; capacity--) {
        dp[capacity] = dp[capacity] || dp[capacity - value];
    }
    return dp[target];
}`, 'n 个正整数、目标和 S：O(nS) 时间、O(S) 空间，这是伪多项式复杂度。容量若正序更新会变成可重复使用的完全背包；原题总和不会溢出 int。'),
  'dp-grid-paths': p('网格计数与障碍归零', ['只向右或向下', '统计所有路径数'], '一维 dp 中旧值表示上方，新更新的左邻表示左方；障碍截断路径，将该格路径数置零。', `int dpUniquePaths(int rows, int cols) {
    int[] dp = new int[cols]; Arrays.fill(dp, 1);
    for (int r = 1; r < rows; r++) for (int c = 1; c < cols; c++) dp[c] += dp[c - 1];
    return dp[cols - 1];
}
int dpObstaclePaths(int[][] grid) {
    int[] dp = new int[grid[0].length]; dp[0] = 1;
    for (int[] row : grid) for (int c = 0; c < row.length; c++) {
        if (row[c] == 1) dp[c] = 0;
        else if (c > 0) dp[c] = (int) Math.min(Integer.MAX_VALUE, (long) dp[c] + dp[c - 1]);
    }
    return dp[dp.length - 1];
}`, '时间 O(mn)，额外空间 O(n)。62、63 原题保证最终答案在 int 范围内；63 的死路上中间路径数可能更大，因此模板用 long 相加并封顶到 int 最大值，避免溢出。因计数非负且最终答案可表示，该截断不影响最终结果；若需要精确的所有中间计数，应改用 BigInteger。起点障碍也由归零逻辑处理。'),
  'dp-grid-min': p('网格与三角形的最小路径状态', ['路径代价最小', '依赖相邻上一层状态'], '网格从上方和左方取较小路径和，三角形从下一行的两个邻居取较小值；方向由状态依赖决定。', `int dpMinPath(int[][] grid) {
    int[] dp = new int[grid[0].length];
    for (int r = 0; r < grid.length; r++) for (int c = 0; c < dp.length; c++) {
        if (r == 0 && c == 0) dp[c] = grid[r][c];
        else if (r == 0) dp[c] = dp[c - 1] + grid[r][c];
        else if (c == 0) dp[c] += grid[r][c];
        else dp[c] = Math.min(dp[c], dp[c - 1]) + grid[r][c];
    }
    return dp[dp.length - 1];
}
int dpTriangle(List<List<Integer>> triangle) {
    int[] dp = new int[triangle.size() + 1];
    for (int r = triangle.size() - 1; r >= 0; r--) for (int c = 0; c <= r; c++) {
        dp[c] = triangle.get(r).get(c) + Math.min(dp[c], dp[c + 1]);
    }
    return dp[0];
}`, '64：O(mn) 时间、O(n) 空间；120 有 h 行：O(h²) 时间、O(h) 空间，两者不修改输入。三角形允许负数，不能用 0 作为尚未计算的最优代价；模板底部的 0 表示走完后不再付费。'),
  'dp-square': p('正方形右下角状态', ['最大全 1 正方形', '三个相邻状态共同约束'], '当前是 1 时，能形成的边长受左、上、左上三者中最小边长限制；当前是 0 时不能形成正方形。', `int dpMaxSquare(char[][] matrix) {
    int[] dp = new int[matrix[0].length + 1]; int best = 0;
    for (char[] row : matrix) {
        int diagonal = 0;
        for (int c = 1; c < dp.length; c++) {
            int above = dp[c];
            dp[c] = row[c - 1] == '1' ? Math.min(diagonal, Math.min(above, dp[c - 1])) + 1 : 0;
            best = Math.max(best, dp[c]); diagonal = above;
        }
    }
    return best * best;
}`, 'O(mn) 时间、O(n) 空间，非空矩阵。更新前保存旧 dp[c]，它是下一列的左上角；最后返回边长平方，不是边长。'),
  'dp-lcs': p('双序列前缀最长公共子序列', ['两串相对顺序一致', '可以跳过字符'], '相等时把公共字符接在两个更短前缀的答案后；不等时选择跳过任意一边当前字符的较优结果。', `int dpLCS(String a, String b) {
    int[][] dp = new int[a.length() + 1][b.length() + 1];
    for (int i = 1; i <= a.length(); i++) for (int j = 1; j <= b.length(); j++) {
        dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
    return dp[a.length()][b.length()];
}`, 'O(mn) 时间、O(mn) 空间；可进一步滚动压缩到 O(min(m,n))。子序列允许不连续，不能在不等时直接清零，那是公共子串模型。'),
  'dp-edit': p('编辑距离的三种操作来源', ['插入删除替换', '两个前缀转换的最少操作'], '比较当前字符：相同不用操作；不同则枚举替换、删除、插入的上一状态，取最少次数。', `int dpEditDistance(String a, String b) {
    int[][] dp = new int[a.length() + 1][b.length() + 1];
    for (int i = 0; i <= a.length(); i++) dp[i][0] = i;
    for (int j = 0; j <= b.length(); j++) dp[0][j] = j;
    for (int i = 1; i <= a.length(); i++) for (int j = 1; j <= b.length(); j++) {
        dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1) ? dp[i - 1][j - 1]
            : 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
    }
    return dp[a.length()][b.length()];
}`, 'O(mn) 时间、O(mn) 空间（空串时表为单行/列）；可压缩空间。空串边界不能全部留 0；每种操作成本均为 1 时才是这个转移。'),
  'dp-interleave': p('两个前缀构成第三串前缀', ['交错合并但各自保序', '判断可行性'], '每一步目标字符来自第一串或第二串，分别检查对应的前一状态；两条来源用逻辑或合并。', `boolean dpInterleave(String a, String b, String target) {
    if (a.length() + b.length() != target.length()) return false;
    boolean[] dp = new boolean[b.length() + 1]; dp[0] = true;
    for (int i = 0; i <= a.length(); i++) for (int j = 0; j <= b.length(); j++) {
        if (i == 0 && j == 0) continue;
        int k = i + j - 1;
        dp[j] = (i > 0 && dp[j] && a.charAt(i - 1) == target.charAt(k))
            || (j > 0 && dp[j - 1] && b.charAt(j - 1) == target.charAt(k));
    }
    return dp[b.length()];
}`, '时间 O((m+1)(n+1))、空间 O(n+1)，允许空串。按 j 递增，旧 dp[j] 对应上方，新 dp[j-1] 对应左方；总长度检查必须在访问 target 前完成。'),
  'dp-palindrome': p('区间 DP：由内部回文扩展', ['最长连续回文', '区间两端与内部状态'], '左右字符相等且内部区间是回文，整个区间才是回文；按区间长度递增填表，同时记录最长区间。', `String dpLongestPalindrome(String s) {
    int n = s.length(), start = 0, best = 0;
    boolean[][] dp = new boolean[n][n];
    for (int length = 1; length <= n; length++) for (int left = 0; left + length <= n; left++) {
        int right = left + length - 1;
        dp[left][right] = s.charAt(left) == s.charAt(right) && (length <= 2 || dp[left + 1][right - 1]);
        if (dp[left][right] && length > best) { start = left; best = length; }
    }
    return s.substring(start, start + best);
}`, 'O(n²) 时间和空间；原题非空，本模板也支持空串。同长答案可返回任意一个；还可比较 O(1) 辅助空间的中心扩展法，但不能将两种方法的复杂度混写。'),
};
