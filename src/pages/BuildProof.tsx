import { useState, useEffect } from "react";
import { BUILD_STEPS } from "@/lib/types";
import { getStepArtifact, getFinalSubmission, saveFinalSubmission, getCurrentUnlockedStep } from "@/lib/storage";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const isValidUrl = (s: string) => {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
};

const BuildProof = () => {
  const [submission, setSubmission] = useState(getFinalSubmission());
  const [copied, setCopied] = useState(false);

  const stepsComplete = BUILD_STEPS.map((s) => ({
    ...s,
    done: !!getStepArtifact(s.num),
  }));

  const allStepsDone = stepsComplete.every((s) => s.done);
  const allLinksValid =
    isValidUrl(submission.lovableLink) &&
    isValidUrl(submission.githubLink) &&
    isValidUrl(submission.deployLink);

  const shipped = allStepsDone && allLinksValid;

  useEffect(() => {
    saveFinalSubmission(submission);
  }, [submission]);

  const handleCopy = () => {
    const text = `AI Resume Builder — Final Submission

Lovable Project: ${submission.lovableLink}
GitHub Repository: ${submission.githubLink}
Live Deployment: ${submission.deployLink}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar status={shipped ? "Shipped" : "In Progress"} />
      <main className="mx-auto w-full max-w-prose p-[24px]">
        <h1 className="mb-[24px] font-serif text-3xl font-bold text-foreground">
          Proof of Completion
        </h1>

        {/* Step overview */}
        <section className="mb-[40px]">
          <h2 className="mb-[16px] font-serif text-xl font-semibold text-foreground">
            Build Steps
          </h2>
          <div className="space-y-[8px]">
            {stepsComplete.map((s) => (
              <div key={s.num} className="flex items-center gap-[8px] text-sm">
                <span className={s.done ? "text-primary" : "text-muted-foreground"}>
                  {s.done ? "✓" : "○"}
                </span>
                <span className={s.done ? "text-foreground" : "text-muted-foreground"}>
                  Step {s.num}: {s.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Proof links */}
        <section className="mb-[40px] space-y-[16px]">
          <h2 className="mb-[16px] font-serif text-xl font-semibold text-foreground">
            Proof Links
          </h2>

          {[
            { label: "Lovable Project Link", key: "lovableLink" as const },
            { label: "GitHub Repository Link", key: "githubLink" as const },
            { label: "Deployed URL", key: "deployLink" as const },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="mb-[4px] block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {label}
              </label>
              <Input
                value={submission[key]}
                onChange={(e) =>
                  setSubmission((prev) => ({ ...prev, [key]: e.target.value }))
                }
                placeholder="https://..."
              />
              {submission[key] && !isValidUrl(submission[key]) && (
                <p className="mt-[4px] text-xs text-destructive">Enter a valid URL</p>
              )}
            </div>
          ))}
        </section>

        <Button
          onClick={handleCopy}
          disabled={!allLinksValid}
          className="w-full"
        >
          {copied ? "✓ Copied" : "Copy Final Submission"}
        </Button>

        {shipped && (
          <p className="mt-[40px] text-center font-serif text-lg text-foreground">
            Project 3 Shipped Successfully.
          </p>
        )}
      </main>
    </div>
  );
};

export default BuildProof;
