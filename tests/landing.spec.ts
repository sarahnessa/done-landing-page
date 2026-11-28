import { test, expect } from '@playwright/test';

test('loads DONE Todo App landing page', async ({ page, browserName }) => {
  await page.goto('http://localhost:5173/done-landing-page/', {
    waitUntil: 'networkidle',
  });

  await expect(page).toHaveTitle(/DONE/i, { timeout: 10000 });

  // Scroll down in steps to trigger IntersectionObserver animations across all browsers
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
  });

  // Wait for the 3.5s counter animation to finish
  await page.waitForTimeout(3600);

  await page.screenshot({
    path: `landing-preview-${browserName}.png`,
    fullPage: true,
  });
});
