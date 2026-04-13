const COLORS = {
  text: "#d8def7",
  textDim: "#7f89b6",
  textBright: "#f3f6ff",
  accent: "#7aa2ff",
  accentSoft: "rgba(122, 162, 255, 0.12)",
  border: "rgba(122, 162, 255, 0.18)",
};

const SKILL_GROUPS = [
  {
    title: "Backend",
    items: [
      "Python",
      "Flask",
      "PostgreSQL",
      "SQLAlchemy",
      "REST API Design",
      "Authentication",
    ],
  },
  {
    title: "Frontend",
    items: [
      "JavaScript",
      "React",
      "Vite",
      "Interactive UI",
      "Three.js",
      "State Management",
    ],
  },
  {
    title: "Tools",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "npm",
      "Debugging",
      "Project Structuring",
    ],
  },
  {
    title: "Currently Pushing Harder",
    items: [
      "Portfolio-grade frontend systems",
      "Real-time app architecture",
      "Desktop app concepts",
      "Product-minded software design",
    ],
  },
];

export default function SkillsApp() {
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
          Technical Skill Map
        </div>
        <div style={{ fontSize: 14, color: COLORS.textDim, lineHeight: 1.7 }}>
          A structured view of the tools and areas I’m actively building with.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.title}
            style={{
              padding: 16,
              borderRadius: 12,
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 1.1,
                color: COLORS.textDim,
                marginBottom: 12,
              }}
            >
              {group.title}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {group.items.map((item) => (
                <span
                  key={item}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    background: COLORS.accentSoft,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.accent,
                    fontSize: 12,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}