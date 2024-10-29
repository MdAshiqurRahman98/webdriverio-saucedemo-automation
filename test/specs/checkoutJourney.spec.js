const CheckoutPage = require('../pageobjects/checkout.page');

describe('Standard User Checkout Flow', () => {
    it('should complete the purchase and verify items and total price', () => {
        // Other steps to add items to the cart and navigate to the checkout...

        // Enter checkout information
        CheckoutPage.enterCheckoutInformation('John', 'Doe', '12345');

        // Verify items and prices
        const itemNames = CheckoutPage.getItemNames();
        const itemPrices = CheckoutPage.getItemPrices();
        const totalItemPrice = CheckoutPage.getItemTotal();

        // Add assertions to verify items and total price (example assertions)
        expect(itemNames).to.include.members(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
        expect(totalItemPrice).to.equal(itemPrices.reduce((a, b) => a + b, 0));

        // Finish purchase and verify success message
        CheckoutPage.finishPurchase();
        const successMessage = CheckoutPage.getSuccessMessageText();
        expect(successMessage).to.equal('THANK YOU FOR YOUR ORDER');
    });
});