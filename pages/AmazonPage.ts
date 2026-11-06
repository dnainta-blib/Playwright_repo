import { expect, type Locator, type Page } from '@playwright/test';

export class AmazonPage {
  private readonly searchBox: Locator;
  private readonly firstResult: Locator;
  private readonly addToCartButton: Locator;
  private readonly addedToCartConfirmation: Locator;

  constructor(private readonly page: Page) {
    this.searchBox = page.locator('#twotabsearchtextbox');
    this.firstResult = page.getByRole('link', { name: 'Sponsored Ad - INPHIC A9 V2' }).first()
    //this.addToCartButton = page.locator('#a-autoid-1').getByRole('button', { name: 'Add to cart' });
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.addedToCartConfirmation = page.getByText(/added to cart/i).first();
  }

  async navigate(): Promise<void> {
   const amazonUrl = process.env.Amazon_URL;
   if (!amazonUrl) {
     throw new Error('Amazon_URL environment variable is not set');
   }
   await this.page.goto(amazonUrl); 
  }

  async searchFor(product: string): Promise<void> {
    await this.searchBox.fill(product);
    await this.page.pause();
    await this.searchBox.press('Enter');
  }

  async openFirstResult(): Promise<void> {
    await expect(this.firstResult).toBeVisible();
    await this.firstResult.click();
  }

  async addCurrentItemToCart(): Promise<void> {
   await expect(this.addToCartButton).toBeVisible({ timeout: 10000 });
    await this.addToCartButton.click();
  }

  async expectItemAddedToCart(): Promise<void> {
    await expect(this.addedToCartConfirmation).toBeVisible();
  }
}
