import { BIO } from "./bio";
import { PROJECTS } from "./projects";

export const FS_DATA = {
  "/home/david": {
    type: "dir",
    children: ["projects", "about.txt", "skills.txt", "contact.txt"],
  },
  "/home/david/projects": {
    type: "dir",
    children: PROJECTS.map((project) => project.name),
  },
  "/home/david/about.txt": {
    type: "file",
    content: `${BIO.name} (${BIO.handle})
${BIO.school}

${BIO.about}`,
  },
  "/home/david/skills.txt": {
    type: "file",
    content: BIO.skills.join(", "),
  },
  "/home/david/contact.txt": {
    type: "file",
    content: `GitHub: ${BIO.links.github}
Email: ${BIO.links.email}`,
  },
};

PROJECTS.forEach((project) => {
  FS_DATA[`/home/david/projects/${project.name}`] = {
    type: "dir",
    children: ["README.md", "info.txt"],
  };

  FS_DATA[`/home/david/projects/${project.name}/README.md`] = {
    type: "file",
    content: `# ${project.name}

${project.details}

Tech: ${project.tech.join(", ")}
Status: ${project.status}
Repo: ${project.github}`,
  };

  FS_DATA[`/home/david/projects/${project.name}/info.txt`] = {
    type: "file",
    content: project.desc,
  };
});