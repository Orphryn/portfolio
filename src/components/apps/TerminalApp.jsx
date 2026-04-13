import { useEffect, useRef, useState } from "react";
import { runCommand } from "../../utils/terminalCommands";

const COLORS = {
  termBg: "#0a0a12",
  termGreen: "#4ade80",
  text: "#c8cdd8",
  textBright: "#e8ecf4",
  textDim: "#6b7280",
  red: "#f87171",
  accent: "#5b8af5",
};

export default function TerminalApp() {
  const [lines, setLines] = useState([
    { type: "system", text: "ForgeOS Terminal v1.0 — Type 'help' for commands." },
    { type: "prompt", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("/home/david");

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const getColor = (type) => {
    switch (type) {
      case "error":
        return COLORS.red;
      case "dir":
        return COLORS.accent;
      case "file":
        return COLORS.text;
      case "system":
        return COLORS.textDim;
      case "input":
        return COLORS.termGreen;
      default:
        return COLORS.text;
    }
  };

  const execute = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextLines = [
      ...lines.slice(0, -1),
      { type: "input", text: `${cwd.split("/").pop() || "~"} $ ${trimmed}` },
    ];

    const output = runCommand({
      commandLine: trimmed,
      cwd,
      setCwd,
    });

    if (output.length === 1 && output[0].type === "clear") {
      setLines([{ type: "prompt", text: "" }]);
      setInput("");
      return;
    }

    setLines([...nextLines, ...output, { type: "prompt", text: "" }]);
    setInput("");
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        background: COLORS.termBg,
        height: "100%",
        padding: "10px 14px",
        fontFamily: "'SF Mono','Fira Code','Cascadia Code',monospace",
        fontSize: 13,
        lineHeight: 1.6,
        cursor: "text",
        overflow: "auto",
      }}
    >
      {lines.map((line, index) =>
        line.type === "prompt" ? (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: COLORS.termGreen }}>
              {cwd.split("/").pop() || "~"} $&nbsp;
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  execute();
                }
              }}
              autoFocus
              spellCheck={false}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: COLORS.textBright,
                fontFamily: "inherit",
                fontSize: "inherit",
                padding: 0,
                caretColor: COLORS.accent,
              }}
            />
          </div>
        ) : (
          <div
            key={index}
            style={{
              color: getColor(line.type),
              whiteSpace: "pre-wrap",
            }}
          >
            {line.text}
          </div>
        )
      )}

      <div ref={bottomRef} />
    </div>
  );
}