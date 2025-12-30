import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import "./Dashboard.css";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    blouse: {
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
    },
    dress: {
      shoulder: "",
      chest: "",
      waist: "",
      hip: "",
      length: "",
      frontNeck: "",
      backNeck: "",
      sleeves: "",
      penaltyCircle: "",
      neckRound: "",
    },
    pant: {
      length: "",
      waist: "",
      hip: "",
      knee: "",
      thigh: "",
      bottom: "",
    },
  });
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const customerCollection = collection(db, "customers");

  // Fetch customers from Firestore
  const fetchCustomers = async () => {
    const q = query(customerCollection, orderBy("name"));
    const data = await getDocs(q);
    setCustomers(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Add or update customer
  const handleSave = async () => {
    try {
      if (!newCustomer.name) {
        alert("Name is required");
        return;
      }
      if (editingId) {
        const customerDoc = doc(db, "customers", editingId);
        await updateDoc(customerDoc, newCustomer);
      } else {
        await addDoc(customerCollection, newCustomer);
      }
      setNewCustomer({
        name: "",
        email: "",
        phone: "",
        blouse: {
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
        },
        dress: {
          shoulder: "",
          chest: "",
          waist: "",
          hip: "",
          length: "",
          frontNeck: "",
          backNeck: "",
          sleeves: "",
          penaltyCircle: "",
          neckRound: "",
        },
        pant: {
          length: "",
          waist: "",
          hip: "",
          knee: "",
          thigh: "",
          bottom: "",
        },
      });
      setEditingId(null);
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      await deleteDoc(doc(db, "customers", id));
      fetchCustomers();
    }
  };

  // Populate form for editing
  const handleEdit = (customer) => {
    setNewCustomer(customer);
    setEditingId(customer.id);
  };

  // Toggle expand/collapse customer card
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter customers by search term
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h1>Sonal Designer Boutique Dashboard</h1>

      {/* Add / Edit Customer Form */}
      <div className="customer-form">
        <h2>{editingId ? "Edit Customer" : "Add New Customer"}</h2>
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, phone: e.target.value })
          }
        />

        {/* Blouse measurements */}
        <h3>Blouse Measurements</h3>
        {Object.keys(newCustomer.blouse).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key}
            value={newCustomer.blouse[key]}
            onChange={(e) =>
              setNewCustomer({
                ...newCustomer,
                blouse: { ...newCustomer.blouse, [key]: e.target.value },
              })
            }
          />
        ))}

        {/* Dress measurements */}
        <h3>Dress Measurements</h3>
        {Object.keys(newCustomer.dress).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key}
            value={newCustomer.dress[key]}
            onChange={(e) =>
              setNewCustomer({
                ...newCustomer,
                dress: { ...newCustomer.dress, [key]: e.target.value },
              })
            }
          />
        ))}

        {/* Pant measurements */}
        <h3>Pant Measurements</h3>
        {Object.keys(newCustomer.pant).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key}
            value={newCustomer.pant[key]}
            onChange={(e) =>
              setNewCustomer({
                ...newCustomer,
                pant: { ...newCustomer.pant, [key]: e.target.value },
              })
            }
          />
        ))}

        <button onClick={handleSave}>
          {editingId ? "Update Customer" : "Save Customer"}
        </button>
      </div>

      {/* Search bar */}
      <div className="customer-search">
        <input
          type="text"
          placeholder="Search customer by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Customer list */}
      <div className="customer-list">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="customer-card"
            onClick={() => toggleExpand(customer.id)}
          >
            <div className="customer-header">
              <h3>{customer.name}</h3>
            </div>

            {/* Expandable View (inline) */}
            {expandedId === customer.id && (
              <div className="customer-details">
                <p>Email: {customer.email}</p>
                <p>Phone: {customer.phone}</p>

                <h4>Blouse Measurements</h4>
                {Object.entries(customer.blouse).map(([k, v]) => (
                  <p key={k}>
                    {k}: {v}
                  </p>
                ))}

                <h4>Dress Measurements</h4>
                {Object.entries(customer.dress).map(([k, v]) => (
                  <p key={k}>
                    {k}: {v}
                  </p>
                ))}

                <h4>Pant Measurements</h4>
                {Object.entries(customer.pant).map(([k, v]) => (
                  <p key={k}>
                    {k}: {v}
                  </p>
                ))}

                <div className="customer-actions">
                  <button onClick={() => handleEdit(customer)}>Edit</button>
                  <button onClick={() => handleDelete(customer.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
