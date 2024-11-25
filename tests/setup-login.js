const { test, expect } = require('@playwright/test');

exports.expect = expect;
exports.test = test.extend({

    inventoryPage: async ({ page }, use) => {

        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.keyboard.press("Enter");

        await expect(page).toHaveURL(/.*inventory.html/);
        await use(page);
    }

})