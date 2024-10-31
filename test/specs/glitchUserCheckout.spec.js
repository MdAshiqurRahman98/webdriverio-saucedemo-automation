const { expect } = require('chai');
const LoginPage = require('../pageobjects/login.page');
const CheckoutPage = require('../pageobjects/checkout.page');

describe('Performance Glitch User Purchase Journey', () => {
    before(async () => {
        // Navigate to the website
        await LoginPage.open();
    });

    it('should complete the purchase with performance_glitch_user and verify totals', async () => {
        // Step 1: Login with performance_glitch_user
        await LoginPage.login('performance_glitch_user', 'secret_sauce');

        // Step 2: Reset App State from the hamburger menu
        await $('.bm-burger-button').click();
        await $('#reset_sidebar_link').waitForDisplayed();
        await $('#reset_sidebar_link').click();
        await $('.bm-cross-button').click(); // Close the menu

        // Step 3: Sort items by name (Z to A) and add the first item to the cart
        const sortDropdown = $('.product_sort_container');
        await sortDropdown.selectByVisibleText('Name (Z to A)');

        const firstProduct = await $('#inventory_container .inventory_item:first-child');
        const firstProductName = await firstProduct.$('.inventory_item_name').getText();
        const firstProductPrice = parseFloat((await firstProduct.$('.inventory_item_price').getText()).replace('$', ''));
        await firstProduct.$('.btn_inventory').click();

        // Step 4: Go to cart and proceed to checkout
        await $('.shopping_cart_link').click();
        await $('#checkout').click();

        // Step 5: Fill in checkout information
        await CheckoutPage.fillCheckoutInformation('John', 'Doe', '12345');

        // Step 6: Calculate item total, verify tax, and total with tax
        const calculatedItemTotal = await CheckoutPage.calculateItemTotal();
        const displayedItemTotal = await CheckoutPage.getDisplayedItemTotal();
        expect(calculatedItemTotal).to.equal(displayedItemTotal);

        const taxAmount = await CheckoutPage.getTaxAmount();
        const displayedTotal = await CheckoutPage.getDisplayedTotal();
        expect(displayedTotal).to.equal(calculatedItemTotal + taxAmount);

        // Step 7: Finish purchase and verify success message
        await CheckoutPage.finishPurchase();
        const successMessage = await CheckoutPage.getSuccessMessageText();
        expect(successMessage).to.equal('Thank you for your order!');

        // Step 8: Reset App State and log out
        await $('.bm-burger-button').click();
        await $('#reset_sidebar_link').click();
        await $('#logout_sidebar_link').click();
    });
});