import { useState } from "react";
import { Skills } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import ChipInput from "./ChipInput";

interface Props {
  data: Skills;
  onChange: (data: Skills) => void;
}

const SUGGESTED: Skills = {
  technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python"],
  soft: ["Communication", "Leadership", "Problem Solving"],
  tools: ["Git", "Docker", "VS Code", "Figma"],
};

const SkillsSection = ({ data, onChange }: Props) => {
  const [loading, setLoading] = useState(false);

  const suggest = () => {
    setLoading(true);
    setTimeout(() => {
      const merge = (existing: string[], suggested: string[]) => {
        const set = new Set(existing.map((s) => s.toLowerCase()));
        return [...existing, ...suggested.filter((s) => !set.has(s.toLowerCase()))];
      };
      onChange({
        technical: merge(data.technical, SUGGESTED.technical),
        soft: merge(data.soft, SUGGESTED.soft),
        tools: merge(data.tools, SUGGESTED.tools),
      });
      setLoading(false);
    }, 1000);
  };

  const categories: { key: keyof Skills; label: string }[] = [
    { key: "technical", label: "Technical Skills" },
    { key: "soft", label: "Soft Skills" },
    { key: "tools", label: "Tools & Technologies" },
  ];

  return (
    <div className="space-y-[16px]">
      {categories.map((cat) => (
        <div key={cat.key} className="space-y-[8px]">
          <Label>
            {cat.label} ({data[cat.key].length})
          </Label>
          <ChipInput
            values={data[cat.key]}
            onChange={(values) => onChange({ ...data, [cat.key]: values })}
            placeholder={`Add ${cat.label.toLowerCase()}...`}
          />
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={suggest} disabled={loading}>
        {loading ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Sparkles className="mr-1 h-4 w-4" />}
        Suggest Skills
      </Button>
    </div>
  );
};

export default SkillsSection;
