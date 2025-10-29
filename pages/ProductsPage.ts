import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ProductInfo {
  name: string;
  price: string;
}

export class ProductsPage extends BasePage {
  private readonly productsContainer: string = '.features_items';
  private readonly productsList: string = '.col-sm-4';
  private readonly addToCartButtons: string = 'a[data-product-id]';
  private readonly viewCartModal: string = '#cartModal';
  private readonly continueShoppingButton: string = 'button.btn.btn-success.close-modal';
  private readonly viewCartButton: string = 'a[href="/view_cart"]';
  private readonly productNames: string = '.productinfo h2';
  private readonly productPrices: string = '.productinfo h2 + p';

  constructor(page: Page) {
    super(page);
  }

  async navigateToProducts(): Promise<void> {
    await this.goto('/products');
    await this.waitForPageLoad();
  }

  async getProductDetails(productIndex: number = 0): Promise<ProductInfo> {
    const products = this.page.locator(this.productsList);
    const product = products.nth(productIndex);
    
    const name = await product.locator('h2').textContent() || '';
    const price = await product.locator('.productinfo p').first().textContent() || '';
    
    return { name, price };
  }

  async addProductToCart(productIndex: number = 0): Promise<void> {
    const products = this.page.locator(this.productsList);
    const product = products.nth(productIndex);
    
    // Hover over product to reveal add to cart button
    await product.hover();
    
    // Click add to cart button
    const addToCartBtn = product.locator('a[data-product-id]').first();
    await addToCartBtn.click();
    
    // Handle the modal that appears
    await this.page.waitForSelector(this.viewCartModal);
  }

  async continueShopping(): Promise<void> {
    await this.page.click(this.continueShoppingButton);
    await this.page.waitForSelector(this.viewCartModal, { state: 'hidden' });
  }

  async viewCart(): Promise<void> {
    // Use force click to handle overlapping elements
    await this.page.click(this.viewCartButton, { force: true });
    await this.waitForPageLoad();
  }

  async addMultipleProductsToCart(productIndices: number[] = [0, 1]): Promise<void> {
    for (let i = 0; i < productIndices.length; i++) {
      await this.addProductToCart(productIndices[i]);
      
      if (i < productIndices.length - 1) {
        // Continue shopping for all but the last product
        await this.continueShopping();
      } else {
        // View cart after adding the last product
        await this.viewCart();
      }
    }
  }

  async getAllProductsInfo(): Promise<ProductInfo[]> {
    const products: ProductInfo[] = [];
    const productElements = await this.page.locator(this.productsList).all();
    
    for (const element of productElements) {
      const name = await element.locator('h2').textContent() || '';
      const price = await element.locator('.productinfo p').first().textContent() || '';
      products.push({ name, price });
    }
    
    return products;
  }

  async waitForProductsToLoad(): Promise<void> {
    await this.page.waitForSelector(this.productsContainer);
    // Wait for at least one product to be visible
    await this.page.waitForSelector(`${this.productsList}:first-child`);
  }
}