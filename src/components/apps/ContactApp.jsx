const COLORS = {
  text: "#d8def7",
  textDim: "#7f89b6",
  textBright: "#f3f6ff",
  accent: "#7aa2ff",
  accentSoft: "rgba(122, 162, 255, 0.12)",
  border: "rgba(122, 162, 255, 0.18)",
};

const CONTACTS = [
  {
    label: "Email",
    value: "Davidfertil@outlook.com",
    hint: "Best for opportunities and direct contact",
  },
  {
    label: "GitHub",
    value: "github.com/Orphryn",
    hint: "Code, projects, and ongoing work",
  },
  {
    label: "Location",
    value: "Belle Glade, Florida",
    hint: "Open to remote-friendly opportunities",
  },
];

export default function ContactApp() {
  return (
    <div
      style={{
        padding: 24,
        color: COLORS.text,
        fontFamily: "'SF Pro Display', -apple-system, 'Segoe UI', sans-serif",
        minHeight: "100%",
        background:
          "linear-gradient(180deg, rgba(11,16,39,0.98) 0%, rgba(10,13,30,0.98) 100%)",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: COLORS.textBright,
            marginBottom: 8,
          }}
        >
          Let’s connect
        </div>
        <div style={{ fontSize: 14, color: COLORS.textDim, lineHeight: 1.7 }}>
          I’m interested in software engineering opportunities, ambitious technical projects, and conversations with people building meaningful systems.
        </div>
      </div>

      <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
        {CONTACTS.map((item) => (
          <div
            key={item.label}
            style={{
              padding: 16,
              borderRadius: 12,
              background: COLORS.accentSoft,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 1.1,
                color: COLORS.textDim,
                marginBottom: 6,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: 15,
                color: COLORS.accent,
                fontWeight: 600,
                marginBottom: 4,
                wordBreak: "break-word",
              }}
            >
              {item.value}
            </div>
            <div style={{ fontSize: 12, color: COLORS.textDim }}>{item.hint}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: 16,
          borderRadius: 12,
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${COLORS.border}`,
          fontSize: 13,
          lineHeight: 1.8,
        }}
      >
        This portfolio is intentionally built as an interactive system rather than a static page because I want the work itself to communicate how I think: structured, ambitious, and product-minded.
      </div>
    </div>
  );
}