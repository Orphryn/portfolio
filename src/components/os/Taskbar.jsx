import { useClock } from "../../hooks/useClock";
import { useDesktopStore } from "../../store/useDesktopStore";

const COLORS = {
  taskbar: "#0e0e18",
  panelBorder: "#1e1e32",
  accent: "#5b8af5",
  textBright: "#e8ecf4",
  textDim: "#6b7280",
};

export default function Taskbar() {
  const time = useClock();
  const windows = useDesktopStore((state) => state.windows);
  const focusWindow = useDesktopStore((state) => state.focusWindow);
  const exitOS = useDesktopStore((state) => state.exitOS);

  const topZ = windows.length ? Math.max(...windows.map((window) => window.z)) : 0;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 44,
        background: `${COLORS.taskbar}ee`,
        backdropFilter: "blur(12px)",
        borderTop: `1px solid ${COLORS.panelBorder}`,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        zIndex: 9999,
      }}
    >
      <button
        onClick={exitOS}
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          border: "none",
          background: "rgba(91,138,245,0.15)",
          color: COLORS.accent,
          cursor: "pointer",
          fontSize: 14,
          marginRight: 12,
        }}
      >
        ⏻
      </button>

      <div style={{ flex: 1, display: "flex", gap: 4 }}>
        {windows.map((window) => (
          <button
            key={window.id}
            onClick={() => focusWindow(window.id)}
            style={{
              padding: "4px 12px",
              borderRadius: 6,
              border:
                window.z === topZ
                  ? `1px solid rgba(91,138,245,0.25)`
                  : "1px solid transparent",
              background:
                window.z === topZ ? "rgba(91,138,245,0.12)" : "transparent",
              color: window.z === topZ ? COLORS.textBright : COLORS.textDim,
              cursor: "pointer",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>{window.icon}</span>
            {window.title}
          </button>
        ))}
      </div>

      <div
        style={{
          fontSize: 12,
          color: COLORS.textDim,
          fontFamily: "monospace",
          letterSpacing: 0.5,
        }}
      >
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
}