# Stytch demo app + Cypress E2E tests

![Testing Stytch JavaScript SDK passwordless authentication flows using Cypress and Mailosaur](https://github.com/stytchauth/cypress-2023/assets/89937743/eaccc294-505a-4915-8b1f-c4701077804d)

This repository contains code from the talk _Testing Passwordless Authentication Flows_ given at [Cypress Conf 2023](https://www.airmeet.com/e/0512bb50-2c7a-11ee-b441-055bfa7b9c0e).

## Installation

This repo uses node and npm. We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage node versions locally.

```bash
nvm use
cd ./e2e-tests && npm i
cd ../demo && npm i
```

## Project Layout

- `demo` contains a small React application with multiple login & authentication flows
- `e2e-tests` contains a set of Cypress e2e tests that execute against the demo app

## Running the E2E tests

Follow the setup instructions in [/e2e-tests/README.md](/e2e-tests/README.md). By default the tests will run on our hosted version of the Stytch demo app. If you would like to run the Stytch demo app locally, follow instructions in [/demo/README.md](/demo/README.md).
