import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Cog, CreditCard, LogOut, ShieldCheck, Trophy } from "lucide-react";
import { AppShell, PageHeader, SectionTitle } from "@/components/app-shell";
import { PersonalTrainingCTA } from "@/components/personal-training-cta";
import { PremiumBadge } from "@/components/premium-lock";

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
  return (
    <AppShell>
      <PageHeader eyebrow="Account" title="Profile" />

      <div className="surface-card flex items-center gap-4 p-5">
        <div className="text-display grid size-16 place-items-center rounded-full bg-gradient-primary text-2xl font-bold text-primary-foreground">
          A
        </div>
        <div>
          <h2 className="text-display text-2xl font-bold">Athlete</h2>
          <p className="text-xs text-muted-foreground">athlete@example.com</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-elevated px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Free plan
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { v: "12", l: "Streak" },
          { v: "18", l: "Lessons" },
          { v: "4", l: "Badges" },
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
          <PremiumBadge />
        </Row>
        <Row to="/achievements" icon={<Trophy className="size-4" />} label="Achievements" />
        <Row to="/settings" icon={<Cog className="size-4" />} label="Settings" />
        <Row to="/admin" icon={<ShieldCheck className="size-4" />} label="Admin dashboard" />
      </div>

      <button className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface text-sm font-bold text-muted-foreground">
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
