export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
}

export type TemplateName = "classic" | "modern" | "minimal";
export type ThemeName = "teal" | "navy" | "burgundy" | "forest" | "charcoal";

export const EMPTY_RESUME: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: { technical: [], soft: [], tools: [] },
};

export const BUILD_STEPS = [
  { num: 1, slug: "01-problem", title: "Problem Statement" },
  { num: 2, slug: "02-market", title: "Market Research" },
  { num: 3, slug: "03-architecture", title: "Architecture" },
  { num: 4, slug: "04-hld", title: "High-Level Design" },
  { num: 5, slug: "05-lld", title: "Low-Level Design" },
  { num: 6, slug: "06-build", title: "Build" },
  { num: 7, slug: "07-test", title: "Test" },
  { num: 8, slug: "08-ship", title: "Ship" },
] as const;
