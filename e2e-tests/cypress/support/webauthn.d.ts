/// <reference types="cypress" />

// CDP WebAuthn Type definitions are taken from https://chromedevtools.github.io/devtools-protocol/tot/WebAuthn

export type AuthenticatorId = string;
export type AuthenticatorProtocol = 'u2f' | 'ctap2';
export type AuthenticatorTransport = 'usb' | 'nfc' | 'ble' | 'cable' | 'internal';
export type Credential = {
  credentialId: string;
  isResidentCredential: boolean;
  // Relying Party ID the credential is scoped to. Must be set when adding a credential.
  rpId?: string;
  // The ECDSA P-256 private key in PKCS#8 format. (Encoded as a base64 string when passed over JSON)
  privateKey: string;
  // An opaque byte sequence with a maximum size of 64 bytes mapping the credential to a specific user. (Encoded as a base64 string when passed over JSON)
  userHandle?: string;
  // Signature counter. This is incremented by one for each successful assertion. See https://w3c.github.io/webauthn/#signature-counter
  signCount: number;
  // The large blob associated with the credential. See https://w3c.github.io/webauthn/#sctn-large-blob-extension (Encoded as a base64 string when passed over JSON)
  largeBlob?: string;
}
export type Ctap2Version = 'ctap2_0' | 'ctap2_1';
export type VirtualAuthenticatorOptions = {
  protocol: AuthenticatorProtocol;
  // Defaults to ctap2_0. Ignored if |protocol| == u2f.
  ctap2Version?: Ctap2Version;
  transport: AuthenticatorTransport;
  // Defaults to false.
  hasResidentKey?: boolean;
  // Defaults to false.
  hasUserVerification?: boolean;
  // If set to true, the authenticator will support the largeBlob extension. https://w3c.github.io/webauthn#largeBlob Defaults to false.
  hasLargeBlob?: boolean;
  // If set to true, the authenticator will support the credBlob extension. https://fidoalliance.org/specs/fido-v2.1-rd-20201208/fido-client-to-authenticator-protocol-v2.1-rd-20201208.html#sctn-credBlob-extension Defaults to false.
  hasCredBlob?: boolean;
  // If set to true, the authenticator will support the minPinLength extension. https://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-20210615.html#sctn-minpinlength-extension Defaults to false.
  hasMinPinLength?: boolean;
  // If set to true, the authenticator will support the prf extension. https://w3c.github.io/webauthn/#prf-extension Defaults to false.
  hasPrf?: boolean;
  // If set to true, tests of user presence will succeed immediately. Otherwise, they will not be resolved. Defaults to true.
  automaticPresenceSimulation?: boolean;
  // Sets whether User Verification succeeds or fails for an authenticator. Defaults to false.
  isUserVerified?: boolean;
}

export type AddCredentialParams = {
  authenticatorId: AuthenticatorId;
  credential: Credential;
}
export type AddCredentialResult = {}

export type AddVirtualAuthenticatorParams = {
  options: VirtualAuthenticatorOptions
}
export type AddVirtualAuthenticatorResult = {
  authenticatorId: AuthenticatorId;
}

export type ClearCredentialsParams = {
  authenticatorId: AuthenticatorId;
}
export type ClearCredentialsResult = {}

export type DisableResult = {}

export type EnableParams = {
  // Whether to enable the WebAuthn user interface.
  // Enabling the UI is recommended for debugging and demo purposes, as it is closer to the real experience.
  // Disabling the UI is recommended for automated testing.
  // Supported at the embedder's discretion if UI is available.
  // Defaults to false.
  enableUI?: boolean;
}
export type EnableResult = {}

export type GetCredentialParams = {
  authenticatorId: AuthenticatorId;
  credentialId: string;
}
export type GetCredentialResult = {
  credential: Credential;
}

export type GetCredentialsParams = {
  authenticatorId: AuthenticatorId;
}
export type GetCredentialsResult = {
  credentials: Credential[];
}

export type RemoveCredentialParams = {
  authenticatorId: AuthenticatorId;
  credentialId: string;
}
export type RemoveCredentialResult = {
  authenticatorId: AuthenticatorId;
}

export type RemoveVirtualAuthenticatorParams = {
  authenticatorId: AuthenticatorId;
}
export type RemoveVirtualAuthenticatorResult = {}

export type SetAutomaticPresenceSimulationParams = {
  authenticatorId: AuthenticatorId;
  enabled: boolean;
}
export type SetAutomaticPresenceSimulationResult = {}

export type SetResponseOverrideBitsParams = {
  authenticatorId: AuthenticatorId;
  // If isBogusSignature is set, overrides the signature in the authenticator response to be zero. Defaults to false.
  isBogusSignature?: boolean;
  // If isBadUV is set, overrides the UV bit in the flags in the authenticator response to be zero. Defaults to false.
  isBadUV?: boolean;
  // If isBadUP is set, overrides the UP bit in the flags in the authenticator response to be zero. Defaults to false.
  isBadUP?: boolean;
}
export type SetResponseOverrideBitsResult = {}

export type SetUserVerifiedParams = {
  authenticatorId: AuthenticatorId;
  isUserVerified: boolean;
}
export type SetUserVerifiedResult = {}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Adds the credential to the specified authenticator.
       */
      webauthnAddCredential(params: AddCredentialParams): Cypress.Chainable<AddCredentialResult>;

      /**
       * Creates and adds a virtual authenticator.
       */
      webauthnAddVirtualAuthenticator(params: AddVirtualAuthenticatorParams): Cypress.Chainable<AddVirtualAuthenticatorResult>;

      /**
       * Clears all the credentials from the specified device.
       */
      webauthnClearCredentials(params: ClearCredentialsParams): Cypress.Chainable<ClearCredentialsResult>;

      /**
       * Disable the WebAuthn domain.
       */
      webauthnDisable(): Cypress.Chainable<DisableResult>;

      /**
       * Enable the WebAuthn domain and start intercepting credential storage and retrieval with a virtual authenticator.
       */
      webauthnEnable(params?: EnableParams): Cypress.Chainable<EnableResult>;

      /**
       * Returns a single credential stored in the given virtual authenticator that matches the credential ID.
       */
      webauthnGetCredential(params: GetCredentialParams): Cypress.Chainable<GetCredentialResult>;

      /**
       * Returns all the credentials stored in the given virtual authenticator.
       */
      webauthnGetCredentials(params: GetCredentialsParams): Cypress.Chainable<GetCredentialsResult>;

      /**
       * Removes a credential from the authenticator.
       */
      webauthnRemoveCredential(params: RemoveCredentialParams): Cypress.Chainable<RemoveCredentialResult>;

      /**
       * Removes the given authenticator.
       */
      webauthnRemoveVirtualAuthenticator(params: RemoveVirtualAuthenticatorParams): Cypress.Chainable<RemoveVirtualAuthenticatorResult>;

      /**
       * Sets whether tests of user presence will succeed immediately (if true) or fail to resolve (if false) for an authenticator. The default is true.
       */
      webauthnSetAutomaticPresenceSimulation(params: SetAutomaticPresenceSimulationParams): Cypress.Chainable<SetAutomaticPresenceSimulationResult>;

      /**
       * Resets parameters isBogusSignature, isBadUV, isBadUP to false if they are not present.
       */
      webauthnSetResponseOverrideBits(params: SetResponseOverrideBitsParams): Cypress.Chainable<SetResponseOverrideBitsResult>;

      /**
       * Sets whether User Verification succeeds or fails for an authenticator. The default is true.
       */
      webauthnSetUserVerified(params: SetUserVerifiedParams): Cypress.Chainable<SetUserVerifiedResult>;
    }
  }
}