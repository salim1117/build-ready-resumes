import TopBar from "@/components/TopBar";

const Preview = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex flex-1 items-center justify-center p-[24px]">
        <p className="text-muted-foreground">Preview — coming in Phase 5</p>
      </main>
    </div>
  );
};

export default Preview;
