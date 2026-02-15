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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex flex-1 gap-[24px] p-[24px]">
        {/* Left: Form */}
        <div className="w-1/2 max-w-[720px] space-y-[16px] overflow-y-auto">
          <Accordion type="multiple" defaultValue={["personal", "summary"]}>
            <AccordionItem value="personal">
              <AccordionTrigger>Personal Info</AccordionTrigger>
              <AccordionContent>
                <PersonalInfoSection data={data.personalInfo} onChange={(personalInfo) => update({ personalInfo })} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="summary">
              <AccordionTrigger>Summary</AccordionTrigger>
              <AccordionContent>
                <SummarySection value={data.summary} onChange={(summary) => update({ summary })} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="education">
              <AccordionTrigger>Education ({data.education.length})</AccordionTrigger>
              <AccordionContent>
                <EducationSection data={data.education} onChange={(education) => update({ education })} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="experience">
              <AccordionTrigger>Experience ({data.experience.length})</AccordionTrigger>
              <AccordionContent>
                <ExperienceSection data={data.experience} onChange={(experience) => update({ experience })} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="projects">
              <AccordionTrigger>Projects ({data.projects.length})</AccordionTrigger>
              <AccordionContent>
                <ProjectsSection data={data.projects} onChange={(projects) => update({ projects })} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="skills">
              <AccordionTrigger>Skills ({data.skills.technical.length + data.skills.soft.length + data.skills.tools.length})</AccordionTrigger>
              <AccordionContent>
                <SkillsSection data={data.skills} onChange={(skills) => update({ skills })} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Right: Live Preview */}
        <div className="flex-1 overflow-y-auto">
          <ResumePreview data={data} />
        </div>
      </main>
    </div>
  );
};

export default Builder;
