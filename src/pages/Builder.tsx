import TopBar from "@/components/TopBar";

const Builder = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex flex-1 items-center justify-center p-[24px]">
        <p className="text-muted-foreground">Builder — coming in Phase 4</p>
      </main>
    </div>
  );
};

export default Builder;
