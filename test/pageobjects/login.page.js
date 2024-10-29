class LoginPage {
    // Selectors for the login page elements
    get usernameInput() { return $('#user-name'); }
    get passwordInput() { return $('#password'); }
    get loginButton() { return $('#login-button'); }
    get errorMessage() { return $('.error-message-container'); }

    // Open the login page
    open() {
        browser.url('https://www.saucedemo.com/');
    }

    // Method to log in with given credentials
    login(username, password) {
        this.usernameInput.setValue(username);
        this.passwordInput.setValue(password);
        this.loginButton.click();
    }

    // Method to get the error message text
    getErrorMessageText() {
        return this.errorMessage.getText();
    }
}

module.exports = new LoginPage();