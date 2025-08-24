import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

export default function Login({ setIsAuthenticated }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({}); // ✅ inline errors

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // clear error while typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); // store role
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      setErrors({ api: err.response?.data?.msg || "Login failed" });
    }
  };

  const inputBorderStyle = (field) => ({
    ...inputStyle,
    border: errors[field] ? "2px solid #ef4444" : "1px solid #ccc",
  });

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={{ marginBottom: "1.5rem", color: "#333" }}>Login</h2>
        {errors.api && <div style={apiErrorStyle}>{errors.api}</div>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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

          <button type="submit" style={buttonStyle}>Login</button>
        </form>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#555" }}>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} style={linkStyle}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

// Styles
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
