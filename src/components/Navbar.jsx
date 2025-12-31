import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => handleNavigation("/home")}>
        Sonal Designer Boutique
      </div>

      {/* Hamburger Menu for Mobile */}
      <button 
        className="hamburger" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
        data-testid="navbar-hamburger"
      >
        <span className={isMenuOpen ? "active" : ""}></span>
        <span className={isMenuOpen ? "active" : ""}></span>
        <span className={isMenuOpen ? "active" : ""}></span>
      </button>

      {/* Navigation Buttons */}
      <div className={`nav-buttons ${isMenuOpen ? "open" : ""}`}>
        <button onClick={() => handleNavigation("/home")} data-testid="nav-home-button">
          <span className="icon">🏠</span> Home
        </button>
        <button onClick={() => handleNavigation("/add-customer")} data-testid="nav-add-customer-button">
          <span className="icon">➕</span> Add Customer
        </button>
        <button onClick={() => handleNavigation("/customer-list")} data-testid="nav-customer-list-button">
          <span className="icon">📄</span> Customer List
        </button>
        <button onClick={handleLogout} className="logout-btn" data-testid="nav-logout-button">
          <span className="icon">🚪</span> Logout
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </nav>
  );
}
