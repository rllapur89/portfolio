import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('skip to content link is focusable', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: /skip/i });
    await expect(skipLink).toBeFocused();
  });

  test('main landmark exists', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('page has a single h1', async ({ page }) => {
    await page.goto('/en');
    const h1s = page.locator('h1');
    await expect(h1s).toHaveCount(1);
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/en');
    const imgs = page.locator('img:not([alt])');
    await expect(imgs).toHaveCount(0);
  });

  test('page has at least one nav with aria-label', async ({ page }) => {
    await page.goto('/en');
    // Check aria-label exists in DOM (may be hidden on mobile via CSS)
    const count = await page.locator('nav[aria-label]').count();
    expect(count).toBeGreaterThan(0);
  });
});
