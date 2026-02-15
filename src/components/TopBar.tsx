import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TopBarProps {
  stepNum?: number;
  status?: "In Progress" | "Shipped";
}

const navLinks = [
  { to: "/builder", label: "Builder" },
  { to: "/preview", label: "Preview" },
  { to: "/proof", label: "Proof" },
];

const TopBar = ({ stepNum, status = "In Progress" }: TopBarProps) => {
  const { pathname } = useLocation();

  return (
    <header className="no-print flex h-[56px] items-center justify-between border-b px-[24px]">
      <Link to="/" className="font-serif text-lg font-semibold tracking-tight text-foreground">
        AI Resume Builder
      </Link>

      <nav className="flex items-center gap-[24px]">
        {stepNum !== undefined && (
          <span className="text-sm text-muted-foreground">
            Project 3 — Step {stepNum} of 8
          </span>
        )}
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground",
              pathname === link.to ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

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
