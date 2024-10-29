const LoginPage = require('../pageobjects/login.page');

describe('Locked Out User Login Test', () => {
    before(() => {
        browser.url('https://www.saucedemo.com/');
    });

    it('should display an error when trying to log in with locked_out_user', () => {
        // Locate and input the locked_out_user credentials
        $('#user-name').setValue('locked_out_user');
        $('#password').setValue('secret_sauce');

        // Click on the login button
        $('#login-button').click();

        // Verify the error message
        const errorMsg = $('.error-message-container');
        expect(errorMsg).to.be.displayed;

        const expectedErrorMsg = 'Epic sadface: Sorry, this user has been locked out.';
        expect(errorMsg.getText()).to.equal(expectedErrorMsg);
    });
});