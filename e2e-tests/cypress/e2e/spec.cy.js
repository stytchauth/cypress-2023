const {
  emailName,
  fromEmail,
  newEmailSubjectLine,
  MAILOSAUR_SERVER_ID,
  MAILOSAUR_PHONE_NUMBER,
} = Cypress.env();

/**
 * Maps an async/await function f to a Cypress promise
 * https://docs.cypress.io/api/utilities/promise#Waiting-for-Promises
 * https://docs.cypress.io/faq/questions/using-cypress-faq#Can-I-use-the-new-ES7-async-await-syntax
 */
const chainAsync = (f) => {
  return (...args) => {
    return Cypress.Promise.resolve(f(...args));
  };
};

// The WebAuthn object is a set of functions that invoke the underlying Chrome Dev Tools
// implementation of the WebAuthn Virtual Authenticator protocol.
// e.g. WebAuthn.enable() => invokes "WebAuthn.enable" method
// pass in optional fields via WebAuthn.enable({ param: value })
// TODO: Convert to Cypress commands for ease of use
// Ref: https://chromedevtools.github.io/devtools-protocol/tot/WebAuthn/
const WebAuthn = {
  addCredential: "WebAuthn.addCredential",
  addVirtualAuthenticator: "WebAuthn.addVirtualAuthenticator",
  clearCredentials: "WebAuthn.clearCredentials",
  disable: "WebAuthn.disable",
  enable: "WebAuthn.enable",
  getCredential: "WebAuthn.getCredential",
  getCredentials: "WebAuthn.getCredentials",
  removeCredential: "WebAuthn.removeCredential",
  removeVirtualAuthenticator: "WebAuthn.removeVirtualAuthenticator",
  setAutomaticPresenceSimulation: "WebAuthn.setAutomaticPresenceSimulation",
  setResponseOverrideBits: "WebAuthn.setResponseOverrideBits",
  setUserVerified: "WebAuthn.setUserVerified",
}

Object.keys(WebAuthn).forEach(key => {
  const command = WebAuthn[key];
  WebAuthn[key] = (params = {}) => cy.wrap(Cypress.Promise.resolve(Cypress.automation("remote:debugger:protocol", {
    command,
    params
  })))
})


beforeEach(() => {
  cy.visit("/");
  cy.fixture('example.json');
  WebAuthn.disable()
});

describe("Demo App", () => {

  const loginWithEmail = (tag = undefined) => {
    const timestamp = new Date();

    const emailTag = tag || timestamp.getTime()
    const email = `${emailName}+${emailTag}@${MAILOSAUR_SERVER_ID}.mailosaur.net`;

    cy.get("#email-input").should("have.length", 1).click().type(email);
    cy.get("button[type=submit]").should("have.length", 1).click();

    cy.mailosaurGetMessage(
      MAILOSAUR_SERVER_ID,
      {
        sentTo: email,
      },
      {
        receivedAfter: timestamp,
      }
    ).then((email) => {
      expect(email.from[0].email).to.equal(fromEmail);
      // expect(email.subject).to.contain(newEmailSubjectLine);

      const tokenLink = email.text.links[0].href;
      cy.log(`Visiting ${tokenLink}`);
      cy.visit(tokenLink);
    });

    cy.contains("You are logged in.");
  }

  it("Can sign in with a magic link and then sign out", () => {
    loginWithEmail();

    cy.get("#logout").should("have.length", 1).click();

    cy.contains("Sign up or log in");
  });

  it("Can sign in with a magic link and then register a webauthn credential", () => {
    loginWithEmail();

    cy.get("#MFA").should("have.length", 1).click();

    // Enable the Virtual WebAuthn Environmnet
    WebAuthn.enable()

    // Create an Authenticator. This one is internal- like a TouchID verifier. Other values to try are
    // usb - like a yubikey verifier
    // ble - like a phone verifier
    WebAuthn.addVirtualAuthenticator({
      options: {
        protocol: "ctap2",
        transport: "internal",
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true,
      },
    })

    cy.contains("Register").click()

    cy.contains("Authenticate").click()

    cy.contains("You are MFA'ed")
  })

  it.skip('Can sign up and save a set of WebAuthn credentials for future use', () => {
    loginWithEmail('has_webauthn_already');

    cy.get("#MFA").should("have.length", 1).click();

    // Enable the Virtual WebAuthn Environmnet
    WebAuthn.enable()

    // Create an Authenticator. This one is internal- like a TouchID verifier. Other values to try are
    // usb - like a yubikey verifier
    // ble - like a phone verifier
    WebAuthn.addVirtualAuthenticator({
      options: {
        protocol: "ctap2",
        transport: "internal",
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true,
      },
    }).then((output) => {
      // We'll need the authenticatorId later in order to retrieve the webauthn credential we create
      // Let's store it as an alias
      cy.log("created", output)
      cy.wrap(output.authenticatorId).as('authenticatorId')
    })

    cy.contains("Register").click()

    cy.contains("Authenticate").click()

    cy.contains("You are MFA'ed")

    cy.get('@authenticatorId').then(authenticatorId => {
      // This will print the credential ID + private key. You can store them as Cypress fixtures for later use
      WebAuthn.getCredentials({authenticatorId})
        .then(output => cy.log("got created credential", output))
    })
  })

  it('Can sign in with a magic link and then authenticate with a previously registered MFA credential', () => {
    loginWithEmail('has_webauthn_already')
    // Enable the Virtual WebAuthn Environmnet
    WebAuthn.enable()

    WebAuthn.addVirtualAuthenticator({
      options: {
        protocol: "ctap2",
        transport: "internal",
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true,
      },
    }).then(output => {
      // Now load our fixture we previously created, and attach the webauthn credential to the virtual authenticator
      cy.fixture('example.json').then((fixture) => {
        return WebAuthn.addCredential({
          authenticatorId: output.authenticatorId,
          credential: fixture.sampleWebAuthnCredential,
        })
      })
    })

    cy.get("#MFA").should("have.length", 1).click();

    cy.contains("Authenticate").click()

    cy.contains("You are MFA'ed")
  })

  it("Can log in with sms otp", () => {
    const timestamp = new Date();

    cy.visit("/sms");
    cy.wait(1000); // Let SDK load

    cy.get("#phone-input")
      .should("have.length", 1)
      .click()
      .type(MAILOSAUR_PHONE_NUMBER);
    cy.get('button[type="submit"]').should("have.length", 1).click();

    cy.mailosaurGetMessage(
      MAILOSAUR_SERVER_ID,
      {
        sentTo: `+1${MAILOSAUR_PHONE_NUMBER}`,
      },
      {
        receivedAfter: timestamp,
      }
    ).then((sms) => {
      const code = sms.text.codes[0].value;
      cy.get("input").type(code);
      cy.contains("You are logged in.");
    });

    cy.get("#logout").should("have.length", 1).click();

    cy.contains("Sign up or log in");
  });
});
