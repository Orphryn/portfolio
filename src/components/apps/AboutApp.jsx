import { BIO } from "../../data/bio";

const COLORS = {
  accent: "#5b8af5",
  accentDim: "#3d6ad4",
  text: "#c8cdd8",
  textDim: "#6b7280",
  textBright: "#e8ecf4",
  yellow: "#facc15",
};

export default function AboutApp() {
  return (
    <div
      style={{
        padding: 24,
        color: COLORS.text,
        fontFamily: "'SF Pro Display', -apple-system, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDim})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            color: "#fff",
            fontWeight: 700,
          }}
        >
          DF
        </div>

        <div>
          <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.textBright }}>
            {BIO.name}
          </div>
          <div style={{ fontSize: 13, color: COLORS.accent }}>@{BIO.handle}</div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: COLORS.textDim, marginBottom: 6 }}>
        {BIO.school}
      </div>
      <div style={{ fontSize: 14, color: COLORS.yellow, marginBottom: 16 }}>
        {BIO.role}
      </div>

      <p style={{ lineHeight: 1.75, fontSize: 13.5, margin: "0 0 20px" }}>
        {BIO.about}
      </p>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 11,
            color: COLORS.textDim,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          Skills
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {BIO.skills.map((skill) => (
            <span
              key={skill}
              style={{
                padding: "4px 10px",
                borderRadius: 4,
                background: "rgba(91,138,245,0.08)",
                color: COLORS.accent,
                fontSize: 12,
                border: "1px solid rgba(91,138,245,0.18)",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: 11,
            color: COLORS.textDim,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          Links
        </div>

        <div style={{ fontSize: 13 }}>
          <div style={{ marginBottom: 4 }}>
            <span style={{ color: COLORS.textDim }}>GitHub:</span>{" "}
            <span style={{ color: COLORS.accent }}>{BIO.links.github}</span>
          </div>
          <div>
            <span style={{ color: COLORS.textDim }}>Email:</span>{" "}
            <span style={{ color: COLORS.accent }}>{BIO.links.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}