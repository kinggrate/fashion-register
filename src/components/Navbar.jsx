import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // Redirect to customer-list page with search query as URL param
      navigate(`/customer-list?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear search input
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">Sonal Designer Boutique</Link>
      </div>

      <div className="navbar-links">
        <Link to="/add-customer">Add Customer</Link>
        <Link to="/customer-list">Customer List</Link>

        <input
          type="text"
          placeholder="Search customer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="navbar-search"
        />
        <button onClick={handleSearch} className="navbar-search-btn">
          Search
        </button>
      </div>
    </nav>
  );
}
