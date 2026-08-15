import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, Dumbbell, MapPin, Target, Wrench } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ContactButtons } from "@/components/personal-training-cta";
import { personalTrainingConfig as cfg } from "@/config/personal-training";

export const Route = createFileRoute("/personal-training")({
  head: () => ({
    meta: [
      { title: "1-on-1 Personal Training — Atlas Calisthenics" },
      {
        name: "description",
        content:
          "In-person calisthenics coaching: personalised skill training, technique correction and strength development.",
      },
      { property: "og:title", content: "1-on-1 Personal Training — Atlas Calisthenics" },
      {
        property: "og:description",
        content: "In-person coaching for skill progression, technique and strength.",
      },
    ],
  }),
  component: PersonalTrainingPage,
});

const offers = [
  {
    icon: Target,
    title: "Personalised skill training",
    body: "Your pathway, adjusted live to your leverages, mobility and training history.",
  },
  {
    icon: Wrench,
    title: "Technique correction",
    body: "Real-time cueing and hands-on adjustment — the part video can never fully replace.",
  },
  {
    icon: Dumbbell,
    title: "Strength development",
    body: "Structured loading so the joints and tendons keep up with the skill work.",
  },
  {
    icon: CalendarClock,
    title: "In-person coaching",
    body: "Focused sessions with programming between them, so nothing is guesswork.",
  },
];

function PersonalTrainingPage() {
  return (
    <AppShell>
      <Link
        to="/home"
        className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> Home
      </Link>

      <div className="surface-card overflow-hidden">
        <div className="bg-gradient-hero p-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            1-on-1 Personal Training
          </p>
          <h1 className="text-display mt-2 text-5xl font-bold">Train with me in person</h1>
          <p className="mt-3 text-sm text-muted-foreground">{cfg.SHORT_DESCRIPTION}</p>
        </div>
      </div>

      <h2 className="text-display mt-8 text-xl font-bold">Who this is for</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Athletes who are stuck on a progression, coming back from a plateau, or who simply learn
        faster with direct feedback. Beginners are welcome — so are people chasing the lever and
        planche.
      </p>

      <h2 className="text-display mt-8 text-xl font-bold">What we work on</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {offers.map(({ icon: Icon, title, body }) => (
          <div key={title} className="surface-card p-5">
            <span className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary">
              <Icon className="size-4" />
            </span>
            <h3 className="text-display mt-3 text-lg font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>

      <h2 className="text-display mt-8 text-xl font-bold">Location & availability</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="surface-card flex items-start gap-3 p-5">
          <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Location
            </p>
            <p className="mt-1 text-sm">{cfg.PERSONAL_TRAINING_LOCATION}</p>
          </div>
        </div>
        <div className="surface-card flex items-start gap-3 p-5">
          <CalendarClock className="mt-0.5 size-4 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Availability
            </p>
            <p className="mt-1 text-sm">{cfg.PERSONAL_TRAINING_AVAILABILITY}</p>
          </div>
        </div>
      </div>

      <div className="surface-card mt-8 p-6 text-center">
        <h2 className="text-display text-3xl font-bold">{cfg.CTA_TEXT}</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Send a message with your goals and current level, and I'll come back with a plan and
          available times.
        </p>
        <ContactButtons className="mt-5 text-left" />
        {!cfg.WHATSAPP_NUMBER || !cfg.INSTAGRAM_USERNAME ? (
          <p className="mt-3 text-[11px] text-muted-foreground">
            Contact details are placeholders — set them in the admin Personal Training settings.
          </p>
        ) : null}
      </div>
    </AppShell>
  );
}
