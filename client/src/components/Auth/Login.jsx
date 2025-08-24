import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import Notification from "../Layout/Notification";
import { AuthContext } from "../../context/AuthContext";

/**
 * Login Component
 * This component allows users to log in using their email and password.
 * It handles form input, communicates with the backend, shows notifications,
 * and redirects users once they are successfully logged in.
 */
export default function Login() {
  // State to keep track of the form inputs
  const [formData, setFormData] = useState({ email: "", password: "" });

  // State to display notifications (success or error messages)
  const [notification, setNotification] = useState({ message: "", type: "success" });

  // Access authentication context to know if the user is logged in
  const { isAuthenticated, setIsAuthenticated, setRole } = useContext(AuthContext);

  // Hook to programmatically navigate the user to another page
  const navigate = useNavigate();

  // If the user is already logged in, send them to the home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Update the form data as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle the login form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing

    try {
      // Send login request to the backend
      const response = await API.post("/auth/login", formData);

      // Save the token and role in localStorage so the user stays logged in
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Update global authentication state
      setIsAuthenticated(true);
      setRole(response.data.role);

      // Show a success notification
      setNotification({ message: "Login successful!", type: "success" });

      // Redirect to the home page after a short delay
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      // If login fails, show an error notification
      setNotification({
        message: err.response?.data?.msg || "Login failed. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="login-container">
      {/* Notification popup */}
      <Notification
        message={notification.message}
        type={notification.type}
        duration={3000}
        onClose={() => setNotification({ message: "", type: "success" })}
      />

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
