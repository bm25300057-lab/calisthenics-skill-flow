import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, Cog, CreditCard, LogOut, ShieldCheck, Trophy } from "lucide-react";
import { AppShell, PageHeader, SectionTitle } from "@/components/app-shell";
import { PersonalTrainingCTA } from "@/components/personal-training-cta";
import { PremiumBadge } from "@/components/premium-lock";
import { supabase } from "@/integrations/supabase/client";
import {
  achievementsQuery,
  isAdminQuery,
  profileQuery,
  progressQuery,
  subscriptionQuery,
  useCompletedLessonIds,
} from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — Atlas Calisthenics" },
      { name: "description", content: "Manage your training profile, plan, achievements and settings." },
      { property: "og:title", content: "Your Profile — Atlas Calisthenics" },
      { property: "og:description", content: "Your training profile, plan and settings." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: profile } = useQuery(profileQuery);
  const { data: subscription } = useQuery(subscriptionQuery);
  const { data: isAdmin } = useQuery(isAdminQuery);
  const { data: achievements = [] } = useQuery(achievementsQuery);
  const { data: progressRows = [] } = useQuery(progressQuery);
  const completed = useCompletedLessonIds();

  const isActive = subscription?.status === "active";
  const badges = achievements.filter((a) => a.earned).length;
  const days = new Set(
    progressRows.filter((r) => r.completed_at).map((r) => r.completed_at!.slice(0, 10)),
  );
  let streak = 0;
  const cursor = new Date();
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/login", replace: true });
  };

  const name = profile?.name ?? "Athlete";

  return (
    <AppShell>
      <PageHeader eyebrow="Account" title="Profile" />

      <div className="surface-card flex items-center gap-4 p-5">
        <div className="text-display grid size-16 place-items-center rounded-full bg-gradient-primary text-2xl font-bold text-primary-foreground">
          {name.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h2 className="text-display text-2xl font-bold">{name}</h2>
          <p className="text-xs text-muted-foreground">{profile?.email}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-elevated px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {isActive ? `${subscription?.plan ?? "Premium"} plan` : "Free plan"}
            </span>
            {profile?.current_level ? (
              <span className="rounded-full bg-elevated px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                {profile.current_level}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { v: String(streak), l: "Streak" },
          { v: String(completed.size), l: "Lessons" },
          { v: String(badges), l: "Badges" },
        ].map((s) => (
          <div key={s.l} className="surface-card p-4 text-center">
            <p className="text-display text-2xl font-bold">{s.v}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Train with me</SectionTitle>
      <PersonalTrainingCTA />

      <SectionTitle>Account</SectionTitle>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <Row to="/subscription" icon={<CreditCard className="size-4" />} label="Subscription">
          {isActive ? <PremiumBadge /> : null}
        </Row>
        <Row to="/achievements" icon={<Trophy className="size-4" />} label="Achievements" />
        <Row to="/settings" icon={<Cog className="size-4" />} label="Settings" />
        {isAdmin ? (
          <Row to="/admin" icon={<ShieldCheck className="size-4" />} label="Admin dashboard" />
        ) : null}
      </div>

      <button
        onClick={() => void signOut()}
        className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface text-sm font-bold text-muted-foreground"
      >
        <LogOut className="size-4" /> Sign out
      </button>
    </AppShell>
  );
}

function Row({
  to,
  icon,
  label,
  children,
}: {
  to: "/subscription" | "/achievements" | "/settings" | "/admin";
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 border-b border-border px-4 py-4 last:border-b-0 hover:bg-elevated"
    >
      <span className="grid size-8 place-items-center rounded-full bg-elevated text-primary">
        {icon}
      </span>
      <span className="flex-1 text-sm font-semibold">{label}</span>
      {children}
      <ChevronRight className="size-4 text-muted-foreground" />
    </Link>
  );
}
