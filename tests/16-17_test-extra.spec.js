const { test, expect } = require('./setup-login');

//#16 - DONE
test('SCENARIO: User should be able to go back to the Inventory page at any time using the side menu button', async ({ loginPage: page }) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    await test.step('GIVEN: User is any page of the website', async () => {
        //logs in
        if (getRandomInt(10) <= 5) { //randomly enters another page
            await page.locator('[data-test="item-0-title-link"]').click();
        } else {
            await page.locator('[data-test="shopping-cart-link"]').click();
        }
    });

    await test.step('WHEN: User clicks the "All Items" button in the side menu', async () => {
        await page.getByRole('button', { name: 'Open Menu' }).click()
        await page.locator('[data-test="inventory-sidebar-link"]').click();
    });

    await test.step('THEN: User should be redirected to the Inventory page', async () => {
        await expect(page.locator('[data-test="title"]')).toBeVisible();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

});

//#17 - DONE
test('SCENARIO: User should be able to access product page by clicking in the product image', async ({ loginPage: page }) => {
    await test.step('GIVEN: User is in the Inventory Page', async () => {
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    });

    await test.step('WHEN: User clicks a products image', async () => {
        await page.locator('[data-test="item-4-img-link"]').click();
    });

    await test.step('THEN: User is redirected to the right product page', async () => {
        await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack')
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
    });

});