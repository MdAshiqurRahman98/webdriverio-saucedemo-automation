class CheckoutPage {
    // Selectors for checkout page elements
    get firstNameInput() {
        return $('#first-name');
    }

    get lastNameInput() {
        return $('#last-name');
    }

    get postalCodeInput() {
        return $('#postal-code');
    }

    get continueButton() {
        return $('#continue');
    }

    get finishButton() {
        return $('#finish');
    }

    get cartItems() {
        return $$('.cart_item');
    }

    get itemTotal() {
        return $('.summary_subtotal_label');
    }

    get tax() {
        return $('.summary_tax_label');
    }

    get total() {
        return $('.summary_total_label');
    }

    get successMessage() {
        return $('.complete-header');
    }

    // Method to fill out checkout information
    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('checkout-step-one.html');
        }, {
            timeout: 10000, // Wait up to 10 seconds
            timeoutMsg: 'Expected to be on the checkout page but was not'
        });

        await this.firstNameInput.waitForDisplayed({ timeout: 10000 });
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
        await this.continueButton.click();
    }

    // Method to calculate the item total by summing individual item prices
    async calculateItemTotal() {
        let total = 0;
        for (let item of await this.cartItems) {
            const priceText = await item.$('.inventory_item_price').getText();
            const price = parseFloat(priceText.replace('$', ''));
            total += price;
        }
        return total;
    }

    // Method to get displayed item total (without tax) from the page
    async getDisplayedItemTotal() {
        const itemTotalText = await this.itemTotal.getText();
        return parseFloat(itemTotalText.replace('Item total: $', ''));
    }

    // Method to get tax amount from the page
    async getTaxAmount() {
        const taxText = await this.tax.getText();
        return parseFloat(taxText.replace('Tax: $', ''));
    }

    // Method to get displayed total amount (with tax) from the page
    async getDisplayedTotal() {
        const totalText = await this.total.getText();
        return parseFloat(totalText.replace('Total: $', ''));
    }

    // Method to complete the purchase
    async finishPurchase() {
        await this.finishButton.click();
    }

    // Method to get the success message text
    async getSuccessMessageText() {
        return await this.successMessage.getText();
    }
}

module.exports = new CheckoutPage();