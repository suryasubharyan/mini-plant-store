import React, { useEffect } from "react";

export default function Notification({ message, type = "success", duration = 3000, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const colors = {
    success: "#4ade80", // green
    error: "#f87171",   // red
    info: "#60a5fa",    // blue
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",          // center horizontally
        transform: "translateX(-50%)", // perfect centering
        padding: "1rem 2rem",
        borderRadius: "12px",
        backgroundColor: colors[type] || colors.info,
        color: "#fff",
        fontWeight: 600,
        fontSize: "1rem",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        zIndex: 9999,
        minWidth: "300px",
        textAlign: "center",
        opacity: 0.97,
        animation: "fadeInOut 0.5s ease-in-out",
      }}
    >
      {message}
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-20px) translateX(-50%); }
            10% { opacity: 1; transform: translateY(0) translateX(-50%); }
            90% { opacity: 1; transform: translateY(0) translateX(-50%); }
            100% { opacity: 0; transform: translateY(-20px) translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
}
