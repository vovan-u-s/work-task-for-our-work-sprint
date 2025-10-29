import { test, expect, Page } from '@playwright/test';

test.describe('Test Case 1: User Registration', () => {

  test('User Registration (Happy Path)', async ({ page }: { page: Page }) => {
    const randomName = 'Test User ' + Date.now();
    const randomEmail = 'test' + Date.now() + '@example.com';

    // Step 1: Open the site → click Signup / Login
    await page.goto('https://automationexercise.com');
    await page.click('a[href="/login"]');

    // Step 2: In "New User Signup", enter Name and Email, click Signup
    await page.fill('input[data-qa="signup-name"]', randomName);
    await page.fill('input[data-qa="signup-email"]', randomEmail);
    await page.click('button[data-qa="signup-button"]');

    // Step 3: Fill all mandatory fields
    await page.check('#id_gender1'); // Mr.
    await page.fill('#password', 'TestPassword123!');
    await page.selectOption('#days', '15');
    await page.selectOption('#months', '6');
    await page.selectOption('#years', '1990');
    
    // Address information
    await page.fill('#first_name', 'Test');
    await page.fill('#last_name', 'User');
    await page.fill('#address1', '123 Test Street');
    await page.selectOption('#country', 'United States');
    await page.fill('#state', 'California');
    await page.fill('#city', 'Los Angeles');
    await page.fill('#zipcode', '90210');
    await page.fill('#mobile_number', '+1234567890');

    // Step 4: Click Create Account → Continue
    await page.click('button[data-qa="create-account"]');
    await expect(page.locator('h2[data-qa="account-created"]')).toBeVisible();
    await page.click('a[data-qa="continue-button"]');
    
    console.log('✅ Test Case 1: User Registration completed');
  });

});
