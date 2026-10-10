# 算法题速通：五类算法技巧来源与编辑说明

核验日期：2026-10-10。

## 范围与来源口径

本轮新增搜索 9 题、分治 4 题、贪心 8 题、回溯 11 题、动态规划 18 题，共 50 题。题型分组、识别信号、学习顺序和星标是编辑推荐，不是企业面试频率统计，不宣称某公司必考或 LeetCode 官方排名。分类可交叉：搜索不等于二分，分治不等于所有递归，动态规划也可以与搜索、贪心作对照。

48 题复用本地 `public/data/questions.json` 与 `public/data/interview150.json` 的题面、原题链接和 Java 接口；两份快照分别采集于 2026-09-07 15:22:52 UTC 和 16:13:47 UTC。只有 47、40 需要原创中文重述与自构造示例，不复制官方题解。既有题号、分类、顺序、练习标识和草稿不迁移、不重复收录；例如既有 704、200、994、108、148、53 可作为关联练习，不在新分类复制一题。

火焰严格按 slug 匹配本地 HOT100 题单，与编辑星标独立。本轮 30 道交集为：74、240、207、208、121、55、45、763、46、78、17、39、22、79、131、51、70、118、198、279、322、139、300、152、416、62、64、5、1143、72。47、40 不在该快照，不应带 HOT100 火焰。[HOT100 学习计划](https://leetcode.cn/studyplan/top-100-liked/)、[面试经典 150](https://leetcode.cn/studyplan/top-interview-150/)

下面题目契约来自逐题所链官方题页和本地官方题面快照；实现不变量、复杂度和教学分组是编辑推导，不宣称官方只允许这些实现。空间复杂度若不计输出，应明确写“额外空间”；所有枚举题都必须另计输出的复制与存储成本。

## 搜索

| 官方题目 | 契约与实现边界 |
| --- | --- |
| [74 搜索二维矩阵](https://leetcode.com/problems/search-a-2d-matrix/) | 行内非递减，下一行首项严格大于上一行末项；因此可按 `mid / cols, mid % cols` 展平二分。题面要求 O(log(mn))，不能把 O(m+n) 阶梯搜索称为达标解。 |
| [240 搜索二维矩阵 II](https://leetcode.com/problems/search-a-2d-matrix-ii/) | 仅保证每行、每列分别有序，不保证跨行整体有序。右上角或左下角一次排除一行或一列，O(m+n) 时间、O(1) 额外空间；不可复用 74 的展平模板。 |
| [162 寻找峰值](https://leetcode.com/problems/find-peak-element/) | 返回任意严格峰值的下标；相邻元素不等，两端外视为负无穷，要求 O(log n)。数组未必有序；按 `nums[mid] < nums[mid+1]` 保留存在峰的半边，并非查找全局最大值。 |
| [69 x 的平方根](https://leetcode.com/problems/sqrtx/) | 非负 int，返回向下取整平方根，不能调用内置幂函数。判断 `(long) mid * mid <= x`，强转必须在乘法之前；也可除法比较但要排除除零。 |
| [207 课程表](https://leetcode.com/problems/course-schedule/) | `[a,b]` 表示先 b 后 a；图边为 b→a。Kahn 拓扑排序统计处理数，等于课程总数才可完成；无依赖的孤立课程也入队。O(V+E) 时间与空间。 |
| [210 课程表 II](https://leetcode.com/problems/course-schedule-ii/) | 同一方向约定，但返回任意完整拓扑序；有环返回空数组，不能返回已处理的部分前缀。 |
| [208 实现 Trie](https://leetcode.com/problems/implement-trie-prefix-tree/) | `search` 要求完整单词标记；`startsWith` 只要求路径存在。小写字母可用 26 路孩子；单次操作 O(L)，总空间按实际节点数计，不是固定 O(26)。 |
| [127 单词接龙](https://leetcode.com/problems/word-ladder/) | 相邻词仅差一个字母，除起点外每个词都必须在词典；终点缺席即无解，起点不必在词典。返回最短序列的单词数，起点层数为 1；无解为 0。BFS 入队时标记，防止重复入队。 |
| [130 被围绕的区域](https://leetcode.com/problems/surrounded-regions/) | 四方向连接，原地翻转被包围的 O，不返回新矩阵。先从所有边界 O 标记安全区域，再翻转其余 O 并恢复标记；O(mn)，DFS 最坏栈深也是 O(mn)。 |

127 若枚举每个位置的 26 种替换，令词典大小 N、词长 L，Java 新建字符串并计算哈希需要 O(L)，因此预期时间上界为 O(26NL²)，不能省去复制／哈希成本写成 O(26NL)。这里“预期”采用哈希集合平均常数次桶操作假设；队列、集合保存 O(NL) 字符规模。

## 分治

| 官方题目 | 契约与实现边界 |
| --- | --- |
| [50 Pow(x, n)](https://leetcode.com/problems/powx-n/) | 指数覆盖 int 最小值；先 `long exp = n`，再处理负指数和取倒数，不能先执行 `-n` 再转 long。每层只递归计算一次半幂并复用，O(log(|n|+1)) 时间；递归栈同阶，迭代额外空间 O(1)。 |
| [14 最长公共前缀](https://leetcode.com/problems/longest-common-prefix/) | 数组非空，但其中字符串可为空，无公共前缀返回空串。合并两个子问题的公共前缀；总字符比较可按 O(nL) 上界说明，L 为最大字符串长度。递归合并要计临时字符串，不应不加条件声称全部额外空间只有 O(log n)。 |
| [106 从中序与后序构造二叉树](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) | 值唯一且输入是同一有效树。后序末尾为根，中序定位划分左右；若共享后序逆向游标，先构建右子树再构建左子树。中序位置表使时间 O(n)，反复线性查找最坏 O(n²)；栈最坏 O(n)。 |
| [427 建立四叉树](https://leetcode.com/problems/construct-quad-tree/) | 二值方阵，边长为 2 的幂，1≤n≤64。均匀区域合为叶子，四孩子 null；混合区域内部节点的 val 任意，孩子分别为左上、右上、左下、右下。返回 Node 根，而非序列化数组。 |

427 若每个递归区域都扫描判断均匀性，可给 O(n² log n) 的保守上界，不能仅因“分成四块”写成 O(log n)。二维前缀和 O(n²) 预处理、O(1) 区域判断，节点数 O(n²)，可得 O(n²) 总时间与空间；递归深度为 O(log n)。这些是实现分析，不是题面的复杂度限制。

## 贪心

| 官方题目 | 契约与实现边界 |
| --- | --- |
| [121 买卖股票的最佳时机](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | 至多一次买卖，买入必须早于卖出，不能盈利时返回 0；维护历史最低价，不能把全局最大减全局最小忽略时间顺序。 |
| [55 跳跃游戏](https://leetcode.com/problems/jump-game/) | 数值是最大可跳长度，并非必须跳该长度；只从可达位置更新最远覆盖，遇到 `i > farthest` 才失败。 |
| [45 跳跃游戏 II](https://leetcode.com/problems/jump-game-ii/) | 求最少跳跃次数，题目保证终点可达；按当前步能覆盖的边界分层，每跨边界加一步，只扫描到 n-2，单元素为 0 步。不能无说明把模板用于不可达输入。 |
| [763 划分字母区间](https://leetcode.com/problems/partition-labels/) | 同一字母不能跨片段，要求片段尽可能多。先记最后位置，当前右界必须取最大值，遍历下标追上右界才切割。 |
| [122 买卖股票的最佳时机 II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/) | 可多次交易但最多持有一股；没有手续费与冷冻期时累加所有相邻正收益。此结论不能直接推广到含交易次数、手续费或冷冻期限制的题。 |
| [134 加油站](https://leetcode.com/problems/gas-station/) | 环路、空箱出发、油箱无限；无解 -1，有解唯一。局部油量为负时可排除当前候选到当前位置的全部起点；还须检查全程总余量，不能仅返回最后候选。 |
| [135 分发糖果](https://leetcode.com/problems/candy/) | 每人至少 1；只有评分严格更高的相邻一方要求糖更多，相同评分无等量要求。两遍分别满足左右约束，合并取 max；只做单向扫描会漏掉下降段。 |
| [452 用最少数量的箭引爆气球](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) | 气球是闭区间，端点接触可共用箭。按右端排序，在最早右端射箭；仅当 `start > arrow` 时新增。端点覆盖完整 int 范围，比较器用 `Integer.compare`，禁止差值比较导致溢出。 |

上表前七题的标准扫描实现为 O(n) 时间；135 的双数组或单数组两遍实现使用 O(n) 额外空间。452 排序 O(n log n)，扫描 O(n)；Java 对 `int[][]` 的比较器排序处理的是对象数组，其排序工作空间应计入，不能无条件写总额外空间 O(1)。

## 回溯

| 官方题目 | 契约与实现边界 |
| --- | --- |
| [46 全排列](https://leetcode.com/problems/permutations/) | 输入值互异；每个位置恰选一次，用 used 或交换，不以值判断是否使用。含输出复制的时间 O(n·n!)，额外栈／路径 O(n)。 |
| [78 子集](https://leetcode.com/problems/subsets/) | 输入值互异，空集也必须输出；start 递增防止生成同一集合的不同排列。含输出时间／存储 O(n·2ⁿ)。 |
| [17 电话号码的字母组合](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | 按位置依次选择数字 2～9 的字母，不是排列输入数字。7、9 有四个字母；输出条数上界 4ᴸ，字符串复制使时间上界 O(L·4ᴸ)。 |
| [39 组合总和](https://leetcode.com/problems/combination-sum/) | 候选为不同正整数，同一值可无限使用；选择 i 后递归仍从 i 开始。正数与排序支持 `candidate > remain` 的剪枝；不能套用于含负数场景。 |
| [22 括号生成](https://leetcode.com/problems/generate-parentheses/) | 生成 n 对合法括号；左括号仅在 left<n 时加入，右括号仅在 right<left 时加入，不必先生成所有字符串再验证。 |
| [79 单词搜索](https://leetcode.com/problems/word-search/) | 四方向，单次路径不能复用单元格；回退恢复访问标记，包括提前返回成功的分支，避免留下修改。粗略 O(mn·4ᴸ) 时间上界、O(L) 路径栈。 |
| [131 分割回文串](https://leetcode.com/problems/palindrome-partitioning/) | 分割的是连续子串，返回全部方案。只在回文段后继续；可先 O(n²) 建回文表，输出本身仍可能指数级。 |
| [51 N 皇后](https://leetcode.com/problems/n-queens/) | 每行一皇后，列、两类对角线均不能冲突；对角线标记为 r+c、r-c+n-1。输出为字符棋盘，不能忽略每个解 O(n²) 的构造成本。 |
| [77 组合](https://leetcode.com/problems/combinations/) | 从 1..n 选 k 个数，无次序；start 递增。剩余个数不足以填满时剪枝，含结果复制至少 O(k·C(n,k))。 |
| [47 全排列 II](https://leetcode.com/problems/permutations-ii/) | 允许重复值，返回不同排列。排序后同层跳过未用前驱的重复值；同一条路径可继续使用其他下标上的同值元素。详见下节。 |
| [40 组合总和 II](https://leetcode.com/problems/combination-sum-ii/) | 允许重复值，但每个输入下标最多使用一次，数值相同的组合只输出一次。选择 i 后递归 i+1，同层去重条件为 i>start。详见下节。 |

### 47、40 的原创重述材料

47 全排列 II（Medium）：输入整数数组 nums，元素可能相同。重新安排全部元素的顺序，列出所有数值序列不同的排列；每个排列必须保留原数组中各值的出现次数，结果列表顺序不限。接口为 `List<List<Integer>> permuteUnique(int[] nums)`。约束 `1 <= nums.length <= 8`，`-10 <= nums[i] <= 10`。[官方契约](https://leetcode.com/problems/permutations-ii/)

- 自构造示例 1：`nums=[2,2,3]` → `[[2,2,3],[2,3,2],[3,2,2]]`。
- 自构造示例 2：`nums=[-1,-1]` → `[[-1,-1]]`。

排序 + used 模板的跳过条件是 `used[i] || (i > 0 && nums[i] == nums[i-1] && !used[i-1])`。其中 `!used[i-1]` 固定同值元素在同层的尝试顺序，不会禁止路径中的重复值。若只写“遇到重复数字就跳过”，会漏合法解。最坏全异时含输出复制 O(n·n!)；排序 O(n log n)，额外路径和 used 为 O(n)，返回结果另计。

40 组合总和 II（Medium）：输入正整数列表 candidates 与目标值 target，从列表中选择若干项，使总和恰好等于 target。每个下标至多选一次；相同数字来自不同下标时可以同时选择，但按数值组成相同的组合只能保留一份，输出顺序不限。接口为 `List<List<Integer>> combinationSum2(int[] candidates, int target)`。约束 `1 <= candidates.length <= 100`，`1 <= candidates[i] <= 50`，`1 <= target <= 30`。[官方契约](https://leetcode.com/problems/combination-sum-ii/)

- 自构造示例 1：`candidates=[1,1,2,3], target=4` → `[[1,1,2],[1,3]]`。
- 自构造示例 2：`candidates=[2,2,2], target=4` → `[[2,2]]`。

排序后 `i > start && candidates[i] == candidates[i-1]` 才跳过；选择后 start=i+1 保证一次使用，不能沿用 39 的 start=i。正整数使 `candidate > remain` 后可直接 break。枚举子集含结果复制可给 O(n·2ⁿ) 保守上界（含排序时另有 O(n log n)）；剪枝会显著减少实际搜索量，但不能宣称一定多项式时间。额外路径和递归栈 O(n)，输出另计。

## 动态规划

| 官方题目 | 状态、契约与边界 |
| --- | --- |
| [70 爬楼梯](https://leetcode.com/problems/climbing-stairs/) | 到达 i 的方法数由 i-1 与 i-2 相加；dp[0]=1 表示空走法，不能与“有 0 种方法”混淆；题目 n≥1。 |
| [118 杨辉三角](https://leetcode.com/problems/pascals-triangle/) | 返回全部行而非某一行；两端为 1，中间取上一行相邻两项，注意每行新建容器避免共享引用。输出规模 Θ(r²)。 |
| [198 打家劫舍](https://leetcode.com/problems/house-robber/) | 线性房屋、金额非负、相邻不可同取；当前最优=max(不取当前,前两间最优+当前)。滚动更新前保存旧状态。 |
| [279 完全平方数](https://leetcode.com/problems/perfect-squares/) | 求最少项数，平方数可复用；dp[0]=0，其余设足够大，尝试所有 j²≤i。O(n√n) 时间、O(n) 空间。 |
| [322 零钱兑换](https://leetcode.com/problems/coin-change/) | 硬币无限，目标可为 0，无解 -1。dp[0]=0，其他 amount+1；不要 Integer.MAX_VALUE+1 溢出。仅 coin≤当前金额才访问前驱；面额可大至 int 最大值。 |
| [139 单词拆分](https://leetcode.com/problems/word-break/) | 字典词可重复，不要求全部使用。dp[i] 表示前 i 字符能否完全拆分，dp[0]=true。Java substring 与哈希成本见下文。 |
| [300 最长递增子序列](https://leetcode.com/problems/longest-increasing-subsequence/) | 严格递增、允许不连续。朴素 dp[i] 至少为 1，转移仅 nums[j]<nums[i]；O(n²)。二分优化用首个 ≥x 的 tails 位置，不能改成 >x。 |
| [152 乘积最大子数组](https://leetcode.com/problems/maximum-product-subarray/) | 连续且非空。负数会交换最大与最小作用，必须同时维护以当前结尾的 max/min；两者都由旧状态计算，初始化为首项而非 0，零通过候选 x 自然重启。 |
| [416 分割等和子集](https://leetcode.com/problems/partition-equal-subset-sum/) | 全部为正数且每个下标仅用一次；总和奇数无解，目标为 sum/2，dp[0]=true。压为一维后容量必须倒序，正序会把 0/1 背包变成可复用。 |
| [62 不同路径](https://leetcode.com/problems/unique-paths/) | 只向右、向下；首行／首列路径数为 1。滚动数组旧 dp[j] 来自上方，新 dp[j-1] 来自左方。 |
| [64 最小路径和](https://leetcode.com/problems/minimum-path-sum/) | 非负网格、仅右／下，求数值和最小；第一行第一列不能把不存在的路径当 0。 |
| [5 最长回文子串](https://leetcode.com/problems/longest-palindromic-substring/) | 连续子串，返回字符串而非长度。区间 DP 依赖内层 [l+1,r-1]，按长度递增或 l 递减；长度 1/2 的边界要处理。中心扩展也是 O(n²) 时间、O(1) 额外空间的可选解。 |
| [1143 最长公共子序列](https://leetcode.com/problems/longest-common-subsequence/) | 子序列可不连续，求长度；相同取左上+1，不同取上／左 max。不要和最长公共子串的“不相同归零”混用。 |
| [72 编辑距离](https://leetcode.com/problems/edit-distance/) | 允许插入、删除、替换，各成本 1；空前缀边界 dp[i][0]=i、dp[0][j]=j，相同字符沿左上不加 1。 |
| [63 不同路径 II](https://leetcode.com/problems/unique-paths-ii/) | 有障碍，起终点也可能阻塞。滚动 dp 遇障碍必须置 0，不能继承上一行的旧路径数。 |
| [120 三角形最小路径和](https://leetcode.com/problems/triangle/) | 下一行只能走同列或右一列，可含负数，不能每层贪取较小值。自底向上 dp[j]=当前+min(dp[j],dp[j+1])，可用 O(行数) 额外空间。 |
| [221 最大正方形](https://leetcode.com/problems/maximal-square/) | 输入是字符 '0'/'1'，返回面积。dp 是以当前为右下角的边长，取上、左、左上三者 min+1；最终最大边长平方，不能取 max。 |
| [97 交错字符串](https://leetcode.com/problems/interleaving-string/) | 保持两个输入串各自顺序并使用全部字符；先检验三串长度关系 m+n=|s3|。空串合法，dp[0][0]=true；状态(i,j)对齐 s3[i+j-1]，两条来源取 OR。 |

139 的简单 Java 双循环若每个候选都执行 `substring(j,i)` 再查询 HashSet，字符复制与首次哈希均需按片段长度计，最坏上界 O(n³)。若只尝试最大词长 L 以内的前驱，可写 O(nL²)，字典构建另计总字符数；Trie 从可达起点逐字符走最多 L 步可达 O(nL)（含建树成本另计）。这不是 HashSet 的桶查找复杂度变了，而是传入的新字符串构造与哈希并非常数。[139 官方约束](https://leetcode.com/problems/word-break/)、[OpenJDK 21 String.substring](https://github.com/openjdk/jdk/blob/jdk-21-ga/src/java.base/share/classes/java/lang/String.java)、[OpenJDK 21 StringLatin1.newString](https://github.com/openjdk/jdk/blob/jdk-21-ga/src/java.base/share/classes/java/lang/StringLatin1.java)

416 时间 O(nS)、额外空间 O(S)，S=sum/2，是依赖数值总和的伪多项式界，不能简写成线性。322 时间 O(amount·硬币种类)、额外空间 O(amount)；动态规划应先明确“能否、个数、最优值”状态含义，不能把这两题只因都是背包就共用初始化与遍历方向。

## 核验方式

本轮先检查本地 50 个目标题号：48 个在 HOT100 或面试 150 快照中，47、40 均不存在；50 个题号在扩展前算法速通题库中均不存在。随后直接浏览 LeetCode 官方题页，重点复核 74、240、162、127、50、106、427、45、134、135、452、47、40、139、152、416、322、97 的契约；其余题目以本地官方题面快照核对，链接保留原题入口。Java 字符串成本依据 OpenJDK 21 实现，未将它冒充跨所有 Java 实现的 API 复杂度保证。
