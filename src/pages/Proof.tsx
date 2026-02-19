import { useState, useMemo } from "react";
import TopBar from "@/components/TopBar";
import { getResumeData } from "@/lib/storage";
import { calculateScore } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Circle, Copy, ExternalLink, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Proof = () => {
  const data = useMemo(() => getResumeData(), []);
  const { score } = useMemo(() => calculateScore(data), [data]);
  const { toast } = useToast();

  const [links, setLinks] = useState({ lovable: "", github: "", deploy: "" });

  const checks = [
    { label: "Name present", pass: !!data.personalInfo.name.trim() },
    { label: "Email present", pass: !!data.personalInfo.email.trim() },
    { label: "Summary > 50 chars", pass: data.summary.length > 50 },
    { label: "At least 1 experience", pass: data.experience.length > 0 },
    { label: "At least 1 education", pass: data.education.length > 0 },
    { label: "At least 1 project", pass: data.projects.length > 0 },
    { label: "5+ skills", pass: data.skills.technical.length + data.skills.soft.length + data.skills.tools.length >= 5 },
    { label: "ATS Score ≥ 70", pass: score >= 70 },
  ];

  const passedCount = checks.filter((c) => c.pass).length;
  const allChecks = checks.every((c) => c.pass);
  const isUrl = (s: string) => /^https?:\/\/.+/.test(s.trim());
  const allLinks = isUrl(links.lovable) && isUrl(links.github) && isUrl(links.deploy);
  const shipped = allChecks && allLinks;

  const copySubmission = async () => {
    const text = `AI Resume Builder — Final Submission\n\nLovable Project: ${links.lovable}\nGitHub Repository: ${links.github}\nLive Deployment: ${links.deploy}`;
    await navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Submission copied to clipboard." });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="mx-auto flex max-w-[720px] flex-1 flex-col gap-[24px] p-[24px]">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Proof & Submission</h1>
          <p className="text-sm text-muted-foreground">Complete all checks and submit your project links.</p>
        </div>

        {/* Score summary bar */}
        <div className="flex items-center gap-[16px] rounded-lg border border-border bg-card p-[16px] shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <span className="text-lg font-bold text-primary">{score}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">ATS Score: {score}/100</p>
            <div className="mt-[4px] h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
          <span className="rounded-full bg-secondary px-[12px] py-[4px] text-xs font-medium text-muted-foreground">
            {passedCount}/{checks.length} passed
          </span>
        </div>

        {/* Checklist */}
        <div className="rounded-lg border border-border bg-card p-[20px] shadow-sm">
          <h2 className="mb-[12px] flex items-center gap-[8px] text-sm font-semibold text-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" /> Completion Checklist
          </h2>
          <div className="grid gap-[8px] sm:grid-cols-2">
            {checks.map((c, i) => (
              <div
                key={i}
                className={`flex items-center gap-[8px] rounded-md border px-[12px] py-[8px] text-sm transition-colors ${
                  c.pass
                    ? "border-primary/20 bg-primary/5 text-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {c.pass ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0" />
                )}
                {c.label}
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="rounded-lg border border-border bg-card p-[20px] shadow-sm">
          <h2 className="mb-[16px] flex items-center gap-[8px] text-sm font-semibold text-foreground">
            <ExternalLink className="h-4 w-4 text-primary" /> Submission Links
          </h2>
          <div className="space-y-[12px]">
            <div className="space-y-[4px]">
              <Label className="text-xs">Lovable Project Link</Label>
              <Input value={links.lovable} onChange={(e) => setLinks((p) => ({ ...p, lovable: e.target.value }))} placeholder="https://lovable.dev/projects/..." />
            </div>
            <div className="space-y-[4px]">
              <Label className="text-xs">GitHub Repository</Label>
              <Input value={links.github} onChange={(e) => setLinks((p) => ({ ...p, github: e.target.value }))} placeholder="https://github.com/..." />
            </div>
            <div className="space-y-[4px]">
              <Label className="text-xs">Deployed URL</Label>
              <Input value={links.deploy} onChange={(e) => setLinks((p) => ({ ...p, deploy: e.target.value }))} placeholder="https://..." />
            </div>
          </div>
        </div>

        <Button onClick={copySubmission} disabled={!allLinks} className="gap-[8px] shadow-sm">
          <Copy className="h-4 w-4" /> Copy Final Submission
        </Button>

        {shipped && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-[24px] text-center shadow-sm">
            <Rocket className="mx-auto mb-[8px] h-6 w-6 text-primary" />
            <p className="font-serif text-lg font-semibold text-foreground">Project 3 Shipped Successfully.</p>
            <p className="mt-[4px] text-sm text-muted-foreground">All checks passed. Your submission is ready.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Proof;
