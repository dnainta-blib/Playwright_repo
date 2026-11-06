import {test, expect} from '@playwright/test';

test( 'test google test', async ({page})=>
{

await page.goto('https://www.google.com/');


await page.getByRole('combobox', { name: 'Search' }).click();
await page.getByRole('combobox', { name: 'Search' }).fill('playwright by testeters talk');
await page.getByRole('combobox', { name: 'Search' }).press('Enter'); 
await page.getByRole('link', { name: 'Playwright by Testers Talk - YouTube' }).click();


})