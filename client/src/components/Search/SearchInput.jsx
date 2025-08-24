export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        flex: "1",
      }}
    />
  );
}
