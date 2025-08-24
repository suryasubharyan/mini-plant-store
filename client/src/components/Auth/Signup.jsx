import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #a8edea, #fed6e3)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", color: "#333" }}>Signup</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            style={{
              padding: "0.75rem",
              border: "none",
              borderRadius: "8px",
              background: "#2e7d32",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#1b5e20")}
            onMouseOut={(e) => (e.target.style.background = "#2e7d32")}
          >
            Signup
          </button>
        </form>

        {/* ✅ Already a user link */}
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#555" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#2e7d32",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
