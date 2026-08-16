import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AuthLayout, Field } from "@/components/auth-layout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Atlas Calisthenics" },
      { name: "description", content: "Sign in to continue your calisthenics skill pathway." },
      { property: "og:title", content: "Sign In — Atlas Calisthenics" },
      { property: "og:description", content: "Continue your calisthenics skill pathway." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/home", replace: true });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    void navigate({ to: "/home", replace: true });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Pick up exactly where you left off."
      footer={
        <span className="text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="font-bold text-primary">
            Create an account
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <p className="text-xs font-semibold text-destructive">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="flex min-h-13 w-full items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}
