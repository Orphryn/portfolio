import { useRef, useState } from "react";
import { useDesktopStore } from "../../store/useDesktopStore";

const COLORS = {
  panel: "#12121e",
  panelBorder: "#1e1e32",
  titlebar: "#14141f",
  accent: "#5b8af5",
  textDim: "#6b7280",
  red: "#f87171",
};

export default function AppWindow({
  id,
  title,
  icon,
  position,
  size,
  zIndex,
  isActive,
  children,
}) {
  const closeWindow = useDesktopStore((state) => state.closeWindow);
  const focusWindow = useDesktopStore((state) => state.focusWindow);
  const updateWindowPosition = useDesktopStore(
    (state) => state.updateWindowPosition
  );

  const [localPosition, setLocalPosition] = useState(position);
  const draggingRef = useRef(false);

  const startDrag = (event) => {
    event.preventDefault();
    focusWindow(id);
    draggingRef.current = true;

    const startX = event.clientX - localPosition.x;
    const startY = event.clientY - localPosition.y;

    const onMove = (moveEvent) => {
      if (!draggingRef.current) return;

      const nextPosition = {
        x: Math.max(0, moveEvent.clientX - startX),
        y: Math.max(0, moveEvent.clientY - startY),
      };

      setLocalPosition(nextPosition);
    };

    const onUp = () => {
      draggingRef.current = false;
      updateWindowPosition(id, localPosition);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <div
      onClick={() => focusWindow(id)}
      style={{
        position: "absolute",
        left: localPosition.x,
        top: localPosition.y,
        width: size.w,
        zIndex,
        display: "flex",
        flexDirection: "column",
        borderRadius: 10,
        overflow: "hidden",
        border: `1px solid ${
          isActive ? `${COLORS.accent}55` : COLORS.panelBorder
        }`,
        boxShadow: isActive
          ? "0 8px 40px #00000088, 0 0 1px rgba(91,138,245,0.3)"
          : "0 4px 20px #00000066",
        background: COLORS.panel,
      }}
    >
      <div
        onMouseDown={startDrag}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          background: COLORS.titlebar,
          cursor: "grab",
          userSelect: "none",
          borderBottom: `1px solid ${COLORS.panelBorder}`,
          minHeight: 36,
        }}
      >
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span
          style={{
            flex: 1,
            fontSize: 13,
            color: COLORS.textDim,
            fontWeight: 500,
          }}
        >
          {title}
        </span>

        <button
          onClick={() => closeWindow(id)}
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            border: "none",
            background: "transparent",
            color: COLORS.textDim,
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      <div style={{ flex: 1, overflow: "auto", maxHeight: size.h }}>
        {children}
      </div>
    </div>
  );
}