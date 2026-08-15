import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
  showLabel = false,
}: {
  value: number;
  className?: string;
  showLabel?: boolean;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("w-full", className)}>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-elevated">
        <div
          className="h-full rounded-full bg-gradient-primary transition-[width] duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel ? (
        <p className="mt-1.5 text-xs font-semibold text-muted-foreground">{clamped}% complete</p>
      ) : null}
    </div>
  );
}

export function ProgressRing({
  value,
  size = 96,
  label,
  caption,
}: {
  value: number;
  size?: number;
  label?: string;
  caption?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className="relative grid place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(var(--primary) ${clamped * 3.6}deg, var(--elevated) 0deg)`,
      }}
    >
      <div
        className="grid place-items-center rounded-full bg-surface text-center"
        style={{ width: size - 16, height: size - 16 }}
      >
        <div>
          <p className="text-display text-xl font-bold leading-none">{label ?? `${clamped}%`}</p>
          {caption ? (
            <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              {caption}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
