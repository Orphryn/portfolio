import { create } from "zustand";

const WINDOW_PRESETS = {
  projects: {
    title: "Projects",
    icon: "📂",
    position: { x: 60, y: 70 },
    size: { w: 720, h: 430 },
  },
  terminal: {
    title: "Terminal",
    icon: "⬛",
    position: { x: 260, y: 280 },
    size: { w: 620, h: 340 },
  },
  about: {
    title: "About Me",
    icon: "👤",
    position: { x: 900, y: 240 },
    size: { w: 540, h: 500 },
  },
  resume: {
    title: "Resume",
    icon: "📄",
    position: { x: 180, y: 110 },
    size: { w: 680, h: 520 },
  },
  contact: {
    title: "Contact",
    icon: "✉️",
    position: { x: 980, y: 110 },
    size: { w: 460, h: 400 },
  },
  skills: {
    title: "Skills",
    icon: "🛠️",
    position: { x: 720, y: 120 },
    size: { w: 560, h: 470 },
  },
};

export const useDesktopStore = create((set, get) => ({
  phase: "room",
  windows: [],
  nextZ: 10,

  enterOS: () => set({ phase: "os" }),
  exitOS: () => set({ phase: "room", windows: [], nextZ: 10 }),

  openWindow: (type) => {
    const { windows, nextZ } = get();
    const existing = windows.find((window) => window.type === type);

    if (existing) {
      get().focusWindow(existing.id);
      return;
    }

    const preset = WINDOW_PRESETS[type];
    if (!preset) return;

    const newWindow = {
      id: `${type}-${Date.now()}`,
      type,
      title: preset.title,
      icon: preset.icon,
      position: { ...preset.position },
      size: { ...preset.size },
      z: nextZ,
    };

    set({
      windows: [...windows, newWindow],
      nextZ: nextZ + 1,
    });
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
    }));
  },

  focusWindow: (id) => {
    const { nextZ } = get();

    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, z: nextZ } : window
      ),
      nextZ: nextZ + 1,
    }));
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, position } : window
      ),
    }));
  },
}));