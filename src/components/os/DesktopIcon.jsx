export default function DesktopIcon({ icon, label, onOpen }) {
  return (
    <button
      onClick={onOpen}
      style={{
        width: 84,
        padding: "12px 4px 8px",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        background: "transparent",
        border: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(91, 138, 245, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <span style={{ fontSize: 28 }}>{icon}</span>
      <span
        style={{
          fontSize: 11,
          color: "#c8cdd8",
          textAlign: "center",
          textShadow: "0 1px 4px #000",
        }}
      >
        {label}
      </span>
    </button>
  );
}