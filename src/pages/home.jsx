import React from "react";
import "./home.css";
import logo from "../assets/logo.png";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <img src={logo} alt="Sonal Designer Boutique Logo" className="home-logo" />

        <h1>Sonal Designer Boutique</h1>
        <p className="tagline">Custom Blouse • Dress • Designer Wear</p>
        <p className="subtitle">Where Elegance Meets Craftsmanship</p>
      </section>

      {/* Info Section */}
      <section className="home-info">
        <div className="info-card" data-testid="info-custom-stitching">
          <div className="card-icon">✂️</div>
          <h3>Custom Stitching</h3>
          <p>
            Perfect fitting blouses, dresses and outfits stitched exactly to
            your measurements with attention to every detail.
          </p>
        </div>

        <div className="info-card" data-testid="info-measurement-records">
          <div className="card-icon">📐</div>
          <h3>Measurement Records</h3>
          <p>
            All customer measurements are safely stored in our digital system
            for convenient future orders.
          </p>
        </div>

        <div className="info-card" data-testid="info-quality-trust">
          <div className="card-icon">⭐</div>
          <h3>Quality & Trust</h3>
          <p>
            Trusted tailoring with years of expertise, premium fabrics, and
            dedication to customer satisfaction.
          </p>
        </div>
      </section>

      {/* Training Institute Section */}
      <section className="training-section">
        <h2>Fashion Designing Training Institute</h2>
        <p>Learn the art of fashion design from experienced professionals. Transform your passion into a profession.</p>
      </section>
    </div>
  );
}
