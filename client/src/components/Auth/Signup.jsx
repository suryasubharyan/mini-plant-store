import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await API.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setErrors({ api: err.response?.data?.msg || "Signup failed" });
    }
  };

  const inputBorderStyle = (field) => ({
    ...inputStyle,
    border: errors[field] ? "2px solid #ef4444" : "1px solid #ccc",
  });

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={{ marginBottom: "1.5rem", color: "#333" }}>Signup</h2>
        {errors.api && <div style={apiErrorStyle}>{errors.api}</div>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            style={inputBorderStyle("name")}
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            style={inputBorderStyle("email")}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            style={inputBorderStyle("password")}
          />
          {errors.password && <div style={errorStyle}>{errors.password}</div>}

          <button type="submit" style={buttonStyle}>Signup</button>
        </form>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#555" }}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={linkStyle}>Login</span>
        </p>
      </div>
    </div>
  );
}

// Styles — reuse same as Login
const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #a8edea, #fed6e3)",
  padding: "2rem",
};

const boxStyle = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
};

const inputStyle = {
  padding: "0.75rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  padding: "0.75rem",
  border: "none",
  borderRadius: "8px",
  background: "#2e7d32",
  color: "#fff",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
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

const linkStyle = {
  color: "#2e7d32",
  fontWeight: "bold",
  cursor: "pointer",
  textDecoration: "underline",
};
