// Optional browser checks. Supply an installed Playwright module using
// PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs (no app dependency).
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parsePracticeRoute, LANGUAGES } from '../src/core.js';
import { BANKS } from '../src/banks.js';

const modulePath = process.env.PLAYWRIGHT_MODULE;
const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : 'playwright');
const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || undefined });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
const externalRequests = [];
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4173/')) externalRequests.push(request.url()); });
const waitForTitle = slug => page.waitForFunction(slug => location.hash.split('?')[0].split('/').at(-1) === slug && document.getElementById('problem-title').textContent.length > 0, slug);
const openQuestion = async slug => {
  await page.locator('#search').fill(slug === 'two-sum' ? '两数之和' : '');
  await page.locator(`[data-slug="${slug}"]`).click();
  await waitForTitle(slug);
};
const checks = [];
const screenshots = fileURLToPath(new URL('../.cache/screenshots/', import.meta.url));
await mkdir(screenshots, { recursive: true });
try {
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#bank-picker').waitFor({ state: 'visible' });
  assert.equal(await page.locator('[data-bank]').count(), BANKS.length);
  assert.equal(await page.title(), '一题一会');
  assert.equal(await page.locator('.bookshelf-intro h1').innerText(), '一题一会');
  assert.equal(await page.locator('[data-bank="hot100"] .book-title').textContent(), 'HOT 100');
  assert.equal(await page.locator('.bookshelf-intro p').innerText(), '从算法到系统设计，选一本，练一题。');
  assert.equal(await page.locator('.workbook').count(), BANKS.length);
  assert.equal(await page.locator('.book-row').count(), Math.ceil(BANKS.length / 3));
  assert.equal(await page.locator('.book-label, .book-action').count(), 0);
  const favicon = await page.locator('link[rel="icon"]').getAttribute('href');
  const faviconResponse = await page.request.get(new URL(favicon, page.url()).href);
  assert.equal(faviconResponse.status(), 200);
  assert.match(faviconResponse.headers()['content-type'], /image\/svg\+xml/);
  assert.match(await faviconResponse.text(), /一字印章/);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    for (const book of await page.locator('.book-cover').all()) {
      assert.ok(await book.evaluate(el => el.scrollWidth <= el.clientWidth && el.scrollHeight <= el.clientHeight));
    }
    for (const book of await page.locator('.workbook').all()) {
      assert.ok(await book.evaluate(el => {
        const cover = el.querySelector('.book-object');
        const title = el.querySelector('.book-title');
        return cover.offsetWidth <= 160 && el.children.length === 1 &&
          title.children.length === 0 && title.scrollWidth <= title.clientWidth &&
          getComputedStyle(title).fontSize === '18px' && getComputedStyle(title).whiteSpace === 'nowrap';
      }));
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `${screenshots}/bookshelf-mobile.png`, fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  assert.equal(await page.locator('#mode-picker').isVisible(), false);
  await page.screenshot({ path: `${screenshots}/banks.png`, fullPage: true });
  await page.locator('[data-bank="hot100"] .book-cover').click();
  await page.locator('#mode-picker').waitFor({ state: 'visible' });
  assert.equal(await page.title(), 'HOT 100 · 一题一会');
  assert.equal(await page.locator('#workspace').isVisible(), false);
  assert.equal(await page.locator('.topbar, .study-progress, .reflection, .local-label, [data-status]').count(), 0);
  await page.screenshot({ path: `${screenshots}/home.png`, fullPage: true });
  await page.locator('#ordered-mode').click();
  await page.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await page.locator('.sidebar').isVisible(), true);
  await page.goBack();
  await page.locator('#mode-picker').waitFor({ state: 'visible' });
  await page.goForward();
  await page.locator('#workspace').waitFor({ state: 'visible' });
  checks.push('首页先选模式，标题栏/进度/自评已移除，浏览器前进后退正常');
  assert.match(await page.locator('#problem-title').innerText(), /两数之和/);
  assert.equal(await page.title(), '两数之和 · HOT 100 · 一题一会');
  assert.equal(await page.locator('.question-button').count(), 100);
  assert.equal(await page.locator('#previous').isDisabled(), true);
  const data = await page.evaluate(async () => (await fetch('./data/questions.json')).json());
  for (const q of data.questions) {
    await page.locator(`[data-slug="${q.slug}"]`).click();
    assert.equal(await page.locator('#problem-title').innerText(), `${q.id}. ${q.title}`.trim());
    assert.match(await page.locator('#problem-content').innerText(), /示例/);
    assert.equal(await page.locator('#code-editor').inputValue(), q.java);
  }
  assert.equal(await page.locator('#next').isDisabled(), true);
  checks.push('100 道题都可导航，中文题干与 Java 模板完整，首尾边界正确');

  await openQuestion('two-sum');
  const code = '// 中文草稿\nclass Solution {\n    // <script> is plain text\n}\n';
  await page.locator('#code-editor').fill(code);
  await page.locator('#next').click();
  await page.locator('#previous').click();
  assert.equal(await page.locator('#code-editor').inputValue(), code);
  await page.reload();
  await page.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#code-editor').inputValue(), code);
  await page.locator('#code-editor').fill('');
  await page.locator('#next').click();
  await page.locator('#previous').click();
  assert.equal(await page.locator('#code-editor').inputValue(), '');
  await page.locator('#code-editor').press('Tab');
  assert.equal(await page.locator('#code-editor').inputValue(), '    ');
  await page.locator('#reset-code').click();
  await page.getByRole('button', { name: '保留草稿' }).click();
  assert.equal(await page.locator('#code-editor').inputValue(), '    ');
  await page.locator('#reset-code').click();
  await page.getByRole('button', { name: '恢复模板', exact: true }).click();
  await page.waitForFunction(code => document.getElementById('code-editor').value === code, data.questions[0].java);
  assert.equal(await page.locator('#code-editor').inputValue(), data.questions[0].java);
  checks.push('草稿在切题、刷新后保留，空草稿、Tab 缩进及重置确认正常');

  const indentContext = await browser.newContext();
  const indentPage = await indentContext.newPage();
  indentPage.on('pageerror', error => errors.push(error.message));
  await indentPage.goto('http://127.0.0.1:4173/#/hot100/ordered/two-sum');
  await indentPage.locator('#workspace').waitFor({ state: 'visible' });
  const indentEditor = indentPage.locator('#code-editor');
  for (const language of Object.keys(LANGUAGES)) {
    await indentPage.locator('#code-language').selectOption(language);
    await indentEditor.fill('    work();');
    await indentEditor.press('End');
    await indentEditor.press('Enter');
    assert.equal(await indentEditor.inputValue(), '    work();\n    ');
    assert.equal(await indentPage.locator('#cursor-position').innerText(), 'Ln 2, Col 5');
    assert.equal(await indentPage.locator('#line-numbers').innerText(), '1\n2');
  }
  for (const [value, start, end, expected, caret] of [
    ['\t\tvalue', 7, 7, '\t\tvalue\n\t\t', 10],
    ['  \tvalue', 5, 5, '  \tva\n  \tlue', 9],
    ['    value', 2, 2, '  \n    value', 5],
    ['    value', 0, 0, '\n    value', 1],
    ['    abcXYZ', 7, 10, '    abc\n    ', 12],
    ['  a\n    b', 3, 9, '  a\n  ', 6],
    ['    ', 4, 4, '    \n    ', 9],
    ['', 0, 0, '\n', 1],
  ]) {
    await indentEditor.fill(value);
    await indentEditor.evaluate((el, range) => el.setSelectionRange(...range), [start, end]);
    await indentEditor.press('Enter');
    assert.equal(await indentEditor.inputValue(), expected);
    assert.deepEqual(await indentEditor.evaluate(el => [el.selectionStart, el.selectionEnd]), [caret, caret]);
  }
  await indentEditor.fill('    original');
  await indentEditor.press('End');
  await indentEditor.press('Enter');
  await indentEditor.press(process.platform === 'darwin' ? 'Meta+z' : 'Control+z');
  assert.equal(await indentEditor.inputValue(), '    original');
  await indentEditor.press(process.platform === 'darwin' ? 'Meta+Shift+z' : 'Control+Shift+z');
  assert.equal(await indentEditor.inputValue(), '    original\n    ');
  await indentEditor.press('Shift+Enter');
  assert.equal(await indentEditor.inputValue(), '    original\n    \n    ');
  await indentPage.locator('#next').click();
  await indentPage.locator('#previous').click();
  assert.equal(await indentEditor.inputValue(), '    original\n    \n    ');
  await indentPage.reload();
  await indentPage.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await indentEditor.inputValue(), '    original\n    \n    ');
  await indentEditor.fill('    中文');
  assert.equal(await indentEditor.evaluate(el => {
    const event = new InputEvent('beforeinput', { inputType: 'insertLineBreak', isComposing: true, cancelable: true });
    el.dispatchEvent(event);
    return event.defaultPrevented;
  }), false);
  assert.equal(await indentEditor.inputValue(), '    中文');
  await indentEditor.evaluate(el => {
    const original = document.execCommand;
    document.execCommand = () => false;
    try {
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
      el.dispatchEvent(new InputEvent('beforeinput', { inputType: 'insertParagraph', cancelable: true }));
    } finally { document.execCommand = original; }
  });
  assert.equal(await indentEditor.inputValue(), '    中文\n    ');
  await indentEditor.press('Shift+Tab');
  assert.equal(await indentEditor.evaluate(el => document.activeElement === el), false);
  await indentPage.goto('http://127.0.0.1:4173/#/system-design/ordered/sd-requirements');
  await indentPage.locator('#workspace').waitFor({ state: 'visible' });
  await indentEditor.fill('    思路');
  await indentEditor.press('End');
  await indentEditor.press('Enter');
  assert.equal(await indentEditor.inputValue(), '    思路\n');
  await indentContext.close();
  checks.push('六种代码语言换行保留缩进，行中/选区替换、撤销重做、输入法与保存正常；思路草稿不自动缩进');

  assert.equal(await page.locator('#problem-content').evaluate(el => getComputedStyle(el).fontSize), '14px');
  await page.locator('#code-editor').fill('// Java 独立草稿');
  for (const [language, config] of Object.entries(LANGUAGES)) {
    if (language === 'java') continue;
    await page.locator('#code-language').selectOption(language);
    assert.equal(await page.locator('#code-editor').inputValue(), '');
    assert.equal(await page.locator('#editor-file').innerText(), config.file);
    assert.equal(await page.locator('#code-editor').getAttribute('aria-label'), `${config.label} 代码编辑框`);
    await page.locator('#code-editor').fill(`${language} draft\n中文注释`);
  }
  await page.locator('#code-language').selectOption('python');
  assert.equal(await page.locator('#code-editor').inputValue(), 'python draft\n中文注释');
  await page.reload();
  await page.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#code-language').inputValue(), 'python');
  assert.equal(await page.locator('#code-editor').inputValue(), 'python draft\n中文注释');
  await page.locator('#next').click();
  assert.equal(await page.locator('#code-editor').inputValue(), '');
  await page.locator('#code-editor').fill('# 另一题');
  await page.locator('#previous').click();
  assert.equal(await page.locator('#code-editor').inputValue(), 'python draft\n中文注释');
  await page.locator('#reset-code').click();
  await page.locator('#reset-confirm').click();
  await page.waitForFunction(() => document.getElementById('code-editor').value === '');
  await page.locator('#code-language').selectOption('java');
  assert.equal(await page.locator('#code-editor').inputValue(), '// Java 独立草稿');
  for (const language of ['javascript', 'typescript', 'cpp', 'go']) {
    await page.locator('#code-language').selectOption(language);
    assert.equal(await page.locator('#code-editor').inputValue(), `${language} draft\n中文注释`);
  }
  await page.locator('#code-language').selectOption('java');
  checks.push('题干字号 14px；六种语言可切换，草稿按题目/语言隔离，刷新保持语言且重置只影响当前语言');

  await page.locator('#search').fill('no-such-item');
  assert.equal(await page.locator('.question-button').count(), 0);
  assert.match(await page.locator('.empty-list').innerText(), /没有匹配/);
  await page.locator('#search').fill('');
  checks.push('顺序模式保留目录搜索，空结果有提示');

  await page.locator('#code-editor').fill('// 返回首页仍保留草稿');
  await page.locator('#back-to-modes').click();
  await page.locator('#mode-picker').waitFor({ state: 'visible' });
  await page.reload();
  await page.locator('#mode-picker').waitFor({ state: 'visible' });
  await page.locator('#ordered-mode').click();
  await page.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#code-editor').inputValue(), '// 返回首页仍保留草稿');
  await page.locator('#back-to-modes').click();
  await page.locator('#mode-picker').waitFor({ state: 'visible' });
  await page.locator('#random-mode').click();
  await page.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#difficulty-picker').count(), 0);
  assert.equal(await page.locator('#difficulty').inputValue(), 'all');
  const initialRandomUrl = page.url();
  await page.reload();
  await page.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(page.url(), initialRandomUrl);
  await page.locator('#difficulty').selectOption('hard');
  assert.equal(await page.locator('#difficulty').inputValue(), 'hard');
  assert.equal(await page.locator('#difficulty-badge').innerText(), '困难');
  await page.goBack();
  await page.locator('#mode-picker').waitFor({ state: 'visible' });
  await page.goForward();
  await page.locator('#random-controls').waitFor({ state: 'visible' });
  checks.push('随机练习直接抽题，默认全部难度，页内切换难度；刷新与浏览器前进后退正常');
  assert.equal(await page.locator('.sidebar').isVisible(), false);
  assert.equal(await page.locator('.question-button').count(), 0);
  for (const difficulty of ['easy', 'medium', 'hard']) {
    await page.locator('#difficulty').selectOption(difficulty);
    const pool = data.questions.filter(q => q.difficulty === difficulty);
    const seen = new Set();
    for (let i = 0; i < pool.length; i++) {
      const slug = parsePracticeRoute(new URL(page.url()).hash).slug;
      assert.ok(pool.some(q => q.slug === slug));
      assert.ok(!seen.has(slug), `重复抽题 ${difficulty}: ${slug}`);
      seen.add(slug);
      if (i < pool.length - 1) await page.locator('#next').click();
    }
    const last = new URL(page.url()).hash;
    await page.locator('#next').click();
    assert.notEqual(new URL(page.url()).hash, last);
    const drawn = new URL(page.url()).hash;
    await page.locator('#previous').click();
    assert.equal(new URL(page.url()).hash, last);
    await page.locator('#next').click();
    assert.equal(new URL(page.url()).hash, drawn);
  }
  checks.push('简单/中等/困难各完整一轮抽取不重复，新一轮及随机历史导航正确');

  const beforeReload = page.url();
  await page.reload();
  await page.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(page.url(), beforeReload);
  assert.equal(await page.locator('#difficulty').inputValue(), 'hard');
  assert.equal(await page.locator('.sidebar').isVisible(), false);
  assert.equal(await page.locator('.question-button').count(), 0);
  await page.screenshot({ path: `${screenshots}/random.png`, fullPage: true });
  checks.push('随机页面不渲染目录，刷新保留随机模式、难度与题目；返回首页保留草稿');

  await page.locator('#back-to-modes').click();
  await page.locator('#mode-picker').waitFor({ state: 'visible' });
  await page.locator('#ordered-mode').click();
  await page.locator('#workspace').waitFor({ state: 'visible' });
  await openQuestion('trapping-rain-water');
  const image = page.locator('#problem-content img').first();
  await image.scrollIntoViewIfNeeded();
  await image.evaluate(img => img.decode());
  assert.ok(await image.evaluate(img => img.naturalWidth > 0));

  const safe = await page.evaluate(async () => {
    const { renderProblemHTML } = await import('./src/content.js');
    const node = document.createElement('div');
    node.append(renderProblemHTML('<script>window.bad=1</script><p onclick="alert(1)">safe</p><img src="https://evil.test/img.png" onerror="alert(1)"><a href="javascript:alert(1)">link</a><iframe src="https://evil.test"></iframe>'));
    return { text: node.textContent, html: node.innerHTML };
  });
  assert.equal(safe.text, 'safelink');
  assert.ok(!/script|onclick|onerror|iframe|evil\.test|javascript:/i.test(safe.html));
  checks.push('题目本地图片加载正常，题干 HTML 白名单剔除脚本和危险属性');

  await openQuestion('two-sum');
  await page.locator('#search').fill('');
  await page.screenshot({ path: `${screenshots}/desktop.png`, fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.locator('.problem-panel').isVisible(), true);
  await page.locator('#show-editor').click();
  assert.equal(await page.locator('#code-editor').isVisible(), true);
  await page.locator('#code-language').selectOption('typescript');
  assert.equal(await page.locator('#editor-file').innerText(), 'solution.ts');
  await page.locator('#code-language').selectOption('java');
  await page.locator('#code-editor').fill('// 手机草稿');
  await page.locator('#show-description').click();
  await page.locator('#toggle-catalog').click();
  assert.equal(await page.locator('#search').isVisible(), true);
  await page.locator('#search').fill('合并区间');
  await page.locator('[data-slug="merge-intervals"]').click();
  assert.equal(await page.locator('#toggle-catalog').getAttribute('aria-expanded'), 'false');
  assert.match(await page.locator('#problem-title').innerText(), /合并区间/);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.screenshot({ path: `${screenshots}/mobile.png`, fullPage: true });
  await page.locator('#back-to-modes').click();
  await page.locator('#mode-picker').waitFor({ state: 'visible' });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.locator('#random-mode').click();
  await page.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#difficulty').inputValue(), 'all');
  assert.equal(await page.locator('.sidebar').isVisible(), false);
  await page.locator('#difficulty').selectOption('easy');
  await page.locator('#show-editor').click();
  assert.equal(await page.locator('#code-editor').isVisible(), true);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  checks.push('390px 手机布局无横向溢出，目录与题干/代码切换可用');

  const blockedContext = await browser.newContext();
  await blockedContext.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error('QuotaExceededError'); }; });
  const blockedPage = await blockedContext.newPage();
  await blockedPage.goto('http://127.0.0.1:4173/');
  await blockedPage.locator('[data-bank="hot100"]').click();
  await blockedPage.locator('#mode-picker').waitFor({ state: 'visible' });
  await blockedPage.locator('#ordered-mode').click();
  await blockedPage.locator('#workspace').waitFor({ state: 'visible' });
  assert.match(await blockedPage.locator('#save-status').innerText(), /保存失败/);
  await blockedContext.close();
  checks.push('浏览器存储被禁用时仍可做题，并明确显示保存失败');

  await page.goto('http://127.0.0.1:4173/#rotate-array');
  await page.locator('[data-bank="hot100"]').click();
  await page.locator('#mode-picker').waitFor({ state: 'visible' });
  await page.locator('#ordered-mode').click();
  await page.locator('#workspace').waitFor({ state: 'visible' });
  assert.match(await page.locator('#problem-title').innerText(), /轮转数组/);
  checks.push('旧版题目链接先展示题库选择，选 Hot 100 顺序模式后保留原题目');
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const bank of BANKS) {
    await page.goto(`http://127.0.0.1:4173/#/${bank.id}`);
    await page.locator('#ordered-mode').click();
    await page.locator('#workspace').waitFor({ state: 'visible' });
    await page.locator('#search').fill('');
    const dataset = await page.evaluate(async file => (await fetch(`./data/${file}`)).json(), bank.file);
    assert.equal(await page.locator('.question-button').count(), bank.count);
    if (bank.id === 'system-design') {
      for (const group of dataset.groups.slice(4)) {
        await page.locator('#search').fill(group.name);
        assert.equal(await page.locator('.question-button').count(), group.count);
      }
      for (const query of ['CAP', 'SSE', 'CDC', 'Quorum', 'Autocomplete', 'Wallet']) {
        await page.locator('#search').fill(query);
        assert.ok(await page.locator('.question-button').count() > 0);
      }
      await page.locator('#search').fill('');
    }
    if (['data-structures-algorithms', 'design-patterns'].includes(bank.id)) {
      for (const group of dataset.groups) {
        await page.locator('#search').fill(group.name);
        assert.equal(await page.locator('.question-button').count(), group.count);
      }
      await page.locator('#search').fill(bank.id === 'design-patterns' ? 'Abstract Factory' : '动态规划');
      assert.ok(await page.locator('.question-button').count() > 0);
      await page.locator('#search').fill('');
    }
    if (bank.id === 'languages-frameworks') {
      for (const [framework, count] of [['Spring', 10], ['Django', 5], ['FastAPI', 5], ['Gin', 10]]) {
        await page.locator('#search').fill(framework);
        assert.equal(await page.locator('.question-button').count(), count);
      }
      for (const tool of ['Git', 'Docker', 'Maven', 'JDK 命令', 'Go / go mod', 'Python / uv']) {
        await page.locator('#search').fill(`工具 · ${tool}`);
        assert.equal(await page.locator('.question-button').count(), 6);
      }
      await page.locator('#search').fill('Java · 内存与 GC 排查');
      assert.equal(await page.locator('.question-button').count(), 12);
      await page.locator('#search').fill('');
    }
    if (bank.id === 'devops-sre') {
      await page.locator('#search').fill('SRE 日常');
      assert.equal(await page.locator('.question-button').count(), 25);
      for (const topic of ['SLO 治理', '可观测性', '应急响应', '容量规划', '容灾演练']) {
        await page.locator('#search').fill(`SRE 日常 · ${topic}`);
        assert.equal(await page.locator('.question-button').count(), 5);
      }
      await page.locator('#search').fill('');
    }
    for (const q of dataset.questions) {
      await page.locator(`[data-slug="${q.slug}"]`).click();
      assert.equal(await page.locator('#problem-title').innerText(), `${q.id}. ${q.title}`.trim());
      assert.match(await page.locator('#problem-content').innerText(), q.format === 'questions-only' ? /？/ : /示例/);
      if (q.format === 'questions-only') {
        assert.doesNotMatch(await page.locator('#problem-content').innerText(), /答案|提示|参考来源|练习假设/);
      }
      assert.equal(parsePracticeRoute(new URL(page.url()).hash).bank, bank.id);
      if (['devops-sre', 'system-design'].includes(bank.id)) {
        assert.equal(await page.locator('#code-editor').inputValue(), q.answerTemplate);
        assert.equal(await page.locator('#reset-code').innerText(), q.format === 'questions-only' ? '清空草稿' : '重置模板');
      }
    }
    assert.match(await page.locator('#order-label').innerText(), new RegExp(`/ ${bank.count}$`));
    if (bank.id === 'offer') await page.screenshot({ path: `${screenshots}/offer.png`, fullPage: true });
    if (bank.kind === 'discussion') {
      assert.equal(await page.locator('#code-language').isVisible(), false);
      assert.equal(await page.locator('#line-numbers').isVisible(), false);
      assert.equal(await page.locator('#editor-heading-label').innerText(), '思路草稿');
      assert.equal(await page.locator('#code-editor').getAttribute('wrap'), 'soft');
      assert.match(await page.locator('#source-link').innerText(), /参考/);
      if (dataset.questions.at(-1).format === 'questions-only') {
        assert.equal(await page.locator('#problem-content a').count(), 0);
        assert.equal(await page.locator('#reset-code').innerText(), '清空草稿');
        assert.equal(await page.locator('#source-link').getAttribute('href'), dataset.questions.at(-1).source);
      } else assert.ok(await page.locator('#problem-content a').count() > 0);
      assert.equal(await page.locator('#code-editor').inputValue(), dataset.questions.at(-1).answerTemplate);
      await page.screenshot({ path: `${screenshots}/${bank.id}.png`, fullPage: true });
      await page.locator('#code-editor').fill(`${bank.name} 中文思路\n约束与取舍`);
      await page.reload();
      await page.locator('#workspace').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#code-editor').inputValue(), `${bank.name} 中文思路\n约束与取舍`);
      await page.locator('#reset-code').click();
      await page.getByRole('button', { name: '保留草稿' }).click();
      assert.equal(await page.locator('#code-editor').inputValue(), `${bank.name} 中文思路\n约束与取舍`);
      await page.locator('#reset-code').click();
      await page.locator('#reset-confirm').click();
      await page.waitForFunction(expected => document.getElementById('code-editor').value === expected, dataset.questions.at(-1).answerTemplate);
      assert.equal(await page.locator('#code-editor').inputValue(), dataset.questions.at(-1).answerTemplate);
    } else await page.locator('#code-language').selectOption('java');
    await page.locator('#code-editor').fill(`// ${bank.id} 专属草稿`);
    await page.locator('#back-to-modes').click();
    await page.locator('#random-mode').click();
    await page.locator('#workspace').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#difficulty').inputValue(), 'all');
    await page.locator('#difficulty').selectOption('easy');
    const pool = dataset.questions.filter(q => q.difficulty === 'easy');
    const drawn = new Set();
    for (let i = 0; i < pool.length; i++) {
      const route = parsePracticeRoute(new URL(page.url()).hash);
      assert.equal(route.bank, bank.id);
      assert.ok(pool.some(q => q.slug === route.slug));
      assert.ok(!drawn.has(route.slug));
      drawn.add(route.slug);
      if (i < pool.length - 1) await page.locator('#next').click();
    }
    assert.equal(await page.locator('.sidebar').isVisible(), false);
    const url = page.url();
    await page.reload();
    await page.locator('#workspace').waitFor({ state: 'visible' });
    assert.equal(page.url(), url);
    await page.locator('#back-to-modes').click();
    await page.locator('#back-to-banks').click();
    await page.locator('#bank-picker').waitFor({ state: 'visible' });
  }
  // A shared question must not mix drafts between banks.
  for (const bank of ['hot100', 'interview150']) {
    await page.goto(`http://127.0.0.1:4173/#/${bank}/ordered/two-sum`);
    await page.locator('#workspace').waitFor({ state: 'visible' });
    await page.locator('#code-editor').fill(`// ${bank} 两数之和`);
    await page.locator('#back-to-modes').click();
    await page.locator('#back-to-banks').click();
    await page.locator('#bank-picker').waitFor({ state: 'visible' });
  }
  for (const bank of ['hot100', 'interview150']) {
    await page.locator(`[data-bank="${bank}"]`).click();
    await page.locator('#ordered-mode').click();
    await page.locator('#workspace').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#code-editor').inputValue(), `// ${bank} 两数之和`);
    await page.locator('#back-to-modes').click();
    await page.locator('#back-to-banks').click();
    await page.locator('#bank-picker').waitFor({ state: 'visible' });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  checks.push(`${BANKS.length} 个题库全部 ${BANKS.reduce((sum, bank) => sum + bank.count, 0)} 个条目可导航，讨论题使用可保存的思路草稿与来源链接，随机与刷新正确，算法草稿保持隔离`);
  const loadingContext = await browser.newContext();
  const loadingPage = await loadingContext.newPage();
  await loadingPage.route('**/data/interview150.json', route => route.fulfill({ status: 503, body: 'Unavailable' }), { times: 1 });
  await loadingPage.goto('http://127.0.0.1:4173/');
  await loadingPage.locator('[data-bank="interview150"]').click();
  await loadingPage.locator('#load-error').waitFor({ state: 'visible' });
  assert.match(await loadingPage.locator('#load-error-message').innerText(), /503/);
  await loadingPage.locator('#retry-load').click();
  await loadingPage.locator('#mode-picker').waitFor({ state: 'visible' });
  await loadingPage.locator('#back-to-banks').click();
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  await loadingPage.route('**/data/offer.json', async route => { await gate; await route.continue(); });
  await loadingPage.locator('[data-bank="offer"]').click();
  await loadingPage.locator('#loading').waitFor({ state: 'visible' });
  await loadingPage.goBack();
  await loadingPage.locator('#bank-picker').waitFor({ state: 'visible' });
  const response = loadingPage.waitForResponse('**/data/offer.json');
  release();
  await (await response).finished();
  await loadingPage.locator('[data-bank="hot100"]').click();
  await loadingPage.locator('#ordered-mode').click();
  await loadingPage.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await loadingPage.locator('.question-button').count(), 100);
  assert.equal(parsePracticeRoute(new URL(loadingPage.url()).hash).bank, 'hot100');
  await loadingContext.close();
  checks.push('题库加载失败可重试，加载中返回后不会被过期响应切回其他题库');
  const themeContext = await browser.newContext({ colorScheme: 'dark', viewport: { width: 1440, height: 1000 } });
  const themePage = await themeContext.newPage();
  themePage.on('pageerror', error => errors.push(error.message));
  await themePage.goto('http://127.0.0.1:4173/#/hot100/ordered/two-sum');
  await themePage.locator('#workspace').waitFor({ state: 'visible' });
  const palette = () => themePage.locator('.code-area').evaluate(el => getComputedStyle(el).backgroundColor);
  assert.equal(await themePage.locator('#editor-theme').inputValue(), 'light');
  assert.equal(await palette(), 'rgb(247, 249, 247)');
  await themePage.locator('#code-editor').fill('// 配色不能修改草稿\nclass Solution {}');
  await themePage.locator('#editor-theme').selectOption('dark');
  assert.equal(await palette(), 'rgb(32, 40, 37)');
  assert.equal(await themePage.locator('#code-editor').inputValue(), '// 配色不能修改草稿\nclass Solution {}');
  await themePage.screenshot({ path: `${screenshots}/editor-code-dark.png`, fullPage: true });
  await themePage.reload();
  await themePage.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await themePage.locator('#editor-theme').inputValue(), 'dark');
  assert.equal(await themePage.locator('#code-editor').inputValue(), '// 配色不能修改草稿\nclass Solution {}');
  await themePage.locator('#code-language').selectOption('python');
  assert.equal(await palette(), 'rgb(32, 40, 37)');
  for (const width of [320, 390, 768]) {
    await themePage.setViewportSize({ width, height: 844 });
    if (await themePage.locator('#show-editor').isVisible()) await themePage.locator('#show-editor').click();
    assert.ok(await themePage.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.ok(await themePage.locator('.editor-heading').evaluate(el => el.scrollWidth <= el.clientWidth));
    assert.equal(await themePage.locator('#editor-theme').isVisible(), true);
  }
  await themePage.goto('http://127.0.0.1:4173/#/os-network/ordered/os-process-thread');
  await themePage.locator('#workspace').waitFor({ state: 'visible' });
  if (await themePage.locator('#show-editor').isVisible()) await themePage.locator('#show-editor').click();
  assert.equal(await themePage.locator('#editor-theme').inputValue(), 'dark');
  assert.equal(await themePage.locator('#code-language').isVisible(), false);
  await themePage.locator('#code-editor').fill('独立的中文思路草稿');
  await themePage.locator('#editor-theme').selectOption('light');
  assert.equal(await palette(), 'rgb(247, 249, 247)');
  assert.equal(await themePage.locator('#code-editor').inputValue(), '独立的中文思路草稿');
  await themePage.setViewportSize({ width: 1440, height: 1000 });
  await themePage.screenshot({ path: `${screenshots}/editor-discussion-light.png`, fullPage: true });
  await themePage.reload();
  await themePage.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await themePage.locator('#editor-theme').inputValue(), 'light');
  assert.equal(await themePage.locator('#code-editor').inputValue(), '独立的中文思路草稿');
  await themePage.evaluate(() => localStorage.setItem('knowcode:editor-theme:v1', 'invalid'));
  await themePage.reload();
  await themePage.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await themePage.locator('#editor-theme').inputValue(), 'light');
  await themePage.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage blocked'); };
    Storage.prototype.setItem = () => { throw new Error('Storage blocked'); };
  });
  await themePage.reload();
  await themePage.locator('#workspace').waitFor({ state: 'visible' });
  await themePage.locator('#editor-theme').selectOption('dark');
  assert.equal(await palette(), 'rgb(32, 40, 37)');
  assert.match(await themePage.locator('#toast').innerText(), /配色已切换.*无法保存/);
  await themeContext.close();
  checks.push('草稿默认浅色，深浅配色跨题库和语言共用、刷新恢复；切换不改草稿，320px 不溢出，存储失败可继续切换');
  const navigationContext = await browser.newContext();
  const navigationPage = await navigationContext.newPage();
  navigationPage.on('pageerror', error => errors.push(error.message));
  for (const [bank, slug, mode, width] of [
    ['hot100', 'two-sum', 'ordered', 1440],
    ['hot100', 'two-sum', 'random', 390],
    ['os-network', 'os-process-thread', 'random', 1440],
    ['os-network', 'os-process-thread', 'ordered', 320],
    ['data-structures-algorithms', 'dsa-complexity', 'ordered', 320],
    ['design-patterns', 'pattern-intent', 'random', 1440],
    ['system-design', 'url-shortener', 'ordered', 1440],
    ['system-design', 'sd-requirements', 'random', 320],
  ]) {
    await navigationPage.setViewportSize({ width, height: 900 });
    const route = `http://127.0.0.1:4173/#/${bank}/${mode}/${slug}${mode === 'random' ? '?difficulty=easy' : ''}`;
    await navigationPage.goto(route);
    await navigationPage.locator('#workspace').waitFor({ state: 'visible' });
    assert.equal(await navigationPage.locator('#practice-bookshelf').isVisible(), true);
    assert.ok(await navigationPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    if (await navigationPage.locator('#show-editor').isVisible()) await navigationPage.locator('#show-editor').click();
    const draft = `${bank} ${mode} 返回书架前的草稿`;
    await navigationPage.locator('#code-editor').fill(draft);
    await navigationPage.locator('#practice-bookshelf').click();
    await navigationPage.locator('#bank-picker').waitFor({ state: 'visible' });
    assert.equal(new URL(navigationPage.url()).hash, '#/');
    assert.equal(await navigationPage.title(), '一题一会');
    await navigationPage.goBack();
    await navigationPage.locator('#workspace').waitFor({ state: 'visible' });
    assert.equal(navigationPage.url(), route);
    assert.equal(await navigationPage.locator('#code-editor').inputValue(), draft);
    await navigationPage.goForward();
    await navigationPage.locator('#bank-picker').waitFor({ state: 'visible' });
    await navigationPage.reload();
    await navigationPage.locator(`[data-bank="${bank}"]`).click();
    await navigationPage.locator('#ordered-mode').click();
    await navigationPage.locator('#workspace').waitFor({ state: 'visible' });
    assert.equal(await navigationPage.locator('#code-editor').inputValue(), draft);
  }
  await navigationContext.close();
  checks.push('顺序与随机练习可直接返回书架；桌面和手机入口可见，立即离开保存草稿，前进后退与重新选册恢复正常');
  assert.deepEqual(errors, []);
  assert.deepEqual(externalRequests, []);
  console.log(checks.map(x => `✓ ${x}`).join('\n'));
  console.log('浏览器检查通过：无页面异常，无外部网络请求。');
  console.log(`截图：${screenshots}`);
} finally {
  await browser.close();
}
