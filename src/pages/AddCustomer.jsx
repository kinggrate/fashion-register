import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Firestore instance
import { collection, addDoc } from "firebase/firestore";
import "./AddCustomer.css";

export default function AddCustomer() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    // Blouse measurements
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
    // Dress measurements
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
    // Pant measurements
    pantLength: "",
    pantWaist: "",
    pantHip: "",
    pantKnee: "",
    pantThigh: "",
    pantBottom: "",
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await addDoc(collection(db, "customers"), customer);
      alert("Customer saved!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Error saving customer!");
    }
  };

  // Arrays for mapping fields
  const blouseFields = [
    { label: "Shoulder", name: "shoulder" },
    { label: "Upper Chest", name: "upperChest" },
    { label: "Bust", name: "bust" },
    { label: "Waist", name: "waist" },
    { label: "Lower Chest", name: "lowerChest" },
    { label: "Bust Point", name: "bustPoint" },
    { label: "Bust to Bust", name: "bustToBust" },
    { label: "Front Length", name: "frontLength" },
    { label: "Back Length", name: "backLength" },
    { label: "Sleeves", name: "sleeves" },
    { label: "Penalty Circle", name: "penaltyCircle" },
    { label: "Back Neck", name: "backNeck" },
    { label: "Front Neck", name: "frontNeck" },
    { label: "Ready Shoulder", name: "readyShoulder" },
    { label: "Neck Round", name: "neckRound" },
  ];

  const dressFields = [
    { label: "Shoulder", name: "dressShoulder" },
    { label: "Chest", name: "dressChest" },
    { label: "Waist", name: "dressWaist" },
    { label: "Hip", name: "dressHip" },
    { label: "Length", name: "dressLength" },
    { label: "Front Neck", name: "dressFrontNeck" },
    { label: "Back Neck", name: "dressBackNeck" },
    { label: "Sleeves", name: "dressSleeves" },
    { label: "Penalty Circle", name: "dressPenaltyCircle" },
    { label: "Neck Round", name: "dressNeckRound" },
  ];

  const pantFields = [
    { label: "Length", name: "pantLength" },
    { label: "Waist", name: "pantWaist" },
    { label: "Hip", name: "pantHip" },
    { label: "Knee", name: "pantKnee" },
    { label: "Thigh", name: "pantThigh" },
    { label: "Bottom", name: "pantBottom" },
  ];

  return (
    <div className="add-customer-page">
      <h2>Add Customer</h2>

      <div className="customer-form">
        <h3>Customer Info</h3>
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={customer.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={customer.phone}
          onChange={handleChange}
        />

        <h3>Blouse Measurements</h3>
        <div className="measurements-section">
          {blouseFields.map((field) => (
            <input
              key={field.name}
              type="text"
              name={field.name}
              placeholder={field.label}
              value={customer[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        <h3>Dress Measurements</h3>
        <div className="measurements-section">
          {dressFields.map((field) => (
            <input
              key={field.name}
              type="text"
              name={field.name}
              placeholder={field.label}
              value={customer[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        <h3>Pant Measurements</h3>
        <div className="measurements-section">
          {pantFields.map((field) => (
            <input
              key={field.name}
              type="text"
              name={field.name}
              placeholder={field.label}
              value={customer[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        <button onClick={handleSave}>Save Customer</button>
      </div>
    </div>
  );
}
