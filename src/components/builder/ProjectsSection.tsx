import { Project } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import ChipInput from "./ChipInput";

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const empty = (): Project => ({
  id: crypto.randomUUID(),
  title: "",
  description: "",
  techStack: [],
  liveUrl: "",
  githubUrl: "",
});

const ProjectsSection = ({ data, onChange }: Props) => {
  const update = (index: number, patch: Partial<Project>) => {
    const next = [...data];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  return (
    <div className="space-y-[16px]">
      {data.map((proj, i) => (
        <div key={proj.id} className="space-y-[8px] rounded border border-border p-[16px]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Project {i + 1}</span>
            <Button variant="ghost" size="icon" onClick={() => onChange(data.filter((_, j) => j !== i))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-[4px]">
            <Label>Title</Label>
            <Input value={proj.title} onChange={(e) => update(i, { title: e.target.value })} placeholder="AI Resume Builder" />
          </div>
          <div className="space-y-[4px]">
            <Label>Description ({proj.description.length}/200)</Label>
            <Textarea
              value={proj.description}
              onChange={(e) => {
                if (e.target.value.length <= 200) update(i, { description: e.target.value });
              }}
              placeholder="A deterministic ATS-aware resume builder..."
              rows={2}
            />
          </div>
          <div className="space-y-[4px]">
            <Label>Tech Stack</Label>
            <ChipInput values={proj.techStack} onChange={(techStack) => update(i, { techStack })} placeholder="React, TypeScript..." />
          </div>
          <div className="grid gap-[8px] sm:grid-cols-2">
            <div className="space-y-[4px]">
              <Label>Live URL (optional)</Label>
              <Input value={proj.liveUrl} onChange={(e) => update(i, { liveUrl: e.target.value })} placeholder="https://..." />
            </div>
            <div className="space-y-[4px]">
              <Label>GitHub URL (optional)</Label>
              <Input value={proj.githubUrl} onChange={(e) => update(i, { githubUrl: e.target.value })} placeholder="https://github.com/..." />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...data, empty()])}>
        <Plus className="mr-1 h-4 w-4" /> Add Project
      </Button>
    </div>
  );
};

export default ProjectsSection;
