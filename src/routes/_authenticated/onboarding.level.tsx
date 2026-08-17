import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingCTA, OnboardingLayout, SelectTile } from "@/components/onboarding-layout";
import { levels } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";

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
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const next = async () => {
    if (!selected) return;
    setBusy(true);
    const { data: auth } = await supabase.auth.getUser();
    if (auth.user) {
      await supabase.from("profiles").update({ current_level: selected }).eq("id", auth.user.id);
    }
    setBusy(false);
    void navigate({ to: "/onboarding/skills" });
  };

  return (
    <OnboardingLayout
      step={2}
      total={3}
      title="Where are you now?"
      subtitle="Be honest — we start you at the right step, not the flattering one."
      cta={
        <OnboardingCTA onClick={() => void next()} disabled={!selected || busy}>
          {selected ? (busy ? "Saving…" : "Continue") : "Select your level"}
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
