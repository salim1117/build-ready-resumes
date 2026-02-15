import { ResumeData, EMPTY_RESUME, TemplateName, ThemeName } from "./types";

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently fail
  }
}

export function getResumeData(): ResumeData {
  return safeGet("resumeBuilderData", { ...EMPTY_RESUME });
}

export function saveResumeData(data: ResumeData): void {
  safeSet("resumeBuilderData", data);
}

export function getTemplate(): TemplateName {
  return safeGet("resumeTemplate", "classic" as TemplateName);
}

export function saveTemplate(t: TemplateName): void {
  safeSet("resumeTemplate", t);
}

export function getTheme(): ThemeName {
  return safeGet("resumeTheme", "burgundy" as ThemeName);
}

export function saveTheme(t: ThemeName): void {
  safeSet("resumeTheme", t);
}

export function getStepArtifact(step: number): string | null {
  try {
    return localStorage.getItem(`rb_step_${step}_artifact`);
  } catch {
    return null;
  }
}

export function saveStepArtifact(step: number, value: string): void {
  try {
    localStorage.setItem(`rb_step_${step}_artifact`, value);
  } catch {
    // silently fail
  }
}

export function getCurrentUnlockedStep(): number {
  for (let i = 1; i <= 8; i++) {
    if (!getStepArtifact(i)) return i;
  }
  return 9; // all complete
}

export function getFinalSubmission() {
  return safeGet("rb_final_submission", {
    lovableLink: "",
    githubLink: "",
    deployLink: "",
  });
}

export function saveFinalSubmission(data: { lovableLink: string; githubLink: string; deployLink: string }) {
  safeSet("rb_final_submission", data);
}
