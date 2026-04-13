import { useEffect, useRef, useState } from "react";
import { useDesktopStore } from "../../store/useDesktopStore";

const COLORS = {
  panel: "rgba(11, 16, 39, 0.97)",
  panelBorder: "rgba(122, 162, 255, 0.16)",
  titlebar: "rgba(18, 22, 42, 0.98)",
  accent: "#7aa2ff",
  textDim: "#7f89b6",
  textBright: "#f3f6ff",
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

  useEffect(() => {
    setLocalPosition(position);
  }, [position]);

  const clampPosition = (nextX, nextY) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const taskbarHeight = 48;
    const titlebarVisibleWidth = 180;

    const maxX = Math.max(0, viewportWidth - titlebarVisibleWidth);
    const maxY = Math.max(0, viewportHeight - taskbarHeight - 80);

    return {
      x: Math.max(0, Math.min(nextX, maxX)),
      y: Math.max(0, Math.min(nextY, maxY)),
    };
  };

  const startDrag = (event) => {
    event.preventDefault();
    focusWindow(id);
    draggingRef.current = true;

    const startX = event.clientX - localPosition.x;
    const startY = event.clientY - localPosition.y;

    const onMove = (moveEvent) => {
      if (!draggingRef.current) return;

      const nextPosition = clampPosition(
        moveEvent.clientX - startX,
        moveEvent.clientY - startY
      );

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
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${
          isActive ? "rgba(122, 162, 255, 0.35)" : COLORS.panelBorder
        }`,
        boxShadow: isActive
          ? "0 16px 50px rgba(0,0,0,0.42), 0 0 0 1px rgba(122,162,255,0.08)"
          : "0 10px 35px rgba(0,0,0,0.3)",
        background: COLORS.panel,
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        onMouseDown={startDrag}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "11px 14px",
          background: COLORS.titlebar,
          cursor: "grab",
          userSelect: "none",
          borderBottom: `1px solid ${COLORS.panelBorder}`,
          minHeight: 42,
        }}
      >
        <span style={{ fontSize: 14 }}>{icon}</span>

        <span
          style={{
            flex: 1,
            fontSize: 13,
            color: isActive ? COLORS.textBright : COLORS.textDim,
            fontWeight: 600,
            letterSpacing: 0.2,
          }}
        >
          {title}
        </span>

        <button
          onClick={() => closeWindow(id)}
          style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            border: "none",
            background: "transparent",
            color: COLORS.textDim,
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background = COLORS.red;
            event.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "transparent";
            event.currentTarget.style.color = COLORS.textDim;
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflow: "auto",
          maxHeight: size.h,
        }}
      >
        {children}
      </div>
    </div>
  );
}