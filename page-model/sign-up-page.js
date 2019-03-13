import { Selector, t } from 'testcafe';

export default class SignUpPage {
    constructor () {
        this.signUpLink             = Selector('.nav-link').withAttribute('routerlink', '/register');
        this.signUpButton           = Selector('button[type=submit]');
        this.usernameInput          = Selector('input[formcontrolname=username]');
        this.emailInput             = Selector('input[formcontrolname=email]');
        this.passwordInput          = Selector('input[formcontrolname=password]');
        this.errorMassageList       = Selector('.error-messages');
        this.settingsLink           = Selector('.nav-link').withAttribute('routerlink', '/settings');
    }

    async createAccount (username, email, password) {
        await t
            .typeText(this.usernameInput, username)
            .typeText(this.emailInput, email)
            .typeText(this.passwordInput, password)
            .click(this.signUpButton);
    };

    async formValidate (username, email, password, message) {
        await t
            .typeText(this.usernameInput, username, { replace: true })
            .typeText(this.emailInput, email, { replace: true })
            .typeText(this.passwordInput, password, { replace: true })
            .click(this.signUpButton)
            .expect(this.errorMassageList.innerText).contains(message);
    };
}