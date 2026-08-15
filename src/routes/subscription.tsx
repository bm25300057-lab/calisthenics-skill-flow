import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/subscription")({
  head: () => ({
    meta: [
      { title: "Go Premium — Atlas Calisthenics" },
      {
        name: "description",
        content: "Unlock every skill pathway, all lesson videos and full progress tracking with Atlas Premium.",
      },
      { property: "og:title", content: "Go Premium — Atlas Calisthenics" },
      { property: "og:description", content: "Every pathway, every lesson, full progress tracking." },
    ],
  }),
  component: SubscriptionPage,
});

const perks = [
  "All 10 skill pathways, start to finish",
  "Every video lesson and technique breakdown",
  "Full progression and regression library",
  "Progress tracking, streaks and achievements",
  "New skills and lessons as they're released",
];

const plans = [
  { id: "monthly", label: "Monthly", price: "$14", per: "/month", note: "Cancel any time" },
  { id: "annual", label: "Annual", price: "$99", per: "/year", note: "Save 41%", best: true },
];

function SubscriptionPage() {
  const [plan, setPlan] = useState("annual");

  return (
    <AppShell>
      <Link
        to="/profile"
        className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> Profile
      </Link>

      <div className="surface-card overflow-hidden">
        <div className="bg-gradient-hero p-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Atlas Premium</p>
          <h1 className="text-display mt-2 text-5xl font-bold">Train the whole path</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Every skill, every step, every lesson — coached in order, not in fragments.
          </p>
        </div>
        <ul className="space-y-3 p-6">
          {perks.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-muted-foreground">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {plans.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlan(p.id)}
            className={cn(
              "rounded-2xl border p-5 text-left transition-colors",
              plan === p.id ? "border-primary bg-primary/10" : "border-border bg-surface",
            )}
          >
            <div className="flex items-center justify-between">
              <p className="font-bold">{p.label}</p>
              {p.best ? (
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                  Best value
                </span>
              ) : null}
            </div>
            <p className="text-display mt-2 text-3xl font-bold">
              {p.price}
              <span className="text-base text-muted-foreground">{p.per}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
          </button>
        ))}
      </div>

      <button className="mt-6 flex min-h-13 w-full items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow">
        Upgrade to Premium
      </button>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Checkout is not connected yet — this screen is UI only.
      </p>
    </AppShell>
  );
}
