import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();

  // Pull auth state + logout function from context
  const { isAuthenticated, logout } = useContext(AuthContext);

  // State for mobile menu toggle (hamburger open/close)
  const [isOpen, setIsOpen] = useState(false);

  // Track if screen is mobile (<768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update `isMobile` whenever window resizes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    // cleanup to avoid memory leaks
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When user logs out
  const handleLogout = () => {
    logout();            // reset auth state + clear localStorage
    navigate("/login");  // redirect to login page
    setIsOpen(false);    // close mobile menu if open
  };

  return (
    <nav
      style={{
        background: "#2e7d32", // green background
        padding: "0.8rem 1.5rem",
        color: "white",
        position: "sticky",    // stays at top while scrolling
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px", // center navbar content
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo / Brand */}
        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")} // clicking logo goes home
        >
          🌱 Mini Plant Store
        </span>

        {/* --- Desktop Links (shown only if not mobile) --- */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {isAuthenticated ? (
              <button onClick={handleLogout} style={styles.button}>
                Logout
              </button>
            ) : (
              <>
                <button onClick={() => navigate("/login")} style={styles.button}>
                  Login
                </button>
                <button onClick={() => navigate("/signup")} style={styles.button}>
                  Signup
                </button>
              </>
            )}
          </div>
        )}

        {/* --- Hamburger Icon (mobile only) --- */}
        {isMobile && (
          <div
            onClick={() => setIsOpen(!isOpen)} // toggle menu
            style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
          >
            <span style={styles.bar}></span>
            <span style={styles.bar}></span>
            <span style={styles.bar}></span>
          </div>
        )}
      </div>

      {/* --- Mobile Menu (dropdown) --- */}
      {isOpen && isMobile && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "0.8rem",
            gap: "0.5rem",
            background: "#2e7d32",
            padding: "0.5rem 1rem",
            borderRadius: "0 0 8px 8px",
            transition: "all 0.3s ease",
          }}
        >
          {isAuthenticated ? (
            <button onClick={handleLogout} style={styles.mobileButton}>
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false); // close after click
                }}
                style={styles.mobileButton}
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setIsOpen(false); // close after click
                }}
                style={styles.mobileButton}
              >
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

/* --- Reusable styles for buttons and hamburger bars --- */
const styles = {
  button: {
    background: "white",
    color: "#2e7d32",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  mobileButton: {
    background: "white",
    color: "#2e7d32",
    border: "none",
    padding: "0.7rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  bar: {
    width: "25px",
    height: "3px",
    backgroundColor: "white",
    margin: "4px 0",
    borderRadius: "2px",
  },
};
