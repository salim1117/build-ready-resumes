import { Education } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const empty = (): Education => ({
  id: crypto.randomUUID(),
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
});

const EducationSection = ({ data, onChange }: Props) => {
  const update = (index: number, patch: Partial<Education>) => {
    const next = [...data];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  return (
    <div className="space-y-[16px]">
      {data.map((edu, i) => (
        <div key={edu.id} className="space-y-[8px] rounded border border-border p-[16px]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Entry {i + 1}</span>
            <Button variant="ghost" size="icon" onClick={() => onChange(data.filter((_, j) => j !== i))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-[8px] sm:grid-cols-2">
            <div className="space-y-[4px]">
              <Label>Institution</Label>
              <Input value={edu.institution} onChange={(e) => update(i, { institution: e.target.value })} placeholder="MIT" />
            </div>
            <div className="space-y-[4px]">
              <Label>Degree</Label>
              <Input value={edu.degree} onChange={(e) => update(i, { degree: e.target.value })} placeholder="B.S." />
            </div>
            <div className="space-y-[4px]">
              <Label>Field</Label>
              <Input value={edu.field} onChange={(e) => update(i, { field: e.target.value })} placeholder="Computer Science" />
            </div>
            <div className="grid grid-cols-2 gap-[8px]">
              <div className="space-y-[4px]">
                <Label>Start</Label>
                <Input value={edu.startDate} onChange={(e) => update(i, { startDate: e.target.value })} placeholder="2019" />
              </div>
              <div className="space-y-[4px]">
                <Label>End</Label>
                <Input value={edu.endDate} onChange={(e) => update(i, { endDate: e.target.value })} placeholder="2023" />
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...data, empty()])}>
        <Plus className="mr-1 h-4 w-4" /> Add Education
      </Button>
    </div>
  );
};

export default EducationSection;
