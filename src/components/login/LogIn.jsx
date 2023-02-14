import React from "react";
import "./LogIn.css";
import { useAuth0 } from "@auth0/auth0-react";

function LogInAuth() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <button className="button-login" onClick={loginWithRedirect}>
        Log In
      </button>
    </div>
  );
}

export default LogInAuth;
