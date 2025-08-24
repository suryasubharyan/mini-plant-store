import React, { useState } from "react";
import API from "../api";

export default function PlantCard({ plant, role, onUpdate, onDelete }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...plant });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleUpdate = async () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name required";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "Price must be positive";
    if (!form.categories || !form.categories.toString().trim()) newErrors.categories = "Category required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { _id, ...payload } = form;
      payload.categories = payload.categories.toString().split(",").map(c => c.trim());
      await API.put(`/plants/${_id}`, payload);
      setEditMode(false);
      if (onUpdate) onUpdate();
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Update failed" });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${plant.name}"?`)) return;
    try {
      await API.delete(`/plants/${plant._id}`);
      if (onDelete) onDelete();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(plant.price);

  return (
    <div style={cardStyle}>
      {editMode ? (
        <>
          <input name="name" value={form.name} onChange={handleChange} style={inputStyle} placeholder="Plant Name" />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}

          <input type="number" name="price" value={form.price} onChange={handleChange} style={inputStyle} placeholder="Price" />
          {errors.price && <div style={errorStyle}>{errors.price}</div>}

          <input name="categories" value={form.categories} onChange={handleChange} style={inputStyle} placeholder="Categories (comma separated)" />
          {errors.categories && <div style={errorStyle}>{errors.categories}</div>}

          <label style={{ display: "flex", alignItems: "center", margin: "10px 0", fontSize: "14px", fontWeight: "500" }}>
            <input type="checkbox" name="available" checked={form.available} onChange={handleChange} style={{ marginRight: "8px" }} />
            Available
          </label>

          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <button onClick={handleUpdate} style={buttonStyle}>Save</button>
            <button onClick={() => setEditMode(false)} style={{ ...buttonStyle, background: "#ccc", color: "#000" }}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h2 style={nameStyle}>{plant.name}</h2>

          <p style={priceStyle}>💰 {formattedPrice}</p>
          <p style={infoStyle}>📂 {plant.categories}</p>

          <span style={{ 
            ...availabilityStyle, 
            backgroundColor: plant.available ? "#16a34a" : "#dc2626" 
          }}>
            {plant.available ? "Available" : "Unavailable"}
          </span>

          {role === "admin" && (
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
              <button onClick={() => setEditMode(true)} style={buttonStyle}>Edit</button>
              <button onClick={handleDelete} style={{ ...buttonStyle, background: "#ef4444" }}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ================= STYLES =================
const cardStyle = {
  padding: "24px",
  borderRadius: "16px",
  background: "linear-gradient(145deg, #f0fdf4, #dcfce7)",
  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "240px",
  transition: "transform 0.2s, box-shadow 0.2s",
  cursor: "pointer",
};

const nameStyle = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "10px",
  color: "#166534",
  textAlign: "center",
};

const priceStyle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#065f46",
  marginBottom: "6px",
  textAlign: "center",
};

const infoStyle = {
  fontSize: "16px",
  color: "#374151",
  marginBottom: "6px",
  textAlign: "center",
};

const availabilityStyle = {
  color: "#fff",
  fontWeight: "600",
  padding: "6px 16px",
  borderRadius: "20px",
  fontSize: "14px",
  textAlign: "center",
};

const inputStyle = { padding: "10px", marginBottom: "8px", borderRadius: "8px", border: "1px solid #ccc", width: "100%", fontSize: "14px" };
const buttonStyle = { padding: "8px 18px", border: "none", borderRadius: "8px", background: "#2e7d32", color: "#fff", cursor: "pointer", fontWeight: "bold", fontSize: "14px" };
const errorStyle = { color: "#ef4444", fontSize: "0.85rem", marginBottom: "6px" };
