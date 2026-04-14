import { BIO } from "../../data/bio";

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
    title: "VocDub — Real-Time AI Speech Translation & Dubbing System",
    subtitle: "Python · VAD · ASR · Neural Translation · TTS · Voice Cloning",
    bullets: [
      "Engineered a low-latency real-time AI speech pipeline enabling multilingual translation with voice-synced dubbing across live media sources.",
      "Designed streaming architecture: VAD -> ASR -> Translation -> TTS -> Playback with end-to-end latency optimization.",
      "Reduced end-to-end latency by ~30% through concurrency and non-blocking pipeline design.",
    ],
  },
  {
    title: "MadCards — E-Commerce Backend Platform",
    subtitle: "Flask · Python · PostgreSQL · JWT · Webhooks",
    bullets: [
      "Developed production backend handling products, inventory, orders, and user roles for a live e-commerce system.",
      "Built REST APIs with JWT authentication and role-based access control.",
      "Integrated Stripe payments and webhook processing for real-time transaction handling.",
    ],
  },
  {
    title: "Interactive 3D Portfolio OS",
    subtitle: "React · Three.js · Zustand · Vite",
    bullets: [
      "Built an immersive portfolio that transitions from a 3D room into a desktop-style operating system.",
      "Implemented draggable app windows, terminal navigation, project case-study views, and recruiter-facing content architecture.",
    ],
  },
];

const EDUCATION = [
  {
    school: "Florida Atlantic University",
    degree: "B.A. Computer Science",
    grad: "Expected Jul 2026",
  },
  {
    school: "Palm Beach State College",
    degree: "Associate of Arts",
    grad: "Aug 2021 – Dec 2023",
  },
];

const LINK_STYLE = {
  color: "#7aa2ff",
  textDecoration: "none",
  fontWeight: 600,
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
          flexWrap: "wrap",
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
            {BIO.name}
          </div>
          <div style={{ color: COLORS.accent, fontSize: 14, marginBottom: 8 }}>
            {BIO.role}
          </div>
          <div style={{ color: COLORS.textDim, fontSize: 13 }}>
            Belle Glade, FL · {BIO.links.phone} · {BIO.links.email}
          </div>
        </div>

        <div
          style={{
            minWidth: 220,
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
              marginBottom: 8,
            }}
          >
            Actions
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <a href={BIO.links.resume} target="_blank" rel="noreferrer" style={LINK_STYLE}>
              Open Resume PDF
            </a>

            <a href={BIO.links.resume} download style={LINK_STYLE}>
              Download Resume
            </a>

            <a href={BIO.links.githubUrl} target="_blank" rel="noreferrer" style={LINK_STYLE}>
              View GitHub
            </a>

            <a href={`mailto:${BIO.links.email}`} style={LINK_STYLE}>
              Email Me
            </a>

            <a href={BIO.links.linkedinUrl} target="_blank" rel="noreferrer" style={LINK_STYLE}>
              LinkedIn
            </a>
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

        <div style={{ display: "grid", gap: 12 }}>
          {EDUCATION.map((item) => (
            <div
              key={item.school}
              style={{
                padding: 16,
                borderRadius: 12,
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div style={{ fontSize: 16, color: COLORS.textBright, fontWeight: 600 }}>
                {item.school}
              </div>
              <div style={{ fontSize: 14, color: COLORS.text, marginTop: 4 }}>
                {item.degree}
              </div>
              <div style={{ fontSize: 13, color: COLORS.textDim, marginTop: 4 }}>
                {item.grad}
              </div>
            </div>
          ))}
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
                  flexWrap: "wrap",
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
          Real-time AI pipelines, distributed systems, API design, backend engineering, and technically ambitious product-style software.
        </div>
      </section>
    </div>
  );
}