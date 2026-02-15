import { ResumeData } from "@/lib/types";

const ModernTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo: p, summary, education, experience, projects, skills } = data;
  const hasSkills = skills.technical.length + skills.soft.length + skills.tools.length > 0;
  const hasSidebar = p.email || p.phone || p.location || p.linkedin || p.github || hasSkills;

  return (
    <div className="flex text-[13px] leading-relaxed text-foreground">
      {/* Sidebar */}
      {hasSidebar && (
        <div className="w-[35%] space-y-[16px] p-[16px] text-white" style={{ backgroundColor: "hsl(var(--resume-accent))" }}>
          {p.name && <h1 className="text-lg font-bold">{p.name}</h1>}
          <div className="space-y-[4px] text-xs opacity-90">
            {p.email && <p>{p.email}</p>}
            {p.phone && <p>{p.phone}</p>}
            {p.location && <p>{p.location}</p>}
            {p.linkedin && <p>{p.linkedin}</p>}
            {p.github && <p>{p.github}</p>}
          </div>
          {hasSkills && (
            <div className="space-y-[8px]">
              <h2 className="text-sm font-semibold uppercase tracking-wider opacity-80">Skills</h2>
              {skills.technical.length > 0 && (
                <div>
                  <p className="text-xs font-medium opacity-70">Technical</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skills.technical.map((s, i) => (
                      <span key={i} className="rounded bg-white/20 px-1.5 py-0.5 text-[10px]">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <p className="text-xs font-medium opacity-70">Soft</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skills.soft.map((s, i) => (
                      <span key={i} className="rounded bg-white/20 px-1.5 py-0.5 text-[10px]">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {skills.tools.length > 0 && (
                <div>
                  <p className="text-xs font-medium opacity-70">Tools</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skills.tools.map((s, i) => (
                      <span key={i} className="rounded bg-white/20 px-1.5 py-0.5 text-[10px]">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main */}
      <div className="flex-1 space-y-[16px] p-[16px]">
        {summary && (
          <div>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--resume-accent))" }}>Summary</h2>
            <p>{summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--resume-accent))" }}>Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="mb-[8px]">
                <div className="flex justify-between">
                  <span className="font-medium">{e.role}{e.company && ` — ${e.company}`}</span>
                  <span className="text-xs text-muted-foreground">{[e.startDate, e.endDate].filter(Boolean).join(" – ")}</span>
                </div>
                <ul className="ml-4 list-disc">
                  {e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
        {education.length > 0 && (
          <div>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--resume-accent))" }}>Education</h2>
            {education.map((e) => (
              <div key={e.id} className="mb-[4px]">
                <span className="font-medium">{e.institution}</span>
                {(e.degree || e.field) && <p className="text-muted-foreground">{[e.degree, e.field].filter(Boolean).join(" in ")}</p>}
                <p className="text-xs text-muted-foreground">{[e.startDate, e.endDate].filter(Boolean).join(" – ")}</p>
              </div>
            ))}
          </div>
        )}
        {projects.length > 0 && (
          <div>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--resume-accent))" }}>Projects</h2>
            {projects.map((pr) => (
              <div key={pr.id} className="mb-[8px]">
                <span className="font-medium">{pr.title}</span>
                {pr.description && <p>{pr.description}</p>}
                {pr.techStack.length > 0 && <p className="text-xs text-muted-foreground">Tech: {pr.techStack.join(", ")}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
