import { BIO } from "../data/bio";
import { PROJECTS } from "../data/projects";
import { FS_DATA } from "../data/filesystem";
import { resolvePath } from "./pathUtils";

export function runCommand({ commandLine, cwd, setCwd }) {
  const trimmed = commandLine.trim();

  if (!trimmed) {
    return [];
  }

  const [command, ...args] = trimmed.split(/\s+/);
  const arg = args.join(" ");

  const lines = [];

  const push = (text, type = "output") => {
    lines.push({ type, text });
  };

  switch (command) {
    case "help":
      push("Available commands:");
      push("  ls          List directory");
      push("  cd <dir>    Change directory");
      push("  cat <file>  Read file");
      push("  pwd         Print working directory");
      push("  whoami      About me");
      push("  neofetch    System info");
      push("  projects    List projects");
      push("  clear       Clear screen");
      break;

    case "ls": {
      const node = FS_DATA[cwd];
      if (node?.type !== "dir") {
        push("Not a directory", "error");
        break;
      }

      node.children.forEach((child) => {
        const childPath = `${cwd}/${child}`;
        const childNode = FS_DATA[childPath];
        push(
          `  ${childNode?.type === "dir" ? "📁" : "📄"} ${child}`,
          childNode?.type === "dir" ? "dir" : "file"
        );
      });
      break;
    }

    case "cd": {
      if (!arg || arg === "~") {
        setCwd("/home/david");
        break;
      }

      const target = resolvePath(cwd, arg);
      if (FS_DATA[target]?.type === "dir") {
        setCwd(target);
      } else {
        push(`cd: no such directory: ${arg}`, "error");
      }
      break;
    }

    case "cat": {
      if (!arg) {
        push("Usage: cat <filename>", "error");
        break;
      }

      const target = resolvePath(cwd, arg);
      const node = FS_DATA[target];

      if (node?.type !== "file") {
        push(`cat: ${arg}: No such file`, "error");
        break;
      }

      node.content.split("\n").forEach((line) => push(line));
      break;
    }

    case "pwd":
      push(cwd);
      break;

    case "whoami":
      push(`${BIO.name} (@${BIO.handle})`);
      push(BIO.role);
      push("");
      push(BIO.about);
      break;

    case "neofetch":
      push("╔══════════════════════════════════╗");
      push("║   ███████  ForgeOS v1.0          ║");
      push("║   █     █  ─────────────────     ║");
      push(`║   ███████  User: ${BIO.handle.padEnd(16)}║`);
      push("║   █        OS: ForgeOS 1.0       ║");
      push("║   █        Shell: bash           ║");
      push(`║            Languages: ${BIO.skills.length}          ║`);
      push(`║            Projects: ${PROJECTS.length}            ║`);
      push("╚══════════════════════════════════╝");
      break;

    case "projects":
      PROJECTS.forEach((project) => {
        push(`  ${project.icon} ${project.name} — ${project.desc}`);
      });
      break;

    case "clear":
      return [{ type: "clear" }];

    default:
      push(`command not found: ${command}`, "error");
  }

  return lines;
}