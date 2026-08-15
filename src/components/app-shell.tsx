import { Link, useRouterState } from "@tanstack/react-router";
import { Dumbbell, Home, TrendingUp, User } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/skills", label: "Skills", icon: Dumbbell },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-xl md:hidden">
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(`${to}/`);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 text-[11px] font-semibold tracking-wide transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("size-5", active && "drop-shadow-[0_0_10px_currentColor]")} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function DesktopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 hidden border-b border-border bg-surface/80 backdrop-blur-xl md:block">
      <div className="mx-auto flex max-w-6xl items-center gap-8 px-6 py-4">
        <Link to="/home" className="text-display text-2xl font-bold">
          Atlas<span className="text-primary">.</span>
        </Link>
        <ul className="flex items-center gap-6 text-sm font-semibold">
          {navItems.map(({ to, label }) => {
            const active = pathname === to || pathname.startsWith(`${to}/`);
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={cn(
                    "transition-colors",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="ml-auto flex items-center gap-4 text-sm font-semibold">
          <Link to="/personal-training" className="text-muted-foreground hover:text-foreground">
            1-on-1 Training
          </Link>
          <Link
            to="/subscription"
            className="rounded-full bg-gradient-primary px-4 py-2 text-primary-foreground"
          >
            Go Premium
          </Link>
        </div>
      </div>
    </header>
  );
}

export function AppShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <main className={cn("mx-auto w-full max-w-lg px-5 pb-28 pt-6 md:max-w-5xl md:px-6 md:pb-16", className)}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        ) : null}
        <h1 className="text-display mt-1 text-4xl font-bold md:text-5xl">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 mt-8 flex items-center justify-between">
      <h2 className="text-display text-xl font-bold">{children}</h2>
      {action}
    </div>
  );
}
