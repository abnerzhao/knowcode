import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { DIFFICULTIES, LANGUAGES, draftKey, initialCode, filterQuestions, randomRound, normalizeSaved, validateDataset, parsePracticeRoute, practiceHash } from '../src/core.js';
import { BANKS, storageKey } from '../src/banks.js';

const dataset = JSON.parse(await readFile(new URL('../public/data/questions.json', import.meta.url), 'utf8'));
const questions = dataset.questions;

test('首页先选择题库，练习链接保留题库、模式、题目和难度，兼容旧链接', () => {
  for (const hash of ['', '#/', '#rotate-array', '#/unknown/two-sum']) {
    assert.deepEqual(parsePracticeRoute(hash), { bank: null, mode: null });
  }
  assert.deepEqual(parsePracticeRoute(practiceHash('ordered', 'two-sum')), { bank: 'hot100', mode: 'ordered', slug: 'two-sum', difficulty: 'all' });
  assert.deepEqual(parsePracticeRoute(practiceHash('random', 'trapping-rain-water', 'hard')), { bank: 'hot100', mode: 'random', slug: 'trapping-rain-water', difficulty: 'hard' });
  assert.equal(parsePracticeRoute('#/random/two-sum?difficulty=invalid').difficulty, 'all');
  assert.equal(parsePracticeRoute('#/random/two-sum?difficulty=constructor').difficulty, 'all');
  assert.equal(parsePracticeRoute('#/ordered').slug, null);
  assert.deepEqual(parsePracticeRoute('#/random'), { bank: 'hot100', mode: 'random', slug: null, difficulty: 'all' });
  for (const bank of BANKS) {
    assert.deepEqual(parsePracticeRoute(`#/${bank.id}`), { bank: bank.id, mode: null });
    assert.equal(parsePracticeRoute(`#/${bank.id}/random`).slug, null);
    assert.equal(parsePracticeRoute(practiceHash('random', 'two-sum', 'easy', bank.id)).bank, bank.id);
  }
  assert.equal(storageKey('hot100'), 'hot100-review:v1');
  assert.equal(new Set(BANKS.map(bank => storageKey(bank.id))).size, BANKS.length);
});

for (const bank of BANKS) {
  test(`${bank.name} 完整性、分类、随机抽题与本地图片`, async () => {
    const data = JSON.parse(await readFile(new URL(`../public/data/${bank.file}`, import.meta.url), 'utf8'));
    assert.equal(validateDataset(data, bank.count), true);
    if (bank.plan) assert.equal(data.source, `https://leetcode.cn/studyplan/${bank.plan}/`);
    for (const group of data.groups) assert.equal(data.questions.filter(q => q.category === group.name).length, group.count);
    for (const difficulty of ['all', ...Object.keys(DIFFICULTIES)]) {
      const pool = filterQuestions(data.questions, difficulty);
      assert.deepEqual(new Set(randomRound(pool)), new Set(pool.map(q => q.slug)));
    }
    for (const q of data.questions) {
      assert.match(q.content, q.format === 'questions-only' ? /？/ : /示例/);
      if (bank.kind === 'discussion') {
        assert.equal(q.kind, 'discussion');
        if (q.format !== 'questions-only') {
          assert.match(q.content, /追问/);
          assert.match(q.content, /练习假设/);
          assert.match(q.content, /参考来源/);
        }
        assert.ok(q.references.length > 0);
        assert.equal(initialCode(q, 'java'), q.answerTemplate);
        assert.equal(initialCode(q, 'python'), q.answerTemplate);
      } else assert.match(q.java, /class\s+\w+/);
      for (const [, src] of q.content.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
        assert.match(src, /^\.\/images\/[a-f0-9]{20}\.(png|jpe?g|gif|webp|svg)$/);
        assert.ok((await stat(new URL(`../public/${src}`, import.meta.url))).size > 0);
      }
    }
    if (bank.id === 'offer') assert.ok(data.questions.every(q => q.slug.endsWith('-lcof')));
  });
}

test('完整 100 题，官方顺序、分类、中文题干、示例与 Java 模板均存在', () => {
  assert.equal(validateDataset(dataset), true);
  assert.deepEqual(questions.slice(0, 9).map(q => q.id), ['1', '49', '128', '283', '11', '15', '42', '3', '438']);
  assert.equal(new Set(questions.map(q => q.id)).size, 100);
  for (const group of dataset.groups) assert.equal(questions.filter(q => q.category === group.name).length, group.count);
  for (const q of questions) {
    assert.match(q.content, /输入|Input/, q.slug);
    assert.match(q.content, /输出|Output/, q.slug);
    assert.match(q.java, /class\s+\w+/, q.slug);
    assert.match(q.content, /提示|约束/, q.slug);
    assert.ok(q.tags.length > 0);
  }
});

test('数据损坏、缺题、重复题会明确失败', () => {
  assert.throws(() => validateDataset({ ...dataset, questions: questions.slice(1) }));
  assert.throws(() => validateDataset({ ...dataset, questions: questions.map((q, i) => i === 1 ? questions[0] : q) }));
  assert.throws(() => validateDataset({ ...dataset, questions: questions.map((q, i) => i === 1 ? { ...q, content: '' } : q) }));
});

test('所有题目图片已本地化，文件存在且非空', async () => {
  const images = new Set();
  for (const q of questions) {
    for (const [, src] of q.content.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
      assert.match(src, /^\.\/images\/[a-f0-9]{20}\.(png|jpe?g|gif|webp|svg)$/);
      images.add(src);
    }
  }
  assert.ok(images.size > 0);
  for (const image of images) {
    const info = await stat(new URL(`../public/${image}`, import.meta.url));
    assert.ok(info.size > 100, image);
  }
});

test('筛选保持官方顺序，难度、中文、英文、编号、空结果均正确', () => {
  assert.deepEqual(filterQuestions(questions), questions);
  assert.equal(filterQuestions(questions, 'all', '  两数之和  ')[0].slug, 'two-sum');
  assert.equal(filterQuestions(questions, 'all', 'TWO SUM')[0].slug, 'two-sum');
  assert.equal(filterQuestions(questions, 'all', '438')[0].slug, 'find-all-anagrams-in-a-string');
  assert.equal(filterQuestions(questions, 'hard', '两数之和').length, 0);
  assert.equal(filterQuestions(questions, 'all', 'no-such-question-xyz').length, 0);
  for (const difficulty of Object.keys(DIFFICULTIES)) {
    const pool = filterQuestions(questions, difficulty);
    assert.ok(pool.length > 0);
    assert.ok(pool.every(q => q.difficulty === difficulty));
    assert.deepEqual(pool.map(q => q.order), pool.map(q => q.order).sort((a, b) => a - b));
  }
});

test('随机抽题每轮完整覆盖、无重复、仅来自指定难度且不会立即重抽当前题', () => {
  let seed = 731;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32; };
  for (const difficulty of ['all', ...Object.keys(DIFFICULTIES)]) {
    const pool = filterQuestions(questions, difficulty);
    let current = pool[0].slug;
    for (let i = 0; i < 30; i++) {
      const round = randomRound(pool, current, random);
      assert.equal(round.length, pool.length);
      assert.equal(new Set(round).size, pool.length);
      assert.notEqual(round[0], current);
      assert.deepEqual([...round].sort(), pool.map(q => q.slug).sort());
      current = round.at(-1);
    }
  }
  assert.deepEqual(randomRound([], null), []);
  assert.deepEqual(randomRound([questions[0]], questions[0].slug), [questions[0].slug]);
});

test('草稿保持空字符串、Unicode、多行与特殊字符；非法状态被忽略', () => {
  const saved = normalizeSaved({ drafts: { 'two-sum': '', '3sum': '// 中文\nList<Integer> xs;\n', bad: 4 }, statuses: { 'two-sum': 'done', '3sum': 'review', bad: 'arbitrary' }, current: '3sum' });
  assert.equal(saved.drafts['two-sum'], '');
  assert.equal(saved.drafts['3sum'], '// 中文\nList<Integer> xs;\n');
  assert.equal(saved.drafts.bad, undefined);
  assert.equal(saved.statuses.bad, undefined);
  assert.deepEqual(normalizeSaved(null), { drafts: {}, statuses: {}, current: null, language: 'java' });
});

test('语言草稿分开存储，兼容原 Java 草稿并校验语言偏好', () => {
  const legacy = normalizeSaved({ drafts: { 'two-sum': '// 原有 Java 草稿' } });
  assert.equal(legacy.language, 'java');
  assert.equal(legacy.drafts[draftKey('two-sum', 'java')], '// 原有 Java 草稿');
  const saved = normalizeSaved({
    language: 'python',
    drafts: { 'two-sum': '// Java', 'two-sum:python': '# Python\n', 'two-sum:go': '', 'two-sum:invalid': 'bad', 'two-sum:python:extra': 'bad' },
  });
  assert.equal(saved.language, 'python');
  assert.equal(saved.drafts[draftKey('two-sum', 'python')], '# Python\n');
  assert.equal(saved.drafts[draftKey('two-sum', 'go')], '');
  assert.equal(saved.drafts['two-sum:invalid'], undefined);
  assert.equal(saved.drafts['two-sum:python:extra'], undefined);
  assert.equal(normalizeSaved({ language: 'constructor' }).language, 'java');
  assert.equal(initialCode(questions[0], 'java'), questions[0].java);
  for (const language of Object.keys(LANGUAGES).filter(x => x !== 'java')) {
    assert.equal(initialCode(questions[0], language), '');
    assert.notEqual(draftKey('two-sum', language), draftKey('two-sum', 'java'));
  }
});

test('讨论题草稿保留纯文本与空值，不改变算法语言偏好', () => {
  const saved = normalizeSaved({ language: 'python', drafts: {
    'url-shortener:text': '需求\n容量与取舍', 'activation-code-service:text': '',
    'url-shortener:python': '# 独立草稿', 'url-shortener:text:extra': '非法',
  } });
  assert.equal(saved.language, 'python');
  assert.equal(saved.drafts[draftKey('url-shortener', 'text')], '需求\n容量与取舍');
  assert.equal(saved.drafts[draftKey('activation-code-service', 'text')], '');
  assert.equal(saved.drafts['url-shortener:text:extra'], undefined);
});

test('讨论题拒绝缺失来源、模板及危险链接', async () => {
  const data = JSON.parse(await readFile(new URL('../public/data/scenarios.json', import.meta.url), 'utf8'));
  for (const patch of [
    { answerTemplate: '' }, { references: [] },
    { source: 'javascript:alert(1)' },
    { references: [{ title: '危险链接', url: 'https://github.com.evil.example/path' }] },
    { references: [{ title: '危险链接', url: 'javascript:alert(1)' }] },
  ]) {
    assert.throws(() => validateDataset({ ...data, questions: data.questions.map((q, i) => i ? q : { ...q, ...patch }) }, 20));
  }
});

test('数据与中间件覆盖四个专题，只含问题，空白草稿与来源校验独立', async () => {
  const data = JSON.parse(await readFile(new URL('../public/data/data-middleware.json', import.meta.url), 'utf8'));
  assert.equal(data.questions.length, 80);
  assert.equal(new Set(data.questions.map(q => q.id)).size, 80);
  assert.equal(new Set(data.questions.map(q => q.title)).size, 80);
  assert.deepEqual(data.groups, ['MySQL', 'Redis', 'Elasticsearch', 'Kafka'].flatMap(name => [
    { name: `${name} · 基础知识`, count: 8 }, { name: `${name} · 面试考点`, count: 12 },
  ]));
  for (const q of data.questions) {
    assert.equal(q.format, 'questions-only');
    assert.equal(q.answerTemplate, '');
    assert.match(q.content, /^(<p>[^<>]+？<\/p>)+$/);
    assert.doesNotMatch(q.content, /答案|提示|示例|考点清单|参考来源/);
    assert.equal(initialCode(q, 'text'), '');
  }
  assert.equal(filterQuestions(data.questions, 'all', 'ES').length, 20);
  assert.equal(filterQuestions(data.questions, 'all', 'Kafka').length, 20);
  for (const name of ['MySQL', 'Redis', 'Elasticsearch', 'Kafka']) {
    for (const difficulty of Object.keys(DIFFICULTIES)) assert.ok(filterQuestions(data.questions, difficulty, name).length > 0);
  }
  for (const patch of [
    { format: undefined }, { format: 'unknown' }, { kind: 'algorithm' },
    { content: '' }, { content: '<p>不是问题</p>' }, { answerTemplate: '答案提纲' },
    { references: [] }, { source: 'https://redis.io.evil.example/' },
    { references: [{ title: '伪造来源', url: 'https://dev.mysql.com.evil.example/' }] },
  ]) {
    const broken = structuredClone(data);
    Object.assign(broken.questions[0], patch);
    assert.throws(() => validateDataset(broken, 80));
  }
});

test('操作系统与网络覆盖三类六组，保留纯问题、空白草稿和安全来源', async () => {
  const data = JSON.parse(await readFile(new URL('../public/data/os-network.json', import.meta.url), 'utf8'));
  assert.equal(validateDataset(data, 60), true);
  assert.equal(new Set(data.questions.map(q => q.id)).size, 60);
  assert.equal(new Set(data.questions.map(q => q.title)).size, 60);
  const topics = ['操作系统', 'Linux 常用命令', '计算机网络'];
  assert.deepEqual(data.groups, topics.flatMap(name => [
    { name: `${name} · 基础知识`, count: 8 }, { name: `${name} · 面试考点`, count: 12 },
  ]));
  for (const q of data.questions) {
    assert.equal(q.kind, 'discussion');
    assert.equal(q.format, 'questions-only');
    assert.match(q.content, /^(<p>[^<>]+？<\/p>)+$/);
    assert.doesNotMatch(q.content, /答案|提示|示例|考点清单|参考来源/);
    assert.equal(q.answerTemplate, '');
    assert.equal(initialCode(q, 'text'), '');
  }
  for (const name of topics) {
    assert.equal(filterQuestions(data.questions, 'all', name).length, 20);
    for (const difficulty of Object.keys(DIFFICULTIES)) assert.ok(filterQuestions(data.questions, difficulty, name).length > 0);
  }
  for (const command of ['grep', 'find', 'awk', 'sed', 'chmod', 'ps', 'top', 'kill', 'df', 'du', 'free', 'vmstat', 'iostat', 'systemctl', 'journalctl', 'ip', 'ss', 'dig', 'curl', 'tcpdump']) {
    assert.ok(filterQuestions(data.questions, 'all', command).some(q => q.category.startsWith('Linux')), command);
  }
  for (const host of ['man7.org', 'www.gnu.org', 'www.rfc-editor.org', 'curl.se']) {
    const broken = structuredClone(data);
    const url = `https://${host}.evil.example/`;
    broken.questions[0].source = url;
    broken.questions[0].references = [{ title: '伪造来源', url }];
    assert.throws(() => validateDataset(broken, 60));
  }
});

test('语言与框架涵盖三种语言与四个框架，只提供问题，版本边界明确', async () => {
  const data = JSON.parse(await readFile(new URL('../public/data/languages-frameworks.json', import.meta.url), 'utf8'));
  assert.equal(validateDataset(data, 90), true);
  assert.equal(new Set(data.questions.map(q => q.id)).size, 90);
  assert.equal(new Set(data.questions.map(q => q.title)).size, 90);
  const expected = [
    ['Java · 基础知识', 8], ['Java · 核心考点', 12], ['Java Web · Spring', 10],
    ['Python · 基础知识', 8], ['Python · 核心考点', 12], ['Python Web · Django', 5], ['Python Web · FastAPI', 5],
    ['Go · 基础知识', 8], ['Go · 核心考点', 12], ['Go Web · Gin', 10],
  ].map(([name, count]) => ({ name, count }));
  assert.deepEqual(data.groups, expected);
  for (const q of data.questions) {
    assert.equal(q.kind, 'discussion');
    assert.equal(q.format, 'questions-only');
    assert.equal(q.answerTemplate, '');
    assert.equal(initialCode(q, 'text'), '');
    assert.match(q.content, /^(<p>[^<>]+？<\/p>)+$/);
    assert.doesNotMatch(q.content, /答案|提示|示例|考点清单|参考来源/);
  }
  for (const language of ['Java', 'Python', 'Go']) {
    const pool = data.questions.filter(q => q.tags.includes(language));
    assert.equal(pool.length, 30);
    for (const difficulty of Object.keys(DIFFICULTIES)) assert.ok(filterQuestions(pool, difficulty).length > 0);
  }
  for (const [framework, count] of [['Spring', 10], ['Django', 5], ['FastAPI', 5], ['Gin', 10]]) {
    assert.equal(filterQuestions(data.questions, 'all', framework).length, count);
  }
  assert.match(data.questions.find(q => q.slug === 'python-gil').content, /CPython.*3\.13.*free-threaded/);
  assert.match(data.questions.find(q => q.slug === 'go-loop-capture').content, /Go 1\.22/);
  assert.match(data.questions.find(q => q.slug === 'spring-transaction-boundary').content, /Spring 6\.2.*代理/);
  for (const host of ['docs.oracle.com', 'docs.python.org', 'go.dev', 'pkg.go.dev', 'docs.spring.io', 'docs.djangoproject.com', 'fastapi.tiangolo.com', 'gin-gonic.com']) {
    const broken = structuredClone(data);
    const url = `https://${host}.evil.example/`;
    broken.questions[0].source = url;
    broken.questions[0].references = [{ title: '伪造来源', url }];
    assert.throws(() => validateDataset(broken, 90));
  }
});

test('DevOps / SRE 保留原有三类题并追加五组日常工作题', async () => {
  const data = JSON.parse(await readFile(new URL('../public/data/devops-sre.json', import.meta.url), 'utf8'));
  assert.deepEqual(data.groups, [
    { name: '故障场景', count: 12 }, { name: '系统设计', count: 10 }, { name: '知识考点', count: 14 },
    ...['SLO 治理', '可观测性', '应急响应', '容量规划', '容灾演练'].map(name => ({ name: `SRE 日常 · ${name}`, count: 5 })),
  ]);
  assert.equal(validateDataset(data, 61), true);
  assert.equal(new Set(data.questions.map(q => q.id)).size, 61);
  assert.equal(new Set(data.questions.map(q => q.title)).size, 61);
  const original = data.questions.slice(0, 36);
  assert.equal(new Set(original.map(q => q.answerTemplate)).size, 3);
  assert.ok(original.every(q => q.format === undefined));
  assert.equal(original[0].slug, 'release-errors');
  assert.equal(original.at(-1).slug, 'disaster-recovery-basics');
  const daily = data.questions.slice(36);
  assert.equal(daily.length, 25);
  for (const [i, q] of daily.entries()) {
    assert.equal(q.id, `OPS${37 + i}`);
    assert.equal(q.order, 37 + i);
    assert.match(q.slug, /^sre-daily-/);
    assert.equal(q.format, 'questions-only');
    assert.equal(q.answerTemplate, '');
    assert.equal(initialCode(q, 'text'), '');
    assert.match(q.content, /^(<p>[^<>]+？<\/p>)+$/);
    assert.doesNotMatch(q.content, /答案|提示|示例|参考来源|考点清单/);
  }
  for (const group of data.groups.slice(3)) {
    const pool = filterQuestions(daily, 'all', group.name);
    assert.equal(pool.length, 5);
    for (const difficulty of Object.keys(DIFFICULTIES)) assert.ok(filterQuestions(pool, difficulty).length > 0);
  }
  for (const q of data.questions.filter(q => q.category === '知识考点')) {
    assert.equal(q.knowledgePoints.length, 3);
    assert.ok(q.knowledgePoints.every(point => q.content.includes(point)));
  }
  for (const difficulty of Object.keys(DIFFICULTIES)) assert.ok(filterQuestions(data.questions, difficulty).length > 0);
  assert.equal(filterQuestions(data.questions, 'all', '知识考点').length, 14);
  assert.ok(filterQuestions(data.questions, 'all', 'Terraform').length > 0);
  const unsafe = structuredClone(data);
  unsafe.questions[0].references[0].url = 'https://kubernetes.io.evil.example/';
  unsafe.questions[0].source = unsafe.questions[0].references[0].url;
  assert.throws(() => validateDataset(unsafe, 61));
});
