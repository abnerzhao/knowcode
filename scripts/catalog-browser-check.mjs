import assert from 'node:assert/strict';
import { BANKS } from '../src/banks.js';

export async function openCatalogQuestion(page, slug) {
  const question = page.locator(`[data-slug="${slug}"]`);
  const heading = page.locator('.question-group').filter({ has: question }).locator('.group-heading');
  if (await heading.getAttribute('aria-expanded') === 'false') await heading.click();
  await question.click();
}

export async function checkCatalogCollapse(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const heading = name => page.locator(`.group-heading[data-group="${name}"]`);
  const isExpanded = async (name, expected) => {
    const button = heading(name);
    assert.equal(await button.getAttribute('aria-expanded'), String(expected));
    const id = await button.getAttribute('aria-controls');
    assert.equal(await page.locator(`#${id}`).evaluate(el => el.hidden), !expected);
  };
  try {
    // Every book, including discussion books, starts with only category headings.
    for (const bank of BANKS) {
      await page.goto(`http://127.0.0.1:4173/#/${bank.id}/ordered`);
      await page.locator('#workspace').waitFor({ state: 'visible' });
      assert.equal(await page.locator('.question-button').count(), bank.count);
      assert.equal(await page.locator('.question-button:visible').count(), 0);
      assert.equal(await page.locator('.group-heading[aria-expanded="true"]').count(), 0);
      assert.ok(await page.locator('.group-heading').count() > 0);
    }
    await heading('数组').click();
    await isExpanded('数组', true);
    assert.equal(await page.locator('.question-button:visible').count(), 31);
    await heading('哈希表').focus();
    await page.keyboard.press('Enter');
    await isExpanded('哈希表', true);
    assert.equal(await page.locator('.question-button:visible').count(), 47);
    await page.keyboard.press('Space');
    await isExpanded('哈希表', false);
    assert.equal(await heading('哈希表').evaluate(el => el === document.activeElement), true);
    await page.locator('#code-editor').fill('// 折叠不能修改草稿');
    const title = await page.locator('#problem-title').innerText();
    await heading('数组').click();
    assert.equal(await page.locator('#problem-title').innerText(), title);
    assert.equal(await page.locator('#code-editor').inputValue(), '// 折叠不能修改草稿');
    await heading('数组').click();
    await openCatalogQuestion(page, 'plus-one');
    await page.locator('#next').click();
    await isExpanded('数组', true);
    await isExpanded('哈希表', false);
    await page.locator('#search').fill('动态规划');
    assert.ok(await page.locator('.question-button:visible').count() >= 18);
    await isExpanded('动态规划', true);
    await openCatalogQuestion(page, 'coin-change');
    await heading('动态规划').click();
    await page.locator('#next').click();
    await isExpanded('动态规划', false);
    // Clearing search restores normal expansion state, not search overrides.
    await page.locator('#search').fill('');
    await isExpanded('数组', true);
    await isExpanded('哈希表', false);
    await isExpanded('动态规划', false);
    await page.locator('#search').fill('zzzz-no-such-question');
    assert.equal(await page.locator('.question-group').count(), 0);
    assert.match(await page.locator('.empty-list').innerText(), /没有匹配/);
    await page.locator('#search').fill('');
    await isExpanded('数组', true);
    await page.reload();
    await page.locator('#workspace').waitFor({ state: 'visible' });
    assert.equal(await page.locator('.question-button:visible').count(), 0);
    await heading('数组').click();
    await page.evaluate(() => { location.hash = '#/hot100/ordered/two-sum'; });
    await page.waitForFunction(() => document.querySelector('#question-list').getAttribute('aria-label') === 'HOT 100 题目');
    assert.equal(await page.locator('.group-heading[aria-expanded="true"]').count(), 0);
    await page.setViewportSize({ width: 320, height: 844 });
    await page.locator('#toggle-catalog').click();
    await heading('哈希').click();
    assert.equal(await page.locator('#toggle-catalog').getAttribute('aria-expanded'), 'true');
    await isExpanded('哈希', true);
    await openCatalogQuestion(page, 'two-sum');
    assert.equal(await page.locator('#toggle-catalog').getAttribute('aria-expanded'), 'false');
    await page.locator('#toggle-catalog').click();
    await isExpanded('哈希', true);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.evaluate(() => { location.hash = '#/hot100/random/two-sum'; });
    await page.locator('#random-controls').waitFor({ state: 'visible' });
    assert.equal(await page.locator('.sidebar').isVisible(), false);
    assert.equal(await page.locator('.question-group').count(), 0);
    assert.deepEqual(errors, []);
  } finally {
    await context.close();
  }
}
