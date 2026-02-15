import { Experience } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import BulletHint from "./BulletHint";

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const empty = (): Experience => ({
  id: crypto.randomUUID(),
  role: "",
  company: "",
  startDate: "",
  endDate: "",
  bullets: [""],
});

const ExperienceSection = ({ data, onChange }: Props) => {
  const update = (index: number, patch: Partial<Experience>) => {
    const next = [...data];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const updateBullet = (expIdx: number, bulletIdx: number, value: string) => {
    const next = [...data];
    const bullets = [...next[expIdx].bullets];
    bullets[bulletIdx] = value;
    next[expIdx] = { ...next[expIdx], bullets };
    onChange(next);
  };

  const addBullet = (expIdx: number) => {
    const next = [...data];
    next[expIdx] = { ...next[expIdx], bullets: [...next[expIdx].bullets, ""] };
    onChange(next);
  };

  const removeBullet = (expIdx: number, bulletIdx: number) => {
    const next = [...data];
    next[expIdx] = { ...next[expIdx], bullets: next[expIdx].bullets.filter((_, j) => j !== bulletIdx) };
    onChange(next);
  };

  return (
    <div className="space-y-[16px]">
      {data.map((exp, i) => (
        <div key={exp.id} className="space-y-[8px] rounded border border-border p-[16px]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Experience {i + 1}</span>
            <Button variant="ghost" size="icon" onClick={() => onChange(data.filter((_, j) => j !== i))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-[8px] sm:grid-cols-2">
            <div className="space-y-[4px]">
              <Label>Role</Label>
              <Input value={exp.role} onChange={(e) => update(i, { role: e.target.value })} placeholder="Software Engineer" />
            </div>
            <div className="space-y-[4px]">
              <Label>Company</Label>
              <Input value={exp.company} onChange={(e) => update(i, { company: e.target.value })} placeholder="Google" />
            </div>
            <div className="space-y-[4px]">
              <Label>Start</Label>
              <Input value={exp.startDate} onChange={(e) => update(i, { startDate: e.target.value })} placeholder="Jan 2022" />
            </div>
            <div className="space-y-[4px]">
              <Label>End</Label>
              <Input value={exp.endDate} onChange={(e) => update(i, { endDate: e.target.value })} placeholder="Present" />
            </div>
          </div>
          <div className="space-y-[8px]">
            <Label>Bullets</Label>
            {exp.bullets.map((b, bi) => (
              <div key={bi}>
                <div className="flex gap-[8px]">
                  <Input
                    value={b}
                    onChange={(e) => updateBullet(i, bi, e.target.value)}
                    placeholder="Built a microservice that reduced latency by 40%"
                  />
                  {exp.bullets.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeBullet(i, bi)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <BulletHint bullet={b} />
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={() => addBullet(i)}>
              <Plus className="mr-1 h-3 w-3" /> Add Bullet
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...data, empty()])}>
        <Plus className="mr-1 h-4 w-4" /> Add Experience
      </Button>
    </div>
  );
};

export default ExperienceSection;
