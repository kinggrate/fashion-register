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
      navigate("/home"); // Redirect to homepage after save
    } catch (error) {
      console.error(error);
      alert("Error saving customer!");
    }
  };

  return (
    <div className="add-customer-page">
      <h2>Add Customer</h2>

      <div className="customer-form">
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
        <input
          type="text"
          name="shoulder"
          placeholder="Shoulder"
          value={customer.shoulder}
          onChange={handleChange}
        />
        <input
          type="text"
          name="upperChest"
          placeholder="Upper Chest"
          value={customer.upperChest}
          onChange={handleChange}
        />
        {/* Add all other blouse measurement inputs similarly */}

        <h3>Dress Measurements</h3>
        <input
          type="text"
          name="dressShoulder"
          placeholder="Shoulder"
          value={customer.dressShoulder}
          onChange={handleChange}
        />
        {/* Add all other dress measurement inputs */}

        <h3>Pant Measurements</h3>
        <input
          type="text"
          name="pantLength"
          placeholder="Length"
          value={customer.pantLength}
          onChange={handleChange}
        />
        {/* Add all other pant measurement inputs */}

        <button onClick={handleSave}>Save Customer</button>
      </div>
    </div>
  );
}
