import { test, expect } from '@playwright/test';

test('can play music then stop it with the esc key, and the title is updated', async ({ page }) => {
  await page.goto('https://wolstenhol.me/');

  const firstMusicCard = await page.locator('[data-section="music"] ul > li:nth-child(1) > article');
  await firstMusicCard.scrollIntoViewIfNeeded();
  const playButton = await firstMusicCard.locator('a[role="button"]');
  const audioEl = await page.locator('audio');
  await playButton.click();
  await page.waitForFunction(() => document.title.includes('▶'));
  expect(await audioEl.evaluate(el => el.paused)).toBe(false);
  // Play 400ms of music…
  await page.waitForTimeout(400);
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.title.includes('▶'));
  expect(await audioEl.evaluate(el => el.paused)).toBe(true);
});
