import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Route as RouteIcon, Target, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome to Atlas — Calisthenics Skill Pathways" },
      {
        name: "description",
        content:
          "One coach, structured pathways and video lessons that take you from your first pull-up to elite calisthenics skills.",
      },
      { property: "og:title", content: "Welcome to Atlas" },
      { property: "og:description", content: "Structured calisthenics skill pathways, taught step by step." },
    ],
  }),
  component: Welcome,
});

const slides = [
  {
    icon: RouteIcon,
    title: "Every skill has a path",
    body: "No random workouts. Each skill is broken into ordered steps with a clear standard to hit before you move on.",
  },
  {
    icon: Video,
    title: "Coached, not guessed",
    body: "Video lessons, technique breakdowns and the mistakes to avoid — from one coach, start to finish.",
  },
  {
    icon: Target,
    title: "Know what to do next",
    body: "Open the app and you get one answer: your next lesson, today.",
  },
];

function Welcome() {
  const [index, setIndex] = useState(0);
  const slide = slides[index]!;
  const Icon = slide.icon;
  const last = index === slides.length - 1;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-hero px-6 py-10">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="text-display text-2xl font-bold">
            Atlas<span className="text-primary">.</span>
          </span>
          <Link to="/login" className="text-xs font-semibold text-muted-foreground">
            Sign in
          </Link>
        </div>

        <div key={index} className="flex flex-1 flex-col justify-center animate-rise">
          <div className="grid size-14 place-items-center rounded-2xl bg-primary/15 text-primary">
            <Icon className="size-7" />
          </div>
          <h1 className="text-display mt-6 text-5xl font-bold">{slide.title}</h1>
          <p className="mt-4 text-base text-muted-foreground">{slide.body}</p>
        </div>

        <div className="mb-6 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i === index ? "bg-primary" : "bg-elevated",
              )}
            />
          ))}
        </div>

        {last ? (
          <div className="space-y-3">
            <Link
              to="/signup"
              className="flex min-h-13 items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-glow"
            >
              Create your account <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/login"
              className="flex min-h-13 items-center justify-center rounded-xl border border-border bg-surface px-6 py-4 text-sm font-bold"
            >
              I already have an account
            </Link>
          </div>
        ) : (
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-glow"
          >
            Continue <ArrowRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
