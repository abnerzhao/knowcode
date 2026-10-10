import assert from 'node:assert/strict';

export async function checkEditorFullscreen(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const editor = page.locator('#code-editor');
  const toggle = page.locator('#toggle-editor-fullscreen');
  const active = async () => assert.equal(await toggle.getAttribute('aria-pressed'), 'true');
  const inactive = async () => {
    assert.equal(await toggle.getAttribute('aria-pressed'), 'false');
    assert.equal(await page.locator('[inert]').count(), 0);
    assert.equal(await page.locator('body').evaluate(el => el.classList.contains('editor-fullscreen')), false);
  };
  const fillsViewport = async () => {
    assert.ok(await page.locator('#editor-panel').evaluate(el => {
      const rect = el.getBoundingClientRect();
      return rect.x === 0 && rect.y === 0 && Math.abs(rect.width - innerWidth) < 1 && Math.abs(rect.height - innerHeight) < 1;
    }));
    assert.ok(await page.locator('.code-area').evaluate(el => el.clientHeight > 100));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  };
  try {
    await page.goto('http://127.0.0.1:4173/#/hot100/ordered/two-sum');
    await page.locator('#workspace').waitFor({ state: 'visible' });
    const draft = Array.from({ length: 100 }, (_, i) => `// line ${i}: ${'long code '.repeat(24)}`).join('\n');
    await editor.fill(draft);
    await editor.evaluate(el => { el.setSelectionRange(8, 15); el.scrollTop = 300; el.scrollLeft = 100; });
    await toggle.click();
    await active();
    await fillsViewport();
    assert.equal(await editor.inputValue(), draft);
    assert.deepEqual(await editor.evaluate(el => [el.selectionStart, el.selectionEnd, el.scrollTop, el.scrollLeft]), [8, 15, 300, 100]);
    assert.equal(await editor.evaluate(el => el === document.activeElement), true);
    assert.equal(await page.locator('.problem-panel').evaluate(el => el.inert), true);
    await page.locator('#code-language').focus();
    await page.keyboard.press('Shift+Tab');
    assert.equal(await editor.evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Escape');
    await inactive();
    assert.equal(await toggle.evaluate(el => el === document.activeElement), true);
    assert.deepEqual(await editor.evaluate(el => [el.selectionStart, el.selectionEnd]), [8, 15]);
    // Keyboard entry and native undo remain available without replacing the textarea.
    await editor.fill('hell');
    await editor.press('End');
    await editor.pressSequentially('o');
    await toggle.focus();
    await page.keyboard.press('Enter');
    await active();
    await page.keyboard.press('ControlOrMeta+z');
    assert.equal(await editor.inputValue(), 'hell');
    await editor.fill('// fullscreen draft');
    await page.keyboard.press('Control+s');
    assert.match(await page.locator('#save-status').innerText(), /已保存/);
    await page.locator('#reset-code').click();
    await page.locator('#reset-dialog').waitFor({ state: 'visible' });
    await page.keyboard.press('Escape');
    await page.locator('#reset-dialog').waitFor({ state: 'hidden' });
    await active();
    assert.equal(await editor.inputValue(), '// fullscreen draft');
    await page.locator('#editor-theme').selectOption('dark');
    assert.equal(await page.locator('.code-area').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(32, 40, 37)');
    await page.locator('#code-language').selectOption('python');
    await editor.fill('print("fullscreen")');
    await page.locator('#code-language').selectOption('java');
    assert.equal(await editor.inputValue(), '// fullscreen draft');
    await toggle.click();
    await inactive();
    await toggle.click();
    await page.reload();
    await page.locator('#workspace').waitFor({ state: 'visible' });
    await inactive();
    assert.equal(await editor.inputValue(), '// fullscreen draft');
    // Narrow layouts, resizing while expanded, and short landscape viewports.
    for (const [width, height] of [[320, 640], [390, 844], [844, 390], [1440, 1000]]) {
      await page.setViewportSize({ width, height });
      if (await page.locator('#show-editor').isVisible()) await page.locator('#show-editor').click();
      assert.ok(await page.locator('.editor-heading').evaluate(el => el.scrollWidth <= el.clientWidth));
      await toggle.click();
      await active();
      await fillsViewport();
      await page.keyboard.press('Escape');
      await inactive();
      assert.equal(await editor.isVisible(), true);
    }
    await toggle.click();
    await page.setViewportSize({ width: 320, height: 640 });
    await fillsViewport();
    await page.evaluate(() => { location.hash = '#/'; });
    await page.locator('#bank-picker').waitFor({ state: 'visible' });
    await inactive();
    await page.goto('http://127.0.0.1:4173/#/os-network/ordered/os-process-thread');
    await page.locator('#workspace').waitFor({ state: 'visible' });
    await page.locator('#show-editor').click();
    await editor.fill('全屏思路草稿');
    await toggle.click();
    await active();
    await fillsViewport();
    assert.equal(await page.locator('#editor-panel').getAttribute('aria-label'), '思路草稿');
    await page.keyboard.press('Control+s');
    await page.keyboard.press('Escape');
    assert.equal(await editor.inputValue(), '全屏思路草稿');
    await inactive();
    assert.deepEqual(errors, []);
  } finally {
    await context.close();
  }
}
