import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Play, ShieldCheck } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/app-shell";
import { PremiumLock } from "@/components/premium-lock";
import { getLesson } from "@/lib/data";
import { lessonQuery, useSkillProgress, useToggleLessonComplete } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/lesson/$lessonId")({
  head: () => ({
    meta: [
      { title: "Lesson — Atlas Calisthenics" },
      { name: "description", content: "Video lesson, technique breakdown and the standard to hit before progressing." },
      { property: "og:title", content: "Lesson — Atlas Calisthenics" },
      { property: "og:description", content: "Technique, common mistakes and prescribed volume." },
    ],
  }),
  component: LessonPage,
});

function LessonPage() {
  const { lessonId } = Route.useParams();
  const { data: dbLesson, isLoading } = useQuery(lessonQuery(lessonId));
  const { lessons, completed, bySkill } = useSkillProgress();
  const toggle = useToggleLessonComplete();

  const flat = lessons.find((l) => l.id === lessonId);
  const skillId = dbLesson?.programs?.skill_id ?? flat?.skillId ?? "";
  const skillName = dbLesson?.programs?.skills?.name ?? flat?.skillName ?? "Skill";
  const template = getLesson(`${skillId}-step-${dbLesson?.order ?? flat?.order ?? 1}`);
  const isCompleted = completed.has(lessonId);

  const siblings = (bySkill.get(skillId) ?? []).slice().sort((a, b) => a.order - b.order);
  const next = siblings.find((l) => l.order === (dbLesson?.order ?? flat?.order ?? 0) + 1);

  const locked = !isLoading && !dbLesson;

  if (locked) {
    return (
      <AppShell>
        <Link
          to="/skills"
          className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> Skills
        </Link>
        <PremiumLock
          title="This lesson is premium"
          description="Unlock every lesson video, full pathways and progress tracking."
        >
          <VideoArea />
        </PremiumLock>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Link
        to="/skills/$skillId/pathway"
        params={{ skillId }}
        className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> {skillName} Program
      </Link>

      <VideoArea />

      <p className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">
        {skillName} · Step {dbLesson?.order ?? ""}
        {dbLesson?.duration ? ` · ${dbLesson.duration} min` : ""}
      </p>
      <h1 className="text-display mt-1 text-4xl font-bold">{dbLesson?.title ?? "Lesson"}</h1>

      <SectionTitle>Objective</SectionTitle>
      <p className="text-sm text-muted-foreground">{dbLesson?.description ?? template.objective}</p>

      <SectionTitle>Prerequisites</SectionTitle>
      <ul className="space-y-2">
        {template.prerequisites.map((p) => (
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
        {template.technique.map((t, i) => (
          <li key={t} className="flex gap-3 rounded-xl border border-border bg-surface p-4 text-sm">
            <span className="text-display shrink-0 text-lg font-bold text-primary">{i + 1}</span>
            <span className="text-muted-foreground">{t}</span>
          </li>
        ))}
      </ol>

      <SectionTitle>Common mistakes</SectionTitle>
      <ul className="space-y-2">
        {template.mistakes.map((m) => (
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
          <p className="mt-2 text-sm">{template.regression}</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Progression</p>
          <p className="mt-2 text-sm">{template.progression}</p>
        </div>
      </div>

      <SectionTitle>Prescription</SectionTitle>
      <div className="grid grid-cols-4 gap-2">
        {template.prescription.map((p) => (
          <div key={p.label} className="surface-card p-3 text-center">
            <p className="text-display text-lg font-bold">{p.value}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.label}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Safety notes</SectionTitle>
      <div className="rounded-xl border border-warning/30 bg-warning/5 p-4 text-sm text-muted-foreground">
        {template.safety}
      </div>

      <div className="mt-8 space-y-3">
        <button
          onClick={() => toggle.mutate({ lessonId, completed: !isCompleted })}
          disabled={toggle.isPending}
          className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow disabled:opacity-60"
        >
          <Check className="size-4" /> {isCompleted ? "Completed — undo" : "Mark Complete"}
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
