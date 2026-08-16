import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingCTA, OnboardingLayout, SelectTile } from "@/components/onboarding-layout";
import { goals } from "@/lib/data";

export const Route = createFileRoute("/onboarding/goals")({
  head: () => ({
    meta: [
      { title: "Choose Your Goal — Atlas Calisthenics" },
      { name: "description", content: "Pick the calisthenics goals your training should be built around." },
      { property: "og:title", content: "Choose Your Goal — Atlas Calisthenics" },
      { property: "og:description", content: "Tell us what you want to achieve and we build the pathway." },
    ],
  }),
  component: GoalsPage,
});

function GoalsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));

  return (
    <OnboardingLayout
      step={1}
      total={3}
      title="What are you training for?"
      subtitle="Pick one or more. You can change this any time."
      cta={
        <OnboardingCTA to="/onboarding/level" disabled={selected.length === 0}>
          {selected.length === 0 ? "Select a goal" : "Continue"}
        </OnboardingCTA>
      }
    >
      {goals.map((g) => (
        <SelectTile
          key={g.id}
          label={g.label}
          hint={g.hint}
          selected={selected.includes(g.id)}
          onClick={() => toggle(g.id)}
        />
      ))}
    </OnboardingLayout>
  );
}
