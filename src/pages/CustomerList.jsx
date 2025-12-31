import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./CustomerList.css";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const snapshot = await getDocs(collection(db, "customers"));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCustomers(list);
    };
    fetchCustomers();
  }, []);

  return (
    <div className="customer-page">
      {/* LEFT PANEL */}
      <div className="customer-list">
        <h2>Customers</h2>

        {customers.map(customer => (
          <div
            key={customer.id}
            className="customer-item"
            onClick={() => setSelectedCustomer(customer)}
          >
            <strong>{customer.name}</strong>
            <span>{customer.phone}</span>
          </div>
        ))}
      </div>

      {/* RIGHT / MOBILE PANEL */}
      <div className={`customer-details ${selectedCustomer ? "show" : ""}`}>
        {!selectedCustomer ? (
          <p className="placeholder-text">
            Select a customer to view details
          </p>
        ) : (
          <>
            {/* MOBILE BACK BUTTON */}
            <button
              className="back-btn"
              onClick={() => setSelectedCustomer(null)}
            >
              ← Back
            </button>

            <h2>{selectedCustomer.name}</h2>
            <p className="phone">{selectedCustomer.phone}</p>

            {/* CLOUD MEASUREMENTS */}
            <div className="measure-box">
              <h3>Cloud Measurements</h3>
              {Object.entries(selectedCustomer.cloudMeasurements || {}).map(
                ([key, value]) => (
                  <p key={key}>
                    <span>{key}</span>
                    <strong>{value}</strong>
                  </p>
                )
              )}
            </div>

            {/* DRESS MEASUREMENTS */}
            <div className="measure-box">
              <h3>Dress Measurements</h3>
              {Object.entries(selectedCustomer.dressMeasurements || {}).map(
                ([key, value]) => (
                  <p key={key}>
                    <span>{key}</span>
                    <strong>{value}</strong>
                  </p>
                )
              )}
            </div>

            {/* BACK MEASUREMENTS */}
            <div className="measure-box">
              <h3>Back Measurements</h3>
              {Object.entries(selectedCustomer.backMeasurements || {}).map(
                ([key, value]) => (
                  <p key={key}>
                    <span>{key}</span>
                    <strong>{value}</strong>
                  </p>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
