import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="Sonal Designer Boutique" className="login-logo" />
        
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Sign in to manage your boutique</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            data-testid="login-email-input"
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            data-testid="login-password-input"
          />

          {error && <p className="error-message" data-testid="login-error-message">{error}</p>}

          <button 
            className="login-button" 
            type="submit" 
            disabled={loading}
            data-testid="login-submit-button"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="login-footer">&copy; 2025 Sonal Designer Boutique</p>
      </div>
    </div>
  );
}
