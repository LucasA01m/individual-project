const { test, expect } = require('./setup-login');

const baseURL = 'https://www.saucedemo.com'

//#7 - DONE
test('SCENARIO: User should see the added product in their cart.', async ({ page }) => {

    await test.step('GIVEN: User has some product added to the cart', async () => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
        await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
        await expect(page.locator('[data-test="remove-sauce-labs-fleece-jacket"]')).toBeVisible();

    })

    await test.step('WHEN: User clicks in the cart button to visualize the cart', async () => {
        await page.locator('[data-test="shopping-cart-link"]').click();

    })

    await test.step('THEN: User should be redirected to the cart page AND: the added product should be there', async () => {
        await expect(page).toHaveURL(/.*cart.html/);
        await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-5-title-link"]')).toBeVisible();
    })
});

//#8 - DONE
test('SCENARIO: User should see the cart icon update accordingly when adding a product to the cart.', async ({ page }) => {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    await test.step('GIVEN: User is in a page which is possible to add a product to the cart', async () => {

        switch (getRandomInt(4)) {
            case 0:
                await page.goto(baseURL + '/inventory-item.html?id=0');
                break;

            case 1:
                await page.goto(baseURL + '/inventory-item.html?id=1');
                break;

            case 2:
                await page.goto(baseURL + '/inventory-item.html?id=2');
                break;
            default:

        }

    })

    await test.step('WHEN: User adds a product to the cart', async () => {
        await page.getByRole('button', { name: 'Add to cart' }).first().click();
        await expect(page.getByRole('button', { name: 'Remove' }).first()).toBeVisible();
    })

    await test.step('THEN: The top icon should update accordingly AND: be visible in every page of the website', async () => {
        await page.goto(baseURL + '/inventory.html');
        await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('1');
        for (let i = 0; i < 6; i++) {
            await page.goto(baseURL + '/inventory-item.html?id=' + i);
            await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('1');
        }

    })

});

//#9 - DONE
test('SCENARIO: User should be able to remove the added product on the cart page.', async ({ page }) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    await test.step('GIVEN: User has a product added to the cart AND: is in the cart page', async () => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

        await page.goto(baseURL + '/cart.html');
        await expect(page.getByRole('button', { name: 'Remove' }).first()).toBeVisible();

    })

    await test.step('WHEN: User click on the "Remove" button', async () => {
        await page.getByRole('button', { name: 'Remove' }).click();

    })

    await test.step('THEN: The product should be removed from the cart AND: cart icon should update accordingly', async () => {
        await expect(page.locator('[data-test="shopping-cart-link"]')).toBeEmpty();
        await expect(page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'backpack' })).not.toBeVisible();

    })

});

//#10
test('SCENARIO: User should be able to remove the added product from the cart on the inventory page.', async ({ page }) => {

    await test.step('GIVEN: User has a product added to the cart AND: is in the inventory page', async () => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

        await page.goto(baseURL + '/inventory.html');
        await expect(page.getByRole('button', { name: 'Remove' }).first()).toBeVisible();
    })

    await test.step('WHEN: User click on the "Remove" button', async () => {
        await page.getByRole('button', { name: 'Remove' }).click();
    })

    await test.step('THEN: The product should be removed from the cart AND: cart icon should update accordingly', async () => {
        await page.goto(baseURL + '/cart.html');
        await expect(page.locator('[data-test="shopping-cart-link"]')).toBeEmpty();
        await expect(page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'backpack' })).not.toBeVisible();
    })

});

//#11
test('SCENARIO: User should be able to remove the added product from the cart on the specific product page.', async ({ page }) => {

    await test.step('GIVEN: User has a product added to the cart AND: is in the product page', async () => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

        await page.goto(baseURL + '/inventory-item.html?id=4');
        await expect(page.getByRole('button', { name: 'Remove' }).first()).toBeVisible();
    })

    await test.step('WHEN: User click on the "Remove" button', async () => {
        await page.getByRole('button', { name: 'Remove' }).click();
    })

    await test.step('THEN: The product should be removed from the cart AND: cart icon should update accordingly', async () => {
        await page.goto(baseURL + '/cart.html');
        await expect(page.locator('[data-test="shopping-cart-link"]')).toBeEmpty();
        await expect(page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'backpack' })).not.toBeVisible();
    })

});

//#12
test('SCENARIO: User should be able to continue shopping from the cart page.', async ({ page }) => {

    await test.step('GIVEN: User is in the cart page', async () => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
        await page.goto(baseURL + '/cart.html');
    })

    await test.step('WHEN: User clicks in the "Continue Shopping" button', async () => {
        await page.getByRole('button', { name: 'Continue Shopping' }).click();
    })

    await test.step('THEN: User is redirected back to the inventory page', async () => {
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    })

});