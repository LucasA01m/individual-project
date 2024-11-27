const { test, expect } = require('@playwright/test');

//#1 - DONE
test('SCENARIO: User should be able to log in with standard user given the correct credentials.', async ({ page }) => {
    await test.step('GIVEN: User is in starting page (https://www.saucedemo.com/)', async () => {
        // Navigate to the main login page.
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step('WHEN: User uses the credentials for standard user and tries to log in', async () => {
        // Fill in the username and password fields and press Enter to log in.
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.keyboard.press("Enter");
    });

    await test.step('THEN: User should be redirected to the inventory/products page (https://www.saucedemo.com/inventory.html)', async () => {
        // Verify that the user is redirected to the inventory page and the title is visible.
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page.locator('[data-test="title"]')).toBeVisible();
    });
});

//#2 - DONE
test('SCENARIO: User should not be able to access the e-shop without logging in.', async ({ page }) => {
    await test.step('GIVEN: User is in starting page (https://www.saucedemo.com/)', async () => {
        // Navigate to the main login page.
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step('WHEN: User clicks in the log in button without any username or password provided', async () => {
        // Attempt to log in without filling in the username and password fields.
        await page.locator('[data-test="login-button"]').click();
    });

    await test.step('THEN: User should get an error message: "Epic sadface: Username is required" or "Epic sadface: password is required"', async () => {
        // Verify that the user remains on the login page and the appropriate error message is displayed.
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('data-test=error')).toContainText('Epic sadface: Username is required');
    });
});

//#2.1 - DONE
test('SCENARIO: User should not be able to access the e-shop without logging in through direct link', async ({ page }) => {
    await test.step('GIVEN: User tries to access the inventory directly with the URL (https://www.saucedemo.com/inventory.html)', async () => {
        // Attempt to navigate directly to the inventory page without logging in.
        await page.goto('https://www.saucedemo.com/inventory.html');
    });

    await test.step('WHEN: User access that page', async () => {
        // No additional action is performed here.
    });

    await test.step('THEN: User should be redirected to the main page and an error message should appear: "Epic sadface: You can only access "/inventory.html" when you are logged in."', async () => {
        // Verify that the user is redirected to the login page and the correct error message is displayed.
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
        // Navigate to the main login page.
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step('WHEN: User uses wrong credentials (password or username) and tries to log in', async () => {
        // Randomly choose whether to provide an incorrect username or password.
        if (getRandomInt(10) <= 5) {
            await page.locator('[data-test="username"]').fill('user'); // wrong username
            await page.locator('[data-test="password"]').fill('secret_sauce');
        } else {
            await page.locator('[data-test="username"]').fill('standard_user');
            await page.locator('[data-test="password"]').fill('password'); // wrong password
        }
        await page.keyboard.press("Enter");
    });

    await test.step('THEN: User should get the error message: "Epic sadface: Username and password do not match any user in this service"', async () => {
        // Verify that the user remains on the login page and receives the correct error message.
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
        // Log in and optionally navigate to another page.
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.keyboard.press("Enter");

        if (getRandomInt(10) <= 5) {
            await page.locator('[data-test="item-0-title-link"]').click(); // randomly navigate
        }
    });

    await test.step('WHEN: User goes to the side menu and clicks the logout button', async () => {
        // Open the side menu and click the logout button.
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.locator('[data-test="logout-sidebar-link"]').click();
    });

    await test.step('THEN: User is redirected to the starting page', async () => {
        // Verify that the user is redirected to the login page, and the input fields are empty.
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="username"]')).toBeEmpty();
        await expect(page.locator('[data-test="password"]')).toBeEmpty();
    });
});
