// Original standalone exercises. Sources explain algorithms, not online-judge contracts.
const elementary = 'https://algs4.cs.princeton.edu/21elementary/';
const linear = 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/mit6_006f11_lec07/';
const leetcodeSorting = 'https://leetcode.cn/problems/sort-an-array/description/';
const relatedPractice = item => ['merge', 'quick', 'heap'].includes(item.key)
  ? `<h3>关联力扣练习</h3><p><a href="${leetcodeSorting}">912. 排序数组 ↗</a>：可用本算法练习，但原题不指定排序算法；原题要求 O(n log n)，长度为 1..50000、值域为 -50000..50000。这里的自编题允许空数组及更宽值域，不替代原题约束。${item.key === 'quick' ? '随机快排只有期望 O(n log n)，最坏仍为 O(n²)；需要最坏时间保证时选择归并或堆排序。' : ''}</p>`
  : '';
const definitions = [
  {
    key: 'bubble', title: '冒泡排序', english: 'Bubble Sort', difficulty: 'easy', source: 'https://algs4.cs.princeton.edu/21elementary/Bubble.java.html',
    task: '只通过相邻元素比较与交换实现冒泡排序；某一轮未发生交换时应提前结束。',
    signals: ['相邻交换', '每轮把一个最大值送到末尾'],
    idea: '从左向右比较相邻元素，逆序就交换；一轮后，未排序部分的最大值落到右端。下一轮少比较一个位置。',
    focus: '说明每轮结束后哪一段已经有序，以及如何判断可以提前终止。',
    boundary: '本模板最好 O(n)（已有序且提前结束），平均、最坏 O(n²)，额外空间 O(1)。稳定性：稳定，因为只在左值严格大于右值时交换；相等时不要交换。',
    java: `int[] bubbleSort(int[] nums) {
    for (int end = nums.length - 1; end > 0; end--) {
        boolean swapped = false;
        for (int i = 0; i < end; i++) {
            if (nums[i] > nums[i + 1]) {
                int temp = nums[i]; nums[i] = nums[i + 1]; nums[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return nums;
}`,
  },
  {
    key: 'selection', title: '选择排序', english: 'Selection Sort', difficulty: 'easy', source: elementary,
    task: '实现直接选择排序：每轮从剩余元素中选出最小值，交换到当前未排序区间的第一个位置。',
    signals: ['每轮选出最小值', '一次选择后交换到前缀'],
    idea: '把数组分为已排序前缀和未排序后缀，扫描后缀找最小值下标，再与后缀首位交换。',
    focus: '先记住最小值的下标，扫描结束后再交换；思考长距离交换会不会改变相等元素的先后关系。',
    boundary: '本模板最好、平均、最坏都是 O(n²)，额外空间 O(1)，交换次数 O(n)。稳定性：不稳定，例如 [2a, 2b, 1] 第一次交换后变为 [1, 2b, 2a]；a/b 仅用于标记原有先后顺序。',
    java: `int[] selectionSort(int[] nums) {
    for (int i = 0; i < nums.length - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[minIndex]) minIndex = j;
        }
        int temp = nums[i]; nums[i] = nums[minIndex]; nums[minIndex] = temp;
    }
    return nums;
}`,
  },
  {
    key: 'insertion', title: '插入排序', english: 'Insertion Sort', difficulty: 'easy', source: elementary,
    task: '实现直接插入排序：逐个将当前元素插入左侧已排序部分，使用元素后移腾出位置。',
    signals: ['有序前缀', '少量元素或基本有序'],
    idea: '像整理手中的扑克牌一样，先保存新元素，把前面比它大的值依次右移，最后把它放进空位。',
    focus: '必须先保存待插入值；从右向左移动前缀，不要覆盖还没比较的元素。',
    boundary: '本模板最好 O(n)，平均、最坏 O(n²)，额外空间 O(1)。稳定性：稳定，因为只移动严格大于待插入值的元素。对基本有序输入通常比较高效。',
    java: `int[] insertionSort(int[] nums) {
    for (int i = 1; i < nums.length; i++) {
        int value = nums[i], j = i - 1;
        while (j >= 0 && nums[j] > value) {
            nums[j + 1] = nums[j]; j--;
        }
        nums[j + 1] = value;
    }
    return nums;
}`,
  },
  {
    key: 'shell', title: '希尔排序', english: 'Shell Sort', difficulty: 'medium', source: elementary,
    task: '实现希尔排序，使用 gap = n / 2 开始、每轮 gap /= 2 的增量序列；对间隔为 gap 的元素执行插入排序，直到 gap = 1 这一轮结束。',
    signals: ['分组插入', '缩小增量直到 1'],
    idea: '先让相距较远的元素快速接近正确位置，再逐渐缩短间隔，最后用一次普通插入排序收尾。',
    focus: '组内比较和后移都使用 gap，不是 1；一定要执行 gap=1 的最后一轮。',
    boundary: '本模板使用折半增量：最好 O(n log n)，最坏 O(n²)，额外空间 O(1)。平均复杂度与增量序列、输入分布有关，不统一写成 O(n log n)。稳定性：不稳定，跨间隔移动可能越过相等元素。参考资料中的 3h+1 增量与此实现不同，不能照搬其界。',
    java: `int[] shellSort(int[] nums) {
    for (int gap = nums.length / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < nums.length; i++) {
            int value = nums[i], j = i;
            while (j >= gap && nums[j - gap] > value) {
                nums[j] = nums[j - gap]; j -= gap;
            }
            nums[j] = value;
        }
    }
    return nums;
}`,
  },
  {
    key: 'merge', title: '归并排序', english: 'Merge Sort', difficulty: 'medium',
    source: 'https://algs4.cs.princeton.edu/22mergesort/',
    task: '实现自顶向下的归并排序：递归排序两个子区间，再合并为有序区间。允许使用一个辅助数组；要求相等元素保持原有先后顺序。',
    signals: ['分治后合并有序段', '需要稳定的 O(n log n) 排序'],
    idea: '不断对半拆分到只剩一个元素，再用两个指针从小到大合并。小区间有序后，更大的区间也就能合并有序。',
    focus: '统一使用闭区间 [left, right]；相等时先取左半边，合并完再复制回原数组。',
    boundary: '本模板最好、平均、最坏 O(n log n)，额外空间 O(n)，包含 O(n) 缓冲区和 O(log n) 递归栈。稳定性：稳定，依赖相等时先取左侧。返回原数组不意味着原地常数空间排序。',
    java: `int[] mergeSort(int[] nums) {
    sortingMergeRange(nums, new int[nums.length], 0, nums.length - 1);
    return nums;
}
void sortingMergeRange(int[] nums, int[] temp, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    sortingMergeRange(nums, temp, left, mid);
    sortingMergeRange(nums, temp, mid + 1, right);
    int i = left, j = mid + 1, write = left;
    while (i <= mid && j <= right) {
        temp[write++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];
    }
    while (i <= mid) temp[write++] = nums[i++];
    while (j <= right) temp[write++] = nums[j++];
    System.arraycopy(temp, left, nums, left, right - left + 1);
}`,
  },
  {
    key: 'quick', title: '快速排序', english: 'Quick Sort', difficulty: 'medium',
    source: 'https://algs4.cs.princeton.edu/23quicksort/',
    task: '实现快速排序，自行选择基准值并划分区间，递归处理两侧；要求正确处理大量重复值。进阶：使用随机基准和三路划分，避免相等元素反复参与递归。',
    signals: ['基准划分', '小于、等于、大于三段'],
    idea: '随机选一个基准，把元素分为小于、等于、大于基准的三段；等于段已经就位，只需继续处理两侧。',
    focus: '与右端交换后，当前元素还没检查，不能直接推进 i；模板只递归较短一侧，较长一侧用循环继续，以限制调用栈。',
    boundary: '随机基准的期望时间 O(n log n)，最坏仍为 O(n²)，全相等时三路划分只需 O(n)。本模板只递归短侧，因此额外栈空间最坏 O(log n)；普通双侧递归快排的最坏栈空间是 O(n)。稳定性：不稳定。',
    java: `int[] quickSort(int[] nums) {
    sortingQuickRange(nums, 0, nums.length - 1, new Random());
    return nums;
}
void sortingQuickRange(int[] nums, int left, int right, Random random) {
    while (left < right) {
        int pivot = nums[left + random.nextInt(right - left + 1)];
        int lt = left, i = left, gt = right;
        while (i <= gt) {
            if (nums[i] < pivot) {
                int temp = nums[lt]; nums[lt++] = nums[i]; nums[i++] = temp;
            } else if (nums[i] > pivot) {
                int temp = nums[gt]; nums[gt--] = nums[i]; nums[i] = temp;
            } else i++;
        }
        if (lt - left < right - gt) {
            sortingQuickRange(nums, left, lt - 1, random);
            left = gt + 1;
        } else {
            sortingQuickRange(nums, gt + 1, right, random);
            right = lt - 1;
        }
    }
}`,
  },
  {
    key: 'heap', title: '堆排序', english: 'Heap Sort', difficulty: 'medium',
    source: 'https://algs4.cs.princeton.edu/24pq/',
    task: '在输入数组上手写大顶堆，实现升序堆排序。先自底向上建堆，再反复把堆顶移到末尾，并调整剩余堆；不能用 PriorityQueue 代替建堆。',
    signals: ['原地建堆', '反复取最大值到末尾'],
    idea: '先把数组变成父节点不小于孩子的大顶堆；堆顶与末尾交换后缩小堆，再让新堆顶下沉，直到全部有序。',
    focus: '堆范围使用 [0, size)，已排好序的后缀不参与下沉；最后一个非叶节点是 n/2-1。',
    boundary: '建堆 O(n)，总体平均、最坏 O(n log n)，额外空间 O(1)。本模板遇到无需下沉会提前结束，全相等输入可为 O(n)；不要把所有实现的最好情况都写成 Θ(n log n)。稳定性：不稳定，堆顶与末尾交换可能打乱相等元素。',
    java: `int[] heapSort(int[] nums) {
    for (int i = nums.length / 2 - 1; i >= 0; i--) sortingSiftDown(nums, i, nums.length);
    for (int end = nums.length - 1; end > 0; end--) {
        int temp = nums[0]; nums[0] = nums[end]; nums[end] = temp;
        sortingSiftDown(nums, 0, end);
    }
    return nums;
}
void sortingSiftDown(int[] nums, int root, int size) {
    while (root < size / 2) {
        int child = root * 2 + 1;
        if (child + 1 < size && nums[child + 1] > nums[child]) child++;
        if (nums[root] >= nums[child]) break;
        int temp = nums[root]; nums[root] = nums[child]; nums[child] = temp;
        root = child;
    }
}`,
  },
  {
    key: 'counting', title: '计数排序', english: 'Counting Sort', difficulty: 'medium', source: linear,
    domain: '-10000 ≤ nums[i] ≤ 10000',
    task: '实现计数排序，支持负数。使用计数、前缀累计和辅助数组完成稳定排序；不要只按频次重建数值后就声称记录排序稳定。',
    signals: ['整数值域小', '以值作为计数下标'],
    idea: '把最小值平移到下标 0，统计各值次数；累积次数给出每个值的结束位置，从右向左放入结果以保留相等元素的顺序。',
    focus: '用 value-min 映射下标；放置时先减计数再使用下标。若排序的是带附加信息的记录，需要移动完整记录。',
    boundary: '令 K=max-min+1，本模板时间 O(n+K)，额外空间 O(n+K)，不能无视值域宽度。稳定性：稳定，依赖前缀累计与从右向左放置；只输出重复数值的简化写法不能说明带记录的稳定性。本题小值域避免计数数组过大及 max-min 溢出。',
    java: `int[] countingSort(int[] nums) {
    if (nums.length < 2) return nums;
    int min = nums[0], max = nums[0];
    for (int value : nums) { min = Math.min(min, value); max = Math.max(max, value); }
    int[] counts = new int[max - min + 1];
    for (int value : nums) counts[value - min]++;
    for (int i = 1; i < counts.length; i++) counts[i] += counts[i - 1];
    int[] sorted = new int[nums.length];
    for (int i = nums.length - 1; i >= 0; i--) sorted[--counts[nums[i] - min]] = nums[i];
    System.arraycopy(sorted, 0, nums, 0, nums.length);
    return nums;
}`,
  },
  {
    key: 'bucket', title: '桶排序', english: 'Bucket Sort', difficulty: 'medium', source: 'https://algs4.cs.princeton.edu/51radix/',
    domain: '0 ≤ nums[i] ≤ 1000000',
    task: '实现桶排序：把数值映射到多个有序范围的桶，使用插入排序整理每个桶，再按桶号合并。不得调用库排序。说明输入分布对性能的影响。',
    signals: ['数值分布较均匀', '按范围分桶再分别排序'],
    idea: '先粗分到不同数值区间，再精排桶内元素。桶号越小，所有元素都不会大于后面桶的元素，因此可以按桶号拼接。',
    focus: '模板用 n 个桶，映射为 value*n/(max+1)；乘法和 max+1 用 long。桶内保持插入顺序，相等值不后移。',
    boundary: '令 B 为桶数，mᵢ 为第 i 桶元素数，本模板时间 O(n+B+Σmᵢ²) 是上界，额外空间 O(n+B)。B=n 且输入独立、在分桶区间内近似均匀分布时，期望时间 O(n)；严重集中并逆序时可退化到 O(n²)。稳定性：本实现稳定，依赖顺序入桶和稳定的桶内插入排序，并非任意桶内排序都稳定。',
    java: `int[] bucketSort(int[] nums) {
    if (nums.length < 2) return nums;
    int max = 0, n = nums.length;
    for (int value : nums) max = Math.max(max, value);
    List<List<Integer>> buckets = new ArrayList<>();
    for (int i = 0; i < n; i++) buckets.add(new ArrayList<>());
    for (int value : nums) {
        int index = (int) ((long) value * n / (max + 1L));
        buckets.get(index).add(value);
    }
    int write = 0;
    for (List<Integer> bucket : buckets) {
        for (int i = 1; i < bucket.size(); i++) {
            int value = bucket.get(i), j = i - 1;
            while (j >= 0 && bucket.get(j) > value) {
                bucket.set(j + 1, bucket.get(j)); j--;
            }
            bucket.set(j + 1, value);
        }
        for (int value : bucket) nums[write++] = value;
    }
    return nums;
}`,
  },
  {
    key: 'radix', title: '基数排序', english: 'Radix Sort', difficulty: 'medium', source: linear,
    domain: '0 ≤ nums[i] ≤ 2147483647（Java int 最大值）',
    task: '实现十进制 LSD 基数排序：从个位到最高位，逐位执行稳定计数排序。本题只要求非负整数，需要正确处理 0 和 int 最大值；不得转为字符串调用库排序。',
    signals: ['按整数位数排序', '低位到高位逐轮处理'],
    idea: '先按个位稳定排序，再按十位稳定排序，依次处理更高位。每轮稳定地保留低位已经形成的顺序，最终得到整体升序。',
    focus: '每轮都要重置 10 个数字的计数，按累计位置从右向左放置；位权 exp 使用 long，避免乘 10 后溢出。',
    boundary: '令 d 为最大值的十进制位数，b=10，时间 O(d(n+b))，额外空间 O(n+b)。稳定性：稳定，前提是每位排序稳定。本模板仅处理非负整数，不可直接用于负数；0 不需要额外位处理，long 位权覆盖 int 最大值。',
    java: `int[] radixSort(int[] nums) {
    int max = 0;
    for (int value : nums) max = Math.max(max, value);
    int[] sorted = new int[nums.length];
    for (long exp = 1; max / exp > 0; exp *= 10) {
        int[] counts = new int[10];
        for (int value : nums) counts[(int) (value / exp % 10)]++;
        for (int i = 1; i < 10; i++) counts[i] += counts[i - 1];
        for (int i = nums.length - 1; i >= 0; i--) {
            int digit = (int) (nums[i] / exp % 10);
            sorted[--counts[digit]] = nums[i];
        }
        System.arraycopy(sorted, 0, nums, 0, nums.length);
    }
    return nums;
}`,
  },
];

const idOf = index => `S${String(index + 1).padStart(2, '0')}`;
export const sortingChapter = {
  name: '排序算法',
  core: '比较排序靠元素间比较确定顺序；计数、桶、基数排序利用值域或位数。先确认数据范围、额外空间与稳定性要求，再选算法。稳定指相同键的记录在排序后保持原有先后顺序。以下性质均针对笔记中的具体实现。',
  stages: ['基础比较：S01 冒泡 → S02 选择 → S03 插入', '比较排序进阶：S04 希尔 → S05 归并 → S06 快速 → S07 堆', '值域与位数：S08 计数 → S09 桶 → S10 基数', '复盘：比较最好/平均/最坏时间、额外空间、稳定性及适用条件；用空数组、重复值和逆序数组验证'],
  questions: definitions.map((item, index) => [idOf(index), `sorting-${item.key}`, item.focus]),
};

export const sortingPatterns = Object.fromEntries(definitions.map(item => [`sorting-${item.key}`, {
  title: item.title, signals: item.signals, idea: item.idea, java: item.java, boundary: item.boundary,
}]));

export const sortingQuestions = definitions.map((item, index) => ({
  id: idOf(index), slug: `sorting-${item.key}`, title: item.title, englishTitle: item.english,
  difficulty: item.difficulty, tags: ['排序', item.title], contentOrigin: 'original-exercise',
  source: item.source,
  references: [{ title: '排序算法学习参考（非 LeetCode 原题）', url: item.source },
    ...(['merge', 'quick', 'heap'].includes(item.key) ? [{ title: '关联练习：912. 排序数组', url: leetcodeSorting }] : [])],
  content: `<p>本站自编练习，编号 ${idOf(index)}，不对应 LeetCode 题号。难度为本站练习分级。</p>` +
    `<p>给定整数数组 <code>nums</code>，${item.task}</p>` +
    '<p>实现 <code>public int[] sortArray(int[] nums)</code>，将数组按非递减顺序排列，修改输入数组并返回同一个数组引用。保留所有重复元素；允许使用算法所需的辅助空间。不要调用 <code>Arrays.sort</code>、<code>Collections.sort</code>、流式排序或有序容器代替手写算法。</p>' +
    '<h3>示例 1</h3><pre>输入：nums = [5,1,4,2,2]\n输出：[1,2,2,4,5]</pre><p>两个 2 都需要保留，输出也写回原数组。</p>' +
    '<h3>示例 2</h3><pre>输入：nums = []\n输出：[]</pre><p>空数组直接返回。</p>' +
    (item.domain?.startsWith('0')
      ? '<h3>示例 3</h3><pre>输入：nums = [10,0,1,10]\n输出：[0,1,10,10]</pre>'
      : '<h3>示例 3</h3><pre>输入：nums = [-3,0,-3,2]\n输出：[-3,-3,0,2]</pre>') +
    `<h3>约束</h3><p>输入不为 null；0 ≤ nums.length ≤ ${['bubble', 'selection', 'insertion', 'shell', 'bucket'].includes(item.key) ? '2000' : '100000'}；${item.domain || '元素为 Java int 范围内的整数'}。</p>` +
    '<h3>复习追问</h3><ul><li>解释每轮或每次递归保持的不变量。</li><li>分析时间复杂度、额外空间以及稳定性，说明结论依赖哪些条件。</li><li>已有序、逆序、全相等、空数组时分别会怎样？</li></ul>' + relatedPractice(item),
  java: `class Solution {
    public int[] sortArray(int[] nums) {
        // TODO: 手写${item.title}，修改并返回 nums
        throw new UnsupportedOperationException("TODO");
    }
}
`,
}));
