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

beforeEach(() => {
  cy.visit("/");
});

describe("Demo App", () => {
  const timestamp = new Date();

  it("Can sign in with a magic link and then sign out", () => {
    const email = `${emailName}+${timestamp.getTime()}@${MAILOSAUR_SERVER_ID}.mailosaur.net`;

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
      expect(email.subject).to.contain(newEmailSubjectLine);

      const tokenLink = email.text.links[0].href;
      cy.log(`Visiting ${tokenLink}`);
      cy.visit(tokenLink);
    });

    cy.contains("You are logged in.");

    cy.get("#logout").should("have.length", 1).click();

    cy.contains("Sign up or log in");
  });

  it("Can log in with sms otp", () => {
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
