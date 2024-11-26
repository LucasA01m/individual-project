const { test, expect } = require('./setup-login');

test('SCENARIO: User should be able to filter the inventory according to the option chosen.', async ({ page }) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let choice = '';

    await test.step('GIVEN: User is in the inventory page (https://www.saucedemo.com/inventory.html) with all the products', async () => {
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    });

    await test.step('WHEN: User selects any filtering option', async () => {
        switch (2) { //randomly chooses a sorting option
            case 0:
                choice = "Name (A to Z)"
                break;
            case 1:
                choice = "Name (Z to A)"
                break;
            case 2:
                choice = "Price (low to high)";
                break;
            case 3:
                choice = "Price (high to low)";
                break;
        }
        await page.locator('data-test=product-sort-container').selectOption(choice); //apply the choice in the page

    });

    await test.step('THEN: All the products are shown with the according display', async () => {
        await expect(page.locator('data-test=active-option')).toContainText(choice);
        let count;
        let sortedByPage;
        let sortAtoZ;
        let sortLowToHigh;

        switch (choice) {
            case "Name (A to Z)":
                count = await page.locator('data-test=inventory-item').count();
                sortedByPage = []

                for (let i = 0; i < count; i++) {
                    let item = await page.locator('data-test=inventory-item-name').nth(i).textContent();
                    sortedByPage.push(item);
                }

                // Sorts whatever display in the page in alphabetically order
                sortAtoZ = sortedByPage.toSorted();

                // Tests if page sorting is A to Z
                expect(JSON.stringify(sortedByPage) == JSON.stringify(sortAtoZ)).toBeTruthy();

                break;

            case "Name (Z to A)":
                count = await page.locator('data-test=inventory-item').count();
                sortedByPage = []

                for (let i = 0; i < count; i++) {
                    let item = await page.locator('data-test=inventory-item-name').nth(i).textContent();
                    sortedByPage.push(item);
                }

                // Sorts whatever display in the page in alphabetically order
                sortAtoZ = sortedByPage.toSorted();

                // Tests if page sorting is Z to A
                expect(JSON.stringify(sortedByPage) == JSON.stringify(sortAtoZ.reverse())).toBeTruthy();

                break;

            case "Price (low to high)":
                count = await page.locator('data-test=inventory-item').count();
                sortedByPage = []

                for (let i = 0; i < count; i++) {
                    let item = await page.locator('data-test=inventory-item-price').nth(i).textContent();
                    sortedByPage.push(parseFloat(item.match(/[+-]?\d+(\.\d+)?/g)));
                }

                // Sorts whatever display in the page in alphabetically order
                sortLowToHigh = sortedByPage.toSorted((a, b) => a - b);

                // Tests if page sorting is Low to High
                expect(JSON.stringify(sortedByPage) == JSON.stringify(sortLowToHigh)).toBeTruthy();

                break;
            case "Price (high to low)":
                count = await page.locator('data-test=inventory-item').count();
                sortedByPage = []

                for (let i = 0; i < count; i++) {
                    let item = await page.locator('data-test=inventory-item-price').nth(i).textContent();
                    sortedByPage.push(parseFloat(item.match(/[+-]?\d+(\.\d+)?/g)));
                }

                // Sorts whatever display in the page in alphabetically order
                sortLowToHigh = sortedByPage.toSorted((a, b) => a - b);

                // Tests if page sorting is High to Low
                expect(JSON.stringify(sortedByPage) == JSON.stringify(sortLowToHigh.reverse())).toBeTruthy();
                break;
        }
    });

});

test('SCENARIO: User should see the correct product details such as image, product name, description, and price.', async ({ page }) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    await test.step('GIVEN: User is in the inventory page (https://www.saucedemo.com/inventory.html)', async () => {
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    })

    await test.step('WHEN: The products are displayed', async () => {
        await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    })

    await test.step('THEN: All of the details should be visible and correct', async () => {
        let item = getRandomInt(6);
        await expect(page.locator(`[data-test="item-${item}-img-link"]`)).toBeVisible();
        await expect(page.locator('[data-test="inventory-item-name"]').nth(item)).toBeVisible();
        await expect(page.locator('[data-test="inventory-item-desc"]').nth(item)).toBeVisible();
        await expect(page.locator('[data-test="inventory-item-price"]').nth(item)).toBeVisible();
    })
});