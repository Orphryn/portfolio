import { BIO } from "../../data/bio";

const COLORS = {
  accent: "#7aa2ff",
  accentDim: "#4f7dff",
  text: "#d8def7",
  textDim: "#7f89b6",
  textBright: "#f3f6ff",
  yellow: "#facc15",
  border: "rgba(122, 162, 255, 0.18)",
};

export default function AboutApp() {
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
                background: "rgba(122,162,255,0.1)",
                color: COLORS.accent,
                fontSize: 12,
                border: `1px solid ${COLORS.border}`,
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

        <div style={{ fontSize: 13, display: "grid", gap: 8 }}>
          <div>
            <span style={{ color: COLORS.textDim }}>GitHub: </span>
            <a
              href={BIO.links.githubUrl}
              target="_blank"
              rel="noreferrer"
              style={{ color: COLORS.accent, textDecoration: "none" }}
            >
              {BIO.links.github}
            </a>
          </div>

          <div>
            <span style={{ color: COLORS.textDim }}>Email: </span>
            <a
              href={`mailto:${BIO.links.email}`}
              style={{ color: COLORS.accent, textDecoration: "none" }}
            >
              {BIO.links.email}
            </a>
          </div>

          <div>
            <span style={{ color: COLORS.textDim }}>Phone: </span>
            <a
              href="tel:15619057258"
              style={{ color: COLORS.accent, textDecoration: "none" }}
            >
              {BIO.links.phone}
            </a>
          </div>

          <div>
            <span style={{ color: COLORS.textDim }}>LinkedIn: </span>
            <a
              href={BIO.links.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              style={{ color: COLORS.accent, textDecoration: "none" }}
            >
              {BIO.links.linkedin}
            </a>
          </div>

          <div>
            <span style={{ color: COLORS.textDim }}>Resume: </span>
            <a
              href={BIO.links.resume}
              target="_blank"
              rel="noreferrer"
              style={{ color: COLORS.accent, textDecoration: "none" }}
            >
              open resume.pdf
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}