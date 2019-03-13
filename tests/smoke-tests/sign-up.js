import SignUpPage from '../../page-model/sign-up-page';

const signUpPage = new SignUpPage();

fixture `Check Sign Up form`
    .page `https://angular.realworld.io`
    .beforeEach ( async t => {
        await t.click(signUpPage.signUpLink);
    });

test('Proper message should be visible if wrong data is provided in form', async t => {
    await signUpPage.formValidate("Test_" + Date.now(), "username", "Password123", 'email is invalid');
    await signUpPage.formValidate("Test_" + Date.now(), "user@domain.com", "Pass",'password is too short (minimum is 8 characters)');
    await signUpPage.formValidate("TestingTooLongUserName", "user@domain.com", "Password123", 'username is too long (maximum is 20 characters)');
    await signUpPage.formValidate("testowy31337", "user@domain.com", "Password123" ,'username has already been taken');
    await signUpPage.formValidate("Test_" + Date.now(), "testowy31337@gmail.com", "Password123" ,'email has already been taken');
});

test('Sign up button should be disabled when form is not filled', async t => {
    await t
        .typeText(signUpPage.emailInput, "user@domain.com")
        .expect(signUpPage.signUpButton.hasAttribute('disabled')).ok();
});

test('Sing up should be possible when using proper data', async t => {
    await signUpPage.createAccount("Test_" + Date.now(), "testowy"+ Date.now() +"@gmail.com", "testowy31337");
    await t.expect(signUpPage.settingsLink.visible).ok();
});
