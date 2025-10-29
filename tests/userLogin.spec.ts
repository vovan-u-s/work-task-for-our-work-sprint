import { test, expect, Page } from '@playwright/test';

test.describe('Test Case 2: Login With Valid Credentials', () => {

  test('Login Form Verification', async ({ page }: { page: Page }) => {
    // Step 1: Click Signup / Login
    await page.goto('https://automationexercise.com');
    await page.click('a[href="/login"]');

    // Step 2: Verify login form elements
    await expect(page.locator('input[data-qa="login-email"]')).toBeVisible();
    await expect(page.locator('input[data-qa="login-password"]')).toBeVisible();
    await expect(page.locator('button[data-qa="login-button"]')).toBeVisible();

    console.log('✅ Test Case 2: Login form verification completed');
  });

});