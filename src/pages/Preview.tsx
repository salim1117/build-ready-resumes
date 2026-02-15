import { useState, useMemo, useRef } from "react";
import TopBar from "@/components/TopBar";
import { getResumeData, getTemplate, saveTemplate, getTheme, saveTheme } from "@/lib/storage";
import { TemplateName, ThemeName } from "@/lib/types";
import { calculateScore } from "@/lib/scoring";
import { generatePlainText } from "@/lib/exportText";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import ScoreCircle from "@/components/preview/ScoreCircle";
import SuggestionsList from "@/components/preview/SuggestionsList";
import { Button } from "@/components/ui/button";
import { Printer, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const templates: { value: TemplateName; label: string }[] = [
  { value: "classic", label: "Classic" },
  { value: "modern", label: "Modern" },
  { value: "minimal", label: "Minimal" },
];

const themes: { value: ThemeName; label: string; color: string }[] = [
  { value: "teal", label: "Teal", color: "174 72% 33%" },
  { value: "navy", label: "Navy", color: "220 70% 30%" },
  { value: "burgundy", label: "Burgundy", color: "0 100% 27%" },
  { value: "forest", label: "Forest", color: "150 50% 28%" },
  { value: "charcoal", label: "Charcoal", color: "0 0% 25%" },
];

const Preview = () => {
  const data = useMemo(() => getResumeData(), []);
  const [template, setTemplate] = useState<TemplateName>(getTemplate);
  const [theme, setTheme] = useState<ThemeName>(getTheme);
  const { score, suggestions } = useMemo(() => calculateScore(data), [data]);
  const resumeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const switchTemplate = (t: TemplateName) => {
    setTemplate(t);
    saveTemplate(t);
  };

  const switchTheme = (t: ThemeName) => {
    setTheme(t);
    saveTheme(t);
  };

  const handlePrint = () => {
    if (!data.personalInfo.name.trim() && data.experience.length === 0 && data.projects.length === 0) {
      toast({ title: "Warning", description: "Your resume may look incomplete.", variant: "destructive" });
    }
    window.print();
  };

  const handleCopyText = async () => {
    if (!data.personalInfo.name.trim() && data.experience.length === 0 && data.projects.length === 0) {
      toast({ title: "Warning", description: "Your resume may look incomplete.", variant: "destructive" });
    }
    const text = generatePlainText(data);
    await navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Resume text copied to clipboard." });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex flex-1 gap-[24px] p-[24px] no-print">
        {/* Controls sidebar */}
        <div className="w-[280px] shrink-0 space-y-[24px]">
          <ScoreCircle score={score} />
          <SuggestionsList suggestions={suggestions} />

          {/* Template switcher */}
          <div className="space-y-[8px]">
            <h3 className="text-sm font-semibold">Template</h3>
            <div className="flex gap-[8px]">
              {templates.map((t) => (
                <Button
                  key={t.value}
                  variant={template === t.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => switchTemplate(t.value)}
                >
                  {t.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Theme picker */}
          <div className="space-y-[8px]">
            <h3 className="text-sm font-semibold">Accent Color</h3>
            <div className="flex gap-[8px]">
              {themes.map((t) => (
                <button
                  key={t.value}
                  title={t.label}
                  onClick={() => switchTheme(t.value)}
                  className={`h-8 w-8 rounded-full border-2 transition-transform ${theme === t.value ? "scale-110 border-foreground" : "border-transparent"}`}
                  style={{ backgroundColor: `hsl(${t.color})` }}
                />
              ))}
            </div>
          </div>

          {/* Export */}
          <div className="space-y-[8px]">
            <h3 className="text-sm font-semibold">Export</h3>
            <Button variant="outline" size="sm" className="w-full" onClick={handlePrint}>
              <Printer className="mr-1 h-4 w-4" /> Print / Save as PDF
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={handleCopyText}>
              <Copy className="mr-1 h-4 w-4" /> Copy Resume as Text
            </Button>
          </div>
        </div>

        {/* Resume preview */}
        <div className="flex-1 overflow-y-auto">
          <div ref={resumeRef} data-theme={theme} className="mx-auto max-w-[720px] rounded border border-border bg-white p-[40px] shadow-sm print-target">
            <TemplateRenderer data={data} template={template} />
          </div>
        </div>
      </main>

      {/* Print-only resume */}
      <div className="hidden print-only" data-theme={theme}>
        <div className="p-[40px]">
          <TemplateRenderer data={data} template={template} />
        </div>
      </div>
    </div>
  );
};

export default Preview;
