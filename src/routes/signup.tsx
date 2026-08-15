import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, Field } from "@/components/auth-layout";

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
      <Field label="Name" placeholder="Your name" />
      <Field label="Email" type="email" placeholder="you@example.com" />
      <Field label="Password" type="password" placeholder="At least 8 characters" />
      <Link
        to="/onboarding/goals"
        className="flex min-h-13 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow"
      >
        Continue
      </Link>
      <p className="text-center text-[11px] text-muted-foreground">
        Accounts are not created yet — this screen is UI only.
      </p>
    </AuthLayout>
  );
}
