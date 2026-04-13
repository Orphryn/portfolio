import { useDesktopStore } from "../../store/useDesktopStore";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import WindowManager from "./WindowManager";

export default function DesktopShell() {
  const windows = useDesktopStore((state) => state.windows);
  const openWindow = useDesktopStore((state) => state.openWindow);

  const desktopApps = [
    { type: "projects", icon: "📂", label: "Projects" },
    { type: "terminal", icon: "⬛", label: "Terminal" },
    { type: "about", icon: "👤", label: "About Me" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(ellipse at 30% 20%, #101a52 0%, #090f2b 45%, #050814 100%)",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(91,138,245,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 1,
        }}
      >
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.type}
            icon={app.icon}
            label={app.label}
            onOpen={() => openWindow(app.type)}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: 24,
          right: 28,
          padding: "12px 16px",
          borderRadius: 12,
          background: "rgba(10, 14, 32, 0.45)",
          border: "1px solid rgba(91,138,245,0.15)",
          color: "#cfd6f6",
          fontSize: 13,
          maxWidth: 300,
          lineHeight: 1.6,
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            color: "#7d89b8",
            marginBottom: 6,
          }}
        >
          Welcome
        </div>
        Explore Projects, About Me, or open the Terminal to navigate the portfolio like a computer.
      </div>

      <WindowManager windows={windows} />
      <Taskbar />
    </div>
  );
}