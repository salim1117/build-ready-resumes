import { ResumeData } from "@/lib/types";

const ClassicTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo: p, summary, education, experience, projects, skills } = data;
  const hasSkills = skills.technical.length + skills.soft.length + skills.tools.length > 0;

  return (
    <div className="space-y-[16px] font-sans text-[13px] leading-relaxed text-foreground">
      {/* Header */}
      {p.name && (
        <div className="text-center">
          <h1 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{p.name}</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {[p.email, p.phone, p.location].filter(Boolean).join(" • ")}
          </p>
          {(p.linkedin || p.github) && (
            <p className="text-xs text-muted-foreground">
              {[p.linkedin, p.github].filter(Boolean).join(" • ")}
            </p>
          )}
        </div>
      )}

      {summary && (
        <>
          <hr className="border-border" />
          <div>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--resume-accent))" }}>Summary</h2>
            <p>{summary}</p>
          </div>
        </>
      )}

      {experience.length > 0 && (
        <>
          <hr className="border-border" />
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
        </>
      )}

      {education.length > 0 && (
        <>
          <hr className="border-border" />
          <div>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--resume-accent))" }}>Education</h2>
            {education.map((e) => (
              <div key={e.id} className="mb-[4px]">
                <div className="flex justify-between">
                  <span className="font-medium">{e.institution}</span>
                  <span className="text-xs text-muted-foreground">{[e.startDate, e.endDate].filter(Boolean).join(" – ")}</span>
                </div>
                {(e.degree || e.field) && <p className="text-muted-foreground">{[e.degree, e.field].filter(Boolean).join(" in ")}</p>}
              </div>
            ))}
          </div>
        </>
      )}

      {projects.length > 0 && (
        <>
          <hr className="border-border" />
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
        </>
      )}

      {hasSkills && (
        <>
          <hr className="border-border" />
          <div>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--resume-accent))" }}>Skills</h2>
            {skills.technical.length > 0 && <p><strong>Technical:</strong> {skills.technical.join(", ")}</p>}
            {skills.soft.length > 0 && <p><strong>Soft:</strong> {skills.soft.join(", ")}</p>}
            {skills.tools.length > 0 && <p><strong>Tools:</strong> {skills.tools.join(", ")}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default ClassicTemplate;
