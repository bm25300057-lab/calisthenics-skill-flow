import { createFileRoute } from "@tanstack/react-router";
import { Lock, Trophy } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { achievements } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Atlas Calisthenics" },
      { name: "description", content: "Milestones you've earned on your calisthenics skill pathways." },
      { property: "og:title", content: "Achievements — Atlas Calisthenics" },
      { property: "og:description", content: "Milestones earned across your skill pathways." },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const earned = achievements.filter((a) => a.earned).length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Milestones"
        title="Achievements"
        subtitle={`${earned} of ${achievements.length} unlocked`}
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={cn("surface-card p-4 text-center", !a.earned && "opacity-50")}
          >
            <span
              className={cn(
                "mx-auto grid size-12 place-items-center rounded-full",
                a.earned ? "bg-primary/15 text-primary" : "bg-elevated text-locked",
              )}
            >
              {a.earned ? <Trophy className="size-5" /> : <Lock className="size-5" />}
            </span>
            <p className="text-display mt-3 text-base font-bold">{a.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
