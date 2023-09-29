# js-sdk-cypress-tests

Testing Stytch JavaScript SDK passwordless authentication flows using Cypress and Mailosaur

## Installation

This repo uses node and yarn. We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage node versions locally.

```bash
nvm use
yarn install
```

## Project Layout

- `demo` contains a small React application with multiple login authentication flows
- `e2e-tests` contains a set of Cypress e2e tests that execute against the demo app

## Getting Started

### Cypress

1. Create a new `cypress/.env` file copied from `cypress/.env-template`.
2. Create a new [Cypress](https://cloud.cypress.io/login) project. In your .env file, set `CYPRESS_PROJECT_ID` to your project ID.
3. Create a [Mailosaur](https://mailosaur.com/app/login) account and server. In your .env file, set `MAILOSAUR_API_KEY` and `MAILOSAUR_SERVER_ID` to be your Mailosaur server API key and and ID, respectively.
4. In Mailosaur, go to the [SMS](https://mailosaur.com/app/sms) and request a US +1 region phone number. Set your `MAILOSAUR_PHONE_NUMBER` .env variable to be this number (do not include the +1 – e.g. for the number +12345678901, `MAILOSAUR_PHONE_NUMBER=2345678901`). _**Note**: This step requires a paid Mailosaur feature. If you do not have a Mailosaur phone number, you will need to skip the `Can log in with sms otp` test case in `spec.cy.js`._

### Demo App (optional)

By default, the Cypress test will run on our hosted version of the Stytch demo app. If you want to run them against a local version:

1. Create a [Stytch](https://stytch.com/start-now) account. _**NOTE:** You will need to add a credit card to be able to send login request emails to your test account. Go to [Billing](https://stytch.com/dashboard/settings/billing)._
2. Go to the [SDK Configuration page](https://stytch.com/dashboard/sdk-configuration) and enable the SDK for your Test environment.
3. Create a `demo/.env` file copied from `demo/.env-template`. Set `REACT_APP_STYTCH_PUBLIC_TOKEN` to your Stytch project's Test env public token. You can find this value in the [Stytch dashboard](https://stytch.com/dashboard/api-keys).
4. Set the `BASE_URL` .env variable in the **cypress** .env file to the path of your local demo app (e.g. http://localhost:3000)

## Running the E2E tests

```bash
yarn cypress:open # Opens Cypress
yarn cypress:run # Runs Cypress headless
yarn react:start # Starts local React project
```