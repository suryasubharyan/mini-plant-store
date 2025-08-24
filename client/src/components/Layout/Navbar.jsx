import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login");
    setIsOpen(false);
  };

  const isLoggedIn = !!localStorage.getItem("token");

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      style={{
        background: "#2e7d32",
        padding: "0.8rem 1.5rem",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
         
        >
          🌱 Mini Plant Store
        </span>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {isLoggedIn ? (
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

        {/* Hamburger (Mobile) */}
        {isMobile && (
          <div
            onClick={() => setIsOpen(!isOpen)}
            style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
          >
            <span style={styles.bar}></span>
            <span style={styles.bar}></span>
            <span style={styles.bar}></span>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
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
          {isLoggedIn ? (
            <button onClick={handleLogout} style={styles.mobileButton}>
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                style={styles.mobileButton}
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setIsOpen(false);
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
