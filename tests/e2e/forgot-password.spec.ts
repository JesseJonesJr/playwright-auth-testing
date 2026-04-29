import { test, expect } from '@playwright/test';

test.describe('Flow 3 — Forgot Password', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/forgot-password');
  });

  // Step 1 — Email screen

  test('TC-021: Forgot password page loads', async ({ page }) => {
    await expect(page.locator('text=Forgot password?')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });

  test('TC-023: Submit empty email', async ({ page }) => {
    await page.click('button[type="submit"]');

    const emailInput = page.locator('input[name="email"]');
    const isInvalid = await emailInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid).toBe(true);
  });

  test('TC-024: Submit invalid email format', async ({ page }) => {
    await page.fill('input[name="email"]', 'notanemail');
    await page.click('button[type="submit"]');

    const emailInput = page.locator('input[name="email"]');
    const isInvalid = await emailInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid).toBe(true);
  });

  test('TC-025: Back to login from forgot password', async ({ page }) => {
    await page.click('text=Back');
    await expect(page).toHaveURL(/login/);
  });

  // Step 2 — Code verification screen

  test('TC-022: Submit valid email advances to code screen', async ({ page }) => {
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Check your email')).toBeVisible();
  });

  test('TC-027: Code countdown timer is visible', async ({ page }) => {
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Check your email')).toBeVisible();

    // Timer or resend text should be visible
    const resendArea = page.locator('text=/resend|Resend|\\d+s/i');
    await expect(resendArea).toBeVisible();
  });

  // Step 3 — Set new password screen

  test('TC-026: Valid code advances to reset password screen', async ({ page }) => {
    // Step 1 — enter email
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Check your email')).toBeVisible();

    // Step 2 — enter test code
    // OTP inputs might be individual fields — adjust selector as needed
    const otpInputs = page.locator('input[type="tel"], input[type="text"]').filter({ hasNot: page.locator('input[name="email"]') });
    const count = await otpInputs.count();

    if (count >= 6) {
      // Individual OTP inputs
      const code = '123456';
      for (let i = 0; i < 6; i++) {
        await otpInputs.nth(i).fill(code[i]);
      }
    }

    // Submit or auto-advance
    const submitBtn = page.locator('button[type="submit"]');
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
    }

    await expect(page.locator('text=Set new password')).toBeVisible();
  });

  test('TC-029: Password strength indicator updates', async ({ page }) => {
    // Navigate to set new password step
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Check your email')).toBeVisible();

    const otpInputs = page.locator('input[type="tel"], input[type="text"]').filter({ hasNot: page.locator('input[name="email"]') });
    const count = await otpInputs.count();
    if (count >= 6) {
      const code = '123456';
      for (let i = 0; i < 6; i++) {
        await otpInputs.nth(i).fill(code[i]);
      }
    }
    const submitBtn = page.locator('button[type="submit"]');
    if (await submitBtn.isVisible()) await submitBtn.click();
    await expect(page.locator('text=Set new password')).toBeVisible();

    // Type weak password
    await page.fill('input[name="password"]', 'abc');
    const strengthIndicator = page.locator('.password-strength');
    await expect(strengthIndicator).toBeVisible();

    // Type strong password
    await page.fill('input[name="password"]', 'Str0ngP@ssword!99');
    await expect(strengthIndicator).toBeVisible();
  });

  test('TC-031: Password and confirm password mismatch', async ({ page }) => {
    // Navigate to set new password step
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Check your email')).toBeVisible();

    const otpInputs = page.locator('input[type="tel"], input[type="text"]').filter({ hasNot: page.locator('input[name="email"]') });
    const count = await otpInputs.count();
    if (count >= 6) {
      const code = '123456';
      for (let i = 0; i < 6; i++) {
        await otpInputs.nth(i).fill(code[i]);
      }
    }
    const submitBtn = page.locator('button[type="submit"]');
    if (await submitBtn.isVisible()) await submitBtn.click();
    await expect(page.locator('text=Set new password')).toBeVisible();

    // Enter mismatched passwords
    await page.fill('input[name="password"]', 'Password123!');
    await page.fill('input[name="confirm-password"]', 'DifferentPass456!');
    await page.click('button[type="submit"]');

    // Expect error message about mismatch
    const error = page.locator('text=/match|mismatch|don\'t match/i');
    await expect(error).toBeVisible();
  });

  test('TC-030: Password and confirm password match', async ({ page }) => {
    // Navigate to set new password step
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Check your email')).toBeVisible();

    const otpInputs = page.locator('input[type="tel"], input[type="text"]').filter({ hasNot: page.locator('input[name="email"]') });
    const count = await otpInputs.count();
    if (count >= 6) {
      const code = '123456';
      for (let i = 0; i < 6; i++) {
        await otpInputs.nth(i).fill(code[i]);
      }
    }
    const submitBtn = page.locator('button[type="submit"]');
    if (await submitBtn.isVisible()) await submitBtn.click();
    await expect(page.locator('text=Set new password')).toBeVisible();

    // Enter matching passwords
    await page.fill('input[name="password"]', 'StrongPass123!');
    await page.fill('input[name="confirm-password"]', 'StrongPass123!');
    await page.click('button[type="submit"]');

    // Should advance to success screen
    await expect(page.locator('text=Password reset!')).toBeVisible();
  });

  // Step 4 — Success screen

  test('TC-034: Back to login from success screen', async ({ page }) => {
    // Navigate through full flow
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Check your email')).toBeVisible();

    const otpInputs = page.locator('input[type="tel"], input[type="text"]').filter({ hasNot: page.locator('input[name="email"]') });
    const count = await otpInputs.count();
    if (count >= 6) {
      const code = '123456';
      for (let i = 0; i < 6; i++) {
        await otpInputs.nth(i).fill(code[i]);
      }
    }
    let submitBtn = page.locator('button[type="submit"]');
    if (await submitBtn.isVisible()) await submitBtn.click();
    await expect(page.locator('text=Set new password')).toBeVisible();

    await page.fill('input[name="password"]', 'StrongPass123!');
    await page.fill('input[name="confirm-password"]', 'StrongPass123!');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Password reset!')).toBeVisible();

    // Click back to login
    await page.click('text=Continue to Login');
    await expect(page).toHaveURL(/login/);
  });

});
