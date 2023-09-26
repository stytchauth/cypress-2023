# Cypress E2E tests

Our E2E tests use Cypress and Mailosaur to test email magic links, sms otp, and WebAuthn flows on our Stytch demo app.

## Getting started

1. Create a new .env file copied from .env-template.
2. Create a new [Cypress](https://cloud.cypress.io/login) project. In your .env file, set `CYPRESS_PROJECT_ID` to your project ID.
3. Create a [Mailosaur](https://mailosaur.com/app/login) account and server. In your .env file, set `MAILOSAUR_API_KEY` and `MAILOSAUR_SERVER_ID` to be your Mailosaur server API key and and ID, respectively.
4. In Mailosaur, go to the [SMS](https://mailosaur.com/app/sms) and request a US +1 region phone number. Set your `MAILOSAUR_PHONE_NUMBER` .env variable to be this number (do not include the +1 – e.g. for the number +12345678901, `MAILOSAUR_PHONE_NUMBER=2345678901`). _**Note**: This step requires a paid Mailosaur feature. If you do not have a Mailosaur phone number, you will need to comment out the `Can log in with sms otp` test case in `spec.cy.js`._
5. By default the Cypress test will run on our hosted version of the Stytch demo app. If you would like to run the test on your local version, set the `BASE_URL` .env variable to the path of your local demo app (e.g. http://localhost:3000)
6. In your terminal run:

   ```
   yarn install
   yarn run cypress:run
   ```

7. If you'd like to open the Cypress app to view the test running on the browser, run:

   ```
   yarn run cypress:open
   ```
