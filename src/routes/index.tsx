import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas — Learn Calisthenics Skills Step by Step" },
      {
        name: "description",
        content:
          "Premium calisthenics skill training. Structured pathways for the pull-up, handstand, muscle-up, front lever and planche.",
      },
      { property: "og:title", content: "Atlas — Learn Calisthenics Skills Step by Step" },
      {
        property: "og:description",
        content: "Structured, coach-led calisthenics pathways from your first pull-up to the planche.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => setProgress((p) => Math.min(100, p + 4)), 40);
    const go = setTimeout(() => navigate({ to: "/welcome" }), 1400);
    return () => {
      clearInterval(tick);
      clearTimeout(go);
    };
  }, [navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-hero px-6">
      <div className="w-full max-w-xs text-center animate-rise">
        <h1 className="text-display text-6xl font-bold">
          Atlas<span className="text-primary">.</span>
        </h1>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Calisthenics Skill School
        </p>
        <div className="mt-10 h-1 w-full overflow-hidden rounded-full bg-elevated">
          <div
            className="h-full rounded-full bg-gradient-primary transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <Link to="/welcome" className="mt-6 inline-block text-xs text-muted-foreground underline">
          Skip
        </Link>
      </div>
    </div>
  );
}
