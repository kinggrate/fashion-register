import React from "react";
import "./home.css";
import logo from "../assets/logo.png"; // <-- logo import

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <img src={logo} alt="Sonal Designer Boutique Logo" className="home-logo" />

        <h1>Sonal Designer Boutique</h1>
        <p>Custom Blouse • Dress • Designer Wear</p>
      </section>

      {/* Info Section */}
      <section className="home-info">
        <div className="info-card">
          <h3>Custom Stitching</h3>
          <p>
            Perfect fitting blouses, dresses and outfits stitched exactly to
            your measurements.
          </p>
        </div>

        <div className="info-card">
          <h3>Measurement Records</h3>
          <p>
            All customer measurements are safely stored for future orders.
          </p>
        </div>

        <div className="info-card">
          <h3>Quality & Trust</h3>
          <p>
            Trusted tailoring with attention to detail and comfort.
          </p>
        </div>
      </section>
    </div>
  );
}
