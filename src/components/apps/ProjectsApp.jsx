import { useMemo, useState } from "react";
import { PROJECTS } from "../../data/projects";

const COLORS = {
  text: "#d8def7",
  textDim: "#7f89b6",
  textBright: "#f3f6ff",
  accent: "#7aa2ff",
  accentSoft: "rgba(122, 162, 255, 0.12)",
  border: "rgba(122, 162, 255, 0.18)",
  surface: "rgba(255,255,255,0.025)",
  green: "#58d68d",
  yellow: "#facc15",
};

const EXTRA_CASE_STUDIES = {
  madcards: {
    pitch: "Production-style local retail e-commerce platform.",
    problem:
      "A local trading card business needed a cleaner online storefront and a structured backend for authentication, inventory, and product flows.",
    highlights: [
      "Structured backend around Flask app patterns and API organization.",
      "Designed authentication and inventory workflows for real usage scenarios.",
      "Focused on turning a student project into something that feels operational.",
    ],
    impact:
      "Shows backend fundamentals, data modeling discipline, and the ability to turn business needs into software structure.",
    demo: "Coming soon",
  },
  voxdub: {
    pitch: "Real-time desktop dubbing concept for foreign-language audio.",
    problem:
      "Most translated media experiences are delayed, static, or detached from the original voice presence. VoxDub is aimed at making live dubbing feel immediate and immersive.",
    highlights: [
      "Designed around a multi-stage audio pipeline: transcription, translation, and expressive playback.",
      "Explored low-latency architecture and privacy-conscious local-first ideas.",
      "Positions audio, AI, and desktop application thinking inside one system.",
    ],
    impact:
      "Shows ambition, systems thinking, and willingness to tackle hard product ideas beyond ordinary CRUD apps.",
    demo: "Concept / in progress",
  },
  "collab-editor": {
    pitch: "Collaborative browser-based editing with real-time synchronization.",
    problem:
      "Collaborative editing is difficult because multiple users must interact with the same document without destructive conflicts or poor UX.",
    highlights: [
      "Used real-time synchronization ideas to support concurrent editing.",
      "Focused on making a complex interaction model feel usable.",
      "Combined interface design with live multi-user technical concerns.",
    ],
    impact:
      "Shows real-time product thinking, collaborative state management awareness, and strong frontend-system instincts.",
    demo: "Prototype",
  },
};

function StatusBadge({ status }) {
  const color =
    status === "Live" ? COLORS.green : status === "Completed" ? COLORS.accent : COLORS.yellow;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        color,
        background: `${color}18`,
        border: `1px solid ${color}33`,
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
      {status}
    </span>
  );
}

export default function ProjectsApp() {
  const [selectedId, setSelectedId] = useState(PROJECTS[0]?.id ?? null);

  const selectedProject = useMemo(
    () => PROJECTS.find((project) => project.id === selectedId) ?? PROJECTS[0],
    [selectedId]
  );

  const meta = EXTRA_CASE_STUDIES[selectedProject.id];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        height: "100%",
        color: COLORS.text,
        fontFamily: "'SF Pro Display', -apple-system, 'Segoe UI', sans-serif",
        background:
          "linear-gradient(180deg, rgba(11,16,39,0.98) 0%, rgba(10,13,30,0.98) 100%)",
      }}
    >
      <aside
        style={{
          borderRight: `1px solid ${COLORS.border}`,
          background: "rgba(255,255,255,0.02)",
          padding: "16px 0",
        }}
      >
        <div
          style={{
            padding: "0 16px",
            marginBottom: 12,
            fontSize: 11,
            color: COLORS.textDim,
            textTransform: "uppercase",
            letterSpacing: 1.2,
          }}
        >
          Project Library
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          {PROJECTS.map((project) => {
            const isActive = project.id === selectedProject.id;

            return (
              <button
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                style={{
                  margin: "0 8px",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 12px",
                  background: isActive ? COLORS.accentSoft : "transparent",
                  borderLeft: isActive
                    ? `2px solid ${COLORS.accent}`
                    : "2px solid transparent",
                  color: isActive ? COLORS.textBright : COLORS.text,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{project.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{project.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>
                      {project.status}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      <section style={{ padding: 22, overflow: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            alignItems: "flex-start",
            marginBottom: 18,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 28 }}>{selectedProject.icon}</span>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: COLORS.textBright,
                }}
              >
                {selectedProject.name}
              </div>
            </div>

            <div style={{ fontSize: 14, color: COLORS.textDim, lineHeight: 1.7 }}>
              {meta.pitch}
            </div>
          </div>

          <StatusBadge status={selectedProject.status} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.35fr 0.95fr",
            gap: 16,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              padding: 16,
              borderRadius: 14,
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: COLORS.textDim,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 8,
              }}
            >
              Problem
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>{meta.problem}</div>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 14,
              background: COLORS.accentSoft,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: COLORS.textDim,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 8,
              }}
            >
              Project Snapshot
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>{selectedProject.desc}</div>
          </div>
        </div>

        <div
          style={{
            padding: 16,
            borderRadius: 14,
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: COLORS.textDim,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              marginBottom: 8,
            }}
          >
            Detailed Overview
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.85 }}>{selectedProject.details}</div>
        </div>

        <div
          style={{
            padding: 16,
            borderRadius: 14,
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: COLORS.textDim,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              marginBottom: 12,
            }}
          >
            Architecture / Engineering Highlights
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            {meta.highlights.map((item) => (
              <div key={item} style={{ fontSize: 14, lineHeight: 1.75 }}>
                • {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              padding: 16,
              borderRadius: 14,
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: COLORS.textDim,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 10,
              }}
            >
              Tech Stack
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {selectedProject.tech.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    background: COLORS.accentSoft,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.accent,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 14,
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: COLORS.textDim,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 10,
              }}
            >
              Why It Matters
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>{meta.impact}</div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div
            style={{
              padding: 16,
              borderRadius: 14,
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: COLORS.textDim,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 8,
              }}
            >
              Repository
            </div>
            <a
              href={`https://${selectedProject.github}`}
              target="_blank"
              rel="noreferrer"
              style={{
                color: COLORS.accent,
                fontSize: 14,
                textDecoration: "none",
                wordBreak: "break-word",
              }}
            >
              {selectedProject.github}
            </a>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 14,
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: COLORS.textDim,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 8,
              }}
            >
              Demo Status
            </div>
            <div style={{ fontSize: 14, color: COLORS.text }}>{meta.demo}</div>
          </div>
        </div>
      </section>
    </div>
  );
}