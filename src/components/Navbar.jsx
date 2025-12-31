import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  

  return (
    <nav className="navbar">
      <div className="nav-logo">Sonal Designer Boutique</div>
      <div className="nav-buttons">
        <button onClick={() => navigate("/home")}>Home</button>
        <button onClick={() => navigate("/add-customer")}>Add Customer</button>
        <button onClick={() => navigate("/customer-list")}>Customer List</button>
      </div>
    </nav>
  );
}

