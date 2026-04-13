import { create } from "zustand";

const WINDOW_PRESETS = {
  projects: {
    title: "Projects",
    icon: "📂",
    position: { x: 80, y: 40 },
    size: { w: 620, h: 420 },
  },
  terminal: {
    title: "Terminal",
    icon: "⬛",
    position: { x: 120, y: 70 },
    size: { w: 580, h: 380 },
  },
  about: {
    title: "About Me",
    icon: "👤",
    position: { x: 160, y: 50 },
    size: { w: 500, h: 460 },
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
      position: preset.position,
      size: preset.size,
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