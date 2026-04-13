import DesktopShell from "./components/os/DesktopShell";
import RoomScene from "./components/room/RoomScene";
import { useDesktopStore } from "./store/useDesktopStore";

export default function App() {
  const phase = useDesktopStore((state) => state.phase);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {phase === "room" && <RoomScene />}
      {phase === "os" && <DesktopShell />}
    </div>
  );
}