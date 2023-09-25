# Demo App using Stytch

This is a demo app using the Stytch JavaScript SDK.

- [https://localhost:3000](https://localhost:3000) -- login or signup with email
- [https://localhost:3000/sms](https://localhost:3000/sms) -- login or signup with SMS OTP
- [https://localhost:3000/webauthn](https://localhost:3000/webauthn) -- (must be logged in first) MFA with WebAuthn

## Getting started

1. Create a [Stytch](https://stytch.com/start-now) account. **NOTE:** You will need to add a credit card to be able to send login request emails to your test account. Go to [Billing](https://stytch.com/dashboard/settings/billing)
2. Go to the [SDK Configuration page](https://stytch.com/dashboard/sdk-configuration) and enable the SDK for your Test environment.
3. Create a .env file copied from .env-template. Set `REACT_APP_STYTCH_PUBLIC_TOKEN` to your Stytch project's Test env public token. You can find this value in the [https://stytch.com/dashboard/api-keys] (Stytch dashboard)
4. In your terminal run:

```
yarn install
yarn start
```
