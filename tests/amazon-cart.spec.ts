import { test } from '@playwright/test';
import { AmazonPage } from '../pages/AmazonPage';

test('searches Amazon and adds the first item to the cart', async ({ page }) => {
  const amazonPage = new AmazonPage(page);

  await amazonPage.navigate();
  await amazonPage.searchFor('wireless mouse');
  await amazonPage.openFirstResult();
  await amazonPage.addCurrentItemToCart();
  await amazonPage.expectItemAddedToCart();
});
