import { test, expect } from '@playwright/test';

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en#contact');
    await page.waitForSelector('form');
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: /send/i }).click();
    // At least one error message should appear
    const errors = page.locator('[role="alert"], .text-destructive, [aria-live]');
    await expect(errors.first()).toBeVisible({ timeout: 3000 });
  });

  test('shows error for invalid email', async ({ page }) => {
    const form = page.locator('form');
    await form.getByLabel(/name/i).fill('Rene');
    await form.getByLabel(/email/i).fill('not-an-email');
    await form.getByLabel(/message/i).fill('This is a test message with enough chars');
    await page.getByRole('button', { name: /send/i }).click();
    const errors = page.locator('[role="alert"], .text-destructive');
    await expect(errors.first()).toBeVisible({ timeout: 3000 });
  });

  test('form fields are accessible with labels', async ({ page }) => {
    const form = page.locator('form');
    await expect(form.getByLabel(/name/i)).toBeVisible();
    await expect(form.getByLabel(/email/i)).toBeVisible();
    await expect(form.getByLabel(/message/i)).toBeVisible();
  });

  test('submit button is present', async ({ page }) => {
    await expect(page.getByRole('button', { name: /send/i })).toBeVisible();
  });
});
