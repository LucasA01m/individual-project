const { test, expect } = require('./setup-login');

// #13 - DONE
test('SCENARIO: User should see the checkout overview with details such as payment, shipping info, and price total.', async ({ cartPage: page }) => {
    await test.step('GIVEN: User has products added to the cart AND: is in the Checkout-Overview page', async () => {
        await page.locator('[data-test="checkout"]').click();

        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        await page.locator('[data-test="firstName"]').fill('Carsten');
        await page.locator('[data-test="lastName"]').fill('Koerl');
        await page.locator('[data-test="postalCode"]').fill('Switzerland');

        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });

    await test.step('WHEN: Check out informations are displayed', async () => {
        await expect(page.locator('[data-test="checkout-summary-container"]')).toBeVisible();
    });

    await test.step('THEN: products to checkout, payment info, shipping info, and price total should be visible', async () => {
        await expect(page.locator('div.summary_info')).toBeVisible();

        await expect(page.locator('div.cart_item')).toHaveCount(3);

        await expect(page.locator('[data-test="payment-info-value"]')).toBeVisible();

        await expect(page.locator('[data-test="shipping-info-value"]')).toBeVisible();

        let total_price = 0;
        for (let i = 0; i < 3; i++) {
            const priceText = await page.locator('div.inventory_item_price').nth(i).textContent(); // Get the text content
            const price = parseFloat(priceText.replace('$', '').trim()); // Remove '$' and convert to a number
            total_price += price; // Add the price to the total
        }

        const calculatedTotal = Math.round(total_price * 1.08 * 100) / 100

        await expect(page.locator('[data-test="total-label"]')).toContainText(`$${calculatedTotal}`);

    });
});


// #14 - DONE
test('SCENARIO: User should get notified when they fail to enter any of the checkout information.', async ({ cartPage: page }) => {
    await test.step('GIVEN: User has products added to the cart AND: is in the Checkout-Your-Information page', async () => {
        await page.locator('[data-test="checkout"]').click();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);

    })

    await test.step('WHEN: User inputs bad inputs in the shipping info form', async () => {
        await page.locator('[data-test="firstName"]').fill('');
        await page.locator('[data-test="lastName"]').fill('Koerl');
        await page.locator('[data-test="postalCode"]').fill('Switzerland');

        await page.locator('[data-test="continue"]').click();
    })

    await test.step('THEN: An error message should be shown AND: there is no redirection', async () => {
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
    })
})


// #15 - DONE
test('SCENARIO: User should get notified after placing a successful order.', async ({ cartPage: page }) => {
    await test.step('GIVEN: User has products added to the cart AND: is in the Checkout-Overview page', async () => {
        await page.locator('[data-test="checkout"]').click();

        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        await page.locator('[data-test="firstName"]').fill('Carsten');
        await page.locator('[data-test="lastName"]').fill('Koerl');
        await page.locator('[data-test="postalCode"]').fill('Switzerland');

        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    })

    await test.step('WHEN: User clicks the "Finish" button', async () => {
        await page.locator('[data-test="finish"]').click();
    })

    await test.step('THEN: User should be redirected to the confirmation of order placement', async () => {
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        await expect(page.locator('[data-test="checkout-complete-container"]')).toContainText('Thank you for your order');
    })
})




