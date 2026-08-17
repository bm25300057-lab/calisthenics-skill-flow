import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { OnboardingCTA, OnboardingLayout, SelectTile } from "@/components/onboarding-layout";
import { supabase } from "@/integrations/supabase/client";
import { skillMeta, skillsQuery } from "@/lib/queries";

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
  const navigate = useNavigate();
  const { data: skills = [] } = useQuery(skillsQuery);
  const [selected, setSelected] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const finish = async () => {
    setBusy(true);
    const { data: auth } = await supabase.auth.getUser();
    if (auth.user) {
      const goalsRaw =
        typeof window !== "undefined"
          ? window.sessionStorage.getItem("atlas-onboarding-goals")
          : null;
      const goalIds: string[] = goalsRaw ? (JSON.parse(goalsRaw) as string[]) : [];
      const skillIds = Array.from(new Set([...selected, ...goalIds.filter((g) => skills.some((s) => s.id === g))]));
      await supabase.from("user_goals").delete().eq("user_id", auth.user.id);
      if (skillIds.length) {
        await supabase
          .from("user_goals")
          .insert(skillIds.map((skill_id) => ({ user_id: auth.user!.id, skill_id })));
      }
    }
    setBusy(false);
    void navigate({ to: "/home", replace: true });
  };

  return (
    <OnboardingLayout
      step={3}
      total={3}
      title="Which skills first?"
      subtitle="Choose up to three. Everything else stays in your library."
      cta={
        <OnboardingCTA onClick={() => void finish()} disabled={selected.length === 0 || busy}>
          {selected.length === 0 ? "Select a skill" : busy ? "Saving…" : "Build my pathway"}
        </OnboardingCTA>
      }
    >
      {skills.map((s) => (
        <SelectTile
          key={s.id}
          label={s.name}
          hint={`${s.category} · ${s.difficulty} · ${skillMeta(s.id).steps} steps`}
          selected={selected.includes(s.id)}
          onClick={() => toggle(s.id)}
        />
      ))}
    </OnboardingLayout>
  );
}
