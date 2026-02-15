import { Link } from "react-router-dom";

interface TopBarProps {
  stepNum?: number;
  status?: "In Progress" | "Shipped";
}

const TopBar = ({ stepNum, status = "In Progress" }: TopBarProps) => {
  return (
    <header className="no-print flex h-[56px] items-center justify-between border-b px-[24px]">
      <Link to="/" className="font-serif text-lg font-semibold tracking-tight text-foreground">
        AI Resume Builder
      </Link>
      {stepNum !== undefined && (
        <span className="text-sm text-muted-foreground">
          Project 3 — Step {stepNum} of 8
        </span>
      )}
      <span
        className={`rounded-sm px-[8px] py-[4px] text-xs font-medium ${
          status === "Shipped"
            ? "bg-primary text-primary-foreground"
            : "border text-muted-foreground"
        }`}
      >
        {status}
      </span>
    </header>
  );
};

export default TopBar;
