import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Flame, Play, TrendingUp } from "lucide-react";
import { AppShell, PageHeader, SectionTitle } from "@/components/app-shell";
import { ProgressBar, ProgressRing } from "@/components/progress-bar";
import { PersonalTrainingCTA } from "@/components/personal-training-cta";
import {
  goalsQuery,
  profileQuery,
  progressQuery,
  skillMeta,
  skillsQuery,
  useSkillProgress,
} from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({
    meta: [
      { title: "Your Training Home — Atlas Calisthenics" },
      {
        name: "description",
        content: "See what to do next: today's lesson, your current program, streak and skill progress.",
      },
      { property: "og:title", content: "Your Training Home — Atlas Calisthenics" },
      { property: "og:description", content: "Today's lesson, your program and your skill progress." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data: skills = [] } = useQuery(skillsQuery);
  const { data: goals = [] } = useQuery(goalsQuery);
  const { data: profile } = useQuery(profileQuery);
  const { data: progressRows = [] } = useQuery(progressQuery);
  const { lessons, completed, progressFor } = useSkillProgress();

  const goalIds = new Set(goals.map((g) => g.skill_id));
  const current = skills.find((s) => goalIds.has(s.id)) ?? skills[0];
  const currentProgress = current ? progressFor(current.id) : null;

  const active = skills.filter((s) => {
    const p = progressFor(s.id);
    return p.done > 0 && p.percent < 100;
  });

  const recent = progressRows
    .slice()
    .sort((a, b) => (b.completed_at ?? "").localeCompare(a.completed_at ?? ""))
    .slice(0, 3)
    .map((p) => lessons.find((l) => l.id === p.lesson_id))
    .filter(Boolean);

  const firstName = profile?.name?.split(" ")[0];

  return (
    <AppShell>
      <PageHeader
        eyebrow={firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        title="What's next"
        subtitle="One session. One clear focus."
      />

      {current && currentProgress?.next ? (
        <Link
          to="/lesson/$lessonId"
          params={{ lessonId: currentProgress.next.id }}
          className="surface-card block overflow-hidden"
        >
          <div className="relative grid aspect-video place-items-center bg-gradient-hero">
            <span className="grid size-16 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
              <Play className="size-7 fill-current" />
            </span>
            <span className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Today's lesson
            </span>
          </div>
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {current.name} · Step {currentProgress.next.order} of {currentProgress.total}
            </p>
            <h2 className="text-display mt-1 text-2xl font-bold">{currentProgress.next.title}</h2>
            <ProgressBar value={currentProgress.percent} className="mt-4" showLabel />
            <span className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground">
              Continue Learning
            </span>
          </div>
        </Link>
      ) : (
        <div className="surface-card p-5">
          <h2 className="text-display text-xl font-bold">Pick your first skill</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a pathway from the skill library and your next lesson shows up here.
          </p>
          <Link
            to="/skills"
            className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground"
          >
            Browse skills
          </Link>
        </div>
      )}

      <div className="mt-4 grid grid-cols-3 gap-3">
        <Stat icon={<Flame className="size-4" />} value={String(streak(progressRows))} label="Day streak" />
        <Stat icon={<Calendar className="size-4" />} value={String(thisWeek(progressRows))} label="This week" />
        <Stat icon={<TrendingUp className="size-4" />} value={String(completed.size)} label="Lessons done" />
      </div>

      {current ? (
        <>
          <SectionTitle
            action={
              <Link
                to="/skills/$skillId/pathway"
                params={{ skillId: current.id }}
                className="text-xs font-bold text-primary"
              >
                View pathway
              </Link>
            }
          >
            Current program
          </SectionTitle>
          <div className="surface-card flex items-center gap-4 p-5">
            <ProgressRing value={currentProgress?.percent ?? 0} caption="Pathway" />
            <div className="min-w-0">
              <h3 className="text-display text-xl font-bold">{current.name} Program</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {currentProgress?.done ?? 0} of {currentProgress?.total ?? 0} steps complete · ~
                {skillMeta(current.id).estimatedWeeks} week plan
              </p>
            </div>
          </div>
        </>
      ) : null}

      <SectionTitle
        action={
          <Link to="/skills" className="text-xs font-bold text-primary">
            All skills
          </Link>
        }
      >
        Skill progress
      </SectionTitle>
      <div className="space-y-3">
        {active.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Complete a lesson and your skill progress appears here.
          </p>
        ) : (
          active.map((s) => (
            <Link
              key={s.id}
              to="/skills/$skillId"
              params={{ skillId: s.id }}
              className="surface-card block p-4"
            >
              <div className="flex items-center justify-between">
                <p className="font-bold">{s.name}</p>
                <span className="text-xs font-bold text-primary">{progressFor(s.id).percent}%</span>
              </div>
              <ProgressBar value={progressFor(s.id).percent} className="mt-2" />
            </Link>
          ))
        )}
      </div>

      <SectionTitle>Recently completed</SectionTitle>
      <div className="space-y-2">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing logged yet — start your first lesson.</p>
        ) : (
          recent.map((l) => (
            <div
              key={l!.id}
              className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3"
            >
              <div>
                <p className="text-sm font-bold">{l!.title}</p>
                <p className="text-xs text-muted-foreground">{l!.skillName}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <SectionTitle>Train with me</SectionTitle>
      <PersonalTrainingCTA />
    </AppShell>
  );
}

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

function streak(rows: { completed_at: string | null }[]) {
  const days = new Set(rows.filter((r) => r.completed_at).map((r) => dayKey(r.completed_at!)));
  let count = 0;
  const cursor = new Date();
  while (days.has(cursor.toISOString().slice(0, 10))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

function thisWeek(rows: { completed_at: string | null }[]) {
  const since = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return rows.filter((r) => r.completed_at && new Date(r.completed_at).getTime() >= since).length;
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="surface-card p-4 text-center">
      <span className="mx-auto grid size-8 place-items-center rounded-full bg-primary/15 text-primary">
        {icon}
      </span>
      <p className="text-display mt-2 text-2xl font-bold">{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
