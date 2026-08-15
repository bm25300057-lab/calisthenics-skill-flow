import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { instagramLink, personalTrainingConfig, whatsappLink } from "@/config/personal-training";
import { cn } from "@/lib/utils";

/** Subtle inline CTA used on Home, Profile, Skill and Program pages. */
export function PersonalTrainingCTA({
  variant = "card",
  className,
}: {
  variant?: "card" | "inline";
  className?: string;
}) {
  if (variant === "inline") {
    return (
      <Link
        to="/personal-training"
        className={cn(
          "flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm transition-colors hover:border-primary/50",
          className,
        )}
      >
        <span className="text-muted-foreground">
          Want personal coaching?{" "}
          <span className="font-semibold text-foreground">Train with me 1-on-1.</span>
        </span>
        <ArrowRight className="size-4 shrink-0 text-primary" />
      </Link>
    );
  }

  return (
    <Link
      to="/personal-training"
      className={cn(
        "surface-card block overflow-hidden p-5 transition-transform hover:-translate-y-0.5",
        className,
      )}
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">In person</p>
      <h3 className="text-display mt-2 text-2xl font-bold">{personalTrainingConfig.CTA_TEXT}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Direct coaching, technique correction and a plan built around your body — face to face.
      </p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
        See how it works <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}

export function ContactButtons({ className }: { className?: string }) {
  const wa = whatsappLink();
  const ig = instagramLink();

  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      <ContactButton
        href={wa}
        icon={<MessageCircle className="size-5" />}
        label="Message Me on WhatsApp"
        fallback="WhatsApp number not configured yet"
        primary
      />
      <ContactButton
        href={ig}
        icon={<Instagram className="size-5" />}
        label="DM Me on Instagram"
        fallback="Instagram username not configured yet"
      />
    </div>
  );
}

function ContactButton({
  href,
  icon,
  label,
  fallback,
  primary,
}: {
  href: string | null;
  icon: React.ReactNode;
  label: string;
  fallback: string;
  primary?: boolean;
}) {
  const base =
    "flex min-h-14 items-center justify-center gap-3 rounded-xl px-5 text-sm font-bold transition-colors";
  const style = primary
    ? "bg-gradient-primary text-primary-foreground shadow-glow"
    : "border border-border bg-surface text-foreground hover:border-primary/50";

  if (!href) {
    return (
      <span
        className={cn(base, "cursor-not-allowed border border-border bg-surface text-muted-foreground")}
        title={fallback}
      >
        {icon}
        {label}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={cn(base, style)}>
      {icon}
      {label}
    </a>
  );
}
