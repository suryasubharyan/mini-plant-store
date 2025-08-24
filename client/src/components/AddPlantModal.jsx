import React, { useState } from "react";
import Notification from "../components/Notification";
import API from "../api";

export default function AddPlantModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", price: "", categories: "", available: true });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "success" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Plant name is required";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "Price must be positive";
    if (!form.categories.trim()) newErrors.categories = "Categories cannot be empty";
    return newErrors;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const res = await API.post("/plants", form);
    // Show notification
    setNotification({ message: `Plant "${res.data.name}" added successfully! 🌱`, type: "success" });
    setForm({ name: "", price: "", categories: "", available: true });
    setErrors({});
    if (onAdd) onAdd();

    // Close modal after short delay (to allow user to see notification)
    setTimeout(() => {
      onClose();
    }, 1000); // 1 second delay
  } catch (err) {
    setNotification({ message: err.response?.data?.msg || "Failed to add plant.", type: "error" });
  }
};


  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          width: "400px",
          zIndex: 1000,
          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ display: "flex", marginBottom: "1.5rem", alignItems: "center", justifyContent: "center" }}>Add Plant</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            name="name"
            placeholder="Plant Name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.price && <div style={errorStyle}>{errors.price}</div>}

          <input
            type="text"
            name="categories"
            placeholder="Categories"
            value={form.categories}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.categories && <div style={errorStyle}>{errors.categories}</div>}

          <label>
            Available
            <input type="checkbox" name="available" checked={form.available} onChange={handleChange} style={{ marginLeft: "0.5rem" }} />
          </label>

          <button type="submit" style={buttonStyle}>Add Plant</button>
        </form>
      </div>

      {/* Notification */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "success" })}
        />
      )}
    </>
  );
}

const inputStyle = { padding: "0.75rem", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem" };
const buttonStyle = { padding: "0.75rem 1.5rem", borderRadius: "8px", border: "none", background: "#2e7d32", color: "#fff", cursor: "pointer", fontWeight: "bold" };
const errorStyle = { color: "#ef4444", fontSize: "0.85rem" };
