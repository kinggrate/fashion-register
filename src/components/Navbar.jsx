import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/customer-list?search=${encodeURIComponent(search)}`);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Sonal Designer Boutique</div>
      <div className="nav-buttons">
        <button onClick={() => navigate("/home")}>Home</button>
        <button onClick={() => navigate("/add-customer")}>Add Customer</button>
        <button onClick={() => navigate("/customer-list")}>Customer List</button>
      </div>
      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
}
