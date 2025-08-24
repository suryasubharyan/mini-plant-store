import React, { useState } from "react";
import API from "../api";
import Notification from "./Notification";

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 1000,
        }}
      />
      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          padding: "1.5rem 2rem",
          borderRadius: "12px",
          width: "350px",
          zIndex: 1001,
          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
          textAlign: "center"
        }}
      >
        <p style={{ marginBottom: "1.5rem" }}>{message}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <button
            onClick={onConfirm}
            style={{ ...buttonStyle, background: "#ef4444" }}
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            style={{ ...buttonStyle, background: "#6b7280" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default function EditPlantModal({ plant, onClose, onUpdate }) {
  const [form, setForm] = useState({ ...plant });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "success" });
  const [confirmOpen, setConfirmOpen] = useState(false);

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
      payload.categories = payload.categories.toString().split(",").map((c) => c.trim());

      await API.put(`/plants/${_id}`, payload);
      setNotification({ message: "Plant updated successfully! 🌱", type: "success" });
      if (onUpdate) onUpdate();
      onClose();
    } catch (err) {
      setNotification({ message: err.response?.data?.message || "Update failed", type: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/plants/${form._id}`);
      setNotification({ message: "Plant deleted successfully! 🌱", type: "success" });
      if (onUpdate) onUpdate();
      onClose();
    } catch (err) {
      setNotification({ message: err.response?.data?.message || "Delete failed", type: "error" });
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 998,
        }}
        onClick={onClose}
      />

      {/* Edit Modal */}
      <div
        style={{
          position: "fixed", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff", padding: "2rem",
          borderRadius: "12px", width: "400px",
          zIndex: 999,
          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Edit Plant</h2>

        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Plant Name" style={inputStyle} />
        {errors.name && <div style={errorStyle}>{errors.name}</div>}

        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" style={inputStyle} />
        {errors.price && <div style={errorStyle}>{errors.price}</div>}

        <input type="text" name="categories" value={form.categories} onChange={handleChange} placeholder="Categories (comma separated)" style={inputStyle} />
        {errors.categories && <div style={errorStyle}>{errors.categories}</div>}

        <label>
          Available
          <input type="checkbox" name="available" checked={form.available} onChange={handleChange} style={{ marginLeft: "0.5rem" }} />
        </label>

        <div style={{ display: "flex", gap: "12px", marginTop: "1rem" }}>
          <button type="button" onClick={handleUpdate} style={buttonStyle}>Update</button>
          <button type="button" onClick={() => setConfirmOpen(true)} style={{ ...buttonStyle, background: "#ef4444" }}>Delete</button>
          <button type="button" onClick={onClose} style={{ ...buttonStyle, background: "#6b7280" }}>Cancel</button>
        </div>
      </div>

      {/* Notification */}
      {notification.message && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "success" })} />
      )}

      {/* Confirmation Modal */}
      {confirmOpen && (
        <ConfirmModal
          message={`Are you sure you want to delete "${form.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </>
  );
}

const inputStyle = { padding: "0.75rem", borderRadius: "8px", border: "1px solid #ccc", width: "100%", fontSize: "1rem", marginBottom: "8px" };
const buttonStyle = { padding: "0.75rem 1.5rem", borderRadius: "8px", border: "none", background: "#2e7d32", color: "#fff", cursor: "pointer", fontWeight: "bold" };
const errorStyle = { color: "#ef4444", fontSize: "0.85rem", marginBottom: "4px" };
