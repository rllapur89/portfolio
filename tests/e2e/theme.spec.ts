import { test, expect } from '@playwright/test';

test.describe('Theme toggle', () => {
  test('page loads in dark mode by default', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('theme toggle switches to light mode', async ({ page }) => {
    await page.goto('/en');
    const toggle = page.getByRole('button', { name: /toggle theme/i });
    await toggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('theme persists across page reload', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('button', { name: /toggle theme/i }).click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
});
