import React from "react";
import "../styles/Hero.css";
import heroImage from "../assets/hero-image.webp";
import CountUp from "react-countup"
import {motion} from "framer-motion"

function Hero() {
  return (
    <div>
      <section className="hero-wrapper" id="hero">
        <div className="paddings innerWidth flexCenter hero-container">
          {/* left-section */}
          <div className="flexColStart hero-left">
            <div className="hero-title">
              <div className="orange-circle"></div>
              <motion.h1
              initial={{y: "2rem", opacity: 0}}
              animate={{y: 0, opacity: 1}}
              transition={{
                duration: 2,
                type: "spring"
              }}
              >
                Empower <br />
                Your Library <br />
                Experience
              </motion.h1>
            </div>

            <div className="flexColStart hero-desc">
              <span className="secondaryText">
                Revolutionizing library management with seamless organization,
              </span>
              <span className="secondaryText">insightful analytics, and effortless accessibility.</span>
            </div>

            <div className="exp-bar p-1">
              <input
                className="text-blue-600 font-medium text-2xl p-2 border-none hidden sm:inline-block"
                type="text"
                value=">>>"
                disabled
              />
              <button className="button">Explore</button>
            </div>

            <div className="flexCenter stats">
                <div className="flexColCenter stat">
                    <span>
                        <CountUp start={0} end={1000} duration={4} />
                        <span>+</span>
                    </span>
                    <span className="secondaryText">Number Of Books</span>
                </div>
                <div className="flexColCenter stat">
                    <span>
                        <CountUp start={0} end={10} duration={4} />
                        <span>+</span>
                    </span>
                    <span className="secondaryText">Features</span>
                </div>
            
                <div className="flexColCenter stat">
                    <span>
                        <CountUp start={0} end={100} duration={4} />
                        <span>+</span>
                    </span>
                    <span className="secondaryText">Active Users</span>
                </div>
                </div>
            
          </div>
          {/* right-section */}
          <div className="flexCenter hero-right">
            <motion.div
            initial={{x :"7rem", opacity: 0}}
            animate={{x:0, opacity: 1}}
            transition={{
              duration: 2,
              type: "spring"
            }}
             className="image-container">
              <img src={heroImage} alt="" srcset="" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
