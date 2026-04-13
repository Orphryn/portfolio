export const PROJECTS = [
  {
    id: "madcards",
    name: "MadCards",
    icon: "🃏",
    desc: "Full-stack e-commerce platform for a Fort Lauderdale trading card shop.",
    tech: ["Flask", "Python", "PostgreSQL", "JWT Auth", "REST API"],
    status: "Live",
    github: "github.com/Orphryn/MadCards",
    details:
      "Production e-commerce platform serving a local trading card retailer. Features JWT authentication, RESTful API design with proper blueprints, automated inventory management, and a responsive storefront. Built with Flask factory pattern, SQLAlchemy ORM, and Alembic migrations.",
  },
  {
    id: "voxdub",
    name: "VoxDub",
    icon: "🎙️",
    desc: "Real-time voice dubbing desktop application.",
    tech: [
      "Electron",
      "Python",
      "Whisper",
      "MarianMT",
      "XTTS-v2",
      "WebRTC VAD",
    ],
    status: "In Development",
    github: "github.com/Orphryn/VoxDub",
    details:
      "Desktop application for real-time voice dubbing. Integrates a hybrid Vosk+Whisper STT pipeline with automatic language detection, MarianMT context-aware translation, and XTTS-v2 voice synthesis. Features speaker-aware processing and a local-only architecture for privacy.",
  },
  {
    id: "collab-editor",
    name: "CollabEdit",
    icon: "📝",
    desc: "Live collaborative code editor with real-time sync.",
    tech: ["React", "WebSocket", "Yjs CRDT", "Monaco Editor"],
    status: "Completed",
    github: "github.com/Orphryn/CollabEdit",
    details:
      "Real-time collaborative code editor supporting multiple simultaneous users. Built with Yjs CRDT for conflict-free synchronization, Monaco Editor for IDE-grade editing, WebSocket transport, live cursor tracking, and integrated code execution.",
  },
];