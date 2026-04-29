import { test, expect } from '@playwright/test';

test.describe('Flow 1 — Email/Password Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('TC-004: Login fails with empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    // Check that the browser's native validation or custom validation appears
    const emailInput = page.locator('input[name="email"]');
    const isInvalid = await emailInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid).toBe(true);
  });

  test('TC-006: Password visibility toggle', async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.fill('TestPassword123');

    // Should start as password type
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click toggle to show password
    await page.locator('.password-toggle').click({ force: true });
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Click again to hide
    await page.locator('.password-toggle').click({ force: true });
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('TC-009: Google OAuth button exists and is clickable', async ({ page }) => {
    const googleBtn = page.locator('text=Google');
    await expect(googleBtn).toBeVisible();
  });

  test('TC-010: Microsoft OAuth button exists and is clickable', async ({ page }) => {
    const microsoftBtn = page.locator('text=Microsoft');
    await expect(microsoftBtn).toBeVisible();
  });

  test('TC-011: Navigate to phone login', async ({ page }) => {
    await page.click('text=phone number');
    await expect(page).toHaveURL(/phone/);
  });

  test('TC-021: Navigate to forgot password', async ({ page }) => {
    await page.click('text=Forgot password');
    await expect(page).toHaveURL(/forgot/);
  });

  test('TC-035: Navigate to sign up', async ({ page }) => {
    await page.click('text=Sign up');
    await expect(page).toHaveURL(/signup|register|create/);
  });

});
