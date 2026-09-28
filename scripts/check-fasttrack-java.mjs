// Optional JDK 17 check: compile every teaching template and all new Java starters.
import { mkdtemp, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { patterns } from './algorithm-fasttrack/outline.mjs';
import { supplements } from './algorithm-fasttrack/supplements.mjs';
const run = promisify(execFile);
const dir = await mkdtemp(path.join(tmpdir(), 'knowcode-fasttrack-java-'));
const nodes = `static class ListNode { int val; ListNode next; ListNode(int value) { val=value; } }
static class TreeNode { int val; TreeNode left,right; TreeNode(int value) { val=value; } }
static class Node { int val; Node next,random; Node(int value) { val=value; } }`;
const suite = `import java.util.*;
public class TemplateSuite {
${nodes}
${Object.values(patterns).map(pattern => pattern.java).join('\n')}
static void check(boolean ok) { if (!ok) throw new AssertionError(); }
static ListNode list(int... values) {
    ListNode dummy=new ListNode(0), tail=dummy;
    for(int value:values) {tail.next=new ListNode(value);tail=tail.next;}
    return dummy.next;
}
static String values(ListNode node) {
    List<Integer> result=new ArrayList<>();
    while(node!=null) {result.add(node.val);node=node.next;}
    return result.toString();
}
public static void main(String[] args) {
    TemplateSuite t=new TemplateSuite();
    int[] rotated={1,2,3,4,5};t.rotateArray(rotated,7);
    check(Arrays.equals(rotated,new int[]{4,5,1,2,3}));
    t.rotateArray(rotated,0);check(Arrays.equals(rotated,new int[]{4,5,1,2,3}));
    int[] singleton={1};t.rotateArray(singleton,99);check(singleton[0]==1);
    check(Arrays.equals(t.productExceptSelf(new int[]{1,2,3,4}),new int[]{24,12,8,6}));
    check(Arrays.equals(t.productExceptSelf(new int[]{0,1,2}),new int[]{2,0,0}));
    check(Arrays.equals(t.productExceptSelf(new int[]{0,0,2}),new int[]{0,0,0}));
    check(Arrays.equals(t.productExceptSelf(new int[]{-1,2,-3}),new int[]{-6,3,-2}));
    check(t.firstMissingPositive(new int[]{3,4,-1,1})==2 && t.firstMissingPositive(new int[]{1,1})==2);
    check(t.firstMissingPositive(new int[]{1,2,3})==4 && t.firstMissingPositive(new int[]{7,8})==1);
    check(t.boundIndex(new int[]{1,3,5,6},2,false)==1 && t.boundIndex(new int[]{1,3,5,6},7,false)==4);
    check(t.boundIndex(new int[]{},2,false)==0 && t.boundIndex(new int[]{1,3},0,false)==0);
    check(Arrays.equals(t.searchRange(new int[]{5,7,7,8,8,10},8),new int[]{3,4}));
    check(Arrays.equals(t.searchRange(new int[]{2,2,2},2),new int[]{0,2}));
    check(Arrays.equals(t.searchRange(new int[]{},0),new int[]{-1,-1}));
    check(Arrays.equals(t.searchRange(new int[]{Integer.MAX_VALUE},Integer.MAX_VALUE),new int[]{0,0}));
    check(t.medianOfSortedArrays(new int[]{1,3},new int[]{2})==2.0);
    check(t.medianOfSortedArrays(new int[]{},new int[]{1,2})==1.5);
    check(t.medianOfSortedArrays(new int[]{1,2},new int[]{3,4})==2.5);
    check(t.medianOfSortedArrays(new int[]{Integer.MAX_VALUE},new int[]{Integer.MAX_VALUE})==Integer.MAX_VALUE);
    check(t.medianOfSortedArrays(new int[]{Integer.MIN_VALUE},new int[]{Integer.MAX_VALUE})==-0.5);
    check(t.singleNumber(new int[]{4,1,2,1,2})==4 && t.singleNumber(new int[]{-1,-1,0})==0);
    check(t.majorityElement(new int[]{2,2,1,1,1,2,2})==2 && t.majorityElement(new int[]{-3})==-3);
    int[] colors={1,2,0};t.sortColors(colors);check(Arrays.equals(colors,new int[]{0,1,2}));
    int[] colors2={2,2,0,1,0,1};t.sortColors(colors2);check(Arrays.equals(colors2,new int[]{0,0,1,1,2,2}));
    int[] permutation={1,5,1};t.nextPermutation(permutation);check(Arrays.equals(permutation,new int[]{5,1,1}));
    int[] descending={3,2,1};t.nextPermutation(descending);check(Arrays.equals(descending,new int[]{1,2,3}));
    int[] duplicates={3,3,3,3,3}, duplicatesBefore=duplicates.clone();
    check(t.findDuplicate(duplicates)==3 && Arrays.equals(duplicates,duplicatesBefore));
    check(t.findDuplicate(new int[]{1,3,4,2,2})==2 && t.findDuplicate(new int[]{1,1})==1);
    check(t.findAnagrams("abab","ab").equals(List.of(0,1,2)));
    check(t.findAnagrams("cbaebabacd","abc").equals(List.of(0,6)));
    check(t.findAnagrams("a","aa").isEmpty() && t.findAnagrams("aaa","aa").equals(List.of(0,1)));
    check(t.minWindow("ADOBECODEBANC","ABC").equals("BANC"));
    check(t.minWindow("a","aa").equals("") && t.minWindow("aa","aa").equals("aa"));
    check(t.minWindow("ab","A").equals("") && t.minWindow("bbaa","aba").equals("baa"));
    check(values(t.sortList(list(4,2,1,3))).equals("[1, 2, 3, 4]"));
    check(values(t.sortList(list(2,1))).equals("[1, 2]"));
    check(values(t.sortList(list(3,1,2,1,-1))).equals("[-1, 1, 1, 2, 3]") && t.sortList(null)==null);
    TreeNode balanced=t.sortedArrayToBST(new int[]{-10,-3,0,5,9});
    check(t.inorder(balanced).equals(List.of(-10,-3,0,5,9)) && t.height(balanced)==3 && t.validBST(balanced));
    check(t.sortedArrayToBST(new int[]{})==null && t.sortedArrayToBST(new int[]{8}).val==8);
    TreeNode flatRoot=new TreeNode(1);flatRoot.left=new TreeNode(2);flatRoot.right=new TreeNode(5);
    flatRoot.left.left=new TreeNode(3);flatRoot.left.right=new TreeNode(4);flatRoot.right.right=new TreeNode(6);
    TreeNode[] preorderNodes={flatRoot,flatRoot.left,flatRoot.left.left,flatRoot.left.right,flatRoot.right,flatRoot.right.right};
    t.flattenTree(flatRoot);TreeNode cursor=flatRoot;
    for(TreeNode expected:preorderNodes) {check(cursor==expected && cursor.left==null);cursor=cursor.right;}
    check(cursor==null);t.flattenTree(null);
    TreeNode zeros=new TreeNode(0);zeros.left=new TreeNode(0);zeros.right=new TreeNode(0);
    check(t.pathSum(zeros,0)==5 && t.pathSum(null,0)==0 && t.pathSum(new TreeNode(1),1)==1);
    TreeNode overflowRoot=new TreeNode(1000000000), overflowTail=overflowRoot;
    for(int i=0;i<3;i++) {overflowTail.right=new TreeNode(1000000000);overflowTail=overflowTail.right;}
    overflowTail.right=new TreeNode(294967296);check(t.pathSum(overflowRoot,0)==0);
    TreeNode negativePath=new TreeNode(1);negativePath.left=new TreeNode(-1);check(t.pathSum(negativePath,0)==1);
    check(t.containsDuplicate(new int[]{2,7,2}) && !t.containsDuplicate(new int[]{1,2,3}));
    check(t.containsDuplicate(new int[]{Integer.MIN_VALUE,Integer.MIN_VALUE}));
    check(t.isAnagram("anagram","nagaram") && !t.isAnagram("rat","car"));
    check(t.isAnagram("","") && !t.isAnagram("a","aa"));
    check(t.isIsomorphic("egg","add") && t.isIsomorphic("paper","title"));
    check(!t.isIsomorphic("foo","bar") && !t.isIsomorphic("ab","aa") && !t.isIsomorphic("aa","ab"));
    check(!t.isIsomorphic("a","ab"));
    Set<String> grouped=new HashSet<>();
    for(List<String> group:t.groupAnagrams(new String[]{"eat","tea","tan","ate","nat","bat","",""})) {
        Collections.sort(group);grouped.add(group.toString());
    }
    check(grouped.equals(Set.of("[ate, eat, tea]","[nat, tan]","[bat]","[, ]")));
    check(t.longestConsecutive(new int[]{100,4,200,1,3,2,1})==4);
    check(t.longestConsecutive(new int[]{})==0 && t.longestConsecutive(new int[]{0,0})==1);
    check(t.longestConsecutive(new int[]{Integer.MIN_VALUE,Integer.MAX_VALUE})==1);
    check(t.longestConsecutive(new int[]{Integer.MIN_VALUE,Integer.MIN_VALUE+1})==2);
    check(t.longestConsecutive(new int[]{Integer.MAX_VALUE-1,Integer.MAX_VALUE})==2);
    check(t.fourSumCount(new int[]{1,2},new int[]{-2,-1},new int[]{-1,2},new int[]{0,2})==2);
    check(t.fourSumCount(new int[]{0,0},new int[]{0,0},new int[]{0,0},new int[]{0,0})==16);
    check(t.fourSumCount(new int[]{268435456},new int[]{268435456},new int[]{-268435456},new int[]{-268435456})==1);
    check(t.fourSumCount(new int[]{1},new int[]{1},new int[]{1},new int[]{1})==0);
    check(t.containsNearbyDuplicate(new int[]{1,2,3,1},3));
    check(!t.containsNearbyDuplicate(new int[]{1,2,3,1,2,3},2));
    check(t.containsNearbyDuplicate(new int[]{1,2,1,1},1) && !t.containsNearbyDuplicate(new int[]{1,1},0));
    RandomSet randomSet=t.new RandomSet();
    check(randomSet.insert(10) && randomSet.insert(20) && randomSet.insert(30) && !randomSet.insert(20));
    check(randomSet.remove(20) && !randomSet.remove(20));
    for(int i=0;i<100;i++) {int value=randomSet.getRandom();check(value==10 || value==30);}
    check(randomSet.remove(30) && randomSet.getRandom()==10 && randomSet.remove(10));
    check(!randomSet.remove(10) && randomSet.insert(-1) && randomSet.getRandom()==-1);
    Lru lru=t.new Lru(2);lru.put(1,1);lru.put(2,2);check(lru.get(1)==1);
    lru.put(3,3);check(lru.get(2)==-1);lru.put(1,10);lru.put(4,4);
    check(lru.get(3)==-1 && lru.get(1)==10 && lru.get(4)==4);
    Lru single=t.new Lru(1);single.put(1,1);single.put(1,2);check(single.get(1)==2);
    single.put(2,3);check(single.get(1)==-1 && single.get(2)==3);
    check(Arrays.equals(t.plusOne(new int[]{0}),new int[]{1}));
    check(Arrays.equals(t.plusOne(new int[]{1,2,3}),new int[]{1,2,4}));
    check(Arrays.equals(t.plusOne(new int[]{1,9,9}),new int[]{2,0,0}));
    check(Arrays.equals(t.plusOne(new int[]{9,9}),new int[]{1,0,0}));
    int[] largeDigits=new int[100];Arrays.fill(largeDigits,9);
    int[] incremented=t.plusOne(largeDigits);
    check(incremented.length==101 && incremented[0]==1 && Arrays.stream(incremented).sum()==1);
    int[] uniqueInput={4,2,4,7,2,9}, uniqueBefore=uniqueInput.clone();
    check(t.firstUniqueIndex(uniqueInput)==3 && Arrays.equals(uniqueInput,uniqueBefore));
    check(t.firstUniqueIndex(new int[]{5,5,2,2})==-1 && t.firstUniqueIndex(new int[]{})==-1);
    check(t.firstUniqueIndex(new int[]{-1,3,3})==0 && t.firstUniqueIndex(new int[]{9,1})==0);
    check(t.firstUniqueIndex(new int[]{Integer.MIN_VALUE,Integer.MAX_VALUE,Integer.MIN_VALUE})==1);
    check(Arrays.equals(t.rearrangeArray(new int[]{-3,4,2,-7,-1,6}),new int[]{4,-3,2,-7,6,-1}));
    check(Arrays.equals(t.rearrangeArray(new int[]{-5,8}),new int[]{8,-5}));
    check(Arrays.equals(t.rearrangeArray(new int[]{2,2,-1,-1}),new int[]{2,-1,2,-1}));
    check(Arrays.equals(t.twoSum(new int[]{2,7,11},9),new int[]{0,1}));
    check(t.removeElement(new int[]{3,2,3},3)==1);
    check(Arrays.equals(t.twoSumSorted(new int[]{2,7,11},9),new int[]{1,2}));
    check(t.longestUnique("abba")==2 && t.longestUnique("")==0);
    check(t.countSum(new int[]{1,-1,0},0)==3);
    check(t.maxSubArray(new int[]{-3,-1,-2})==-1);
    check(Arrays.deepEquals(t.merge(new int[][]{{3,4},{1,3},{7,9}}),new int[][]{{1,4},{7,9}}));
    check(t.binarySearch(new int[]{1,3,5},3)==1 && t.binarySearch(new int[]{},1)==-1);
    check(values(t.reverse(list(1,2,3))).equals("[3, 2, 1]"));
    check(values(t.mergeLists(list(1,3),list(2,4))).equals("[1, 2, 3, 4]"));
    check(t.middle(list(1,2,3,4)).val==3 && t.middle(null)==null);
    ListNode shared=list(4,5), a=list(1), b=list(2,3);a.next=shared;b.next.next=shared;
    check(t.intersection(a,b)==shared && t.intersection(list(1),list(1))==null);
    Node original=new Node(7);original.random=original;Node copy=t.copyRandomList(original);
    check(copy!=original && copy.random==copy && t.copyRandomList(null)==null);
    check(t.kthLargest(new int[]{3,2,1,5,6,4},2)==5);
    check(t.kthLargest(new int[]{3,2,3,1,2,4,5,5,6},4)==4);
    check(t.lastStoneWeight(new int[]{9,3,2})==4 && t.lastStoneWeight(new int[]{2,2})==0);
    check(values(t.mergeKLists(new ListNode[]{list(1,4),list(2,3)})).equals("[1, 2, 3, 4]"));
    Median median=t.new Median();median.add(Integer.MAX_VALUE);median.add(Integer.MAX_VALUE);check(median.median()==Integer.MAX_VALUE);
    check(t.valid("([]{})") && !t.valid("([)]") && t.valid(""));
    TwoStackQueue queue=t.new TwoStackQueue();queue.push(4);queue.push(7);check(queue.pop()==4);queue.push(9);check(queue.pop()==7 && queue.peek()==9);
    check(t.evalRPN(new String[]{"7","3","-"})==4 && t.evalRPN(new String[]{"-7","3","/"})==-2);
    check(t.removeDuplicates("abbaca").equals("ca"));
    check(Arrays.equals(t.nextGreater(new int[]{2,2,3}),new int[]{3,3,-1}));
    Recent recent=t.new Recent();check(recent.ping(100)==1 && recent.ping(200)==2 && recent.ping(3100)==3 && recent.ping(3101)==3);
    RingQueue ring=t.new RingQueue(2);check(ring.offer(4) && ring.offer(7) && !ring.offer(9) && ring.poll() && ring.offer(9));
    check(Arrays.equals(t.maxSlidingWindow(new int[]{1,3,-1,-3,5,3,6,7},3),new int[]{3,3,5,5,6,7}));
    char[][] grid={{'1','1','0'},{'0','1','0'}};t.flood(grid,0,0);check(grid[1][1]=='0');
    TreeNode root=new TreeNode(2);root.left=new TreeNode(1);root.right=new TreeNode(3);
    check(t.levelOrder(root).toString().equals("[[2], [1, 3]]"));
    check(t.inorder(root).equals(List.of(1,2,3)));
    check(t.height(root)==2 && t.height(null)==0);
    check(t.lowestCommonAncestor(root,root.left,root.right)==root);
    check(t.validBST(root));root.right.left=new TreeNode(0);check(!t.validBST(root));
    check(t.levelOrder(t.build(new int[]{2,1,3},0,0,2,Map.of(1,0,2,1,3,2))).toString().equals("[[2], [1, 3]]"));
    System.out.println("${Object.keys(patterns).length} 个题型模板编译与边界示例通过");
}
}`;
const files = [path.join(dir, 'TemplateSuite.java')];
await writeFile(files[0], suite);
for (const question of supplements) {
  const folder = path.join(dir, `p${question.id}`);
  await mkdir(folder);
  const filename = path.join(folder, 'Starter.java');
  await writeFile(filename, `package p${question.id};\nimport java.util.*;\n${question.java}\n${nodes.replaceAll('static class', 'class')}`);
  files.push(filename);
}
await run('javac', ['--release', '17', '-encoding', 'UTF-8', ...files]);
const { stdout } = await run('java', ['-cp', dir, 'TemplateSuite']);
console.log(stdout.trim());
console.log(`${supplements.length} 个补充题的 Java 初始骨架编译通过。临时测试文件：${dir}`);
