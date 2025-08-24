import React, { useEffect } from "react";

export default function Notification({ message, type = "success", duration = 3000, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const colors = {
    success: "linear-gradient(135deg, #4ade80, #16a34a)", // green gradient
    error: "linear-gradient(135deg, #f87171, #b91c1c)",   // red gradient
    info: "linear-gradient(135deg, #60a5fa, #3b82f6)",    // blue gradient
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "1.5rem 3rem",        // more padding = taller box
        borderRadius: "20px",          // slightly less pill, more boxy
        background: colors[type] || colors.info,
        color: "#fff",
        fontWeight: 700,
        fontSize: "1.1rem",
        letterSpacing: "0.5px",
        boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
        backdropFilter: "blur(6px)",
        zIndex: 9999,
        minWidth: "350px",
        maxWidth: "85%",
        textAlign: "center",
        opacity: 0.97,
        animation: "slideFade 0.6s ease-in-out",
      }}
    >
      {message}
      <style>
        {`
          @keyframes slideFade {
            0% { opacity: 0; transform: translateY(-40px) translateX(-50%); }
            10% { opacity: 1; transform: translateY(0) translateX(-50%); }
            90% { opacity: 1; transform: translateY(0) translateX(-50%); }
            100% { opacity: 0; transform: translateY(-40px) translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
}
