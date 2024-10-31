const { expect } = require('chai');
const CheckoutPage = require('../pageobjects/checkout.page');
const LoginPage = require('../pageobjects/login.page');

describe('Standard User Checkout Flow', () => {
    it('should verify item total, tax, and final total for a standard_user', async () => {
        // Step 1: Login
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        // Step 2: Add items to the cart and proceed to checkout
        await $('.inventory_item:first-child .btn_inventory').click();
        await browser.pause(3000);
        await $('.inventory_item:nth-child(2) .btn_inventory').click();
        await browser.pause(3000);
        await $('.inventory_item:nth-child(3) .btn_inventory').click();
        await browser.pause(3000);

        await $('.shopping_cart_link').click();
        await browser.pause(3000);
        await browser.waitUntil(async () => (await browser.getUrl()).includes('cart.html'), {
            timeout: 10000,
            timeoutMsg: 'Expected to be on the cart page but was not',
        });

        // Step 3: Proceed to checkout
        await $('#checkout').click();
        await browser.waitUntil(async () => (await browser.getUrl()).includes('checkout-step-one.html'), {
            timeout: 10000,
            timeoutMsg: 'Expected to be on the checkout page but was not',
        });

        // Step 3: Go to checkout and fill in information
        await CheckoutPage.fillCheckoutInformation('John', 'Doe', '12345');

        // Step 4: Verify item total, tax, and final total
        const calculatedItemTotal = await CheckoutPage.calculateItemTotal();
        const displayedItemTotal = await CheckoutPage.getDisplayedItemTotal();
        expect(calculatedItemTotal).to.equal(displayedItemTotal);

        const taxAmount = await CheckoutPage.getTaxAmount();
        const displayedTotal = await CheckoutPage.getDisplayedTotal();
        expect(displayedTotal).to.equal(calculatedItemTotal + taxAmount);

        // Step 5: Finish purchase and verify success message
        await CheckoutPage.finishPurchase();
        const successMessage = await CheckoutPage.getSuccessMessageText();
        expect(successMessage).to.equal('Thank you for your order!');
    });
});