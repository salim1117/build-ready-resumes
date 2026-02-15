import { PersonalInfo } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const fields: { key: keyof PersonalInfo; label: string; type?: string; placeholder: string }[] = [
  { key: "name", label: "Full Name", placeholder: "Jane Doe" },
  { key: "email", label: "Email", type: "email", placeholder: "jane@example.com" },
  { key: "phone", label: "Phone", type: "tel", placeholder: "+1 555-000-0000" },
  { key: "location", label: "Location", placeholder: "San Francisco, CA" },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/janedoe" },
  { key: "github", label: "GitHub", placeholder: "github.com/janedoe" },
];

const PersonalInfoSection = ({ data, onChange }: Props) => (
  <div className="grid gap-[16px] sm:grid-cols-2">
    {fields.map((f) => (
      <div key={f.key} className="space-y-[8px]">
        <Label htmlFor={f.key}>{f.label}</Label>
        <Input
          id={f.key}
          type={f.type || "text"}
          value={data[f.key]}
          onChange={(e) => onChange({ ...data, [f.key]: e.target.value })}
          placeholder={f.placeholder}
        />
      </div>
    ))}
  </div>
);

export default PersonalInfoSection;
