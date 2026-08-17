import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, Layers, ShieldCheck, Signal } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/app-shell";
import { ProgressBar } from "@/components/progress-bar";
import { PremiumBadge } from "@/components/premium-lock";
import { PersonalTrainingCTA } from "@/components/personal-training-cta";
import { getSkill } from "@/lib/data";
import { skillQuery, useSkillProgress } from "@/lib/queries";

export const Route = createFileRoute("/skills/$skillId/")({
  loader: ({ params }) => {
    const skill = getSkill(params.skillId);
    if (!skill) throw notFound();
    return { skill };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Skill unavailable — Atlas" }, { name: "robots", content: "noindex" }] };
    }
    const { skill } = loaderData;
    return {
      meta: [
        { title: `${skill.name} Pathway — Atlas Calisthenics` },
        { name: "description", content: skill.description },
        { property: "og:title", content: `${skill.name} Pathway — Atlas Calisthenics` },
        { property: "og:description", content: skill.description },
      ],
    };
  },
  component: SkillDetail,
});

function SkillDetail() {
  const { skill: meta } = Route.useLoaderData();
  const { skillId } = Route.useParams();
  const { data: dbSkill } = useQuery(skillQuery(skillId));
  const { progressFor } = useSkillProgress();
  const progress = progressFor(skillId);

  const name = dbSkill?.name ?? meta.name;
  const description = dbSkill?.description ?? meta.description;
  const difficulty = dbSkill?.difficulty ?? meta.difficulty;
  const category = dbSkill?.category ?? meta.category;

  return (
    <AppShell>
      <Link
        to="/skills"
        className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> Skills
      </Link>

      <div className="surface-card overflow-hidden">
        <div className="grid aspect-[16/9] place-items-center bg-gradient-hero">
          <span className="text-display text-6xl font-bold text-primary/70">
            {name.toUpperCase()}
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2">
            <h1 className="text-display text-4xl font-bold">{name}</h1>
            {meta.premium ? <PremiumBadge /> : null}
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {category} · {difficulty}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{description}</p>
          <ProgressBar value={progress.percent} className="mt-5" showLabel />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <Meta icon={<Signal className="size-4" />} label="Difficulty" value={difficulty} />
        <Meta icon={<Layers className="size-4" />} label="Steps" value={`${progress.total}`} />
        <Meta icon={<Clock className="size-4" />} label="Pathway" value={`~${meta.estimatedWeeks} wks`} />
      </div>

      <SectionTitle>Prerequisites</SectionTitle>
      {meta.prerequisites.length ? (
        <ul className="space-y-2">
          {meta.prerequisites.map((p) => (
            <li
              key={p}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm"
            >
              <ShieldCheck className="size-4 text-success" /> {p}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">None — this is a true entry point.</p>
      )}

      <SectionTitle>Pathway</SectionTitle>
      <p className="text-sm text-muted-foreground">
        {progress.total} ordered steps, each with a video lesson, technique breakdown and a standard
        to hit before progressing.
      </p>

      <Link
        to="/skills/$skillId/pathway"
        params={{ skillId }}
        className="mt-6 flex min-h-13 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow"
      >
        {progress.done > 0 ? "Continue Pathway" : "Start Pathway"}
      </Link>

      <PersonalTrainingCTA variant="inline" className="mt-8" />
    </AppShell>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="surface-card p-4">
      <span className="grid size-8 place-items-center rounded-full bg-primary/15 text-primary">
        {icon}
      </span>
      <p className="mt-2 text-sm font-bold">{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
