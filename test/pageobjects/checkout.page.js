class CheckoutPage {
    // Selectors for the checkout page elements
    get firstNameInput() { return $('#first-name'); }
    get lastNameInput() { return $('#last-name'); }
    get postalCodeInput() { return $('#postal-code'); }
    get continueButton() { return $('#continue'); }
    get finishButton() { return $('#finish'); }
    get successMessage() { return $('.complete-header'); }
    get itemTotalLabel() { return $('.summary_subtotal_label'); }
    get cartItems() { return $$('.cart_item'); }

    // Method to enter checkout information
    enterCheckoutInformation(firstName, lastName, postalCode) {
        this.firstNameInput.setValue(firstName);
        this.lastNameInput.setValue(lastName);
        this.postalCodeInput.setValue(postalCode);
        this.continueButton.click();
    }

    // Method to finish the purchase
    finishPurchase() {
        this.finishButton.click();
    }

    // Method to get the success message text after completing purchase
    getSuccessMessageText() {
        return this.successMessage.getText();
    }

    // Method to retrieve item names in the checkout summary
    getItemNames() {
        return this.cartItems.map(item => item.$('.inventory_item_name').getText());
    }

    // Method to retrieve item prices in the checkout summary
    getItemPrices() {
        return this.cartItems.map(item => parseFloat(item.$('.inventory_item_price').getText().replace('$', '')));
    }

    // Method to get the total item price displayed in the summary
    getItemTotal() {
        return parseFloat(this.itemTotalLabel.getText().replace('Item total: $', ''));
    }
}

module.exports = new CheckoutPage();