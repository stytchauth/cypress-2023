import React from "react";
import { useStytchUser, useStytch } from "@stytch/react";
import { BASE_URL } from "./constants";
import { useIsLoggedIn } from "./useIsLoggedIn";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const WebAuthnLogin = () => {
  const { user } = useStytchUser();
  const stytch = useStytch();
  useIsLoggedIn();

  // Determine from the user object if this user has registered a webauthn device at this domain
  const baseUrlDomain = new URL(BASE_URL).hostname;
  const hasRegisteredWebAuthnDevice =
    !!user?.webauthn_registrations.find((i) => i.domain === baseUrlDomain);

  const register = () => {
    stytch.webauthn.register();
  };

  const authenticate = () => {
    stytch.webauthn.authenticate({ session_duration_minutes: 60 });
  };

  return (
    <div>
      {!hasRegisteredWebAuthnDevice && (
        <div style={style}>
          Create WebAuthn registration:
          <button onClick={register}>Register</button>
        </div>
      )}
      {hasRegisteredWebAuthnDevice && (
        <div style={style}>
          Authenticate WebAuthn registration
          <button onClick={authenticate}>Authenticate</button>
        </div>
      )}
    </div>
  );
};

export default WebAuthnLogin;
