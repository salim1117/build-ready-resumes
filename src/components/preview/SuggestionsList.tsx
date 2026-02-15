import { Lightbulb } from "lucide-react";

interface Props {
  suggestions: string[];
}

const SuggestionsList = ({ suggestions }: Props) => {
  if (suggestions.length === 0) return null;
  return (
    <div className="space-y-[8px]">
      <h3 className="text-sm font-semibold flex items-center gap-[8px]">
        <Lightbulb className="h-4 w-4" /> Suggestions
      </h3>
      <ul className="space-y-[4px]">
        {suggestions.map((s, i) => (
          <li key={i} className="text-sm text-muted-foreground">• {s}</li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;
