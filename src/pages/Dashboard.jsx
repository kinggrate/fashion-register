import { useState } from "react";
import "./Dashboard.css";

const blouseFields = [
  "Shoulder",
  "Upper Chest",
  "Bust",
  "Waist",
  "Lower Chest",
  "Bust Point",
  "Bust to Bust",
  "Front Length",
  "Back Length",
  "Sleeves",
  "Penalty Circle",
  "Back Neck",
  "Front Neck",
  "Ready Shoulder",
  "Neck Round",
];

const dressFields = [
  "Shoulder",
  "Chest",
  "Waist",
  "Hip",
  "Length",
  "Front Neck",
  "Back Neck",
  "Sleeves",
  "Penalty Circle",
  "Neck Round",
];

const pantFields = [
  "Length",
  "Waist",
  "Hip",
  "Knee",
  "Thigh",
  "Bottom",
];

export default function Dashboard() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    notes: "",
    blouse: {},
    dress: {},
    pant: {},
  });

  const handleBasicChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleMeasurementChange = (section, field, value) => {
    setCustomer({
      ...customer,
      [section]: {
        ...customer[section],
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    console.log("Customer Data:", customer);
    alert("Customer saved (check console)");
  };

  const renderSection = (title, sectionKey, fields) => (
    <div className="card">
      <h2>{title}</h2>
      <div className="grid">
        {fields.map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={customer[sectionKey][field] || ""}
            onChange={(e) =>
              handleMeasurementChange(sectionKey, field, e.target.value)
            }
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <h1>Sonal Designer Boutique</h1>

      <div className="card">
        <h2>Customer Information</h2>
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={customer.name}
          onChange={handleBasicChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={handleBasicChange}
        />
        <textarea
          name="notes"
          placeholder="Notes / Special Instructions"
          value={customer.notes}
          onChange={handleBasicChange}
        />
      </div>

      {renderSection("Blouse Measurements", "blouse", blouseFields)}
      {renderSection("Dress Measurements", "dress", dressFields)}
      {renderSection("Pant Measurements", "pant", pantFields)}

      <button className="save-btn" onClick={handleSave}>
        Save Customer
      </button>
    </div>
  );
}
