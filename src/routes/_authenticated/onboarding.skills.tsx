import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingCTA, OnboardingLayout, SelectTile } from "@/components/onboarding-layout";
import { skills } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/onboarding/skills")({
  head: () => ({
    meta: [
      { title: "Pick Your First Skill — Atlas Calisthenics" },
      { name: "description", content: "Choose the calisthenics skills you want to unlock first." },
      { property: "og:title", content: "Pick Your First Skill — Atlas Calisthenics" },
      { property: "og:description", content: "Choose the skills you want to unlock first." },
    ],
  }),
  component: SkillsOnboarding,
});

function SkillsOnboarding() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  return (
    <OnboardingLayout
      step={3}
      total={3}
      title="Which skills first?"
      subtitle="Choose up to three. Everything else stays in your library."
      cta={
        <OnboardingCTA to="/home" disabled={selected.length === 0}>
          {selected.length === 0 ? "Select a skill" : "Build my pathway"}
        </OnboardingCTA>
      }
    >
      {skills.map((s) => (
        <SelectTile
          key={s.id}
          label={s.name}
          hint={`${s.category} · ${s.difficulty} · ${s.steps} steps`}
          selected={selected.includes(s.id)}
          onClick={() => toggle(s.id)}
        />
      ))}
    </OnboardingLayout>
  );
}
