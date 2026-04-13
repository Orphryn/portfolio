import { useState } from "react";
import { PROJECTS } from "../../data/projects";

const COLORS = {
  text: "#c8cdd8",
  textDim: "#6b7280",
  textBright: "#e8ecf4",
  accent: "#5b8af5",
  panelBorder: "#1e1e32",
  surface: "#181828",
  green: "#4ade80",
  yellow: "#facc15",
};

export default function ProjectsApp() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex", height: "100%", color: COLORS.text, fontSize: 13 }}>
      <div
        style={{
          width: 180,
          borderRight: `1px solid ${COLORS.panelBorder}`,
          padding: "12px 0",
          background: COLORS.surface,
        }}
      >
        <div
          style={{
            padding: "4px 14px",
            fontSize: 11,
            color: COLORS.textDim,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 4,
          }}
        >
          Projects
        </div>

        {PROJECTS.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelected(project)}
            style={{
              width: "100%",
              padding: "8px 14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              background:
                selected?.id === project.id ? "rgba(91,138,245,0.1)" : "transparent",
              border: "none",
              borderLeft:
                selected?.id === project.id
                  ? `2px solid ${COLORS.accent}`
                  : "2px solid transparent",
              color: selected?.id === project.id ? COLORS.textBright : COLORS.text,
              textAlign: "left",
            }}
          >
            <span>{project.icon}</span>
            <span>{project.name}</span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: 20, overflow: "auto" }}>
        {!selected ? (
          <div style={{ color: COLORS.textDim, textAlign: "center", marginTop: 60 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📂</div>
            Select a project to view details
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 28 }}>{selected.icon}</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, color: COLORS.textBright }}>
                  {selected.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: selected.status === "Live" ? COLORS.green : COLORS.yellow,
                  }}
                >
                  {selected.status}
                </div>
              </div>
            </div>

            <p style={{ lineHeight: 1.7, margin: "0 0 16px" }}>{selected.details}</p>

            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.textDim,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 6,
                }}
              >
                Tech Stack
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {selected.tech.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "3px 10px",
                      borderRadius: 4,
                      background: "rgba(91,138,245,0.08)",
                      color: COLORS.accent,
                      fontSize: 12,
                      border: "1px solid rgba(91,138,245,0.18)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 12, color: COLORS.textDim }}>
              <span style={{ marginRight: 6 }}>📎</span>
              {selected.github}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}