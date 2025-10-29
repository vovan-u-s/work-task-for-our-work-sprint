import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly signupLoginLink: string = 'a[href="/login"]';
  private readonly featuresItemsSection: string = '.features_items';
  private readonly featuresItemsHeading: string = 'h2.title.text-center';
  private readonly productsLink: string = 'a[href="/products"]';
  private readonly cartLink: string = 'a[href="/view_cart"]';
  private readonly homeLink: string = 'a[href="/"]';
  private readonly logo: string = '.logo img';

  constructor(page: Page) {
    super(page);
  }

  async navigateToHome(): Promise<void> {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  async clickSignupLogin(): Promise<void> {
    await this.page.click(this.signupLoginLink);
    await this.waitForPageLoad();
  }

  async clickProducts(): Promise<void> {
    await this.page.click(this.productsLink);
    await this.waitForPageLoad();
  }

  async clickCart(): Promise<void> {
    await this.page.click(this.cartLink);
    await this.waitForPageLoad();
  }

  async verifyFeaturesItemsVisible(): Promise<{ isVisible: boolean; headingText: string }> {
    await this.page.waitForSelector(this.featuresItemsSection);
    const isVisible = await this.page.isVisible(this.featuresItemsSection);
    
    // Get the specific "Features Items" heading (first one)
    const headingText = await this.page.locator(this.featuresItemsHeading).first().textContent() || '';
    
    return { isVisible, headingText };
  }

  async verifyHomepageLoaded(): Promise<boolean> {
    await this.page.waitForSelector(this.logo);
    const isLogoVisible = await this.page.isVisible(this.logo);
    return isLogoVisible;
  }

  async getProductsCount(): Promise<number> {
    await this.page.waitForSelector(this.featuresItemsSection);
    const productItems = this.page.locator('.features_items .col-sm-4');
    return await productItems.count();
  }
}