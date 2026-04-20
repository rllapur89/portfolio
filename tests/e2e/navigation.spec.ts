import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('redirects root to /en', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en/);
  });

  test('renders all nav links', async ({ page }) => {
    await page.goto('/en');
    const nav = page.getByRole('navigation').first();
    await expect(nav.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /experience/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /projects/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /skills/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /contact/i })).toBeVisible();
  });

  test('nav link scrolls to section', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL(/\#about/);
  });
});
