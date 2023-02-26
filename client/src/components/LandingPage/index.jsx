import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./LandingPage.css";

import LoginButton from "../Logbuttons/LoginButton";
import LogoutButton from "../Logbuttons/LogoutButton";

function LandingPage() {
  const { isAuthenticated } = useAuth0();

  return (
    <section className="landing__container">
      {isAuthenticated ? (
        <>
          <LogoutButton className="landing__content-button" />
          <Link to={"/profile"}>
            <button className="landing__content-button landgin__profile-btn">
              Profile
            </button>
          </Link>
        </>
      ) : (
        <LoginButton className="landing__content-button" content={"Login"} />
      )}

      <h1>RECIPE BOOK</h1>
      <div className="landing__content">
        <Link to={"/home"}>
          <button className="landing__content-button landing__button">
            Go to Recipies
          </button>
        </Link>
      </div>
    </section>
  );
}

export default LandingPage;
