import React from "react";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <>
      <div style={overlayStyle} />
      <div style={modalStyle}>
        <p style={{ marginBottom: "1.5rem" }}>{message}</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{ ...buttonStyle, background: "#ccc", color: "#000" }}>Cancel</button>
          <button onClick={onConfirm} style={{ ...buttonStyle, background: "#ef4444" }}>Delete</button>
        </div>
      </div>
    </>
  );
}

const overlayStyle = { position: "fixed", top:0, left:0, right:0, bottom:0, backgroundColor:"rgba(0,0,0,0.3)", zIndex:999 };
const modalStyle = { position:"fixed", top:"50%", left:"50%", transform:"translate(-50%, -50%)", background:"#fff", padding:"2rem", borderRadius:"12px", width:"400px", zIndex:1000, boxShadow:"0 6px 15px rgba(0,0,0,0.2)" };
const buttonStyle = { padding:"0.75rem 1.5rem", borderRadius:"8px", border:"none", cursor:"pointer", fontWeight:"bold", color:"#fff" };
