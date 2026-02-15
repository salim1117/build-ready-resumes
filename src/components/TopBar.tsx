import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FileText, Eye, Award, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface TopBarProps {
  stepNum?: number;
  status?: "In Progress" | "Shipped";
}

const navLinks = [
  { to: "/builder", label: "Builder", icon: FileText },
  { to: "/preview", label: "Preview", icon: Eye },
  { to: "/proof", label: "Proof", icon: Award },
];

const TopBar = ({ stepNum, status = "In Progress" }: TopBarProps) => {
  const { pathname } = useLocation();
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme-mode");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme-mode", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="no-print sticky top-0 z-50 flex h-[64px] items-center justify-between border-b border-border bg-card/80 px-[24px] backdrop-blur-sm">
      <Link to="/" className="flex items-center gap-[8px]">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
          <FileText className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
          AI Resume Builder
        </span>
      </Link>

      <nav className="flex items-center gap-[8px]">
        {stepNum !== undefined && (
          <span className="mr-[16px] text-sm text-muted-foreground">
            Project 3 — Step {stepNum} of 8
          </span>
        )}
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center gap-[6px] rounded-md px-[12px] py-[6px] text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-[12px]">
        <button
          onClick={() => setDark((d) => !d)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <span
          className={cn(
            "rounded-full px-[12px] py-[4px] text-xs font-semibold tracking-wide",
            status === "Shipped"
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-secondary text-muted-foreground"
          )}
        >
          {status}
        </span>
      </div>
    </header>
  );
};

export default TopBar;
