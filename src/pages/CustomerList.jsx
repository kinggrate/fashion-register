import React, { useEffect, useState } from "react";
import "./CustomerList.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const renderMeasurements = (data, fields) => {
  return fields.map((field) => (
    <p key={field.key}>
      <span>{field.label}:</span> {data[field.key] || "—"}
    </p>
  ));
};

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const snapshot = await getDocs(collection(db, "customers"));
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    setCustomers(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer permanently?")) return;
    await deleteDoc(doc(db, "customers", id));
    setSelectedCustomer(null);
    fetchCustomers();
  };

  const filteredCustomers = customers.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 EXACT measurement keys (MATCH AddCustomer)
  const blouseFields = [
    { key: "shoulder", label: "Shoulder" },
    { key: "upperChest", label: "Upper Chest" },
    { key: "bust", label: "Bust" },
    { key: "waist", label: "Waist" },
    { key: "lowerChest", label: "Lower Chest" },
    { key: "frontLength", label: "Front Length" },
    { key: "backLength", label: "Back Length" },
    { key: "sleeves", label: "Sleeves" },
  ];

  const dressFields = [
    { key: "dressShoulder", label: "Shoulder" },
    { key: "dressChest", label: "Chest" },
    { key: "dressWaist", label: "Waist" },
    { key: "dressHip", label: "Hip" },
    { key: "dressLength", label: "Length" },
  ];

  const pantFields = [
    { key: "pantLength", label: "Length" },
    { key: "pantWaist", label: "Waist" },
    { key: "pantHip", label: "Hip" },
    { key: "pantKnee", label: "Knee" },
    { key: "pantThigh", label: "Thigh" },
    { key: "pantBottom", label: "Bottom" },
  ];

  return (
    <div className="customer-page">
      {/* LEFT LIST */}
      <div className="customer-list">
        <h2>Customers</h2>
        <input
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="list">
          {filteredCustomers.map((c) => (
            <div
              key={c.id}
              className={`list-item ${
                selectedCustomer?.id === c.id ? "active" : ""
              }`}
              onClick={() => setSelectedCustomer(c)}
            >
              <strong>{c.name}</strong>
              <span>{c.phone}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT DETAILS */}
      <div className="customer-details">
        {!selectedCustomer ? (
          <p className="placeholder">Select a customer</p>
        ) : (
          <>
            <h2>{selectedCustomer.name}</h2>
            <p><b>Phone:</b> {selectedCustomer.phone}</p>

            <div className="details-section">
              <h3>Blouse Measurements</h3>
              {renderMeasurements(selectedCustomer, blouseFields)}
            </div>

            <div className="details-section">
              <h3>Dress Measurements</h3>
              {renderMeasurements(selectedCustomer, dressFields)}
            </div>

            <div className="details-section">
              <h3>Pant Measurements</h3>
              {renderMeasurements(selectedCustomer, pantFields)}
            </div>

            <button className="delete-btn" onClick={() => handleDelete(selectedCustomer.id)}>
              Delete Customer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
