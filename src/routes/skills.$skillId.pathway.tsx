import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Lock, Play } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ProgressBar } from "@/components/progress-bar";
import { PersonalTrainingCTA } from "@/components/personal-training-cta";
import { getSkill, type PathwayStep } from "@/lib/data";
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

  return (
    <AppShell>
      <Link
        to="/skills/$skillId"
        params={{ skillId: skill.id }}
        className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> {skill.name}
      </Link>

      <h1 className="text-display text-4xl font-bold">{skill.name} Program</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {skill.steps} steps · ~{skill.estimatedWeeks} weeks
      </p>
      <ProgressBar value={skill.progress} className="mt-4" showLabel />

      <ol className="relative mt-8 space-y-3 border-l border-border pl-6">
        {skill.pathway.map((step) => (
          <StepRow key={step.id} step={step} />
        ))}
      </ol>

      <PersonalTrainingCTA variant="inline" className="mt-8" />
    </AppShell>
  );
}

function StepRow({ step }: { step: PathwayStep }) {
  const locked = step.state === "locked";
  const icon =
    step.state === "completed" ? (
      <Check className="size-3.5" />
    ) : locked ? (
      <Lock className="size-3.5" />
    ) : (
      <Play className="size-3 fill-current" />
    );

  const marker = (
    <span
      className={cn(
        "absolute -left-[31px] grid size-6 place-items-center rounded-full border-2 border-background",
        step.state === "completed" && "bg-success text-success-foreground",
        step.state === "current" && "bg-primary text-primary-foreground shadow-glow",
        locked && "bg-locked text-background",
      )}
    >
      {icon}
    </span>
  );

  const body = (
    <>
      {marker}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Step {step.index}
            {step.state === "current" ? " · Current" : locked ? " · Locked" : " · Completed"}
          </p>
          <h3 className="text-display mt-0.5 text-lg font-bold">{step.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{step.summary}</p>
        </div>
      </div>
    </>
  );

  const base = cn(
    "relative block rounded-2xl border p-4 transition-colors",
    step.state === "current"
      ? "border-primary/60 bg-primary/5"
      : "border-border bg-surface",
    locked && "opacity-60",
  );

  return (
    <li>
      {locked ? (
        <div className={base}>{body}</div>
      ) : (
        <Link to="/lesson/$lessonId" params={{ lessonId: step.id }} className={base}>
          {body}
        </Link>
      )}
    </li>
  );
}
