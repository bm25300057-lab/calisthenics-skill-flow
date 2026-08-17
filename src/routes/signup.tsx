import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout, Field } from "@/components/auth-layout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — Atlas Calisthenics" },
      {
        name: "description",
        content: "Create your Atlas account and start a structured calisthenics skill pathway.",
      },
      { property: "og:title", content: "Create Account — Atlas Calisthenics" },
      { property: "og:description", content: "Start a structured calisthenics skill pathway." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/onboarding/goals`,
      },
    });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    if (data.session) {
      void navigate({ to: "/onboarding/goals", replace: true });
      return;
    }
    setCheckEmail(true);
  };

  return (
    <AuthLayout
      title="Start training"
      subtitle="Three quick questions and your pathway is ready."
      footer={
        <span className="text-muted-foreground">
          Already training?{" "}
          <Link to="/login" className="font-bold text-primary">
            Sign in
          </Link>
        </span>
      }
    >
      {checkEmail ? (
        <div className="surface-card p-5 text-sm">
          <p className="font-bold">Check your inbox</p>
          <p className="mt-2 text-muted-foreground">
            We sent a confirmation link to <span className="text-foreground">{email}</span>. Confirm
            your address, then sign in to start your pathway.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Field
            label="Name"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            minLength={8}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error ? <p className="text-xs font-semibold text-destructive">{error}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="flex min-h-13 w-full items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow disabled:opacity-60"
          >
            {busy ? "Creating account…" : "Continue"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
