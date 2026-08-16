import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Flame, Play, TrendingUp } from "lucide-react";
import { AppShell, PageHeader, SectionTitle } from "@/components/app-shell";
import { ProgressBar, ProgressRing } from "@/components/progress-bar";
import { PersonalTrainingCTA } from "@/components/personal-training-cta";
import { recentLessons, skills } from "@/lib/data";

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
  const current = skills[0]!;
  const active = skills.filter((s) => s.progress > 0 && s.progress < 100);
  const nextStep = current.pathway.find((p) => p.state === "current");

  return (
    <AppShell>
      <PageHeader eyebrow="Saturday · Week 6" title="What's next" subtitle="One session. One clear focus." />

      {/* Today's recommended lesson */}
      <Link
        to="/lesson/$lessonId"
        params={{ lessonId: nextStep?.id ?? "pull-up-step-5" }}
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
            {current.name} · Step {nextStep?.index} of {current.steps}
          </p>
          <h2 className="text-display mt-1 text-2xl font-bold">{nextStep?.title}</h2>
          <ProgressBar value={current.progress} className="mt-4" showLabel />
          <span className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground">
            Continue Learning
          </span>
        </div>
      </Link>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Stat icon={<Flame className="size-4" />} value="12" label="Day streak" />
        <Stat icon={<Calendar className="size-4" />} value="3/4" label="This week" />
        <Stat icon={<TrendingUp className="size-4" />} value="18" label="Lessons done" />
      </div>

      {/* Current program */}
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
        <ProgressRing value={current.progress} caption="Pathway" />
        <div className="min-w-0">
          <h3 className="text-display text-xl font-bold">{current.name} Program</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {current.pathway.filter((p) => p.state === "completed").length} of {current.steps} steps
            complete · ~{current.estimatedWeeks} week plan
          </p>
        </div>
      </div>

      {/* Skill progress */}
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
        {active.map((s) => (
          <Link
            key={s.id}
            to="/skills/$skillId"
            params={{ skillId: s.id }}
            className="surface-card block p-4"
          >
            <div className="flex items-center justify-between">
              <p className="font-bold">{s.name}</p>
              <span className="text-xs font-bold text-primary">{s.progress}%</span>
            </div>
            <ProgressBar value={s.progress} className="mt-2" />
          </Link>
        ))}
      </div>

      {/* Recommended next progression */}
      <SectionTitle>Recommended next progression</SectionTitle>
      <div className="surface-card p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Up next</p>
        <h3 className="text-display mt-1 text-xl font-bold">Weighted Pull-up</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You're two clean sessions away from unlocking added load. Hit 8 strict reps first.
        </p>
      </div>

      {/* Recently completed */}
      <SectionTitle>Recently completed</SectionTitle>
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

      {/* 1-on-1 */}
      <SectionTitle>Train with me</SectionTitle>
      <PersonalTrainingCTA />
    </AppShell>
  );
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
