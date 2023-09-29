/// <reference types="cypress" />

export type AuthenticatorId = string;
export type AuthenticatorProtocol = 'u2f' | 'ctap2';
export type AuthenticatorTransport = 'usb' | 'nfc' | 'ble' | 'cable' | 'internal';
export type Credential = {
  credentialId: string;
  isResidentCredential: boolean;
  rpId?: string;
  privateKey: string;
  userHandle?: string;
  signCount: number;
  largeBlob?: string;
}
export type Ctap2Version = 'ctap2_0' | 'ctap2_1';
export type VirtualAuthenticatorOptions = {
  protocol: AuthenticatorProtocol;
  ctap2Version?: Ctap2Version;
  transport: AuthenticatorTransport;
  hasResidentKey?: boolean;
  hasUserVerification?: boolean;
  hasLargeBlob?: boolean;
  hasCredBlob?: boolean;
  hasMinPinLength?: boolean;
  hasPrf?: boolean;
  automaticPresenceSimulation?: boolean;
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
  isBogusSignature?: boolean;
  isBadUV?: boolean;
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