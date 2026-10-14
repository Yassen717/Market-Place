import Link from "next/link";
import type { ReactNode } from "react";
import Logo from "@/components/Logo";
import { isFirebaseConfigured } from "@/firebase/config";
import AuthNotice from "./AuthNotice";

/**
 * Centered glass card on the aurora background shared by /login and
 * /signup. When Firebase env vars are missing the children (the form)
 * are swapped for a configuration notice so the page never throws.
 */
export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <Link
        href="/"
        className="flex items-center gap-2.5 mb-8 animate-rise"
      >
        <Logo size={34} />
        <span className="font-display font-bold text-xl tracking-tight">
          Nova<span className="text-gradient">Market</span>
        </span>
      </Link>

      <div className="w-full max-w-md glass rounded-2xl p-8 shadow-2xl shadow-black/40 animate-rise">
        <h1 className="section-title">{title}</h1>
        <p className="text-sm text-muted mt-1.5 mb-7">{subtitle}</p>
        {isFirebaseConfigured ? children : <AuthNotice />}
      </div>

      <Link
        href="/"
        className="mt-6 text-xs text-faint hover:text-muted transition-colors animate-rise"
      >
        Back to Nova Market
      </Link>
    </div>
  );
}

/** Pulse placeholder used as the Suspense fallback around auth forms. */
export function AuthFormSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-3 w-16 rounded bg-surface-2" />
        <div className="h-11 rounded-xl bg-surface-2" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-20 rounded bg-surface-2" />
        <div className="h-11 rounded-xl bg-surface-2" />
      </div>
      <div className="h-11 rounded-full bg-surface-2 mt-1" />
    </div>
  );
}
