const { test, expect } = require('@playwright/test');

exports.expect = expect;
exports.test = test.extend({

    loginPage: async ({ page }, use) => {

        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.keyboard.press("Enter");

        await expect(page).toHaveURL(/.*inventory.html/);
        await use(page);

    },

    cartPage: async ({ loginPage: page }, use) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();

        await page.locator('[data-test="shopping-cart-link"]').click();

        await expect(page).toHaveURL(/.*cart.html/);
        await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-5-title-link"]')).toBeVisible();
        await use(page);

    }


})