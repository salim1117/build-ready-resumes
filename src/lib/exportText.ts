import { ResumeData } from "./types";

export function generatePlainText(data: ResumeData): string {
  const lines: string[] = [];
  const { personalInfo: p, summary, education, experience, projects, skills } = data;

  if (p.name) lines.push(p.name, "");
  const contact = [p.email, p.phone, p.location].filter(Boolean).join(" | ");
  if (contact) lines.push(contact);
  if (p.linkedin) lines.push(p.linkedin);
  if (p.github) lines.push(p.github);
  if (contact || p.linkedin || p.github) lines.push("");

  if (summary) {
    lines.push("SUMMARY", summary, "");
  }

  if (experience.length > 0) {
    lines.push("EXPERIENCE");
    experience.forEach((e) => {
      lines.push(`${e.role}${e.company ? ` — ${e.company}` : ""} (${[e.startDate, e.endDate].filter(Boolean).join(" – ")})`);
      e.bullets.filter(Boolean).forEach((b) => lines.push(`  • ${b}`));
      lines.push("");
    });
  }

  if (education.length > 0) {
    lines.push("EDUCATION");
    education.forEach((e) => {
      lines.push(`${e.institution} — ${[e.degree, e.field].filter(Boolean).join(" in ")} (${[e.startDate, e.endDate].filter(Boolean).join(" – ")})`);
    });
    lines.push("");
  }

  if (projects.length > 0) {
    lines.push("PROJECTS");
    projects.forEach((pr) => {
      lines.push(pr.title);
      if (pr.description) lines.push(`  ${pr.description}`);
      if (pr.techStack.length) lines.push(`  Tech: ${pr.techStack.join(", ")}`);
      lines.push("");
    });
  }

  const allSkills = [...skills.technical, ...skills.soft, ...skills.tools];
  if (allSkills.length > 0) {
    lines.push("SKILLS", allSkills.join(", "), "");
  }

  return lines.join("\n");
}
