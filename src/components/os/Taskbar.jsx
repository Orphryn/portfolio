import { useClock } from "../../hooks/useClock";
import { useDesktopStore } from "../../store/useDesktopStore";

const COLORS = {
  taskbar: "rgba(7, 10, 24, 0.92)",
  panelBorder: "rgba(122, 162, 255, 0.14)",
  accent: "#7aa2ff",
  textBright: "#f3f6ff",
  textDim: "#7f89b6",
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
        height: 48,
        background: COLORS.taskbar,
        backdropFilter: "blur(16px)",
        borderTop: `1px solid ${COLORS.panelBorder}`,
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
        zIndex: 9999,
      }}
    >
      <button
        onClick={exitOS}
        style={{
          minWidth: 34,
          height: 34,
          borderRadius: 10,
          border: `1px solid ${COLORS.panelBorder}`,
          background: "rgba(122, 162, 255, 0.1)",
          color: COLORS.accent,
          cursor: "pointer",
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
          transition: "all 0.15s ease",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.background = "rgba(122, 162, 255, 0.18)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.background = "rgba(122, 162, 255, 0.1)";
        }}
        title="Return to room"
      >
        ⏻
      </button>

      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 6,
          alignItems: "center",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {windows.map((window) => {
          const active = window.z === topZ;

          return (
            <button
              key={window.id}
              onClick={() => focusWindow(window.id)}
              style={{
                padding: "7px 12px",
                borderRadius: 10,
                border: active
                  ? "1px solid rgba(122, 162, 255, 0.28)"
                  : `1px solid ${COLORS.panelBorder}`,
                background: active
                  ? "rgba(122, 162, 255, 0.14)"
                  : "rgba(255,255,255,0.03)",
                color: active ? COLORS.textBright : COLORS.textDim,
                cursor: "pointer",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 7,
                whiteSpace: "nowrap",
                minWidth: "fit-content",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(event) => {
                if (!active) {
                  event.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }
              }}
              onMouseLeave={(event) => {
                if (!active) {
                  event.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }
              }}
            >
              <span style={{ fontSize: 13 }}>{window.icon}</span>
              <span>{window.title}</span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          marginLeft: 10,
          padding: "6px 10px",
          borderRadius: 10,
          border: `1px solid ${COLORS.panelBorder}`,
          background: "rgba(255,255,255,0.03)",
          color: COLORS.textDim,
          fontSize: 12,
          fontFamily: "monospace",
          letterSpacing: 0.4,
          minWidth: 62,
          textAlign: "center",
        }}
      >
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
}