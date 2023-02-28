import React from "react";
import "../login/LogIn.css";
import { useAuth0 } from "@auth0/auth0-react";

function LogInAuth() {
  const { logout } = useAuth0();

  return (
    <div className="login-container">
      <button className="button-login" onClick={() => logout()}>
        Log Out
      </button>
    </div>
  );
}

export default LogInAuth;
