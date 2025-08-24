import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import Notification from "../Layout/Notification";
import { AuthContext } from "../../context/AuthContext";

/**
 * Login Component
 * Allows users to log in with email & password.
 * Handles form input, API call, notifications, and redirects.
 */
export default function Login() {
  // State for form inputs
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Notification state
  const [notification, setNotification] = useState({ message: "", type: "success" });

  // Auth context
  const { isAuthenticated, setIsAuthenticated, setRole } = useContext(AuthContext);

  const navigate = useNavigate();

  // If user is already logged in, redirect home
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  // Update inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", formData);

      // Save auth data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      setIsAuthenticated(true);
      setRole(response.data.role);

      // Success notification
      setNotification({ message: "Login successful!", type: "success" });

      // Redirect after short delay
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setNotification({
        message: err.response?.data?.msg || "Login failed. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #a8edea, #fed6e3)", // same bg as signup
        padding: "2rem",
        position: "relative",
      }}
    >
      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        duration={3000}
        onClose={() => setNotification({ message: "", type: "success" })}
      />

      {/* Login form card */}
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
        <h2 style={{ marginBottom: "1.5rem", color: "#333" }}>Login</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

        {/* Redirect to signup */}
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

// Same styles as Signup
const inputStyle = {
  padding: "0.75rem",
  border: "1px solid #ccc",
  borderRadius: "8px",
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
  transition: "background 0.3s",
};
const linkStyle = {
  color: "#2e7d32",
  fontWeight: "bold",
  cursor: "pointer",
  textDecoration: "underline",
};
