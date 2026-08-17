import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, Lock, Play } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ProgressBar } from "@/components/progress-bar";
import { PersonalTrainingCTA } from "@/components/personal-training-cta";
import { getSkill } from "@/lib/data";
import { programQuery, useSkillProgress } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/skills/$skillId/pathway")({
  loader: ({ params }) => {
    const skill = getSkill(params.skillId);
    if (!skill) throw notFound();
    return { skill };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Pathway unavailable — Atlas" }, { name: "robots", content: "noindex" }] };
    }
    const { skill } = loaderData;
    const description = `The ${skill.name} program: ${skill.steps} ordered steps over roughly ${skill.estimatedWeeks} weeks.`;
    return {
      meta: [
        { title: `${skill.name} Program — Atlas Calisthenics` },
        { name: "description", content: description },
        { property: "og:title", content: `${skill.name} Program — Atlas Calisthenics` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PathwayPage,
});

function PathwayPage() {
  const { skill } = Route.useLoaderData();
  const { skillId } = Route.useParams();
  const { data: program } = useQuery(programQuery(skillId));
  const { completed, progressFor } = useSkillProgress();
  const progress = progressFor(skillId);

  const lessons = program?.lessons ?? [];
  const nextId = progress.next?.id;

  return (
    <AppShell>
      <Link
        to="/skills/$skillId"
        params={{ skillId }}
        className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> {skill.name}
      </Link>

      <h1 className="text-display text-4xl font-bold">{skill.name} Program</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {progress.total} steps · ~{skill.estimatedWeeks} weeks
      </p>
      <ProgressBar value={progress.percent} className="mt-4" showLabel />

      <ol className="relative mt-8 space-y-3 border-l border-border pl-6">
        {lessons.map((lesson) => {
          const state: "completed" | "current" | "locked" = completed.has(lesson.id)
            ? "completed"
            : lesson.id === nextId
              ? "current"
              : "locked";
          return (
            <StepRow
              key={lesson.id}
              id={lesson.id}
              index={lesson.order}
              title={lesson.title}
              summary={lesson.description ?? "Technique focus, prescribed volume and quality standards."}
              state={state}
              premium={!lesson.is_free}
            />
          );
        })}
        {lessons.length === 0 ? (
          <li className="text-sm text-muted-foreground">
            Premium steps in this pathway unlock with a subscription.
          </li>
        ) : null}
      </ol>

      <PersonalTrainingCTA variant="inline" className="mt-8" />
    </AppShell>
  );
}

function StepRow({
  id,
  index,
  title,
  summary,
  state,
  premium,
}: {
  id: string;
  index: number;
  title: string;
  summary: string;
  state: "completed" | "current" | "locked";
  premium: boolean;
}) {
  const icon =
    state === "completed" ? (
      <Check className="size-3.5" />
    ) : state === "locked" ? (
      <Lock className="size-3.5" />
    ) : (
      <Play className="size-3 fill-current" />
    );

  return (
    <li>
      <Link
        to="/lesson/$lessonId"
        params={{ lessonId: id }}
        className={cn(
          "relative block rounded-2xl border p-4 transition-colors",
          state === "current"
            ? "border-primary bg-primary/5"
            : "border-border bg-surface hover:border-muted-foreground/40",
        )}
      >
        <span
          className={cn(
            "absolute -left-[31px] grid size-6 place-items-center rounded-full border-2 border-background",
            state === "completed" && "bg-success text-success-foreground",
            state === "current" && "bg-primary text-primary-foreground shadow-glow",
            state === "locked" && "bg-locked text-background",
          )}
        >
          {icon}
        </span>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Step {index}
          {state === "current" ? " · Current" : state === "completed" ? " · Completed" : ""}
          {premium ? " · Premium" : ""}
        </p>
        <h3 className="text-display mt-0.5 text-lg font-bold">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{summary}</p>
      </Link>
    </li>
  );
}
