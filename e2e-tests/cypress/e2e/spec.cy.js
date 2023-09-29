const { emailName, fromEmail, MAILOSAUR_SERVER_ID, MAILOSAUR_PHONE_NUMBER } = Cypress.env();
const PASSKEYS_DEMO_URL = 'https://passkey-demo-stytch-auth.vercel.app/';

describe('Demo App', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.webauthnDisable();
  });

  const loginWithEmail = (tag = undefined) => {
    const timestamp = new Date();

    const emailTag = tag || timestamp.getTime();
    const email = `${emailName}+${emailTag}@${MAILOSAUR_SERVER_ID}.mailosaur.net`;

    cy.get('#email-input').click();
    cy.get('#email-input').type(email);
    cy.get('button[type=submit]').click();

    cy.mailosaurGetMessage(
      MAILOSAUR_SERVER_ID,
      {
        sentTo: email
      },
      {
        receivedAfter: timestamp
      }
    ).then((email) => {
      expect(email.from[0].email).to.equal(fromEmail);
      const tokenLink = email.text.links[0].href;
      cy.log(`Visiting ${tokenLink}`);
      cy.visit(tokenLink);
    });

    cy.contains('You are logged in.');
  };

  it('Can sign in with a magic link and then sign out', () => {
    loginWithEmail();

    cy.get('#logout').click();

    cy.contains('Sign up or log in');
  });

  it('Can sign in with a magic link and then register a webauthn credential', () => {
    loginWithEmail();

    cy.get('#MFA').click();

    // Enable the Virtual WebAuthn Environmnet
    cy.webauthnEnable();

    // Create an Authenticator. This one is internal- like a TouchID verifier. Other values to try are
    // usb - like a yubikey verifier
    // ble - like a phone verifier
    cy.webauthnAddVirtualAuthenticator({
      options: {
        protocol: 'ctap2',
        transport: 'internal',
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true
      }
    });

    cy.contains('Register').click();

    cy.contains('Authenticate').click();

    cy.contains("You are MFA'ed");
  });

  // This test signs up an email with a well-known tag (has_webauthn_already)
  // At the end, this test prints out the created WebAuthn credential for later use
  // Use this (or a modification based on it) to generate persistent credentials to
  // use in login flows with saved user data instead of signup flows like the test above
  it.skip('Can sign up and save a set of WebAuthn credentials for future use', () => {
    loginWithEmail('has_webauthn_already');

    cy.get('#MFA').click();

    // Enable the Virtual WebAuthn Environmnet
    cy.webauthnEnable();

    // Create an Authenticator. This one is internal- like a TouchID verifier. Other values to try are
    // usb - like a yubikey verifier
    // ble - like a phone verifier
    cy.webauthnAddVirtualAuthenticator({
      options: {
        protocol: 'ctap2',
        transport: 'internal',
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true
      }
    }).then((output) => {
      // We'll need the authenticatorId later in order to retrieve the webauthn credential we create
      // Let's store it as an alias
      cy.log('created', output);
      cy.wrap(output.authenticatorId).as('authenticatorId');
    });

    cy.contains('Register').click();

    cy.contains('Authenticate').click();

    cy.contains("You are MFA'ed");

    cy.get('@authenticatorId').then((authenticatorId) => {
      // This will print the credential ID + private key. You can store them as Cypress fixtures for later use
      cy.webauthnGetCredentials({ authenticatorId }).then((output) =>
        cy.log('got created credential', output)
      );
    });
  });

  it('Can sign in with a magic link and then authenticate with a previously registered MFA credential', () => {
    loginWithEmail('has_webauthn_already');
    // Enable the Virtual WebAuthn Environmnet
    cy.webauthnEnable();

    cy.webauthnAddVirtualAuthenticator({
      options: {
        protocol: 'ctap2',
        transport: 'internal',
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true
      }
    }).then((output) => {
      // Now load our fixture we previously created, and attach the webauthn credential to the virtual authenticator
      cy.fixture('example.json').then((fixture) => {
        return cy.webauthnAddCredential({
          authenticatorId: output.authenticatorId,
          credential: fixture.sampleWebAuthnCredential
        });
      });
    });

    cy.get('#MFA').click();

    cy.contains('Authenticate').click();

    cy.contains("You are MFA'ed");
  });

  it('Can log in with sms otp', () => {
    const timestamp = new Date();

    cy.visit('/sms');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000); // Let SDK load

    cy.get('#phone-input').click();
    cy.get('#phone-input').type(MAILOSAUR_PHONE_NUMBER);
    cy.get('button[type="submit"]').click();

    cy.mailosaurGetMessage(
      MAILOSAUR_SERVER_ID,
      {
        sentTo: `+1${MAILOSAUR_PHONE_NUMBER}`
      },
      {
        receivedAfter: timestamp
      }
    ).then((sms) => {
      const code = sms.text.codes[0].value;
      cy.get('input').type(code);
      cy.contains('You are logged in.');
    });

    cy.get('#logout').click();

    cy.contains('Sign up or log in');
  });
});

describe('Passkeys Demo App', () => {
  beforeEach(() => {
    cy.visit(PASSKEYS_DEMO_URL);
    cy.webauthnDisable();
  });

  const loginWithSMS = () => {
    const timestamp = new Date();
    cy.get('button').contains('Text').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000); // Let SDK load

    cy.get('#phone-input').click();
    cy.get('#phone-input').type(MAILOSAUR_PHONE_NUMBER);
    cy.get('button[type="submit"]').click();

    cy.mailosaurGetMessage(
      MAILOSAUR_SERVER_ID,
      {
        sentTo: `+1${MAILOSAUR_PHONE_NUMBER}`
      },
      {
        receivedAfter: timestamp
      }
    ).then((sms) => {
      const code = sms.text.codes[0].value;
      cy.get('input').type(code);
    });
  };

  it('Can sign in with SMS OTP and create a passkey', () => {
    loginWithSMS();

    // Enable the Virtual WebAuthn Environmnet
    cy.webauthnEnable();

    // Create an Authenticator. This one is internal- like a TouchID verifier. Other values to try are
    // usb - like a yubikey verifier
    // ble - like a phone verifier
    cy.webauthnAddVirtualAuthenticator({
      options: {
        protocol: 'ctap2',
        transport: 'usb',
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true
      }
    });

    cy.get('button').contains('Create a passkey').click();
    cy.contains('Passkey successfully created');
    cy.get('button').contains('Done').click();
    cy.get('button').contains('Reset Demo').click();
  });
});
