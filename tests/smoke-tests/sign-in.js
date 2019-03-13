import SignInPage from '../../page-model/sign-in-page';

fixture `Check Sign In form`
    .page `https://angular.realworld.io`
    .beforeEach ( async t => {
        await t.click(signInPage.signInLink);
    });
const signInPage = new SignInPage();

test('Error message should be visible after enter wrong credentials', async t => {
    await signInPage.login("username@domain.com", "WrongPass");
    await t.expect(signInPage.errorMassageList.innerText).contains('email or password is invalid');
});

test('Sign in button should be disabled when form is not filled', async t => {
    await t
        .click(signInPage.signInLink)
        .typeText(signInPage.emailInput, "username@domain.com")
        .expect(signInPage.signInButton.hasAttribute('disabled')).ok();
});

test('Login should be possible when using proper credentials', async t => {
    await signInPage.login("testowy31337@gmail.com", "testowy31337");
    await t.expect(signInPage.settingsLink.visible).ok();
});
