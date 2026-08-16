import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell, PageHeader, SectionTitle } from "@/components/app-shell";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Atlas Calisthenics" },
      { name: "description", content: "Manage notifications, training preferences and account settings." },
      { property: "og:title", content: "Settings — Atlas Calisthenics" },
      { property: "og:description", content: "Notifications, training preferences and account options." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell>
      <Link
        to="/profile"
        className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> Profile
      </Link>
      <PageHeader title="Settings" />

      <SectionTitle>Notifications</SectionTitle>
      <Group>
        <ToggleRow label="Training reminders" hint="A nudge on your scheduled days" defaultChecked />
        <ToggleRow label="Streak alerts" hint="Warn me before I break a streak" defaultChecked />
        <ToggleRow label="New lesson releases" hint="When new content is published" />
      </Group>

      <SectionTitle>Training</SectionTitle>
      <Group>
        <ToggleRow label="Auto-play lesson videos" defaultChecked />
        <ToggleRow label="Show metric units" hint="kg and cm" defaultChecked />
        <ToggleRow label="Rest timer sounds" />
      </Group>

      <SectionTitle>Account</SectionTitle>
      <Group>
        <TextRow label="Email" value="athlete@example.com" />
        <TextRow label="Plan" value="Free" />
        <TextRow label="Version" value="0.1.0 (UI preview)" />
      </Group>
    </AppShell>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">{children}</div>
  );
}

function ToggleRow({
  label,
  hint,
  defaultChecked,
}: {
  label: string;
  hint?: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-4 last:border-b-0">
      <div className="flex-1">
        <p className="text-sm font-semibold">{label}</p>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      <Switch defaultChecked={defaultChecked ?? false} />
    </div>
  );
}

function TextRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-4 text-sm last:border-b-0">
      <span className="font-semibold">{label}</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}
