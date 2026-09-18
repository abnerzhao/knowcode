import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || undefined });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const origin = process.env.BASE_URL || 'http://127.0.0.1:4173';
const errors = [], external = [];
const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
const csp = config.headers[0].headers.find(header => header.key === 'Content-Security-Policy').value;
page.on('pageerror', error => errors.push(error.message));
context.on('request', request => { if (!request.url().startsWith(`${origin}/`)) external.push(request.url()); });
// Exercise exactly the deployed CSP, including on worker script responses.
await context.route('**/*', async route => {
  const response = await route.fetch();
  await route.fulfill({ response, headers: { ...response.headers(), 'content-security-policy': csp } });
});
const editor = page.locator('#code-editor');
const button = page.locator('#format-code');
const done = () => page.waitForFunction(() => !document.getElementById('format-code').disabled);
try {
  await page.goto(`${origin}/#/hot100/ordered/two-sum`);
  await page.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await page.evaluate(() => performance.getEntriesByType('resource').some(entry => entry.name.includes('/formatter/'))), false);
  for (const [language, source, expected] of [
    ['java', 'class Solution{public int sum(int a,int b){return a+b;}}', 'class Solution {\n\n    public int sum(int a, int b) {\n        return a + b;\n    }\n}\n'],
    ['javascript', 'function sum(a,b){return a+b}', 'function sum(a, b) {\n    return a + b;\n}\n'],
    ['typescript', 'function sum(a:number,b:number):number{return a+b}', 'function sum(a: number, b: number): number {\n    return a + b;\n}\n'],
  ]) {
    await page.locator('#code-language').selectOption(language);
    await editor.fill(source);
    await editor.evaluate(el => el.setSelectionRange(el.value.indexOf('return') + 2, el.value.indexOf('return') + 2));
    await button.click();
    await done();
    assert.equal(await page.locator('#toast').innerText(), '已格式化并保存到此浏览器。');
    assert.equal(await editor.inputValue(), expected);
    assert.equal(await page.locator('#highlight-content').textContent(), expected);
    assert.equal(await editor.evaluate(el => el.value.slice(el.selectionStart, el.selectionStart + 4)), 'turn');
    assert.equal(await page.evaluate(language => JSON.parse(localStorage.getItem('hot100-review:v1')).drafts[language === 'java' ? 'two-sum' : `two-sum:${language}`], language), expected);
    await editor.press(process.platform === 'darwin' ? 'Meta+z' : 'Control+z');
    assert.equal(await editor.inputValue(), source);
    await editor.press(process.platform === 'darwin' ? 'Meta+Shift+z' : 'Control+Shift+z');
    assert.equal(await editor.inputValue(), expected);
    await button.click();
    await done();
    assert.equal(await page.locator('#toast').innerText(), '代码已是规范格式。');
    await editor.fill('class {');
    await button.click();
    await done();
    assert.match(await page.locator('#toast').innerText(), /原草稿未修改/);
    assert.equal(await editor.inputValue(), 'class {');
  }
  await editor.fill('');
  await button.click();
  assert.equal(await page.locator('#toast').innerText(), '先写一点代码再格式化。');
  for (const language of ['python', 'go', 'cpp']) {
    await page.locator('#code-language').selectOption(language);
    assert.equal(await button.isDisabled(), true);
    assert.match(await button.getAttribute('title'), /暂支持/);
  }
  await page.locator('#code-language').selectOption('java');
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    if (await page.locator('#show-editor').isVisible()) await page.locator('#show-editor').click();
    assert.equal(await button.isVisible(), true);
    assert.ok(await page.locator('.editor-toolbar').evaluate(el => el.scrollWidth <= el.clientWidth));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  }
  // Hold the worker request to guarantee an edit/navigation occurs before completion.
  for (const action of ['edit', 'navigate']) {
    await editor.fill('class S{int f(){return 1;}}');
    let release;
    const paused = new Promise(resolve => {
      context.route('**/src/format-worker.js', route => {
        release = () => route.fallback();
        resolve();
      }, { times: 1 });
    });
    await button.click();
    await paused;
    if (action === 'edit') await editor.fill('class Fresh {}');
    else await page.locator('#next').click();
    const fresh = await editor.inputValue();
    await release();
    await done();
    assert.equal(await editor.inputValue(), fresh);
    assert.match(await page.locator('#toast').innerText(), /结果未应用/);
  }
  await context.route('**/src/format-worker.js', route => route.abort(), { times: 1 });
  await editor.fill('class S{}');
  await button.click();
  await done();
  assert.equal(await editor.inputValue(), 'class S{}');
  assert.match(await page.locator('#toast').innerText(), /加载失败/);
  await button.click();
  await done();
  assert.match(await page.locator('#toast').innerText(), /已格式化/);
  await page.goto(`${origin}/#/system-design/ordered/sd-requirements`);
  await page.locator('#workspace').waitFor({ state: 'visible' });
  assert.equal(await button.isVisible(), false);
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log('✓ 格式化浏览器检查：Java/JS/TS、真实 CSP/WASM、撤销重做、光标与高亮、保存、无效语法、空白、移动端、编辑/切题竞态及加载失败重试全部通过；无外部请求。');
} finally {
  await browser.close();
}
