const COLORS = {
  text: "#d8def7",
  textDim: "#7f89b6",
  textBright: "#f3f6ff",
  accent: "#7aa2ff",
  accentSoft: "rgba(122, 162, 255, 0.12)",
  border: "rgba(122, 162, 255, 0.18)",
  green: "#58d68d",
};

const EXPERIENCE = [
  {
    title: "Interactive 3D Portfolio OS",
    subtitle: "React · Three.js · Zustand · Vite",
    bullets: [
      "Engineered an immersive portfolio that transitions from a 3D room into a desktop-style operating system.",
      "Built draggable application windows, project explorer, terminal interface, and structured portfolio content.",
      "Designed the system to showcase engineering depth, UI/UX thinking, and interactive frontend architecture.",
    ],
  },
  {
    title: "VoxDub",
    subtitle: "Electron · Python · Whisper · MarianMT · XTTS-v2",
    bullets: [
      "Designed a desktop concept for real-time voice dubbing with language detection, transcription, translation, and TTS playback.",
      "Focused on privacy-conscious local-first processing and low-latency pipeline orchestration.",
    ],
  },
  {
    title: "MadCards",
    subtitle: "Flask · PostgreSQL · SQLAlchemy · JWT",
    bullets: [
      "Built a full-stack e-commerce platform for a local trading card business.",
      "Implemented authentication, inventory management, RESTful backend patterns, and responsive UI flows.",
    ],
  },
];

const EDUCATION = {
  school: "Florida Atlantic University",
  degree: "B.S. in Computer Science",
  grad: "Expected 2026",
};

export default function ResumeApp() {
  return (
    <div
      style={{
        padding: 24,
        color: COLORS.text,
        fontFamily: "'SF Pro Display', -apple-system, 'Segoe UI', sans-serif",
        background:
          "linear-gradient(180deg, rgba(11,16,39,0.98) 0%, rgba(10,13,30,0.98) 100%)",
        minHeight: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          alignItems: "flex-start",
          marginBottom: 22,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.textBright,
              marginBottom: 6,
            }}
          >
            David Fertil
          </div>
          <div style={{ color: COLORS.accent, fontSize: 14, marginBottom: 8 }}>
            Backend Developer · Computer Science Student · Creative Technologist
          </div>
          <div style={{ color: COLORS.textDim, fontSize: 13 }}>
            Belle Glade, FL · Open to software engineering opportunities
          </div>
        </div>

        <div
          style={{
            minWidth: 180,
            padding: "12px 14px",
            borderRadius: 12,
            background: COLORS.accentSoft,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: 1.1,
              textTransform: "uppercase",
              color: COLORS.textDim,
              marginBottom: 6,
            }}
          >
            Snapshot
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.7 }}>
            Building interactive portfolio systems, full-stack web apps, and real-time software concepts that feel product-grade.
          </div>
        </div>
      </div>

      <section style={{ marginBottom: 22 }}>
        <div
          style={{
            fontSize: 11,
            color: COLORS.textDim,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            marginBottom: 8,
          }}
        >
          Education
        </div>
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div style={{ fontSize: 16, color: COLORS.textBright, fontWeight: 600 }}>
            {EDUCATION.school}
          </div>
          <div style={{ fontSize: 14, color: COLORS.text, marginTop: 4 }}>
            {EDUCATION.degree}
          </div>
          <div style={{ fontSize: 13, color: COLORS.textDim, marginTop: 4 }}>
            {EDUCATION.grad}
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 22 }}>
        <div
          style={{
            fontSize: 11,
            color: COLORS.textDim,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            marginBottom: 8,
          }}
        >
          Featured Work
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {EXPERIENCE.map((item) => (
            <div
              key={item.title}
              style={{
                padding: 16,
                borderRadius: 12,
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.textBright }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 12, color: COLORS.green }}>{item.subtitle}</div>
              </div>

              <div style={{ display: "grid", gap: 6, marginTop: 10 }}>
                {item.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    style={{
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: COLORS.text,
                    }}
                  >
                    • {bullet}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div
          style={{
            fontSize: 11,
            color: COLORS.textDim,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            marginBottom: 8,
          }}
        >
          Core Focus
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
          Backend systems, REST APIs, interactive frontend architecture, product-style interfaces, and technically ambitious portfolio work that demonstrates strong implementation range.
        </div>
      </section>
    </div>
  );
}