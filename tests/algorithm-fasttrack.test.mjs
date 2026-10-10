import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chapters, patterns, interviewFocus, hot100StructureCategories, hot100DeferredIds } from '../scripts/algorithm-fasttrack/outline.mjs';
import { techniqueChapters } from '../scripts/algorithm-fasttrack/techniques.mjs';
import { supplements } from '../scripts/algorithm-fasttrack/supplements.mjs';
import { filterQuestions, validateDataset, initialCode } from '../src/core.js';

const data = JSON.parse(await readFile(new URL('../public/data/algorithm-fasttrack.json', import.meta.url), 'utf8'));

test('HOT 100 火焰标记严格匹配本地题单，与面试星标独立且不更改其他题库', async () => {
  const hot100 = JSON.parse(await readFile(new URL('../public/data/questions.json', import.meta.url), 'utf8'));
  const slugs = new Set(hot100.questions.map(q => q.slug));
  for (const q of data.questions) assert.equal(q.hot100 === true, slugs.has(q.slug), q.slug);
  assert.ok(data.questions.some(q => q.hot100 && q.interviewFocus));
  assert.ok(data.questions.some(q => q.hot100 && !q.interviewFocus));
  assert.ok(data.questions.some(q => !q.hot100 && q.interviewFocus));
  assert.ok(data.questions.some(q => !q.hot100 && !q.interviewFocus));
  assert.equal(data.questions.find(q => q.id === 'A01').hot100, undefined);
  for (const file of ['questions', 'interview150', 'offer']) {
    const book = JSON.parse(await readFile(new URL(`../public/data/${file}.json`, import.meta.url), 'utf8'));
    assert.ok(book.questions.every(q => q.hot100 === undefined));
  }
  for (const value of ['true', 1, null, {}]) {
    const broken = structuredClone(data);
    broken.questions[0].hot100 = value;
    assert.throws(() => validateDataset(broken, 170), /HOT 100/);
  }
});

test('面试重点为速通册的53道编辑推荐，覆盖七类结构与五类算法且都有理由', async () => {
  const marked = data.questions.filter(q => q.interviewFocus);
  assert.equal(marked.length, 53);
  assert.deepEqual(new Set(marked.map(q => q.id)), new Set(Object.keys(interviewFocus)));
  assert.deepEqual(new Set(marked.map(q => q.category)), new Set(chapters.filter(c => c.name !== '排序算法').map(c => c.name)));
  for (const q of marked) assert.equal(q.interviewFocus, interviewFocus[q.id]);
  for (const file of ['questions', 'interview150', 'offer']) {
    const book = JSON.parse(await readFile(new URL(`../public/data/${file}.json`, import.meta.url), 'utf8'));
    assert.ok(book.questions.every(q => q.interviewFocus === undefined));
  }
  for (const value of ['', ' ', true, 30, null]) {
    const broken = structuredClone(data);
    broken.questions[0].interviewFocus = value;
    assert.throws(() => validateDataset(broken, 170), /面试重点/);
  }
});

test('算法题速通覆盖13个分类、170题、110类笔记和用户指定的19道栈题', () => {
  assert.equal(validateDataset(data, 170), true);
  assert.deepEqual(data.groups, [
    { name: '数组', count: 31 }, { name: '哈希表', count: 16 }, { name: '链表', count: 13 }, { name: '堆', count: 7 },
    { name: '栈', count: 19 }, { name: '队列', count: 6 }, { name: '二叉树', count: 18 },
    { name: '排序算法', count: 10 },
    { name: '搜索', count: 9 }, { name: '分治', count: 4 }, { name: '贪心', count: 8 },
    { name: '回溯', count: 11 }, { name: '动态规划', count: 18 },
  ]);
  assert.equal(Object.keys(patterns).length, 110);
  assert.equal(new Set(data.questions.map(q => q.id)).size, 170);
  assert.deepEqual(data.questions.filter(q => q.category === '栈').map(q => Number(q.id)),
    [20,32,921,155,232,225,1381,150,224,227,1047,735,71,394,496,739,503,84,42]);
  assert.deepEqual(data.questions.map(q => q.id), chapters.flatMap(c => c.questions.map(q => String(q[0]))));
  for (const q of data.questions) {
    for (const section of ['识别信号', '核心思路', '本题切入点', 'Java 通用模板', '复杂度与易错点', '代表题', '建议练习顺序']) {
      assert.ok(q.review.includes(section), `${q.id}: ${section}`);
    }
    assert.match(q.content, /示例/);
    assert.match(q.content, /输入/);
    assert.match(q.content, /输出/);
    assert.match(q.content, /提示|约束/);
    assert.equal(initialCode(q, 'java'), q.java);
    assert.equal(initialCode(q, 'python'), '');
  }
  assert.equal(filterQuestions(data.questions, 'all', '单调栈').length, 5);
  assert.equal(data.questions.filter(q => q.category === '二叉树').length, 18);
  assert.equal(filterQuestions(data.questions, 'all', '循环队列').length, 2);
});

test('算法题速通复用132道既有题面，补充27道重述和11道自编题，不改原有题库', async () => {
  const originals = (await Promise.all(['questions','interview150','offer'].map(async name =>
    JSON.parse(await readFile(new URL(`../public/data/${name}.json`, import.meta.url), 'utf8'))))).flatMap(d => d.questions);
  assert.equal(supplements.length, 38);
  assert.equal(data.questions.filter(q => q.contentOrigin === 'existing-workbook').length, 132);
  assert.equal(data.questions.filter(q => q.contentOrigin === 'original-restatement').length, 27);
  assert.equal(data.questions.filter(q => q.contentOrigin === 'original-exercise').length, 11);
  for (const q of data.questions) {
    const original = originals.find(item => item.id === q.id) || supplements.find(item => item.id === q.id);
    for (const key of ['id', 'slug', 'title', 'difficulty', 'content', 'java', 'source']) assert.deepEqual(q[key], original[key], `${q.id}/${key}`);
  }
});

test('指定数组题全部收录且不重复，自编题不冒用力扣来源', () => {
  for (const id of ['66', '215', 'A01', '88', '2149']) {
    const matches = data.questions.filter(q => q.id === id);
    assert.equal(matches.length, 1);
    assert.equal(matches[0].category, '数组');
  }
  const original = data.questions.find(q => q.id === 'A01');
  assert.equal(original.contentOrigin, 'original-exercise');
  assert.match(original.content, /本站自编/);
  assert.match(original.source, /^https:\/\/docs\.oracle\.com\//);
  assert.ok(original.references.some(ref => ref.url === original.source));
  for (const patch of [{ source: 'https://evil.example/' }, { references: [] },
    { references: [{ title: '错误来源', url: 'javascript:alert(1)' }] }]) {
    const broken = structuredClone(data);
    Object.assign(broken.questions.find(q => q.id === 'A01'), patch);
    assert.throws(() => validateDataset(broken, 170), /自编题/);
  }
});

test('哈希表16题覆盖十一类模式，跨章节复习不重复收题或迁移草稿', () => {
  const hashQuestions = data.questions.filter(q => q.category === '哈希表');
  assert.deepEqual(hashQuestions.map(q => Number(q.id)), [217,349,350,242,383,202,205,290,49,128,454,219,380,146,438,76]);
  assert.equal(new Set(hashQuestions.map(q => q.technique)).size, 11);
  assert.equal(filterQuestions(data.questions, 'all', '哈希表').length, 16);
  assert.equal(filterQuestions(data.questions, 'all', '双向映射').length, 2);
  for (const id of ['1', 'A01', '560', '347']) {
    assert.equal(data.questions.filter(q => q.id === id).length, 1);
    assert.notEqual(data.questions.find(q => q.id === id).category, '哈希表');
  }
  assert.match(hashQuestions.find(q => q.id === '350').review, /频次的较小者/);
  assert.match(hashQuestions.find(q => q.id === '146').review, /LinkedHashMap/);
  for (const id of ['217', '349', '350', '454']) {
    const q = hashQuestions.find(q => q.id === id);
    assert.equal(q.contentOrigin, 'original-restatement');
    assert.ok((q.content.match(/<h3>示例/g) || []).length >= 2);
    assert.match(q.java, /UnsupportedOperationException/);
  }
});

test('速通笔记缺失题型或内容时校验失败', () => {
  for (const patch of [{ review: '' }, { review: 123 }, { technique: '' }]) {
    const broken = JSON.parse(JSON.stringify(data));
    Object.assign(broken.questions[0], patch);
    assert.throws(() => validateDataset(broken, 170), /速通笔记/);
  }
});

test('十大排序为独立自编练习，题面、模板、条件完整且不冒用力扣编号', () => {
  const sorting = data.questions.filter(q => q.category === '排序算法');
  assert.deepEqual(sorting.map(q => q.title), ['冒泡排序', '选择排序', '插入排序', '希尔排序', '归并排序', '快速排序', '堆排序', '计数排序', '桶排序', '基数排序']);
  assert.equal(filterQuestions(data.questions, 'all', '排序算法').length, 10);
  assert.deepEqual(sorting.map(q => q.id), Array.from({ length: 10 }, (_, i) => `S${String(i + 1).padStart(2, '0')}`));
  for (const q of sorting) {
    assert.equal(q.contentOrigin, 'original-exercise');
    assert.equal(q.hot100, undefined);
    assert.equal(q.interviewFocus, undefined);
    assert.match(q.content, /本站自编/);
    assert.match(q.java, /public int\[\] sortArray\(int\[\] nums\)/);
    assert.match(q.java, /UnsupportedOperationException/);
    assert.match(q.review, /稳定性/);
    assert.match(q.review, /额外空间|额外栈空间/);
    assert.ok(q.references.some(ref => ref.url === q.source));
    const linked = ['sorting-merge', 'sorting-quick', 'sorting-heap'].includes(q.slug);
    assert.equal(q.content.includes('912. 排序数组'), linked);
    assert.equal(q.references.some(ref => ref.url.includes('leetcode.cn')), linked);
  }
  assert.match(sorting.find(q => q.id === 'S04').review, /折半增量/);
  assert.match(sorting.find(q => q.id === 'S06').content, /期望 O\(n log n\)/);
  assert.match(sorting.find(q => q.id === 'S08').content, /-10000/);
  assert.match(sorting.find(q => q.id === 'S09').review, /均匀分布/);
  assert.match(sorting.find(q => q.id === 'S10').content, /2147483647/);
  assert.match(sorting.find(q => q.id === 'S10').review, /long/);
});

test('HOT100原数据结构范围保留，新算法补齐后仅暂缓三道纯矩阵题', async () => {
  const hot = JSON.parse(await readFile(new URL('../public/data/questions.json', import.meta.url), 'utf8'));
  const target = hot.questions.filter(q => hot100StructureCategories.includes(q.category) && !q.tags.includes('矩阵'));
  assert.equal(target.length, 64);
  for (const q of target) assert.ok(data.questions.some(item => item.slug === q.slug), q.id);
  assert.equal(data.questions.filter(q => q.hot100).length, 97);
  for (const q of hot.questions) assert.equal(data.questions.some(item => item.slug === q.slug), !hot100DeferredIds.includes(q.id));
  const additions = [438,76,189,238,41,148,108,114,437,35,34,153,4,136,169,75,31,287];
  for (const id of additions) {
    const q = data.questions.find(item => item.id === String(id));
    assert.ok(q.hot100);
    assert.equal(q.contentOrigin, 'existing-workbook');
    const original = hot.questions.find(item => item.id === String(id));
    for (const key of ['slug','title','content','java','source']) assert.equal(q[key], original[key]);
  }
  for (const id of [73,54,48]) {
    assert.ok(!data.questions.some(q => q.id === String(id)), `${id} 留给独立分类`);
  }
  for (const id of [32,200,994]) assert.ok(data.questions.some(q => q.id === String(id)), '保留已有跨主题题目');
});

test('五类算法追加50题不重复，旧120题顺序保留，星标与火焰有依据', async () => {
  const expected = {
    搜索: [69,74,162,240,130,207,210,208,127], 分治: [50,14,106,427],
    贪心: [121,122,55,45,763,134,135,452], 回溯: [78,77,46,47,17,39,40,22,79,131,51],
    动态规划: [70,118,198,279,322,139,300,152,416,62,63,64,120,221,1143,72,97,5],
  };
  const newQuestions = data.questions.slice(120);
  assert.equal(data.questions[119].id, 'S10');
  assert.equal(newQuestions.length, 50);
  assert.equal(newQuestions.filter(q => q.hot100).length, 30);
  assert.equal(newQuestions.filter(q => q.interviewFocus).length, 23);
  assert.deepEqual(techniqueChapters.map(c => c.name), Object.keys(expected));
  for (const [category, ids] of Object.entries(expected)) {
    const questions = newQuestions.filter(q => q.category === category);
    assert.deepEqual(questions.map(q => Number(q.id)), ids);
    assert.ok(questions.some(q => q.interviewFocus), category);
    for (const q of questions) {
      assert.ok(patterns[techniqueChapters.find(c => c.name === category).questions.find(item => String(item[0]) === q.id)[1]]);
      assert.ok(q.source.startsWith('https://leetcode.cn/problems/'));
      assert.ok(q.java.trim());
      assert.equal(data.questions.filter(item => item.slug === q.slug).length, 1);
    }
  }
  // Sorting IDs and pre-existing cross-topic exercises keep their old homes.
  for (const [id, category] of [['704','数组'],['53','数组'],['32','栈'],['148','链表'],['200','队列'],['994','队列']]) {
    const matches = data.questions.filter(q => q.id === id);
    assert.equal(matches.length, 1); assert.equal(matches[0].category, category);
  }
  for (const id of ['40','47']) {
    const q = newQuestions.find(q => q.id === id);
    assert.equal(q.contentOrigin, 'original-restatement');
    assert.ok((q.content.match(/示例/g) || []).length >= 2);
    assert.match(q.java, /UnsupportedOperationException/);
  }
});
