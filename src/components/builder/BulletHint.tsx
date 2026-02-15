const ACTION_VERBS = ["built", "developed", "designed", "implemented", "led", "improved", "created", "optimized", "automated", "managed", "delivered", "launched", "reduced", "increased", "architected"];

export function getBulletHints(bullet: string): string[] {
  if (!bullet.trim()) return [];
  const hints: string[] = [];
  const firstWord = bullet.trim().split(/\s/)[0].toLowerCase();
  if (!ACTION_VERBS.includes(firstWord)) {
    hints.push("Start with a strong action verb.");
  }
  if (!/\d|%|k\b|X\b/i.test(bullet)) {
    hints.push("Add measurable impact.");
  }
  return hints;
}

const BulletHint = ({ bullet }: { bullet: string }) => {
  const hints = getBulletHints(bullet);
  if (hints.length === 0) return null;
  return (
    <div className="mt-1 space-y-0.5">
      {hints.map((h, i) => (
        <p key={i} className="text-xs text-muted-foreground italic">{h}</p>
      ))}
    </div>
  );
};

export default BulletHint;
