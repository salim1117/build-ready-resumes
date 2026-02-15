import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BUILD_STEPS } from "@/lib/types";
import { getCurrentUnlockedStep, getStepArtifact, saveStepArtifact } from "@/lib/storage";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const BuildStep = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const step = BUILD_STEPS.find((s) => s.slug === slug);
  const stepNum = step?.num ?? 1;

  const [artifact, setArtifact] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!step) {
      navigate("/rb/01-problem", { replace: true });
      return;
    }
    const unlocked = getCurrentUnlockedStep();
    if (stepNum > unlocked) {
      const target = BUILD_STEPS.find((s) => s.num === unlocked);
      navigate(`/rb/${target?.slug ?? "01-problem"}`, { replace: true });
      return;
    }
    const existing = getStepArtifact(stepNum);
    if (existing) {
      setArtifact(existing);
      setSaved(true);
    }
  }, [slug, step, stepNum, navigate]);

  const handleSave = () => {
    if (artifact.trim()) {
      saveStepArtifact(stepNum, artifact.trim());
      setSaved(true);
    }
  };

  const handleNext = () => {
    const nextStep = BUILD_STEPS.find((s) => s.num === stepNum + 1);
    if (nextStep) {
      navigate(`/rb/${nextStep.slug}`);
    } else {
      navigate("/rb/proof");
    }
  };

  if (!step) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar stepNum={stepNum} />
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Main workspace 70% */}
        <main className="flex-1 p-[24px] lg:w-[70%]">
          <h2 className="mb-[16px] font-serif text-2xl font-semibold text-foreground">
            Step {stepNum}: {step.title}
          </h2>
          <p className="mb-[24px] max-w-prose text-sm text-muted-foreground">
            Complete this step and paste your artifact below to proceed.
          </p>
          <div className="max-w-prose rounded border bg-card p-[24px]">
            <p className="mb-[8px] text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Workspace
            </p>
            <p className="text-sm text-muted-foreground">
              Work on "{step.title}" for your AI Resume Builder project. When done, paste or upload your artifact in the build panel.
            </p>
          </div>
        </main>

        {/* Build panel 30% */}
        <aside className="border-t p-[24px] lg:w-[30%] lg:border-l lg:border-t-0">
          <h3 className="mb-[16px] font-serif text-lg font-semibold text-foreground">Build Panel</h3>

          <label className="mb-[8px] block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Paste Artifact
          </label>
          <Textarea
            value={artifact}
            onChange={(e) => {
              setArtifact(e.target.value);
              setSaved(false);
            }}
            placeholder="Paste your artifact here..."
            className="mb-[16px] min-h-[120px]"
          />

          <div className="flex flex-col gap-[8px]">
            <Button onClick={handleSave} variant={saved ? "secondary" : "default"} className="w-full">
              {saved ? "✓ Saved" : "Save Artifact"}
            </Button>

            <Button
              onClick={handleNext}
              disabled={!saved || !artifact.trim()}
              variant="outline"
              className="w-full"
            >
              {stepNum < 8 ? "Next Step →" : "Go to Proof →"}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BuildStep;
