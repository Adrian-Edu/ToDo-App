import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import LogIn from "./components/login/LogIn";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-0s4arhgkddn0wys2.us.auth0.com"
    clientId="U5thR1xXobWZ3MvTu10b7yGq0Pr4G9l7"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <LogIn>
        <App />
      </LogIn>
    </React.StrictMode>
  </Auth0Provider>
);
