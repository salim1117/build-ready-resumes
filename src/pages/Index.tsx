import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";
import { ArrowRight, FileText, BarChart3, Palette } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Structured Builder",
    desc: "Guided sections for experience, projects, skills, and more — all auto-saved.",
  },
  {
    icon: BarChart3,
    title: "ATS Scoring",
    desc: "Deterministic 0–100 scoring with actionable suggestions to improve your resume.",
  },
  {
    icon: Palette,
    title: "Templates & Themes",
    desc: "Three professional templates and five accent colors — export as PDF or text.",
  },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex flex-1 flex-col items-center justify-center px-[24px]">
        <div className="max-w-2xl text-center">
          {/* Badge */}
          <div className="mb-[24px] inline-flex items-center gap-[8px] rounded-full border border-border bg-card px-[16px] py-[6px] text-xs font-medium text-muted-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            ATS-Optimized Resume Builder
          </div>

          <h1 className="mb-[16px] font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Build a Resume That Gets{" "}
            <span className="text-primary">Read.</span>
          </h1>
          <p className="mb-[40px] text-lg text-muted-foreground">
            A structured, ATS-aware resume builder with deterministic scoring,
            professional templates, and clean PDF export.
          </p>
          <Button asChild size="lg" className="gap-[8px] px-[40px] py-[16px] text-base shadow-md">
            <Link to="/builder">
              Start Building <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Feature cards */}
        <div className="mt-[64px] grid max-w-3xl gap-[24px] md:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-lg border border-border bg-card p-[24px] shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-[12px] flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-[4px] text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Index;
