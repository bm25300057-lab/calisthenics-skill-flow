import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart3,
  CreditCard,
  Dumbbell,
  FileVideo,
  GraduationCap,
  Route as RouteIcon,
  Users,
} from "lucide-react";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { personalTrainingConfig as cfg } from "@/config/personal-training";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Atlas Calisthenics" },
      { name: "description", content: "Manage skills, programs, lessons, videos, users and subscriptions." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard — Atlas Calisthenics" },
      { property: "og:description", content: "Content and subscription management for Atlas." },
    ],
  }),
  component: AdminPage,
});

const sections = [
  { id: "skills", label: "Skills", icon: Dumbbell, count: `${skills.length}` },
  { id: "programs", label: "Programs", icon: RouteIcon, count: `${skills.length}` },
  { id: "lessons", label: "Lessons", icon: GraduationCap, count: "59" },
  { id: "videos", label: "Videos", icon: FileVideo, count: "59" },
  { id: "users", label: "Users", icon: Users, count: "—" },
  { id: "subscriptions", label: "Subscriptions", icon: CreditCard, count: "—" },
  { id: "analytics", label: "Analytics", icon: BarChart3, count: "—" },
  { id: "pt", label: "Personal Training", icon: Users, count: "" },
] as const;

function AdminPage() {
  const [active, setActive] = useState<string>("skills");

  return (
    <AppShell>
      <Link
        to="/profile"
        className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> Profile
      </Link>
      <PageHeader eyebrow="Internal" title="Admin" subtitle="Content, users and configuration." />

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors",
              active === s.id
                ? "border-primary bg-primary/15 text-primary"
                : "border-border bg-surface text-muted-foreground",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {active === "pt" ? <PersonalTrainingSettings /> : <SectionPanel id={active} />}
    </AppShell>
  );
}

function SectionPanel({ id }: { id: string }) {
  const section = sections.find((s) => s.id === id)!;
  const Icon = section.icon;

  const rows =
    id === "skills" || id === "programs"
      ? skills.map((s) => ({ title: s.name, meta: `${s.category} · ${s.steps} steps` }))
      : id === "lessons" || id === "videos"
        ? skills.flatMap((s) =>
            s.pathway.slice(0, 2).map((p) => ({ title: p.title, meta: s.name })),
          )
        : [];

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Metric label="Total" value={section.count || "—"} />
        <Metric label="Published" value="—" />
        <Metric label="Drafts" value="—" />
        <Metric label="Updated" value="—" />
      </div>

      <div className="surface-card mt-4 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border px-4 py-4">
          <span className="grid size-8 place-items-center rounded-full bg-primary/15 text-primary">
            <Icon className="size-4" />
          </span>
          <h2 className="text-display flex-1 text-lg font-bold">{section.label}</h2>
          <span className="rounded-lg bg-gradient-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
            New
          </span>
        </div>
        {rows.length ? (
          <ul>
            {rows.map((r, i) => (
              <li
                key={`${r.title}-${i}`}
                className="flex items-center justify-between border-b border-border px-4 py-3 text-sm last:border-b-0"
              >
                <div>
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.meta}</p>
                </div>
                <span className="text-xs font-bold text-primary">Edit</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            {section.label} data will appear here once the backend is connected.
          </p>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-4">
      <p className="text-display text-2xl font-bold">{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}

function PersonalTrainingSettings() {
  const fields = [
    { label: "WhatsApp number", value: cfg.WHATSAPP_NUMBER, placeholder: "e.g. 94771234567" },
    { label: "Instagram username", value: cfg.INSTAGRAM_USERNAME, placeholder: "e.g. coachname" },
    { label: "Training location", value: cfg.PERSONAL_TRAINING_LOCATION, placeholder: "City / gym" },
    { label: "Availability", value: cfg.PERSONAL_TRAINING_AVAILABILITY, placeholder: "Days and times" },
    { label: "Short description", value: cfg.SHORT_DESCRIPTION, placeholder: "One paragraph" },
    { label: "CTA text", value: cfg.CTA_TEXT, placeholder: "Train With Me 1-on-1" },
  ];

  return (
    <div className="surface-card p-5">
      <h2 className="text-display text-lg font-bold">Personal Training Settings</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Admin-only. These values drive the 1-on-1 page and its CTAs. Values are read from the
        configuration file until the backend is connected.
      </p>
      <div className="mt-5 space-y-4">
        {fields.map((f) => (
          <label key={f.label} className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {f.label}
            </span>
            <input
              defaultValue={f.value}
              placeholder={f.placeholder}
              className="mt-2 h-12 w-full rounded-xl border border-input bg-elevated px-4 text-sm outline-none focus:border-primary"
            />
          </label>
        ))}
      </div>
      <button className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground">
        Save settings
      </button>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Saving is not wired up yet — UI only.
      </p>
    </div>
  );
}
