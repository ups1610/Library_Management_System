import React from "react";
import { Header, Hero } from "../pages";
import "../styles/Landing.css";

function Landing() {
  return (
    <div className="Landing">
      <div>
        <div className="white-gradient" />
          <Header />
          <Hero />
        </div>
      </div>
  );
}

export default Landing;
