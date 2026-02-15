import { ResumeData } from "@/lib/types";

const MinimalTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo: p, summary, education, experience, projects, skills } = data;
  const hasSkills = skills.technical.length + skills.soft.length + skills.tools.length > 0;

  return (
    <div className="space-y-[24px] font-sans text-[13px] leading-relaxed text-foreground">
      {p.name && (
        <div>
          <h1 className="text-xl font-bold">{p.name}</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {[p.email, p.phone, p.location, p.linkedin, p.github].filter(Boolean).join(" · ")}
          </p>
        </div>
      )}

      {summary && (
        <div>
          <h2 className="mb-[8px] text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(var(--resume-accent))" }}>Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div>
          <h2 className="mb-[8px] text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(var(--resume-accent))" }}>Experience</h2>
          {experience.map((e) => (
            <div key={e.id} className="mb-[12px]">
              <p className="font-medium">{e.role}{e.company && `, ${e.company}`}</p>
              <p className="text-xs text-muted-foreground">{[e.startDate, e.endDate].filter(Boolean).join(" – ")}</p>
              <ul className="ml-4 mt-1 list-disc">
                {e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div>
          <h2 className="mb-[8px] text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(var(--resume-accent))" }}>Education</h2>
          {education.map((e) => (
            <div key={e.id} className="mb-[8px]">
              <p className="font-medium">{e.institution}</p>
              {(e.degree || e.field) && <p>{[e.degree, e.field].filter(Boolean).join(" in ")}</p>}
              <p className="text-xs text-muted-foreground">{[e.startDate, e.endDate].filter(Boolean).join(" – ")}</p>
            </div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div>
          <h2 className="mb-[8px] text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(var(--resume-accent))" }}>Projects</h2>
          {projects.map((pr) => (
            <div key={pr.id} className="mb-[8px]">
              <p className="font-medium">{pr.title}</p>
              {pr.description && <p>{pr.description}</p>}
              {pr.techStack.length > 0 && <p className="text-xs text-muted-foreground">{pr.techStack.join(", ")}</p>}
            </div>
          ))}
        </div>
      )}

      {hasSkills && (
        <div>
          <h2 className="mb-[8px] text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(var(--resume-accent))" }}>Skills</h2>
          <p>{[...skills.technical, ...skills.soft, ...skills.tools].join(" · ")}</p>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
