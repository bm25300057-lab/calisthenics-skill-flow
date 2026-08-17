import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader, SectionTitle } from "@/components/app-shell";
import { ProgressBar, ProgressRing } from "@/components/progress-bar";
import { achievementsQuery, progressQuery, skillsQuery, useSkillProgress } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/progress")({
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

const weekLabels = ["M", "T", "W", "T", "F", "S", "S"];

function ProgressPage() {
  const { data: skills = [] } = useQuery(skillsQuery);
  const { data: achievements = [] } = useQuery(achievementsQuery);
  const { data: progressRows = [] } = useQuery(progressQuery);
  const { lessons, progressFor } = useSkillProgress();

  const overall = skills.length
    ? Math.round(skills.reduce((a, s) => a + progressFor(s.id).percent, 0) / skills.length)
    : 0;
  const earned = achievements.filter((a) => a.earned).length;

  const days = new Set(
    progressRows.filter((r) => r.completed_at).map((r) => r.completed_at!.slice(0, 10)),
  );
  let streak = 0;
  const cursor = new Date();
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const monday = new Date();
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  const weekDone = weekLabels.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return days.has(d.toISOString().slice(0, 10));
  });

  const recent = progressRows
    .slice()
    .sort((a, b) => (b.completed_at ?? "").localeCompare(a.completed_at ?? ""))
    .slice(0, 5);

  return (
    <AppShell>
      <PageHeader eyebrow="Tracking" title="Progress" subtitle="Consistency is the whole method." />

      <div className="surface-card flex items-center gap-5 p-5">
        <ProgressRing value={overall} size={110} caption="Overall" />
        <div className="space-y-1 text-sm">
          <p>
            <span className="text-display text-2xl font-bold">{streak}</span>{" "}
            <span className="text-muted-foreground">day streak</span>
          </p>
          <p>
            <span className="text-display text-2xl font-bold">{progressRows.length}</span>{" "}
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
        {weekLabels.map((d, i) => (
          <div key={`${d}-${i}`} className="text-center">
            <div
              className={cn(
                "grid size-9 place-items-center rounded-full text-xs font-bold",
                weekDone[i]
                  ? "bg-gradient-primary text-primary-foreground"
                  : "bg-elevated text-muted-foreground",
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
              <span className="text-xs font-bold text-primary">{progressFor(s.id).percent}%</span>
            </div>
            <ProgressBar value={progressFor(s.id).percent} className="mt-2" />
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
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">No lessons completed yet.</p>
        ) : (
          recent.map((r) => {
            const lesson = lessons.find((l) => l.id === r.lesson_id);
            return (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3"
              >
                <div>
                  <p className="text-sm font-bold">{lesson?.title ?? "Lesson"}</p>
                  <p className="text-xs text-muted-foreground">{lesson?.skillName}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {r.completed_at ? new Date(r.completed_at).toLocaleDateString() : ""}
                </span>
              </div>
            );
          })
        )}
      </div>
    </AppShell>
  );
}
