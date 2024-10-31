class LoginPage {
    // Selectors for the login page elements
    get usernameInput() { 
        return $('#user-name'); 
    }

    get passwordInput() { 
        return $('#password'); 
    }

    get loginButton() { 
        return $('#login-button'); 
    }

    get errorMessage() { 
        return $('.error-message-container'); 
    }

    // Open the login page
    async open() {
        await browser.url('https://www.saucedemo.com/');
    }

    // Method to log in with given credentials
    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }

    // Method to get the error message text
    async getErrorMessageText() {
        return await this.errorMessage.getText();
    }
}

module.exports = new LoginPage();