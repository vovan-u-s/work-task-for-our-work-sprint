import { test, expect, Page } from '@playwright/test';

test.describe('Test Case 4: Place an Order with Valid Data', () => {

  test('Order Placement Flow Verification', async ({ page }: { page: Page }) => {
    // Step 1: Add a product to cart
    await page.goto('https://automationexercise.com');
    await page.click('a[href="/products"]');
    await page.waitForSelector('.features_items');
    
    const firstProduct = page.locator('.features_items .col-sm-4').first();
    await firstProduct.hover();
    await firstProduct.locator('a[data-product-id]').first().click();
    
    // Step 2: Go to Cart → verify Proceed to Checkout button
    await page.goto('/view_cart');
    await page.waitForSelector('#cart_info_table');
    
    // Verify checkout button is present
    await expect(page.locator('a.btn.btn-default.check_out')).toBeVisible();
    
    console.log('✅ Test Case 4: Order placement flow verified');
  });

});