import { ResumeData } from "./types";

const ACTION_VERBS = ["built", "led", "designed", "improved", "implemented", "optimized", "created", "developed", "automated", "managed", "delivered", "launched", "reduced", "increased", "architected"];

export function calculateScore(data: ResumeData): { score: number; suggestions: string[] } {
  let score = 0;
  const suggestions: string[] = [];

  if (data.personalInfo.name.trim()) score += 10;
  else suggestions.push("Add your full name (+10 points)");

  if (data.personalInfo.email.trim()) score += 10;
  else suggestions.push("Add your email address (+10 points)");

  if (data.summary.length > 50) score += 10;
  else suggestions.push("Write a summary with at least 50 characters (+10 points)");

  if (data.experience.some((e) => e.bullets.some((b) => b.trim()))) score += 15;
  else suggestions.push("Add experience with bullet points (+15 points)");

  if (data.education.length > 0) score += 10;
  else suggestions.push("Add at least one education entry (+10 points)");

  const totalSkills = data.skills.technical.length + data.skills.soft.length + data.skills.tools.length;
  if (totalSkills >= 5) score += 10;
  else suggestions.push("Add at least 5 skills (+10 points)");

  if (data.projects.length > 0) score += 10;
  else suggestions.push("Add at least one project (+10 points)");

  if (data.personalInfo.phone.trim()) score += 5;
  else suggestions.push("Add your phone number (+5 points)");

  if (data.personalInfo.linkedin.trim()) score += 5;
  else suggestions.push("Add your LinkedIn profile (+5 points)");

  if (data.personalInfo.github.trim()) score += 5;
  else suggestions.push("Add your GitHub profile (+5 points)");

  const summaryLower = data.summary.toLowerCase();
  if (ACTION_VERBS.some((v) => summaryLower.includes(v))) score += 10;
  else suggestions.push("Use action verbs in your summary (+10 points)");

  return { score: Math.min(score, 100), suggestions: suggestions.slice(0, 5) };
}
