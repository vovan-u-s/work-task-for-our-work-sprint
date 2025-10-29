import { test, expect, Page } from '@playwright/test';

test.describe('Test Case 5: Homepage and Features Items', () => {

  test('Open Home & See "FEATURES ITEMS"', async ({ page }: { page: Page }) => {
    // Step 1: Go to site
    await page.goto('https://automationexercise.com');

    // Step 2: Expect homepage loads and FEATURES ITEMS section is visible
    await expect(page.locator('.features_items')).toBeVisible();
    await expect(page.locator('h2.title.text-center').first()).toContainText('Features');
    
    console.log('✅ Test Case 5: Homepage verification completed');
  });

});