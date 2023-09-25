import React from "react";
import { useStytchUser, useStytch } from "@stytch/react";
import { useIsLoggedIn } from "./useIsLoggedIn";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, isCached } = useStytchUser();
  const stytch = useStytch();
  const { hasSecondFactor } = useIsLoggedIn();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const navigateToWebAuthn = () => {
    navigate("/webauthn");
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={stytch.session.revoke} id="logout">
          Log out
        </button>
        {!hasSecondFactor && (
          <button onClick={navigateToWebAuthn}>MFA with WebAuthn</button>
        )}
      </div>
      <h1>You are logged in.{hasSecondFactor ? " You are MFA'ed." : ""}</h1>
      <h2>Your {isCached ? "Cached" : null} Profile</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
