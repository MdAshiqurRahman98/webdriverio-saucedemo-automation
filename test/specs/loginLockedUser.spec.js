const LoginPage = require('../pageobjects/login.page');

describe('Locked Out User Login Test', () => {
    it('should display an error when trying to log in with locked_out_user', () => {
        LoginPage.open();
        LoginPage.login('locked_out_user', 'secret_sauce');

        const errorMessage = LoginPage.getErrorMessageText();
        expect(errorMessage).to.equal('Epic sadface: Sorry, this user has been locked out.');
    });
});