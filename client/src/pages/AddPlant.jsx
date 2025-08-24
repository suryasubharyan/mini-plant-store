import React, { useState } from "react";
import API from "../api";

export default function AddPlant({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    categories: "",
    available: true,
  });

  const [errors, setErrors] = useState({}); // For inline errors

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" }); // Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    // ✅ Inline validation directly in submit
    if (!form.name.trim()) newErrors.name = "Plant name is required";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "Price must be a positive number";
    if (!form.categories.trim()) newErrors.categories = "Categories cannot be empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // stop submission if errors
    }

    try {
     await API.post("/plants", form);
      setForm({ name: "", price: "", categories: "", available: true });
      setErrors({});
      if (onAdd) onAdd();
    } catch (err) {
      setErrors({ api: err.response?.data?.msg || "Failed to add plant." });
    }
  };

  const inputBorderStyle = (field) => ({
    ...inputStyle,
    border: errors[field] ? "2px solid #ef4444" : "1px solid #ccc",
  });

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {errors.api && <div style={apiErrorStyle}>{errors.api}</div>}

      <div style={{ flex: 1, minWidth: "150px" }}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Plant Name"
          style={inputBorderStyle("name")}
        />
        {errors.name && <div style={errorStyle}>{errors.name}</div>}
      </div>

      <div style={{ flex: 1, minWidth: "150px" }}>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          style={inputBorderStyle("price")}
        />
        {errors.price && <div style={errorStyle}>{errors.price}</div>}
      </div>

      <div style={{ flex: 1, minWidth: "150px" }}>
        <input
          type="text"
          name="categories"
          value={form.categories}
          onChange={handleChange}
          placeholder="Categories"
          style={inputBorderStyle("categories")}
        />
        {errors.categories && <div style={errorStyle}>{errors.categories}</div>}
      </div>

      <label style={{ display: "flex", alignItems: "center" }}>
        Available
        <input
          type="checkbox"
          name="available"
          checked={form.available}
          onChange={handleChange}
          style={{ marginLeft: "0.5rem" }}
        />
      </label>

      <button type="submit" style={buttonStyle}>
        Add Plant
      </button>
    </form>
  );
}

const formStyle = {
  marginBottom: "32px",
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
  alignItems: "center",
};

const inputStyle = {
  padding: "0.75rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%",
  fontSize: "1rem",
};

const buttonStyle = {
  padding: "0.75rem 1.5rem",
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const errorStyle = {
  color: "#ef4444",
  fontSize: "0.85rem",
  marginTop: "4px",
};

const apiErrorStyle = {
  color: "#ef4444",
  fontSize: "0.9rem",
  marginBottom: "8px",
};
