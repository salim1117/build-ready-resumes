import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import { ResumeData, EMPTY_RESUME } from "@/lib/types";
import { getResumeData, saveResumeData } from "@/lib/storage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PersonalInfoSection from "@/components/builder/PersonalInfoSection";
import SummarySection from "@/components/builder/SummarySection";
import EducationSection from "@/components/builder/EducationSection";
import ExperienceSection from "@/components/builder/ExperienceSection";
import ProjectsSection from "@/components/builder/ProjectsSection";
import SkillsSection from "@/components/builder/SkillsSection";
import ResumePreview from "@/components/builder/ResumePreview";
import { User, FileText, GraduationCap, Briefcase, FolderOpen, Wrench } from "lucide-react";

const sections = [
  { value: "personal", label: "Personal Info", icon: User },
  { value: "summary", label: "Summary", icon: FileText },
  { value: "education", label: "Education", icon: GraduationCap },
  { value: "experience", label: "Experience", icon: Briefcase },
  { value: "projects", label: "Projects", icon: FolderOpen },
  { value: "skills", label: "Skills", icon: Wrench },
];

const Builder = () => {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      return getResumeData();
    } catch {
      return { ...EMPTY_RESUME };
    }
  });

  useEffect(() => {
    saveResumeData(data);
  }, [data]);

  const update = (patch: Partial<ResumeData>) => setData((prev) => ({ ...prev, ...patch }));

  const getCounts = (key: string) => {
    switch (key) {
      case "education": return data.education.length;
      case "experience": return data.experience.length;
      case "projects": return data.projects.length;
      case "skills": return data.skills.technical.length + data.skills.soft.length + data.skills.tools.length;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex flex-1 gap-[24px] p-[24px]">
        {/* Left: Form */}
        <div className="w-1/2 max-w-[720px] space-y-[16px] overflow-y-auto">
          <div className="mb-[16px]">
            <h1 className="font-serif text-2xl font-bold text-foreground">Resume Builder</h1>
            <p className="text-sm text-muted-foreground">Fill in your details — the preview updates live.</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-[16px] shadow-sm">
            <Accordion type="multiple" defaultValue={["personal", "summary"]}>
              {sections.map((section) => {
                const Icon = section.icon;
                const count = getCounts(section.value);
                return (
                  <AccordionItem key={section.value} value={section.value} className="border-b border-border last:border-0">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-[8px]">
                        <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/10">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="font-medium">{section.label}</span>
                        {count !== null && (
                          <span className="rounded-full bg-secondary px-[8px] py-[2px] text-xs text-muted-foreground">
                            {count}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-[8px]">
                      {section.value === "personal" && (
                        <PersonalInfoSection data={data.personalInfo} onChange={(personalInfo) => update({ personalInfo })} />
                      )}
                      {section.value === "summary" && (
                        <SummarySection value={data.summary} onChange={(summary) => update({ summary })} />
                      )}
                      {section.value === "education" && (
                        <EducationSection data={data.education} onChange={(education) => update({ education })} />
                      )}
                      {section.value === "experience" && (
                        <ExperienceSection data={data.experience} onChange={(experience) => update({ experience })} />
                      )}
                      {section.value === "projects" && (
                        <ProjectsSection data={data.projects} onChange={(projects) => update({ projects })} />
                      )}
                      {section.value === "skills" && (
                        <SkillsSection data={data.skills} onChange={(skills) => update({ skills })} />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="flex-1 overflow-y-auto">
          <div className="mb-[8px] flex items-center gap-[8px]">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-medium text-muted-foreground">Live Preview</span>
          </div>
          <ResumePreview data={data} />
        </div>
      </main>
    </div>
  );
};

export default Builder;
