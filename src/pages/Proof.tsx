import { useState, useMemo } from "react";
import TopBar from "@/components/TopBar";
import { getResumeData } from "@/lib/storage";
import { calculateScore } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Circle, Copy } from "lucide-react";
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
        <h1 className="text-2xl font-bold">Proof & Submission</h1>

        {/* Checklist */}
        <div className="space-y-[8px] rounded border border-border p-[16px]">
          <h2 className="text-sm font-semibold">Completion Checklist</h2>
          {checks.map((c, i) => (
            <div key={i} className="flex items-center gap-[8px] text-sm">
              {c.pass ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
              <span className={c.pass ? "" : "text-muted-foreground"}>{c.label}</span>
            </div>
          ))}
          <p className="mt-[8px] text-sm font-medium">
            ATS Score: {score}/100 — {checks.filter((c) => c.pass).length}/{checks.length} checks passed
          </p>
        </div>

        {/* Links */}
        <div className="space-y-[16px] rounded border border-border p-[16px]">
          <h2 className="text-sm font-semibold">Submission Links</h2>
          <div className="space-y-[8px]">
            <Label>Lovable Project Link</Label>
            <Input value={links.lovable} onChange={(e) => setLinks((p) => ({ ...p, lovable: e.target.value }))} placeholder="https://lovable.dev/projects/..." />
          </div>
          <div className="space-y-[8px]">
            <Label>GitHub Repository</Label>
            <Input value={links.github} onChange={(e) => setLinks((p) => ({ ...p, github: e.target.value }))} placeholder="https://github.com/..." />
          </div>
          <div className="space-y-[8px]">
            <Label>Deployed URL</Label>
            <Input value={links.deploy} onChange={(e) => setLinks((p) => ({ ...p, deploy: e.target.value }))} placeholder="https://..." />
          </div>
        </div>

        <Button onClick={copySubmission} disabled={!allLinks}>
          <Copy className="mr-1 h-4 w-4" /> Copy Final Submission
        </Button>

        {shipped && (
          <div className="rounded border border-border p-[24px] text-center">
            <p className="text-lg font-semibold">Project 3 Shipped Successfully.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Proof;
