import { Link } from "@tanstack/react-router";
import { Lock, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PremiumBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary",
        className,
      )}
    >
      <Sparkles className="size-3" /> Premium
    </span>
  );
}

/** Blurs its children and overlays an upgrade prompt. */
export function PremiumLock({
  children,
  title = "Premium content",
  description = "Unlock the full pathway, every lesson video and progression tracking.",
}: {
  children?: ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      {children ? (
        <div aria-hidden className="pointer-events-none select-none opacity-40 blur-[3px]">
          {children}
        </div>
      ) : (
        <div aria-hidden className="h-40 bg-gradient-surface" />
      )}
      <div className="absolute inset-0 grid place-items-center bg-background/70 p-6 text-center backdrop-blur-[2px]">
        <div>
          <div className="mx-auto grid size-11 place-items-center rounded-full bg-primary/15 text-primary">
            <Lock className="size-5" />
          </div>
          <h3 className="text-display mt-3 text-lg font-bold">{title}</h3>
          <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">{description}</p>
          <Link
            to="/subscription"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow"
          >
            Upgrade to Premium
          </Link>
        </div>
      </div>
    </div>
  );
}
