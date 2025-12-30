import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import "./CustomerList.css";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const location = useLocation();

  const fetchCustomers = async () => {
    const snapshot = await getDocs(collection(db, "customers"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Get search term from query param
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      await deleteDoc(doc(db, "customers", id));
      fetchCustomers();
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setEditData(customer);
  };

  const handleSaveEdit = async () => {
    await updateDoc(doc(db, "customers", editingId), editData);
    setEditingId(null);
    fetchCustomers();
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="customer-list-page">
      <h2>Customer List</h2>

      <div className="customer-cards">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className={`customer-card ${
              expandedId === customer.id ? "expanded" : ""
            }`}
          >
            <div className="card-header" onClick={() => toggleExpand(customer.id)}>
              <h3>{customer.name}</h3>
              <span>{expandedId === customer.id ? "▲" : "▼"}</span>
            </div>

            {expandedId === customer.id && (
              <div className="card-body">
                {editingId === customer.id ? (
                  <div className="edit-form">
                    {Object.keys(customer)
                      .filter((key) => key !== "id")
                      .map((key) => (
                        <input
                          key={key}
                          name={key}
                          value={editData[key]}
                          onChange={handleChange}
                          placeholder={key}
                        />
                      ))}
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phone}</p>

                    <div className="measurements">
                      {Object.keys(customer)
                        .filter((key) => !["id", "name", "email", "phone"].includes(key))
                        .map((key) => (
                          <p key={key}>
                            <strong>{key}:</strong> {customer[key]}
                          </p>
                        ))}
                    </div>

                    <div className="card-buttons">
                      <button onClick={() => handleEdit(customer)}>Edit</button>
                      <button onClick={() => handleDelete(customer.id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
