import React, { useEffect, useState } from "react";
import "./CustomerList.css";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

/* ---------- Helper ---------- */
const renderMeasurements = (data, fields, isEditing, onChange) =>
  fields.map((field) => (
    <div className="measurement-row" key={field.key}>
      <span>{field.label}</span>
      {isEditing ? (
        <input
          value={data?.[field.key] || ""}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      ) : (
        <strong>{data?.[field.key] || "—"}</strong>
      )}
    </div>
  ));

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "customers"));
    setCustomers(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  /* ---------- EDIT LOGIC ---------- */
  const startEdit = () => {
    setEditData({ ...selectedCustomer });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditData({});
  };

  const saveEdit = async () => {
    const newName = editData.name?.trim().toLowerCase();

    // 🔒 Duplicate name check (excluding self)
    const duplicate = customers.find(
      (c) =>
        c.name?.toLowerCase() === newName &&
        c.id !== selectedCustomer.id
    );

    if (duplicate) {
      alert("A customer with this name already exists.");
      return;
    }

    setLoading(true);
    await updateDoc(doc(db, "customers", selectedCustomer.id), editData);
    setSelectedCustomer(editData);
    setIsEditing(false);
    await fetchCustomers();
    setLoading(false);
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async () => {
    if (!window.confirm("Delete this customer permanently?")) return;
    setLoading(true);
    await deleteDoc(doc(db, "customers", selectedCustomer.id));
    setSelectedCustomer(null);
    await fetchCustomers();
    setLoading(false);
  };

  const handleChange = (key, value) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  const filteredCustomers = customers.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------- FIELD MAPS ---------- */
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

  const data = isEditing ? editData : selectedCustomer;

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
          {loading && <p>Loading...</p>}
          {filteredCustomers.map((c) => (
            <div
              key={c.id}
              className={`list-item ${
                selectedCustomer?.id === c.id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCustomer(c);
                setIsEditing(false);
              }}
            >
              <strong>{c.name}</strong>
              <span>{c.phone}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="details-header">
  {isEditing ? (
    <>
      <input
        className="edit-input"
        placeholder="Customer Name"
        value={editData.name || ""}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <input
        className="edit-input"
        placeholder="Phone Number"
        value={editData.phone || ""}
        onChange={(e) => handleChange("phone", e.target.value)}
      />

      <input
        className="edit-input"
        placeholder="Email Address"
        value={editData.email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
      />
    </>
  ) : (
    <>
      <h2>{selectedCustomer.name}</h2>

      <p>
        <strong>Phone:</strong>{" "}
        {selectedCustomer.phone || "—"}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {selectedCustomer.email || "—"}
      </p>
    </>
  )}
</div>


            <div className="details-section">
              <h3>Blouse Measurements</h3>
              {renderMeasurements(data, blouseFields, isEditing, handleChange)}
            </div>

            <div className="details-section">
              <h3>Dress Measurements</h3>
              {renderMeasurements(data, dressFields, isEditing, handleChange)}
            </div>

            <div className="details-section">
              <h3>Pant Measurements</h3>
              {renderMeasurements(data, pantFields, isEditing, handleChange)}
            </div>

            <div className="actions">
              {!isEditing ? (
                <>
                  <button onClick={startEdit}>Edit</button>
                  <button className="danger" onClick={handleDelete}>
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              )}
            </div>
  </div>
  );
}
