export function resolvePath(cwd, inputPath) {
  if (!inputPath) return cwd;

  if (inputPath.startsWith("/")) {
    return normalizePath(inputPath);
  }

  const parts = cwd.split("/").filter(Boolean);

  inputPath.split("/").forEach((part) => {
    if (!part || part === ".") return;
    if (part === "..") {
      parts.pop();
      return;
    }
    parts.push(part);
  });

  return "/" + parts.join("/");
}

export function normalizePath(path) {
  const parts = [];

  path.split("/").forEach((part) => {
    if (!part || part === ".") return;
    if (part === "..") {
      parts.pop();
      return;
    }
    parts.push(part);
  });

  return "/" + parts.join("/");
}