import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CartItem {
  name: string;
  price: string;
  quantity: string;
  total: string;
}

export class CartPage extends BasePage {
  private readonly cartTable: string = '#cart_info_table';
  private readonly cartItems: string = 'tr[id*="product"]';
  private readonly productNames: string = '.cart_description h4 a';
  private readonly productPrices: string = '.cart_price p';
  private readonly productQuantities: string = '.cart_quantity button';
  private readonly productTotals: string = '.cart_total p';
  private readonly proceedToCheckoutButton: string = 'a.btn.btn-default.check_out';
  private readonly deleteButtons: string = '.cart_quantity_delete';
  private readonly emptyCartMessage: string = '#empty_cart';

  constructor(page: Page) {
    super(page);
  }

  async navigateToCart(): Promise<void> {
    await this.goto('/view_cart');
    await this.waitForPageLoad();
  }

  async getCartItems(): Promise<CartItem[]> {
    await this.page.waitForSelector(this.cartTable);
    const items: CartItem[] = [];
    
    const cartRows = await this.page.locator(this.cartItems).all();
    
    for (const row of cartRows) {
      const name = await row.locator('.cart_description h4 a').textContent() || '';
      const price = await row.locator('.cart_price p').textContent() || '';
      const quantity = await row.locator('.cart_quantity button').textContent() || '';
      const total = await row.locator('.cart_total p').textContent() || '';
      
      items.push({ name, price, quantity, total });
    }
    
    return items;
  }

  async verifyProductInCart(productName: string): Promise<boolean> {
    const items = await this.getCartItems();
    return items.some(item => item.name.includes(productName));
  }

  async verifyMultipleProductsInCart(productNames: string[]): Promise<Record<string, boolean>> {
    const items = await this.getCartItems();
    const results: Record<string, boolean> = {};
    
    productNames.forEach(productName => {
      results[productName] = items.some(item => item.name.includes(productName));
    });
    
    return results;
  }

  async getCartItemCount(): Promise<number> {
    try {
      const items = await this.page.locator(this.cartItems).count();
      return items;
    } catch {
      return 0;
    }
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.click(this.proceedToCheckoutButton);
    await this.waitForPageLoad();
  }

  async removeProductFromCart(productIndex: number = 0): Promise<void> {
    const deleteButtons = this.page.locator(this.deleteButtons);
    await deleteButtons.nth(productIndex).click();
    await this.waitForPageLoad();
  }

  async clearCart(): Promise<void> {
    let itemCount = await this.getCartItemCount();
    while (itemCount > 0) {
      await this.removeProductFromCart(0); // Always remove the first item
      itemCount = await this.getCartItemCount();
    }
  }

  async verifyCartIsEmpty(): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.emptyCartMessage, { timeout: 5000 });
      return true;
    } catch {
      const itemCount = await this.getCartItemCount();
      return itemCount === 0;
    }
  }

  async getTotalAmount(): Promise<string> {
    // Implementation depends on the actual cart total selector
    // For now, return a placeholder
    return "0";
  }

  async waitForCartToLoad(): Promise<void> {
    await this.page.waitForSelector(this.cartTable);
  }

  async verifyCheckoutButtonVisible(): Promise<boolean> {
    return await this.page.isVisible(this.proceedToCheckoutButton);
  }
}