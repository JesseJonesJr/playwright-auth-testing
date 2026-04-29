import { test, expect } from '@playwright/test';

test.describe('Flow 2 — Phone Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login/phone');
  });

  test('TC-012: Country auto-detection', async ({ page }) => {
    // Check that a country code is pre-selected
    const dialCode = page.locator('.country-select__dial');
    await expect(dialCode).toBeVisible();
    const text = await dialCode.textContent();
    expect(text).toBeTruthy();
    expect(text).toContain('+');
  });

  test('TC-013: Manual country selection', async ({ page }) => {
    // Open the dropdown
    await page.click('.country-select__trigger');
    
    // Verify dropdown is visible
    await expect(page.locator('.country-select__dropdown')).toBeVisible();
    
    // Search for United Kingdom
    await page.fill('.country-select__search input', 'United Kingdom');
    
    // Click the option
   await page.locator('.country-select__option').filter({ hasText: 'United Kingdom' }).click();
    
    // Verify dial code changed to +44
    await expect(page.locator('.country-select__dial')).toHaveText('+44');
  });

  test('TC-015: Empty phone number submission', async ({ page }) => {
    await page.click('button[type="submit"]');
    
    const phoneInput = page.locator('input[type="tel"]');
    const isInvalid = await phoneInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid).toBe(true);
  });

  test('TC-016: Phone input rejects non-numeric characters', async ({ page }) => {
    const phoneInput = page.locator('input[type="tel"]');
    await phoneInput.fill('abcdef');
    
    const value = await phoneInput.inputValue();
    expect(value.match(/[a-zA-Z]/)).toBeNull();
  });

  test('TC-017: Back button returns to login', async ({ page }) => {
    await page.click('text=Back');
    await expect(page).toHaveURL(/login/);
  });

  test('TC-013b: Country search with no results', async ({ page }) => {
    await page.click('.country-select__trigger');
    await page.fill('.country-select__search input', 'xyznoexist');
    
    await expect(page.locator('.country-select__empty')).toHaveText('No results');
  });

  test('TC-013c: Dropdown closes on outside click', async ({ page }) => {
    await page.click('.country-select__trigger');
    await expect(page.locator('.country-select__dropdown')).toBeVisible();
    
    // Click outside the dropdown
    await page.click('h1');
    await expect(page.locator('.country-select__dropdown')).not.toBeVisible();
  });

});
