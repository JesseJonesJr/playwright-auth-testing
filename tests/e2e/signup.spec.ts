import { test, expect } from '@playwright/test';

test.describe('Flow 4 — Sign Up', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('TC-035: Sign up page loads', async ({ page }) => {
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirm-password"]')).toBeVisible();
  });

  test('TC-037: Sign up with empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');
    
    const emailInput = page.locator('input[name="email"]');
    const isInvalid = await emailInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid).toBe(true);
  });

  test('TC-038: Sign up with invalid email', async ({ page }) => {
    await page.fill('input[name="email"]', 'notanemail');
    await page.fill('input[name="password"]', 'StrongPass123!');
    await page.fill('input[name="confirm-password"]', 'StrongPass123!');
    await page.click('button[type="submit"]');
    
    const emailInput = page.locator('input[name="email"]');
    const isInvalid = await emailInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid).toBe(true);
  });

  test('TC-039: Sign up with weak password', async ({ page }) => {
    await page.fill('input[name="password"]', '123');
    
    const strengthIndicator = page.locator('.password-strength');
    await expect(strengthIndicator).toBeVisible();
  });

  test('TC-040: Password strength indicator updates', async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    const strengthIndicator = page.locator('.password-strength');
    
    // Weak password
    await passwordInput.fill('abc');
    await expect(strengthIndicator).toBeVisible();
    
    // Strong password
    await passwordInput.fill('Str0ngP@ssword!99');
    await expect(strengthIndicator).toBeVisible();
  });

  test('TC-041: Confirm password mismatch', async ({ page }) => {
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.fill('input[name="confirm-password"]', 'DifferentPass456!');
    await page.click('button[type="submit"]');
    
    const error = page.locator('text=/match|mismatch|don\'t match/i');
    await expect(error).toBeVisible();
  });

  test('TC-042: Confirm password match', async ({ page }) => {
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'StrongPass123!');
    await page.fill('input[name="confirm-password"]', 'StrongPass123!');
    
    // No error should be visible
    const error = page.locator('text=/match|mismatch|don\'t match/i');
    await expect(error).not.toBeVisible();
  });

  test('TC-044: Back to login from sign up', async ({ page }) => {
    await page.click('text=/log in|Log in|login|Login/i');
    await expect(page).toHaveURL(/login/);
  });

  test('TC-006b: Password visibility toggle on sign up', async ({ page }) => {
    await page.fill('input[name="password"]', 'TestPassword123');
    
    const toggles = page.locator('.password-toggle');
    const passwordInput = page.locator('input[name="password"]');
    
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await toggles.first().click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
    await toggles.first().click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('Google OAuth button exists on sign up', async ({ page }) => {
    const googleBtn = page.locator('text=Google');
    await expect(googleBtn).toBeVisible();
  });

  test('Microsoft OAuth button exists on sign up', async ({ page }) => {
    const microsoftBtn = page.locator('text=Microsoft');
    await expect(microsoftBtn).toBeVisible();
  });

});
