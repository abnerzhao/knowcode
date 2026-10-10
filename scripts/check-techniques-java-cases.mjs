// Compiled with the actual teaching snippets by check-fasttrack-java.mjs.
export const techniqueJavaChecks = `
static void checkTechniques(TemplateSuite t) {
    check(t.searchSqrt(0)==0 && t.searchSqrt(1)==1 && t.searchSqrt(8)==2 && t.searchSqrt(Integer.MAX_VALUE)==46340);
    check(t.searchFlatMatrix(new int[][]{{1,3},{6,8}},6));
    check(!t.searchFlatMatrix(new int[][]{{1,3},{6,8}},4));
    check(t.searchPeak(new int[]{1})==0 && t.searchPeak(new int[]{1,2,3})==2 && t.searchPeak(new int[]{3,2,1})==0);
    check(t.searchStaircase(new int[][]{{1,4},{2,5}},2) && !t.searchStaircase(new int[][]{{1,4},{2,5}},3));
    char[][] captured={{'X','X','X','X'},{'X','O','O','X'},{'X','X','O','X'},{'X','O','X','X'}};
    t.searchCapture(captured);check(captured[1][1]=='X' && captured[2][2]=='X' && captured[3][1]=='O');
    char[][] border={{'O','O'}};t.searchCapture(border);check(border[0][0]=='O' && border[0][1]=='O');
    check(t.searchCanFinish(2,new int[][]{{1,0}}) && !t.searchCanFinish(2,new int[][]{{1,0},{0,1}}));
    check(!t.searchCanFinish(1,new int[][]{{0,0}}) && t.searchCanFinish(3,new int[][]{}));
    int[][] dependencies={{1,0},{2,0},{3,1},{3,2}};int[] order=t.searchCourseOrder(4,dependencies),position=new int[4];
    check(order.length==4);for(int i=0;i<4;i++) position[order[i]]=i;
    for(int[] edge:dependencies) check(position[edge[1]]<position[edge[0]]);
    SearchTrie trie=t.new SearchTrie();trie.insert("apple");check(trie.search("apple") && !trie.search("app") && trie.startsWith("app"));
    trie.insert("app");trie.insert("app");check(trie.search("app") && !trie.startsWith("z"));
    check(t.searchLadder("hit","cog",List.of("hot","dot","dog","lot","log","cog"))==5);
    check(t.searchLadder("hit","cog",List.of("hot","dot","dog"))==0);
    check(t.searchLadder("hit","cog",List.of("hot","cog"))==0 && t.searchLadder("a","c",List.of("a","b","c"))==2);
    check(t.dividePower(2,-2)==0.25 && t.dividePower(-1,Integer.MIN_VALUE)==1 && t.dividePower(2,0)==1 && t.dividePower(2,10)==1024);
    check(t.dividePrefix(new String[]{"flower","flow","flight"}).equals("fl"));
    check(t.dividePrefix(new String[]{"","a"}).isEmpty() && t.dividePrefix(new String[]{"a"}).equals("a"));
    TreeNode rebuilt=t.divideBuildPost(new int[]{9,3,15,20,7},new int[]{9,15,7,20,3});
    check(rebuilt.val==3 && rebuilt.left.val==9 && rebuilt.right.left.val==15 && rebuilt.right.right.val==7);
    check(t.divideBuildPost(new int[]{1},new int[]{1}).left==null);
    DivideQuadNode uniform=t.divideQuad(new int[][]{{1,1},{1,1}});check(uniform.isLeaf && uniform.val && uniform.topLeft==null);
    DivideQuadNode quad=t.divideQuad(new int[][]{{1,0},{0,1}});
    check(!quad.isLeaf && quad.topLeft.isLeaf && quad.topLeft.val && !quad.topRight.val && !quad.bottomLeft.val && quad.bottomRight.val);
    check(t.greedySingleProfit(new int[]{7,1,5,3,6,4})==5 && t.greedySingleProfit(new int[]{7,6,4})==0);
    check(t.greedyMultiProfit(new int[]{7,1,5,3,6,4})==7 && t.greedyMultiProfit(new int[]{1})==0);
    check(t.greedyCanJump(new int[]{2,3,1,1,4}) && !t.greedyCanJump(new int[]{3,2,1,0,4}));
    check(t.greedyJumps(new int[]{2,3,1,1,4})==2 && t.greedyJumps(new int[]{0})==0 && t.greedyJumps(new int[]{0,1})==-1);
    check(t.greedyPartitions("ababcbacadefegdehijhklij").equals(List.of(9,7,8)) && t.greedyPartitions("a").equals(List.of(1)));
    check(t.greedyGas(new int[]{1,2,3,4,5},new int[]{3,4,5,1,2})==3 && t.greedyGas(new int[]{2,3,4},new int[]{3,4,3})==-1);
    check(t.greedyCandy(new int[]{1,0,2})==5 && t.greedyCandy(new int[]{1,2,2})==4 && t.greedyCandy(new int[]{1})==1);
    check(t.greedyArrows(new int[][]{{1,2},{2,3},{3,4}})==2);
    check(t.greedyArrows(new int[][]{{Integer.MIN_VALUE,-1},{0,Integer.MAX_VALUE}})==2);
    check(t.btSubsets(new int[]{1,2,3}).size()==8 && t.btSubsets(new int[]{1}).contains(List.of()));
    check(t.btCombine(4,2).size()==6 && t.btCombine(3,3).equals(List.of(List.of(1,2,3))));
    List<List<Integer>> permutations=t.btPermutations(new int[]{2,2,3});
    check(permutations.size()==3 && new HashSet<>(permutations).equals(Set.of(List.of(2,2,3),List.of(2,3,2),List.of(3,2,2))));
    check(t.btPermutations(new int[]{1,2,3}).size()==6 && t.btPermutations(new int[]{-1,-1}).equals(List.of(List.of(-1,-1))));
    check(t.btPhone("").isEmpty() && t.btPhone("23").size()==9 && t.btPhone("7").equals(List.of("p","q","r","s")));
    check(new HashSet<>(t.btCombinationSum(new int[]{2,3,6,7},7,true)).equals(Set.of(List.of(2,2,3),List.of(7))));
    check(new HashSet<>(t.btCombinationSum(new int[]{1,1,2,3},4,false)).equals(Set.of(List.of(1,1,2),List.of(1,3))));
    check(t.btCombinationSum(new int[]{2,2,2},4,false).equals(List.of(List.of(2,2))));
    check(t.btCombinationSum(new int[]{2},1,true).isEmpty());
    check(t.btParentheses(3).size()==5 && t.btParentheses(1).equals(List.of("()")));
    char[][] board={{'A','B'},{'C','D'}};String before=Arrays.deepToString(board);
    check(t.btWordSearch(board,"ABD") && !t.btWordSearch(board,"ABA") && Arrays.deepToString(board).equals(before));
    check(new HashSet<>(t.btPalindromePartitions("aab")).equals(Set.of(List.of("a","a","b"),List.of("aa","b"))));
    check(t.btQueens(1).equals(List.of(List.of("Q"))) && t.btQueens(4).size()==2 && t.btQueens(2).isEmpty());
    check(t.dpClimb(1)==1 && t.dpClimb(5)==8 && t.dpClimb(45)==1836311903);
    check(t.dpRob(new int[]{2,7,9,3,1})==12 && t.dpRob(new int[]{0})==0);
    check(t.dpPascal(5).get(4).equals(List.of(1,4,6,4,1)));
    check(t.dpCoinChange(new int[]{1,2,5},11)==3 && t.dpCoinChange(new int[]{2},3)==-1 && t.dpCoinChange(new int[]{2},0)==0);
    check(t.dpSquares(12)==3 && t.dpSquares(13)==2 && t.dpSquares(1)==1);
    check(t.dpWordBreak("leetcode",List.of("leet","code")) && !t.dpWordBreak("catsandog",List.of("cats","dog","sand","and","cat")));
    check(t.dpWordBreak("aaaaaaa",List.of("aaaa","aaa")));
    check(t.dpLIS(new int[]{10,9,2,5,3,7,101,18})==4 && t.dpLIS(new int[]{2,2,2})==1);
    check(t.dpMaxProduct(new int[]{2,3,-2,4})==6 && t.dpMaxProduct(new int[]{-2,0,-1})==0 && t.dpMaxProduct(new int[]{-2,3,-4})==24);
    check(t.dpMaxProduct(new int[]{-2})==-2);
    check(t.dpEqualSubset(new int[]{1,5,11,5}) && !t.dpEqualSubset(new int[]{1,2,5}) && !t.dpEqualSubset(new int[]{1,2}));
    check(t.dpUniquePaths(3,7)==28 && t.dpUniquePaths(1,9)==1);
    check(t.dpObstaclePaths(new int[][]{{0,0,0},{0,1,0},{0,0,0}})==2 && t.dpObstaclePaths(new int[][]{{1}})==0);
    // Huge counts in a dead region cannot overflow into the surviving bottom path.
    int[][] blocked=new int[100][100];for(int r=1;r<99;r++) blocked[r][98]=1;blocked[0][98]=1;
    for(int c=1;c<98;c++) blocked[98][c]=1;blocked[98][0]=1;
    check(t.dpObstaclePaths(blocked)==0);
    check(t.dpMinPath(new int[][]{{1,3,1},{1,5,1},{4,2,1}})==7 && t.dpMinPath(new int[][]{{9}})==9);
    check(t.dpTriangle(List.of(List.of(2),List.of(3,4),List.of(6,5,7),List.of(4,1,8,3)))==11);
    check(t.dpTriangle(List.of(List.of(-10)))==-10);
    check(t.dpMaxSquare(new char[][]{{'1','1'},{'1','1'}})==4 && t.dpMaxSquare(new char[][]{{'0'}})==0);
    check(t.dpLCS("abcde","ace")==3 && t.dpLCS("abc","def")==0);
    check(t.dpEditDistance("horse","ros")==3 && t.dpEditDistance("","abc")==3);
    check(t.dpInterleave("aabcc","dbbca","aadbbcbcac") && !t.dpInterleave("aabcc","dbbca","aadbbbaccc"));
    check(t.dpInterleave("","","") && t.dpInterleave("","abc","abc") && !t.dpInterleave("a","b","a"));
    check(t.dpLongestPalindrome("babad").equals("bab") && t.dpLongestPalindrome("cbbd").equals("bb") && t.dpLongestPalindrome("a").equals("a"));
    Random random=new Random(20261010);
    for(int round=0;round<100;round++) {
        int[] nums=new int[1+random.nextInt(10)];for(int i=0;i<nums.length;i++) nums[i]=random.nextInt(7)-3;
        int best=0;
        for(int mask=1;mask<(1<<nums.length);mask++) {
            int previous=Integer.MIN_VALUE,count=0;boolean increasing=true;
            for(int i=0;i<nums.length;i++) if((mask&(1<<i))!=0) {if(nums[i]<=previous) increasing=false;previous=nums[i];count++;}
            if(increasing) best=Math.max(best,count);
        }
        check(t.dpLIS(nums)==best);
        int productBest=Integer.MIN_VALUE;
        for(int i=0;i<nums.length;i++) {int product=1;for(int j=i;j<nums.length;j++) {product*=nums[j];productBest=Math.max(productBest,product);}}
        check(t.dpMaxProduct(nums)==productBest);
    }
}
`;
