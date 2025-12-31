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

  /* FETCH CUSTOMER IN EDIT MODE */
  useEffect(() => {
    if (!isEditMode) return;

    const fetchCustomer = async () => {
      const snap = await getDoc(doc(db, "customers", id));
      if (!snap.exists()) {
        alert("Customer not found");
        navigate("/home");
        return;
      }
      setCustomer(snap.data());
    };

    fetchCustomer();
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  /* 🔒 DUPLICATE NAME CHECK */
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
    if (!customer.name.trim()) {
      alert("Customer name is required");
      return;
    }

    if (await isDuplicateName()) {
      alert("A customer with this name already exists.");
      return;
    }

    try {
      if (isEditMode) {
        await updateDoc(doc(db, "customers", id), customer);
        alert("Customer updated!");
      } else {
        await addDoc(collection(db, "customers"), customer);
        alert("Customer saved!");
      }
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Error saving customer");
    }
  };

  /* FIELD ARRAYS */
  const blouseFields = [
    "shoulder","upperChest","bust","waist","lowerChest","bustPoint",
    "bustToBust","frontLength","backLength","sleeves","penaltyCircle",
    "backNeck","frontNeck","readyShoulder","neckRound",
  ];

  const dressFields = [
    "dressShoulder","dressChest","dressWaist","dressHip","dressLength",
    "dressFrontNeck","dressBackNeck","dressSleeves",
    "dressPenaltyCircle","dressNeckRound",
  ];

  const pantFields = [
    "pantLength","pantWaist","pantHip","pantKnee","pantThigh","pantBottom",
  ];

  return (
    <div className="add-customer-page">
      <h2>{isEditMode ? "Edit Customer" : "Add Customer"}</h2>

      <div className="customer-form">
        <input name="name" placeholder="Name" value={customer.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={customer.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={customer.phone} onChange={handleChange} />

        <h3>Blouse</h3>
        <div className="measurements-section">
          {blouseFields.map((f) => (
            <input key={f} name={f} placeholder={f} value={customer[f]} onChange={handleChange} />
          ))}
        </div>

        <h3>Dress</h3>
        <div className="measurements-section">
          {dressFields.map((f) => (
            <input key={f} name={f} placeholder={f} value={customer[f]} onChange={handleChange} />
          ))}
        </div>

        <h3>Pant</h3>
        <div className="measurements-section">
          {pantFields.map((f) => (
            <input key={f} name={f} placeholder={f} value={customer[f]} onChange={handleChange} />
          ))}
        </div>

        <button onClick={handleSave}>
          {isEditMode ? "Update Customer" : "Save Customer"}
        </button>
      </div>
    </div>
  );
}
