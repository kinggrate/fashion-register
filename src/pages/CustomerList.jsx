import React, { useEffect, useState } from "react";
import "./CustomerList.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const snapshot = await getDocs(collection(db, "customers"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCustomers(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    await deleteDoc(doc(db, "customers", id));
    setSelectedCustomer(null);
    fetchCustomers();
  };

  const filteredCustomers = customers.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customer-page">
      {/* LEFT PANEL */}
      <div className="customer-list">
        <h2>Customers</h2>

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="list">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className={`list-item ${
                selectedCustomer?.id === customer.id ? "active" : ""
              }`}
              onClick={() => setSelectedCustomer(customer)}
            >
              <strong>{customer.name}</strong>
              <span>{customer.phone}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="customer-details">
        {!selectedCustomer ? (
          <p className="placeholder">
            Select a customer to view details
          </p>
        ) : (
          <>
            <h2>{selectedCustomer.name}</h2>
            <p><b>Phone:</b> {selectedCustomer.phone}</p>

            <div className="details-section">
              <h3>Blouse Measurements</h3>
              {Object.entries(selectedCustomer.blouse || {}).map(
                ([key, value]) => (
                  <p key={key}>
                    {key.replace(/_/g, " ")}: {value}
                  </p>
                )
              )}
            </div>

            <div className="details-section">
              <h3>Dress Measurements</h3>
              {Object.entries(selectedCustomer.dress || {}).map(
                ([key, value]) => (
                  <p key={key}>
                    {key.replace(/_/g, " ")}: {value}
                  </p>
                )
              )}
            </div>

            <div className="details-section">
              <h3>Pant Measurements</h3>
              {Object.entries(selectedCustomer.pant || {}).map(
                ([key, value]) => (
                  <p key={key}>
                    {key.replace(/_/g, " ")}: {value}
                  </p>
                )
              )}
            </div>

            <div className="action-buttons">
              <button className="delete-btn" onClick={() => handleDelete(selectedCustomer.id)}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
