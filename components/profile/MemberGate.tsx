"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";
import AuthNotice from "@/components/auth/AuthNotice";
import { useAuthUser } from "@/firebase/auth";

/**
 * Gates member-only content on the client. Renders a loading skeleton, an
 * unconfigured notice, or a sign-in prompt until a real Firebase user
 * exists — then calls children with that user.
 */
export default function MemberGate({
  children,
}: {
  children: (user: User) => ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading, configured } = useAuthUser();

  if (loading) {
    return (
      <div className="glass rounded-2xl p-8 max-w-3xl mx-auto animate-pulse">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-surface-2 shrink-0" />
          <div className="space-y-2.5 flex-1">
            <div className="h-5 w-40 rounded bg-surface-2" />
            <div className="h-3.5 w-56 max-w-full rounded bg-surface-2" />
          </div>
        </div>
      </div>
    );
  }

  if (!configured) {
    return (
      <div className="max-w-md mx-auto animate-rise">
        <AuthNotice />
      </div>
    );
  }

  if (!user) {
    const loginHref = `/login?next=${encodeURIComponent(pathname)}`;
    const signupHref = `/signup?next=${encodeURIComponent(pathname)}`;
    return (
      <div className="glass rounded-2xl p-10 max-w-md mx-auto text-center animate-rise">
        <div className="w-14 h-14 mx-auto rounded-full bg-surface-2 border border-border flex items-center justify-center text-muted">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        </div>
        <h2 className="section-title mt-5">Sign in required</h2>
        <p className="text-sm text-muted mt-2 mb-6">
          You need a Nova Market account to view this page.
        </p>
        <Link href={loginHref} className="btn-primary w-full">
          Sign in
        </Link>
        <Link
          href={signupHref}
          className="block mt-4 text-sm text-muted hover:text-text transition-colors"
        >
          New here? Create an account
        </Link>
      </div>
    );
  }

  return <>{children(user)}</>;
}
