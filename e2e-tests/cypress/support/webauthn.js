const WebAuthnCommands = [
  ['webauthnAddCredential', "WebAuthn.addCredential"],
  ['webauthnAddVirtualAuthenticator', "WebAuthn.addVirtualAuthenticator"],
  ['webauthnClearCredentials', "WebAuthn.clearCredentials"],
  ['webauthnDisable', "WebAuthn.disable"],
  ['webauthnEnable', "WebAuthn.enable"],
  ['webauthnGetCredential', "WebAuthn.getCredential"],
  ['webauthnGetCredentials', "WebAuthn.getCredentials"],
  ['webauthnRemoveCredential', "WebAuthn.removeCredential"],
  ['webauthnRemoveVirtualAuthenticator', "WebAuthn.removeVirtualAuthenticator"],
  ['webauthnSetAutomaticPresenceSimulation', "WebAuthn.setAutomaticPresenceSimulation"],
  ['webauthnSetResponseOverrideBits', "WebAuthn.setResponseOverrideBits"],
  ['webauthnSetUserVerified', "WebAuthn.setUserVerified"],
]

// Register each WebAuthn command as a Cypress command using the chrome debug protocol
// full command type definitions can be found in webauthn.d.ts
WebAuthnCommands.forEach(([helperName, command]) => {
  const fn = (params) => cy.wrap(Cypress.Promise.resolve(
    Cypress.automation("remote:debugger:protocol", {command, params})))

  Cypress.Commands.add(helperName, fn)
})