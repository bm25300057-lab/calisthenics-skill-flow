import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingCTA, OnboardingLayout, SelectTile } from "@/components/onboarding-layout";
import { levels } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/onboarding/level")({
  head: () => ({
    meta: [
      { title: "Your Current Level — Atlas Calisthenics" },
      { name: "description", content: "Set your current calisthenics level so pathways start in the right place." },
      { property: "og:title", content: "Your Current Level — Atlas Calisthenics" },
      { property: "og:description", content: "Start your pathway at the right step." },
    ],
  }),
  component: LevelPage,
});

function LevelPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingLayout
      step={2}
      total={3}
      title="Where are you now?"
      subtitle="Be honest — we start you at the right step, not the flattering one."
      cta={
        <OnboardingCTA to="/onboarding/skills" disabled={!selected}>
          {selected ? "Continue" : "Select your level"}
        </OnboardingCTA>
      }
    >
      {levels.map((l) => (
        <SelectTile
          key={l.id}
          label={l.label}
          hint={l.hint}
          selected={selected === l.id}
          onClick={() => setSelected(l.id)}
        />
      ))}
    </OnboardingLayout>
  );
}
