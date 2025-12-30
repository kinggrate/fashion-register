import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/home";
import AddCustomer from "./pages/AddCustomer";
import CustomerList from "./pages/CustomerList";
import Navbar from "./components/Navbar";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      {user && <Navbar />} {/* Show Navbar only when logged in */}
      <Routes>
        {/* Login route */}
        <Route
          path="/"
          element={!user ? <Login /> : <Navigate to="/home" replace />}
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/add-customer"
          element={user ? <AddCustomer /> : <Navigate to="/" replace />}
        />
        <Route
          path="/customer-list"
          element={user ? <CustomerList /> : <Navigate to="/" replace />}
        />

        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
