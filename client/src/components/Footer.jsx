import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #8ee392ff, #1b5e20)",
        color: "#fff",
        textAlign: "center",
        padding: "1rem",
      
        fontSize: "0.95rem",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.15)",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
      }}
    >
      <p style={{ margin: 0, fontWeight: "500" }}>
        © {new Date().getFullYear()} 🌱 Mini Plant Store. All rights reserved.
      </p>
      <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", opacity: 0.9 }}>
      
       
      
      </div>
    </footer>
  );
};

export default Footer;
