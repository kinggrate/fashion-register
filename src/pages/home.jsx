import React from "react";
import "./home.css";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to Sonal Designer Boutique</h1>
        <p>
          We create custom-designed fashion for every occasion. Explore our
          services and manage your orders efficiently.
        </p>
        <img
          src="/boutique-photo.jpg" 
          alt="Boutique"
          className="home-image"
        />
      </div>
    </div>
  );
}
