export default function PlantCardSkeleton() {
  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        backgroundColor: "#f3f4f6",
        animation: "pulse 1.5s infinite",
      }}
    >
      <div style={{ width: "100%", height: "150px", backgroundColor: "#d1d5db", borderRadius: "8px", marginBottom: "12px" }}></div>
      <div style={{ width: "60%", height: "20px", backgroundColor: "#d1d5db", borderRadius: "4px", marginBottom: "8px" }}></div>
      <div style={{ width: "40%", height: "16px", backgroundColor: "#d1d5db", borderRadius: "4px" }}></div>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
