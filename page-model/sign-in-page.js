import { Selector, t } from 'testcafe';

export default class SignInPage {
    constructor () {
        this.signInLink             = Selector('.nav-link').withAttribute('routerlink', '/login');
        this.signInButton           = Selector('button[type=submit]');
        this.emailInput             = Selector('input[formcontrolname=email]');
        this.passwordInput          = Selector('input[formcontrolname=password]');
        this.errorMassageList       = Selector('.error-messages');
        this.settingsLink           = Selector('.nav-link').withAttribute('routerlink', '/settings');
    }

    async login (email, password) {
        await t
            .typeText(this.emailInput, email)
            .typeText(this.passwordInput, password)
            .click(this.signInButton);
    };
}