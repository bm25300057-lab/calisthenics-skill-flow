import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, SectionTitle } from "@/components/app-shell";
import { ProgressBar, ProgressRing } from "@/components/progress-bar";
import { achievements, recentLessons, skills } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Your Progress — Atlas Calisthenics" },
      {
        name: "description",
        content: "Track your streak, weekly consistency, skill completion and recent lessons.",
      },
      { property: "og:title", content: "Your Progress — Atlas Calisthenics" },
      { property: "og:description", content: "Streaks, consistency and skill completion at a glance." },
    ],
  }),
  component: ProgressPage,
});

const week = ["M", "T", "W", "T", "F", "S", "S"];
const done = [true, true, false, true, true, false, false];

function ProgressPage() {
  const overall = Math.round(skills.reduce((a, s) => a + s.progress, 0) / skills.length);
  const earned = achievements.filter((a) => a.earned).length;

  return (
    <AppShell>
      <PageHeader eyebrow="Tracking" title="Progress" subtitle="Consistency is the whole method." />

      <div className="surface-card flex items-center gap-5 p-5">
        <ProgressRing value={overall} size={110} caption="Overall" />
        <div className="space-y-1 text-sm">
          <p>
            <span className="text-display text-2xl font-bold">12</span>{" "}
            <span className="text-muted-foreground">day streak</span>
          </p>
          <p>
            <span className="text-display text-2xl font-bold">18</span>{" "}
            <span className="text-muted-foreground">lessons completed</span>
          </p>
          <p>
            <span className="text-display text-2xl font-bold">{earned}</span>{" "}
            <span className="text-muted-foreground">achievements</span>
          </p>
        </div>
      </div>

      <SectionTitle>This week</SectionTitle>
      <div className="surface-card flex justify-between p-5">
        {week.map((d, i) => (
          <div key={`${d}-${i}`} className="text-center">
            <div
              className={cn(
                "grid size-9 place-items-center rounded-full text-xs font-bold",
                done[i] ? "bg-gradient-primary text-primary-foreground" : "bg-elevated text-muted-foreground",
              )}
            >
              {d}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Skill completion</SectionTitle>
      <div className="space-y-3">
        {skills.map((s) => (
          <div key={s.id} className="surface-card p-4">
            <div className="flex items-center justify-between">
              <p className="font-bold">{s.name}</p>
              <span className="text-xs font-bold text-primary">{s.progress}%</span>
            </div>
            <ProgressBar value={s.progress} className="mt-2" />
          </div>
        ))}
      </div>

      <SectionTitle
        action={
          <Link to="/achievements" className="text-xs font-bold text-primary">
            View all
          </Link>
        }
      >
        Achievements
      </SectionTitle>
      <div className="grid grid-cols-4 gap-3">
        {achievements.slice(0, 4).map((a) => (
          <div
            key={a.id}
            className={cn(
              "surface-card grid aspect-square place-items-center p-2 text-center text-[10px] font-bold",
              !a.earned && "opacity-40",
            )}
          >
            {a.name}
          </div>
        ))}
      </div>

      <SectionTitle>Recent activity</SectionTitle>
      <div className="space-y-2">
        {recentLessons.map((l) => (
          <div
            key={l.id}
            className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3"
          >
            <div>
              <p className="text-sm font-bold">{l.title}</p>
              <p className="text-xs text-muted-foreground">{l.skill}</p>
            </div>
            <span className="text-xs text-muted-foreground">{l.when}</span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
