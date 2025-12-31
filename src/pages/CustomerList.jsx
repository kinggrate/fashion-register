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
          data-testid={`edit-input-${field.key}`}
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
  const [showDetails, setShowDetails] = useState(false); // For mobile view

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "customers"));
      setCustomers(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching customers:", error);
      alert("Error loading customers");
    } finally {
      setLoading(false);
    }
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
    if (!editData.name?.trim()) {
      alert("Customer name cannot be empty");
      return;
    }

    const newName = editData.name?.trim().toLowerCase();

    // Duplicate name check (excluding self)
    const duplicate = customers.find(
      (c) => c.name?.toLowerCase() === newName && c.id !== selectedCustomer.id
    );

    if (duplicate) {
      alert("A customer with this name already exists.");
      return;
    }

    setLoading(true);
    try {
      await updateDoc(doc(db, "customers", selectedCustomer.id), editData);
      setSelectedCustomer(editData);
      setIsEditing(false);
      await fetchCustomers();
      alert("Customer updated successfully!");
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Error updating customer");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async () => {
    if (!window.confirm(`Delete ${selectedCustomer.name} permanently?`)) return;
    
    setLoading(true);
    try {
      await deleteDoc(doc(db, "customers", selectedCustomer.id));
      setSelectedCustomer(null);
      setShowDetails(false);
      await fetchCustomers();
      alert("Customer deleted successfully");
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Error deleting customer");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setIsEditing(false);
    setShowDetails(true); // Show details panel on mobile
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setIsEditing(false);
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
    { key: "bustPoint", label: "Bust Point" },
    { key: "bustToBust", label: "Bust to Bust" },
    { key: "frontLength", label: "Front Length" },
    { key: "backLength", label: "Back Length" },
    { key: "sleeves", label: "Sleeves" },
    { key: "penaltyCircle", label: "Penalty Circle" },
    { key: "backNeck", label: "Back Neck" },
    { key: "frontNeck", label: "Front Neck" },
    { key: "readyShoulder", label: "Ready Shoulder" },
    { key: "neckRound", label: "Neck Round" },
  ];

  const dressFields = [
    { key: "dressShoulder", label: "Shoulder" },
    { key: "dressChest", label: "Chest" },
    { key: "dressWaist", label: "Waist" },
    { key: "dressHip", label: "Hip" },
    { key: "dressLength", label: "Length" },
    { key: "dressFrontNeck", label: "Front Neck" },
    { key: "dressBackNeck", label: "Back Neck" },
    { key: "dressSleeves", label: "Sleeves" },
    { key: "dressPenaltyCircle", label: "Penalty Circle" },
    { key: "dressNeckRound", label: "Neck Round" },
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
      <div className={`customer-list ${showDetails ? "hidden-mobile" : ""}`}>
        <h2>Customers</h2>
        <input
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="search-customer-input"
        />

        <div className="list">
          {loading && <p className="loading-text">Loading...</p>}
          {!loading && filteredCustomers.length === 0 && (
            <p className="empty-text">No customers found</p>
          )}
          {filteredCustomers.map((c) => (
            <div
              key={c.id}
              className={`list-item ${
                selectedCustomer?.id === c.id ? "active" : ""
              }`}
              onClick={() => handleCustomerSelect(c)}
              data-testid={`customer-item-${c.id}`}
            >
              <strong>{c.name}</strong>
              <span>{c.phone || "No phone"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT DETAILS PANEL */}
      <div className={`customer-details ${showDetails ? "open" : ""}`}>
        {/* Mobile Back Button */}
        <button
          className="back-to-list-btn"
          onClick={handleBackToList}
          data-testid="back-to-list-button"
        >
          ← Back to List
        </button>

        {!selectedCustomer ? (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <h3>No Customer Selected</h3>
            <p>Select a customer from the list to view their details</p>
          </div>
        ) : (
          <>
            <div className="details-header">
              {isEditing ? (
                <>
                  <input
                    className="edit-input"
                    placeholder="Customer Name"
                    value={editData.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    data-testid="edit-name-input"
                  />

                  <input
                    className="edit-input"
                    placeholder="Phone Number"
                    value={editData.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    data-testid="edit-phone-input"
                  />

                  <input
                    className="edit-input"
                    placeholder="Email Address"
                    value={editData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    data-testid="edit-email-input"
                  />
                </>
              ) : (
                <>
                  <h2>{selectedCustomer.name}</h2>
                  <p>
                    <strong>Phone:</strong> {selectedCustomer?.phone || "—"}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedCustomer?.email || "—"}
                  </p>
                </>
              )}
            </div>

            <div className="details-section">
              <h3>✂️ Blouse Measurements</h3>
              {renderMeasurements(data, blouseFields, isEditing, handleChange)}
            </div>

            <div className="details-section">
              <h3>👗 Dress Measurements</h3>
              {renderMeasurements(data, dressFields, isEditing, handleChange)}
            </div>

            <div className="details-section">
              <h3>👖 Pant Measurements</h3>
              {renderMeasurements(data, pantFields, isEditing, handleChange)}
            </div>

            <div className="actions">
              {!isEditing ? (
                <>
                  <button
                    onClick={startEdit}
                    disabled={loading}
                    data-testid="edit-customer-button"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="danger"
                    onClick={handleDelete}
                    disabled={loading}
                    data-testid="delete-customer-button"
                  >
                    🗑️ Delete
                  </button>
                </>
              ) : (
                <>
                  <button onClick={saveEdit} disabled={loading} data-testid="save-edit-button">
                    ✓ Save
                  </button>
                  <button onClick={cancelEdit} disabled={loading} data-testid="cancel-edit-button">
                    ✕ Cancel
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
