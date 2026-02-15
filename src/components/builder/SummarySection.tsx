import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SummarySection = ({ value, onChange }: Props) => (
  <div className="space-y-[8px]">
    <Label>Professional Summary</Label>
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Experienced software engineer with a passion for building scalable systems..."
      rows={4}
    />
    <p className="text-xs text-muted-foreground">
      {value.length} characters{value.length < 50 && " — aim for at least 50"}
    </p>
  </div>
);

export default SummarySection;
