import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, Field } from "@/components/auth-layout";

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
      <Field label="Email" type="email" placeholder="you@example.com" />
      <Field label="Password" type="password" placeholder="••••••••" />
      <div className="flex justify-end">
        <span className="text-xs text-muted-foreground">Forgot password?</span>
      </div>
      <Link
        to="/home"
        className="flex min-h-13 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow"
      >
        Sign in
      </Link>
      <p className="text-center text-[11px] text-muted-foreground">
        Authentication is not wired up yet — this screen is UI only.
      </p>
    </AuthLayout>
  );
}
