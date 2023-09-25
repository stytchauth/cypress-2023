import React from "react";
import ReactDOM from "react-dom/client";
import { StytchProvider } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";
import "./index.css";
import App from "./App";
import { STYTCH_PUBLIC_TOKEN } from "./constants";

const stytch = new StytchUIClient(STYTCH_PUBLIC_TOKEN);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StytchProvider stytch={stytch}>
    <App />
  </StytchProvider>
);
