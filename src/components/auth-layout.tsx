import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-hero px-6 py-10">
      <div className="mx-auto w-full max-w-md">
        <Link
          to="/welcome"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> Back
        </Link>
        <h1 className="text-display mt-8 text-5xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-8 space-y-4">{children}</div>
        {footer ? <div className="mt-8 text-center text-sm">{footer}</div> : null}
      </div>
    </div>
  );
}

export function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 h-13 w-full rounded-xl border border-input bg-surface px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
    </label>
  );
}
