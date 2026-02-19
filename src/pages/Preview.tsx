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
import { Printer, Copy, Layout, Columns, AlignLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const templates: { value: TemplateName; label: string; icon: typeof Layout }[] = [
  { value: "classic", label: "Classic", icon: AlignLeft },
  { value: "modern", label: "Modern", icon: Columns },
  { value: "minimal", label: "Minimal", icon: Layout },
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

  const switchTemplate = (t: TemplateName) => { setTemplate(t); saveTemplate(t); };
  const switchTheme = (t: ThemeName) => { setTheme(t); saveTheme(t); };

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
        <div className="w-[300px] shrink-0 space-y-[24px]">
          {/* Score card */}
          <div className="rounded-lg border border-border bg-card p-[24px] shadow-sm">
            <h2 className="mb-[16px] text-center font-serif text-sm font-semibold text-foreground">ATS Score</h2>
            <ScoreCircle score={score} />
          </div>

          {/* Suggestions card */}
          {suggestions.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-[16px] shadow-sm">
              <SuggestionsList suggestions={suggestions} />
            </div>
          )}

          {/* Template switcher */}
          <div className="rounded-lg border border-border bg-card p-[16px] shadow-sm">
            <h3 className="mb-[12px] text-sm font-semibold text-foreground">Template</h3>
            <div className="grid grid-cols-3 gap-[8px]">
              {templates.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.value}
                    onClick={() => switchTemplate(t.value)}
                    className={`flex flex-col items-center gap-[4px] rounded-md border p-[8px] text-xs transition-all ${
                      template === t.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-foreground/20"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme picker */}
          <div className="rounded-lg border border-border bg-card p-[16px] shadow-sm">
            <h3 className="mb-[12px] text-sm font-semibold text-foreground">Accent Color</h3>
            <div className="flex gap-[10px]">
              {themes.map((t) => (
                <button
                  key={t.value}
                  title={t.label}
                  onClick={() => switchTheme(t.value)}
                  className={`h-9 w-9 rounded-full border-2 transition-all ${
                    theme === t.value ? "scale-110 border-foreground shadow-md" : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: `hsl(${t.color})` }}
                />
              ))}
            </div>
          </div>

          {/* Export */}
          <div className="rounded-lg border border-border bg-card p-[16px] shadow-sm">
            <h3 className="mb-[12px] text-sm font-semibold text-foreground">Export</h3>
            <div className="space-y-[8px]">
              <Button size="sm" className="w-full gap-[8px]" onClick={handlePrint}>
                <Printer className="h-4 w-4" /> Print / Save as PDF
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-[8px]" onClick={handleCopyText}>
                <Copy className="h-4 w-4" /> Copy Resume as Text
              </Button>
            </div>
          </div>
        </div>

        {/* Resume preview */}
        <div className="flex-1 overflow-y-auto">
          <div ref={resumeRef} data-theme={theme} className="mx-auto max-w-[720px] rounded-lg border border-border bg-white p-[40px] shadow-md print-target">
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
