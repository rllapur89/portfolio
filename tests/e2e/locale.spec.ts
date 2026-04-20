import { test, expect } from '@playwright/test';

test.describe('Locale switching', () => {
  test('EN page renders English copy', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByRole('main')).toContainText(/Senior|Engineer|Developer/i);
  });

  test('ES page renders Spanish copy', async ({ page }) => {
    await page.goto('/es');
    await expect(page.getByRole('main')).toContainText(/Desarrollador|Ingeniero|Senior/i);
  });

  test('locale switcher navigates from EN to ES', async ({ page, viewport }) => {
    await page.goto('/en');
    const isMobile = (viewport?.width ?? 1280) < 640;
    if (isMobile) {
      // Open hamburger — target the menu button specifically via aria-controls
      await page.locator('button[aria-controls="mobile-nav"]').click();
    }
    // Locale switcher renders locale codes as lowercase text (uppercase is CSS only)
    await page.getByRole('button', { name: 'es', exact: true }).first().click();
    await expect(page).toHaveURL(/\/es/, { timeout: 8000 });
  });

  test('locale switcher navigates from ES to EN', async ({ page, viewport }) => {
    await page.goto('/es');
    const isMobile = (viewport?.width ?? 1280) < 640;
    if (isMobile) {
      await page.locator('button[aria-controls="mobile-nav"]').click();
    }
    await page.getByRole('button', { name: 'en', exact: true }).first().click();
    await expect(page).toHaveURL(/\/en/, { timeout: 8000 });
  });
});
