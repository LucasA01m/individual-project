const { test, expect } = require('@playwright/test');

//#1 - DONE
test('SCENARIO: User should be able to log in with standard user given the correct credentials.', async ({ page }) => {
    await test.step('GIVEN: User is in starting page (https://www.saucedemo.com/)', async () => {
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step(' WHEN: User uses the credentials for standard user and tries to log in', async () => {
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.keyboard.press("Enter");
    });

    await test.step('THEN: User should be redirected to the inventory/products page (https://www.saucedemo.com/inventory.html)', async () => {
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page.locator('[data-test="title"]')).toBeVisible();
    });

});

//#2 - DONE
test('SCENARIO: User should not be able to access the e-shop without logging in.', async ({ page }) => {
    await test.step('GIVEN: User is in starting page (https://www.saucedemo.com/)', async () => {
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step('WHEN: User clicks in the log in button without any username or password provided', async () => {
        await page.locator('[data-test="login-button"]').click();
    });

    await test.step('THEN: User should get an error message: "Epic sadface: Username is required" or "Epic sadface: password is required"', async () => {
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('data-test=error')).toContainText('Epic sadface: Username is required');
    });

});

//#2.1 - DONE
test('SCENARIO: User should not be able to access the e-shop without logging in through direct link', async ({ page }) => {
    await test.step('GIVEN: User tries to access the inventory directly with the URL (https://www.saucedemo.com/inventory.html)', async () => {
        await page.goto('https://www.saucedemo.com/inventory.html');
    });

    await test.step('WHEN: User access that page', async () => {

    });

    await test.step('THEN: User should be redirected to the main page and an error message should appear: "Epic sadface: You can only access "/inventory.html" when you are logged in."', async () => {
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('data-test=error')).toContainText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
    });

});

//#3 - DONE
test('SCENARIO: User whose access is denied should not be able to log in.', async ({ page }) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    await test.step('GIVEN: User is in starting page (https://www.saucedemo.com/)', async () => {
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step('WHEN: User uses wrong credentials (password or username) and tries to log in', async () => {
        if (getRandomInt(10) <= 5) { //randomly chooses if the password OR the username will be wrong
            await page.locator('[data-test="username"]').fill('user'); // wrong user
            await page.locator('[data-test="password"]').fill('secret_sauce');
        } else {
            await page.locator('[data-test="username"]').fill('standard_user');
            await page.locator('[data-test="password"]').fill('password'); // wrong password
        }
        await page.keyboard.press("Enter");

    });

    await test.step('THEN: User should get the error message: "Epic sadface: Username and password do not match any user in this service"', async () => {
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('data-test=error')).toContainText("Epic sadface: Username and password do not match any user in this service");
    });
});

//#4 - DONE
test('SCENARIO: User should be logged out once Logout button is pressed', async ({ page }) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    await test.step('GIVEN: User is logged in any page', async () => {
        //logs in
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.keyboard.press("Enter");

        if (getRandomInt(10) <= 5) { //randomly enters another page
            await page.locator('[data-test="item-0-title-link"]').click();
        }
    });

    await test.step('WHEN: User goes to the side menu and clicks the logout button', async () => {
        await page.getByRole('button', { name: 'Open Menu' }).click()
        await page.locator('[data-test="logout-sidebar-link"]').click();
    });

    await test.step('THEN: User is redirected to the starting page', async () => {
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="username"]')).toBeEmpty();
        await expect(page.locator('[data-test="password"]')).toBeEmpty();
    });

});