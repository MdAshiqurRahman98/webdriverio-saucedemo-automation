const { expect } = require('chai');

describe('Performance Glitch User Purchase Journey', () => {
    before(() => {
        // Navigate to the website
        browser.url('https://www.saucedemo.com/');
    });

    it('should complete the purchase journey with performance_glitch_user', () => {
        // Step 1: Login with performance_glitch_user credentials
        $('#user-name').setValue('performance_glitch_user');
        $('#password').setValue('secret_sauce');
        $('#login-button').click();

        // Step 2: Reset App State from the hamburger menu
        $('.bm-burger-button').click();
        $('#reset_sidebar_link').waitForDisplayed();
        $('#reset_sidebar_link').click();
        $('.bm-cross-button').click(); // Close the menu

        // Step 3: Sort items by name (Z to A)
        const sortDropdown = $('.product_sort_container');
        sortDropdown.selectByVisibleText('Name (Z to A)');

        // Step 4: Add the first product to the cart
        const firstProduct = $('#inventory_container .inventory_item:first-child');
        const firstProductName = firstProduct.$('.inventory_item_name').getText();
        const firstProductPrice = parseFloat(firstProduct.$('.inventory_item_price').getText().replace('$', ''));
        firstProduct.$('.btn_inventory').click();

        // Step 5: Navigate to the cart and verify item
        $('.shopping_cart_link').click();
        const cartItemName = $('.cart_item .inventory_item_name').getText();
        const cartItemPrice = parseFloat($('.cart_item .inventory_item_price').getText().replace('$', ''));
        expect(cartItemName).to.equal(firstProductName);
        expect(cartItemPrice).to.equal(firstProductPrice);

        // Step 6: Proceed to checkout and verify product details
        $('#checkout').click();
        $('#first-name').setValue('John');
        $('#last-name').setValue('Doe');
        $('#postal-code').setValue('12345');
        $('#continue').click();

        const checkoutItemName = $('.cart_item .inventory_item_name').getText();
        const checkoutItemPrice = parseFloat($('.cart_item .inventory_item_price').getText().replace('$', ''));
        expect(checkoutItemName).to.equal(firstProductName);
        expect(checkoutItemPrice).to.equal(firstProductPrice);

        // Verify total price (without tax)
        const totalPriceElement = $('.summary_subtotal_label');
        const totalActualPrice = parseFloat(totalPriceElement.getText().replace('Item total: $', ''));
        expect(totalActualPrice).to.equal(firstProductPrice);

        // Step 7: Finish the purchase and verify success message
        $('#finish').click();
        const successMessage = $('.complete-header').getText();
        expect(successMessage).to.equal('THANK YOU FOR YOUR ORDER');

        // Step 8: Reset App State and log out
        $('.bm-burger-button').click();
        $('#reset_sidebar_link').click();
        $('#logout_sidebar_link').click();
    });
});