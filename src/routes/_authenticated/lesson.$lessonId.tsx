import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Play, ShieldCheck } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/app-shell";
import { PremiumLock } from "@/components/premium-lock";
import { getLesson, getSkill } from "@/lib/data";

export const Route = createFileRoute("/lesson/$lessonId")({
  loader: ({ params }) => ({ lesson: getLesson(params.lessonId) }),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Lesson unavailable — Atlas" }, { name: "robots", content: "noindex" }] };
    }
    const { lesson } = loaderData;
    return {
      meta: [
        { title: `${lesson.title} — ${lesson.skillName} Lesson | Atlas` },
        { name: "description", content: lesson.objective },
        { property: "og:title", content: `${lesson.title} — ${lesson.skillName} Lesson` },
        { property: "og:description", content: lesson.objective },
      ],
    };
  },
  component: LessonPage,
});

function LessonPage() {
  const { lesson } = Route.useLoaderData();
  const skill = getSkill(lesson.skillId);
  const next = skill?.pathway.find((p) => p.index === lesson.stepIndex + 1);

  return (
    <AppShell>
      <Link
        to="/skills/$skillId/pathway"
        params={{ skillId: lesson.skillId }}
        className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> {lesson.skillName} Program
      </Link>

      {/* Video area */}
      {lesson.premium ? (
        <PremiumLock
          title="This lesson is premium"
          description="Unlock every lesson video, full pathways and progress tracking."
        >
          <VideoArea />
        </PremiumLock>
      ) : (
        <VideoArea />
      )}

      <p className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">
        {lesson.skillName} · Step {lesson.stepIndex} · {lesson.duration}
      </p>
      <h1 className="text-display mt-1 text-4xl font-bold">{lesson.title}</h1>

      <SectionTitle>Objective</SectionTitle>
      <p className="text-sm text-muted-foreground">{lesson.objective}</p>

      <SectionTitle>Prerequisites</SectionTitle>
      <ul className="space-y-2">
        {lesson.prerequisites.map((p) => (
          <li
            key={p}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm"
          >
            <ShieldCheck className="size-4 text-success" /> {p}
          </li>
        ))}
      </ul>

      <SectionTitle>Technique</SectionTitle>
      <ol className="space-y-3">
        {lesson.technique.map((t, i) => (
          <li key={t} className="flex gap-3 rounded-xl border border-border bg-surface p-4 text-sm">
            <span className="text-display shrink-0 text-lg font-bold text-primary">{i + 1}</span>
            <span className="text-muted-foreground">{t}</span>
          </li>
        ))}
      </ol>

      <SectionTitle>Common mistakes</SectionTitle>
      <ul className="space-y-2">
        {lesson.mistakes.map((m) => (
          <li
            key={m}
            className="flex gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-muted-foreground"
          >
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" /> {m}
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        <div className="surface-card p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Regression
          </p>
          <p className="mt-2 text-sm">{lesson.regression}</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Progression</p>
          <p className="mt-2 text-sm">{lesson.progression}</p>
        </div>
      </div>

      <SectionTitle>Prescription</SectionTitle>
      <div className="grid grid-cols-4 gap-2">
        {lesson.prescription.map((p) => (
          <div key={p.label} className="surface-card p-3 text-center">
            <p className="text-display text-lg font-bold">{p.value}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.label}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Safety notes</SectionTitle>
      <div className="rounded-xl border border-warning/30 bg-warning/5 p-4 text-sm text-muted-foreground">
        {lesson.safety}
      </div>

      <div className="mt-8 space-y-3">
        <button className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow">
          <Check className="size-4" /> Mark Complete
        </button>
        {next ? (
          <Link
            to="/lesson/$lessonId"
            params={{ lessonId: next.id }}
            className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface text-sm font-bold"
          >
            Next Lesson: {next.title} <ArrowRight className="size-4" />
          </Link>
        ) : null}
      </div>
    </AppShell>
  );
}

function VideoArea() {
  return (
    <div className="surface-card grid aspect-video place-items-center overflow-hidden bg-gradient-hero">
      <span className="grid size-16 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
        <Play className="size-7 fill-current" />
      </span>
    </div>
  );
}
