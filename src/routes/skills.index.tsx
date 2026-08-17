import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { SkillCard } from "@/components/skill-card";
import { PersonalTrainingCTA } from "@/components/personal-training-cta";
import { categories, getSkill, type SkillCategory } from "@/lib/data";
import { skillMeta, skillsQuery, useSkillProgress } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/skills/")({
  head: () => ({
    meta: [
      { title: "Skill Library — Atlas Calisthenics" },
      {
        name: "description",
        content:
          "Browse every calisthenics skill pathway: pull-up, dip, push-up, handstand, muscle-up, HSPU, front lever and planche.",
      },
      { property: "og:title", content: "Skill Library — Atlas Calisthenics" },
      { property: "og:description", content: "Every skill pathway, from push-up to full planche." },
    ],
  }),
  component: SkillLibrary,
});

function SkillLibrary() {
  const [tab, setTab] = useState<SkillCategory | "All">("All");
  const { data: skills = [], isLoading } = useQuery(skillsQuery);
  const { progressFor } = useSkillProgress();

  const visible = tab === "All" ? skills : skills.filter((s) => s.category === tab);

  return (
    <AppShell>
      <PageHeader eyebrow="Library" title="Skills" subtitle="Ten skills. Each one a full pathway." />

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setTab(c)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors",
              tab === c
                ? "border-primary bg-primary/15 text-primary"
                : "border-border bg-surface text-muted-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading skills…</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {visible.map((s) => (
            <SkillCard
              key={s.id}
              skill={{
                id: s.id,
                name: s.name,
                difficulty: s.difficulty,
                steps: skillMeta(s.id).steps,
                estimatedWeeks: skillMeta(s.id).estimatedWeeks,
                progress: progressFor(s.id).percent,
                premium: getSkill(s.id)?.premium ?? false,
              }}
            />
          ))}
        </div>
      )}

      <PersonalTrainingCTA variant="inline" className="mt-8" />
    </AppShell>
  );
}
