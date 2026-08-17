import { Link } from "@tanstack/react-router";
import { ChevronRight, Lock } from "lucide-react";
import { ProgressBar } from "@/components/progress-bar";
import { PremiumBadge } from "@/components/premium-lock";

export function SkillCard({
  skill,
}: {
  skill: {
    id: string;
    name: string;
    difficulty: string;
    steps: number;
    estimatedWeeks: number;
    progress: number;
    premium?: boolean;
  };
}) {
  return (
    <Link
      to="/skills/$skillId"
      params={{ skillId: skill.id }}
      className="surface-card group flex items-center gap-4 p-4 transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-elevated text-display text-lg font-bold text-primary">
        {skill.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-display truncate text-lg font-bold">{skill.name}</h3>
          {skill.premium ? <PremiumBadge /> : null}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {skill.difficulty} · {skill.steps} steps · ~{skill.estimatedWeeks} weeks
        </p>
        <ProgressBar value={skill.progress} className="mt-2" />
      </div>
      {skill.premium && skill.progress === 0 ? (
        <Lock className="size-4 shrink-0 text-locked" />
      ) : (
        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
