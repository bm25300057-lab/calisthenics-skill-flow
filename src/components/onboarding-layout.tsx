import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function OnboardingLayout({
  step,
  total,
  title,
  subtitle,
  children,
  cta,
}: {
  step: number;
  total: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  cta: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-hero px-6 py-10">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <div className="flex items-center gap-4">
          <Link to="/signup" className="text-muted-foreground">
            <ArrowLeft className="size-5" />
          </Link>
          <div className="flex flex-1 gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={cn("h-1 flex-1 rounded-full", i < step ? "bg-primary" : "bg-elevated")}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-muted-foreground">
            {step}/{total}
          </span>
        </div>

        <h1 className="text-display mt-8 text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

        <div className="mt-6 flex-1 space-y-3">{children}</div>
        <div className="sticky bottom-0 mt-6 bg-background/0 pb-2">{cta}</div>
      </div>
    </div>
  );
}

export function SelectTile({
  label,
  hint,
  selected,
  onClick,
}: {
  label: string;
  hint?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors",
        selected
          ? "border-primary bg-primary/10"
          : "border-border bg-surface hover:border-muted-foreground/40",
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="font-bold">{label}</p>
        {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      <span
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-full border",
          selected ? "border-primary bg-primary text-primary-foreground" : "border-border",
        )}
      >
        {selected ? <Check className="size-3.5" /> : null}
      </span>
    </button>
  );
}

export function OnboardingCTA({
  to,
  disabled,
  children,
}: {
  to: "/onboarding/level" | "/onboarding/skills" | "/home";
  disabled?: boolean;
  children: ReactNode;
}) {
  if (disabled) {
    return (
      <span className="flex min-h-13 w-full items-center justify-center rounded-xl bg-elevated text-sm font-bold text-muted-foreground">
        {children}
      </span>
    );
  }
  return (
    <Link
      to={to}
      className="flex min-h-13 w-full items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow"
    >
      {children}
    </Link>
  );
}
