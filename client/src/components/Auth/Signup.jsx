import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import Notification from "../../components/Layout/Notification";
import { AuthContext } from "../../context/AuthContext";

/**
 * Signup Component
 * Allows new users to create an account.
 * Handles form input, communicates with the backend,
 * shows notifications, and redirects to login page after signup.
 */
export default function Signup() {
  // Form state to store user inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role is 'user'
  });

  // State to manage notifications (success or error)
  const [notification, setNotification] = useState({ message: "", type: "success" });

  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useContext(AuthContext);

  // Update form state when user types in inputs
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send signup request to backend
      const response = await API.post("/auth/signup", formData);

      // If backend returns a token, save it and update global state
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role || formData.role);

        setIsAuthenticated(true);
        setRole(response.data.role || formData.role);
      }

      // Show success notification
      setNotification({
        message: "Signup successful! Redirecting to login...",
        type: "success",
      });

      // Redirect to login page after short delay
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      // Show error notification if signup fails
      setNotification({
        message: err.response?.data?.msg || "Signup failed. Please try again.",
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
        background: "linear-gradient(135deg, #a8edea, #fed6e3)",
        padding: "2rem",
        position: "relative",
      }}
    >
      {/* Notification popup */}
      <Notification
        message={notification.message}
        type={notification.type}
        duration={3000}
        onClose={() => setNotification({ message: "", type: "success" })}
      />

      {/* Signup form container */}
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
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
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={buttonStyle}>
            Signup
          </button>
        </form>

        {/* Redirect to login if already have an account */}
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#555" }}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={linkStyle}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

// Styles
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
