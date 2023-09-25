import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStytchSession, useStytchUser } from "@stytch/react";

const loggedOutRoutes = new Set(["/", "/sms"]);
const mfaRoutes = new Set(["/webauthn", "/passkeys"]);

export const useIsLoggedIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useStytchUser();
  const { session } = useStytchSession();
  const hasSecondFactor = session?.authentication_factors?.length > 1;

  useEffect(() => {
    if (!user && !loggedOutRoutes.has(location.pathname)) {
      navigate("/", { replace: true });
    } else if (
      user &&
      location.pathname !== "/profile" &&
      !mfaRoutes.has(location.pathname)
    ) {
      navigate("/profile", { replace: true });
    } else if (hasSecondFactor) {
      navigate("/profile", { replace: true });
    }
  }, [user, navigate, location.pathname, hasSecondFactor]);

  return { hasSecondFactor };
};
