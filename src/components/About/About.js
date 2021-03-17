import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about">
      <h1>AMWINE SHOP</h1>
      <div className="aboutUS">
        <h2>
          We sell all kinds of wines and beers imported from each corner of the
          world.
        </h2>
        <p>
          we are the certified company by Government of Nepal to sell liquor
          products.
        </p>
        <p>We sell only wines and beers.</p>
        <p>We guarantee the authenticity and quality of products.</p>
        <p>
          We have more than 50 employees for delivery and sale management for
          your comfort!
        </p>
      </div>
      <div className="members">
        <div className="memContainer">
          <div className="mem founder">
            <div
              style={{
                background: "white",
                padding: "10px",
                width: "100%",
                position: "absolute",
                left: "0",
                height: "150px",
                bottom: "0px",
              }}
            >
              <h2>~Ankit Pradhan</h2>
              <h3>-- Founder and CEO</h3>
            </div>
          </div>
          <div className="mem president">
            <div
              style={{
                background: "white",
                padding: "10px",
                width: "100%",
                position: "absolute",
                left: "0",
                height: "150px",
                bottom: "0px",
              }}
            >
              <h2>~Kiran Musyakhwo</h2>
              <h3>-- President</h3>
            </div>
          </div>
          <div className="mem vice-president">
            <div
              style={{
                background: "white",
                padding: "10px",
                width: "100%",
                position: "absolute",
                left: "0",
                height: "150px",
                bottom: "0px",
              }}
            >
              <h2>~Aman Mool</h2>
              <h3>-- Vice-President</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
