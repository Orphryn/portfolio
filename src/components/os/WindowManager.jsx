import AppWindow from "./AppWindow";
import AboutApp from "../apps/AboutApp";
import ProjectsApp from "../apps/ProjectsApp";
import TerminalApp from "../apps/TerminalApp";

export default function WindowManager({ windows }) {
  const topZ = windows.length ? Math.max(...windows.map((window) => window.z)) : 0;

  return (
    <>
      {windows.map((window) => (
        <AppWindow
          key={window.id}
          id={window.id}
          title={window.title}
          icon={window.icon}
          position={window.position}
          size={window.size}
          zIndex={window.z}
          isActive={window.z === topZ}
        >
          {window.type === "about" && <AboutApp />}
          {window.type === "projects" && <ProjectsApp />}
          {window.type === "terminal" && <TerminalApp />}
        </AppWindow>
      ))}
    </>
  );
}