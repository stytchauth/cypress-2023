import React, { useEffect } from "react";
import { useStytch } from "@stytch/react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Profile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const stytch = useStytch();

  useEffect(() => {
    const authenticateEml = async () => {
      try {
        await stytch.magicLinks.authenticate(searchParams.get("token"), {
          session_duration_minutes: 60,
        });
        navigate("/profile", { replace: true });
      } catch (e) {
        console.error(e);
        navigate("/", { replace: true });
      }
    };

    if (searchParams.get("stytch_token_type") === "magic_links") {
      authenticateEml();
    }
  }, [searchParams, navigate, stytch]);

  return <div>Authenticating...</div>;
}
