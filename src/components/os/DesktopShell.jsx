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
          "radial-gradient(ellipse at 30% 20%, #121230 0%, #0c0c14 60%, #080810 100%)",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(91,138,245,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
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
          gap: 8,
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

      <WindowManager windows={windows} />
      <Taskbar />
    </div>
  );
}