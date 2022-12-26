import { test, expect } from '@playwright/test';

test('can play music then stop it with the esc key, and the title is updated', async ({ page }) => {
  await page.goto('https://wolstenhol.me/');

  const audioEl = await page.locator('audio');
  await page.locator('[data-section="music"] ul > li:nth-child(1) > article').locator('a[role="button"]').click();
  await page.waitForFunction(() => document.title.includes('▶'));
  expect(await audioEl.evaluate(el => el.paused)).toBe(false);
  expect(
    await page.locator('[data-section="music"] ul > li:nth-child(2) > article video').evaluate(el => window.getComputedStyle(el).opacity)
  ).toBeGreaterThan(0);
  await page.waitForTimeout(400);
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.title.includes('▶'));
  expect(await audioEl.evaluate(el => el.paused)).toBe(true);
});
