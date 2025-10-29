import { test, expect, Page } from '@playwright/test';

test.describe('Test Case 3: Add Multiple Products to Cart', () => {

  test('Add Multiple Products to Cart and Verify', async ({ page }: { page: Page }) => {
    // Step 1: Go to Products
    await page.goto('https://automationexercise.com');
    await page.click('a[href="/products"]');
    await page.waitForSelector('.features_items');

    // Step 2: Add Product 1 and Product 2 to the cart
    const products = page.locator('.features_items .col-sm-4');
    
    // Add first product
    await products.first().hover();
    await products.first().locator('a[data-product-id]').first().click();
    await page.click('button.btn.btn-success.close-modal');

    // Add second product
    await products.nth(1).hover();
    await products.nth(1).locator('a[data-product-id]').first().click();
    
    // Step 3: Open Cart page
    await page.goto('/view_cart');
    
    // Verify products in cart
    await page.waitForSelector('#cart_info_table');
    const cartItems = await page.locator('tr[id*="product"]').count();
    expect(cartItems).toBe(2);
    
    console.log('✅ Test Case 3: Added 2 products to cart successfully');
  });

});