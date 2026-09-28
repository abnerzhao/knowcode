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
