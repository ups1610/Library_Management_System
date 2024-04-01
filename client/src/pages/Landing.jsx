import React from "react";
import { Header, Hero, Values, Contact, Footer } from "../components";
import "../styles/Landing.css";

function Landing() {
  return (
    <div className="Landing">
      <div>
        <div className="white-gradient" />
        <Header />
        <Hero />
      </div>
      <Values />
      <Contact />
      <Footer />
    </div>
  );
}

export default Landing;
