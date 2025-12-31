import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import "./AddCustomer.css";

export default function AddCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    shoulder: "",
    upperChest: "",
    bust: "",
    waist: "",
    lowerChest: "",
    bustPoint: "",
    bustToBust: "",
    frontLength: "",
    backLength: "",
    sleeves: "",
    penaltyCircle: "",
    backNeck: "",
    frontNeck: "",
    readyShoulder: "",
    neckRound: "",
    dressShoulder: "",
    dressChest: "",
    dressWaist: "",
    dressHip: "",
    dressLength: "",
    dressFrontNeck: "",
    dressBackNeck: "",
    dressSleeves: "",
    dressPenaltyCircle: "",
    dressNeckRound: "",
    pantLength: "",
    pantWaist: "",
    pantHip: "",
    pantKnee: "",
    pantThigh: "",
    pantBottom: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* FETCH CUSTOMER IN EDIT MODE */
  useEffect(() => {
    if (!isEditMode) return;

    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const snap = await getDoc(doc(db, "customers", id));
        if (!snap.exists()) {
          alert("Customer not found");
          navigate("/customer-list");
          return;
        }
        setCustomer(snap.data());
      } catch (err) {
        console.error("Error fetching customer:", err);
        alert("Error loading customer data");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    setError("");
  };

  /* DUPLICATE NAME CHECK */
  const isDuplicateName = async () => {
    const snap = await getDocs(collection(db, "customers"));
    const nameLower = customer.name.trim().toLowerCase();

    return snap.docs.some((d) => {
      const data = d.data();
      if (isEditMode && d.id === id) return false;
      return data.name?.toLowerCase() === nameLower;
    });
  };

  const handleSave = async () => {
    setError("");

    if (!customer.name.trim()) {
      setError("Customer name is required");
      return;
    }

    if (await isDuplicateName()) {
      setError("A customer with this name already exists.");
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await updateDoc(doc(db, "customers", id), customer);
        alert("Customer updated successfully!");
      } else {
        await addDoc(collection(db, "customers"), customer);
        alert("Customer saved successfully!");
      }
      navigate("/customer-list");
    } catch (err) {
      console.error(err);
      setError("Error saving customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* FIELD ARRAYS */
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

  if (loading && isEditMode) {
    return (
      <div className="add-customer-page">
        <div className="loading-state">Loading customer data...</div>
      </div>
    );
  }

  return (
    <div className="add-customer-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("/customer-list")} data-testid="back-button">
          ← Back
        </button>
        <h2>{isEditMode ? "Edit Customer" : "Add New Customer"}</h2>
      </div>

      <div className="customer-form">
        {error && <div className="error-banner" data-testid="error-message">{error}</div>}

        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>
          <div className="basic-info-grid">
            <input
              name="name"
              placeholder="Customer Name *"
              value={customer.name}
              onChange={handleChange}
              data-testid="input-name"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={customer.email}
              onChange={handleChange}
              data-testid="input-email"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleChange}
              data-testid="input-phone"
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">✂️ Blouse Measurements</h3>
          <div className="measurements-grid">
            {blouseFields.map((f) => (
              <input
                key={f.key}
                name={f.key}
                placeholder={f.label}
                value={customer[f.key]}
                onChange={handleChange}
                data-testid={`input-${f.key}`}
              />
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">👗 Dress Measurements</h3>
          <div className="measurements-grid">
            {dressFields.map((f) => (
              <input
                key={f.key}
                name={f.key}
                placeholder={f.label}
                value={customer[f.key]}
                onChange={handleChange}
                data-testid={`input-${f.key}`}
              />
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">👖 Pant Measurements</h3>
          <div className="measurements-grid">
            {pantFields.map((f) => (
              <input
                key={f.key}
                name={f.key}
                placeholder={f.label}
                value={customer[f.key]}
                onChange={handleChange}
                data-testid={`input-${f.key}`}
              />
            ))}
          </div>
        </div>

        <button
          className="save-button"
          onClick={handleSave}
          disabled={loading}
          data-testid="save-customer-button"
        >
          {loading ? "Saving..." : isEditMode ? "Update Customer" : "Save Customer"}
        </button>
      </div>
    </div>
  );
}
