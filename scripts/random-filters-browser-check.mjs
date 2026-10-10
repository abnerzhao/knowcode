import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { BANKS, storageKey } from '../src/banks.js';
import { DIFFICULTIES, parsePracticeRoute, practiceHash } from '../src/core.js';

export async function checkRandomFilters(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const route = () => parsePracticeRoute(new URL(page.url()).hash);
  const open = async hash => {
    await page.goto(`http://127.0.0.1:4173/${hash}`);
    await page.locator('#workspace').waitFor({ state: 'visible' });
  };
  const assertPool = async questions => {
    const { difficulty, category, slug } = route();
    const pool = questions.filter(q => (difficulty === 'all' || q.difficulty === difficulty) &&
      (category === 'all' || q.category === category));
    assert.ok(pool.some(q => q.slug === slug));
    assert.equal(await page.locator('#pool-count').textContent(), `${pool.length} 题`);
    assert.equal(await page.locator('#difficulty').inputValue(), difficulty);
    assert.equal(await page.locator('#category').inputValue(), category);
    return pool;
  };
  try {
    for (const bank of BANKS) {
      const data = JSON.parse(await readFile(new URL(`../public/data/${bank.file}`, import.meta.url), 'utf8'));
      await open(`#/${bank.id}/random`);
      assert.equal(await page.locator('#category-filter').isVisible(), !!bank.randomCategories);
      assert.equal(route().category, 'all');
      await assertPool(data.questions);
      if (!bank.randomCategories) continue;
      assert.deepEqual(await page.locator('#category option').evaluateAll(options => options.map(o => o.value)),
        ['all', ...data.groups.map(group => group.name)]);
      for (const group of data.groups) {
        await page.locator('#difficulty').selectOption('all');
        await page.locator('#category').selectOption(group.name);
        await assertPool(data.questions);
        assert.equal(await page.locator('#previous').isDisabled(), true);
        for (const difficulty of Object.keys(DIFFICULTIES)) {
          const expected = data.questions.filter(q => q.category === group.name && q.difficulty === difficulty);
          assert.equal(await page.locator(`#difficulty option[value="${difficulty}"]`).isDisabled(), !expected.length);
          if (!expected.length) continue;
          await page.locator('#difficulty').selectOption(difficulty);
          await assertPool(data.questions);
          await page.locator('#next').click();
          await assertPool(data.questions);
        }
      }
      // One complete combined-filter round, including history navigation and restart.
      const sample = data.questions.find(q => data.questions.filter(other =>
        other.category === q.category && other.difficulty === q.difficulty).length >= 2);
      await open(practiceHash('random', sample.slug, sample.difficulty, bank.id, sample.category));
      const pool = await assertPool(data.questions);
      const seen = new Set();
      for (let i = 0; i < pool.length; i++) {
        const slug = route().slug;
        assert.ok(!seen.has(slug));
        seen.add(slug);
        await page.locator('#next').click();
        await assertPool(data.questions);
        assert.notEqual(route().slug, slug);
      }
      assert.deepEqual(seen, new Set(pool.map(q => q.slug)));
      const last = route().slug;
      await page.locator('#previous').click();
      await assertPool(data.questions);
      await page.locator('#next').click();
      assert.equal(route().slug, last);
      const draft = '// 组合筛选不丢草稿';
      await page.locator('#code-editor').fill(draft);
      await page.locator('#category').selectOption('all');
      const key = bank.kind === 'discussion' ? `${last}:text` : last;
      assert.equal(await page.evaluate(({ storage, key }) => JSON.parse(localStorage.getItem(storage)).drafts[key],
        { storage: storageKey(bank.id), key }), draft);
      assert.equal(await page.locator('#previous').isDisabled(), true);
      await open(practiceHash('random', last, sample.difficulty, bank.id, sample.category));
      assert.equal(await page.locator('#code-editor').inputValue(), draft);
      await page.reload();
      await page.locator('#workspace').waitFor({ state: 'visible' });
      await assertPool(data.questions);
      assert.equal(route().category, sample.category);
      await page.locator('#practice-bookshelf').click();
      await page.locator('#bank-picker').waitFor({ state: 'visible' });
      await page.goBack();
      await page.locator('#workspace').waitFor({ state: 'visible' });
      await assertPool(data.questions);
      await page.goForward();
      await page.locator('#bank-picker').waitFor({ state: 'visible' });
      await page.locator(`[data-bank="${bank.id}"]`).click();
      await page.locator('#random-mode').click();
      await page.locator('#workspace').waitFor({ state: 'visible' });
      assert.equal(route().category, 'all');
      assert.equal(route().difficulty, 'all');
      const longest = [...data.groups].sort((a, b) => b.name.length - a.name.length)[0];
      await page.locator('#category').selectOption(longest.name);
      for (const width of [320, 390, 768, 1024]) {
        await page.setViewportSize({ width, height: 844 });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${bank.id}: ${width}`);
        assert.ok(await page.locator('#category').isVisible());
        assert.ok(await page.locator('#difficulty').isVisible());
      }
      await page.setViewportSize({ width: 1440, height: 1000 });
    }
    // Invalid combinations, invalid categories, incompatible slugs, and old links.
    for (const [hash, category, difficulty] of [
      ['#/hot100/random?difficulty=hard&category=哈希', '哈希', 'all'],
      ['#/hot100/random?difficulty=easy&category=unknown', 'all', 'easy'],
      ['#/hot100/random?difficulty=constructor&category=哈希', '哈希', 'all'],
      ['#/hot100/random', 'all', 'all'],
      ['#/system-design/random?category=数组', 'all', 'all'],
      ['#/hot100/ordered/two-sum?category=哈希', 'all', 'all'],
    ]) {
      await open(hash);
      assert.equal(route().category, category);
      assert.equal(route().difficulty, difficulty);
    }
    await open('#/hot100/random/trapping-rain-water?difficulty=easy&category=哈希');
    assert.equal(route().slug, 'two-sum');
    assert.equal(await page.locator('#difficulty option[value="hard"]').isDisabled(), true);
    assert.equal(await page.locator('#category option[value="滑动窗口"]').isDisabled(), true);
    await page.locator('#next').click();
    assert.equal(route().slug, 'two-sum');
    assert.deepEqual(errors, []);
  } finally {
    await context.close();
  }
}
