"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import type { User } from "firebase/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MemberGate from "@/components/profile/MemberGate";
import { PURCHASES } from "@/components/profile/purchases";
import { signOutUser } from "@/firebase/auth";
import { formatDate } from "@/lib/helpers";

function joinedLabel(user: User): string | null {
  const raw = user.metadata.creationTime;
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime())
    ? null
    : formatDate(date.toISOString().slice(0, 10));
}

function joinedYear(user: User): string {
  const raw = user.metadata.creationTime;
  if (!raw) return "—";
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? "—" : String(date.getFullYear());
}

function MenuRow({
  href,
  icon,
  label,
  desc,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl hover:bg-surface-2 transition-colors group"
    >
      <span className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-accent-2 shrink-0">
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-xs text-muted truncate">{desc}</span>
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-faint group-hover:text-text transition-colors shrink-0"
        aria-hidden="true"
      >
        <path d="m9 6 6 6-6 6" />
      </svg>
    </Link>
  );
}

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-3.5">
      <div className="font-display font-bold text-lg">{value}</div>
      <div className="label-caps mt-0.5">{label}</div>
    </div>
  );
}

function ProfileBody({ user }: { user: User }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const initial = (user.displayName || user.email || "U")
    .charAt(0)
    .toUpperCase();
  const joined = joinedLabel(user);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOutUser();
      router.push("/");
      router.refresh();
    } catch {
      setSigningOut(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr] items-start">
      {/* Identity card */}
      <section className="glass rounded-2xl p-8 text-center animate-rise">
        <div
          className="w-24 h-24 mx-auto rounded-full flex items-center justify-center font-display font-bold text-4xl text-white bg-gradient-to-br from-accent to-accent-2 border border-border-strong"
          aria-hidden="true"
        >
          {initial}
        </div>
        <h1 className="font-display font-bold text-2xl mt-5 truncate">
          {user.displayName || "Member"}
        </h1>
        <p className="text-sm text-muted truncate mt-1">{user.email}</p>
        {joined && (
          <p className="text-xs text-faint mt-2">Joined {joined}</p>
        )}
        <div className="grid grid-cols-3 gap-3 mt-7 text-left">
          <StatCell value={String(PURCHASES.length)} label="Purchases" />
          <StatCell value={joinedYear(user)} label="Since" />
          <StatCell value="Member" label="Account" />
        </div>
      </section>

      {/* Menu card */}
      <section className="glass rounded-2xl p-3 animate-rise rise-delay-1">
        <div className="label-caps px-4 pt-4 pb-2">Account</div>
        <nav className="flex flex-col">
          <MenuRow
            href="/profile/app-purchases"
            label="Purchases"
            desc="Apps and games in your library"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 7h12l1.2 13.2a1 1 0 0 1-1 1.1H5.8a1 1 0 0 1-1-1.1L6 7Z" />
                <path d="M9 10V6a3 3 0 0 1 6 0v4" />
              </svg>
            }
          />
          <MenuRow
            href="/profile/settings"
            label="Settings"
            desc="Display name and account details"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
              </svg>
            }
          />
          <MenuRow
            href="/upload"
            label="Upload an app"
            desc="Ship your own app to the marketplace"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 16V4m0 0 4 4m-4-4-4 4" />
                <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
              </svg>
            }
          />
        </nav>
        <hr className="divider mx-4 my-2" />
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl hover:bg-surface-2 transition-colors group text-left cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="w-9 h-9 rounded-lg bg-bad/10 border border-bad/30 flex items-center justify-center text-bad shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-sm font-semibold text-bad">
              {signingOut ? "Signing out…" : "Sign out"}
            </span>
            <span className="block text-xs text-muted">
              End this session on this device
            </span>
          </span>
        </button>
      </section>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="page-shell flex-1 py-10 w-full">
        <MemberGate>{(user) => <ProfileBody user={user} />}</MemberGate>
      </main>
      <Footer />
    </div>
  );
}
