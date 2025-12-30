import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import "./CustomerList.css";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const fetchCustomers = async () => {
    const data = await getDocs(collection(db, "customers"));
    const list = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCustomers(list);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle search query from navbar
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(customers);
    }
  }, [location.search, customers]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      await deleteDoc(doc(db, "customers", id));
      fetchCustomers();
    }
  };

  return (
    <div className="customer-list-page">
      <h2>Customer List</h2>
      {searchResults.map(customer => (
        <div key={customer.id} className="customer-card">
          <h3>{customer.name}</h3>
          <p>Email: {customer.email}</p>
          <p>Phone: {customer.phone}</p>
          <button onClick={() => handleDelete(customer.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
