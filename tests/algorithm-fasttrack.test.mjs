import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chapters, patterns } from '../scripts/algorithm-fasttrack/outline.mjs';
import { supplements } from '../scripts/algorithm-fasttrack/supplements.mjs';
import { filterQuestions, validateDataset, initialCode } from '../src/core.js';

const data = JSON.parse(await readFile(new URL('../public/data/algorithm-fasttrack.json', import.meta.url), 'utf8'));

test('算法题速通完整覆盖七种结构、92题、44类笔记和用户指定的19道栈题', () => {
  assert.equal(validateDataset(data, 92), true);
  assert.deepEqual(data.groups, [
    { name: '数组', count: 19 }, { name: '哈希表', count: 14 }, { name: '链表', count: 12 }, { name: '堆', count: 7 },
    { name: '栈', count: 19 }, { name: '队列', count: 6 }, { name: '二叉树', count: 15 },
  ]);
  assert.equal(Object.keys(patterns).length, 44);
  assert.equal(new Set(data.questions.map(q => q.id)).size, 92);
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
  assert.equal(filterQuestions(data.questions, 'all', '二叉树').length, 15);
  assert.equal(filterQuestions(data.questions, 'all', '循环队列').length, 2);
});

test('算法题速通复用66道既有题面，补充25道重述和1道自编题，不改原有题库', async () => {
  const originals = (await Promise.all(['questions','interview150','offer'].map(async name =>
    JSON.parse(await readFile(new URL(`../public/data/${name}.json`, import.meta.url), 'utf8'))))).flatMap(d => d.questions);
  assert.equal(supplements.length, 26);
  assert.equal(data.questions.filter(q => q.contentOrigin === 'existing-workbook').length, 66);
  assert.equal(data.questions.filter(q => q.contentOrigin === 'original-restatement').length, 25);
  assert.equal(data.questions.filter(q => q.contentOrigin === 'original-exercise').length, 1);
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
    assert.throws(() => validateDataset(broken, 92), /自编题/);
  }
});

test('哈希表14题覆盖九类模式，跨章节复习不重复收题或迁移草稿', () => {
  const hashQuestions = data.questions.filter(q => q.category === '哈希表');
  assert.deepEqual(hashQuestions.map(q => Number(q.id)), [217,349,350,242,383,202,205,290,49,128,454,219,380,146]);
  assert.equal(new Set(hashQuestions.map(q => q.technique)).size, 9);
  assert.equal(filterQuestions(data.questions, 'all', '哈希表').length, 14);
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
    assert.throws(() => validateDataset(broken, 92), /速通笔记/);
  }
});
