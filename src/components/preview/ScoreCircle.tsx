interface Props {
  score: number;
}

const ScoreCircle = ({ score }: Props) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color = "text-destructive";
  let label = "Needs Work";
  if (score > 70) {
    color = "text-green-600";
    label = "Strong Resume";
  } else if (score > 40) {
    color = "text-amber-500";
    label = "Getting There";
  }

  return (
    <div className="flex flex-col items-center gap-[8px]">
      <div className="relative h-[128px] w-[128px]">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${color} transition-all duration-500`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold ${color}`}>{score}</span>
        </div>
      </div>
      <p className={`text-sm font-medium ${color}`}>{label}</p>
    </div>
  );
};

export default ScoreCircle;
