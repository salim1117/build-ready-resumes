import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex flex-1 flex-col items-center justify-center px-[24px]">
        <div className="max-w-prose text-center">
          <h1 className="mb-[16px] font-serif text-5xl font-bold leading-tight tracking-tight text-foreground">
            Build a Resume That Gets Read.
          </h1>
          <p className="mb-[40px] text-lg text-muted-foreground">
            A structured, ATS-aware resume builder with deterministic scoring and clean export.
          </p>
          <Button asChild size="lg" className="px-[40px] py-[16px] text-base">
            <Link to="/builder">Start Building</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
