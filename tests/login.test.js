const { test, expect } = require('@playwright/test');
const BasePage = require('../utils/basePage');
const testData = require('../utils/testData');

test.describe('Login Tests', () => {
  let basePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.navigateTo(); // assumes navigateTo launches the URL
  });

  test('Login Test', async ({ page }) => {
    // 1. Login
    await page.fill('[name="user-name"]', testData.username || 'standard_user');
    await page.fill('#password', testData.password || 'secret_sauce');
    await page.click('#login-button');

    // 2. Ensure products page loaded
    const firstProductLocator = page.locator('.inventory_item_name').first();
    await expect(firstProductLocator).toBeVisible();

    // 3. Capture first product name and add to cart
    const productName = await firstProductLocator.innerText();
    await page.locator('.btn_inventory').first().click();

    // 4. Open cart and verify product name
    await page.click('.shopping_cart_link');
    
    // 5. Verify product in cart using XPath
    const cartProductName = await page.locator("//div[@class='inventory_item_name']").innerText();
    console.log("Product in cart:", cartProductName); // <-- print cart product name
    expect(cartProductName).toEqual(productName);

    // 5. Logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    // 6. Verify back at login
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    await page.context().close();
  });
});
