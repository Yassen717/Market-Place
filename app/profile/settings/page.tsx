"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { updateProfile, type User } from "firebase/auth";
import { friendlyAuthError } from "@/components/auth/utils";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MemberGate from "@/components/profile/MemberGate";
import { getFirebaseAuth } from "@/firebase/auth";

function BackLink() {
  return (
    <Link
      href="/profile"
      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text transition-colors mb-6"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      Back to profile
    </Link>
  );
}

function SettingsForm({ user }: { user: User }) {
  const [name, setName] = useState(user.displayName ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    const current = getFirebaseAuth()?.currentUser;
    if (!current) {
      setError("No signed-in user. Please sign in again.");
      return;
    }
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      await updateProfile(current, { displayName: name.trim() });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSave}
      className="glass rounded-2xl p-7 flex flex-col gap-6 animate-rise"
    >
      <div>
        <label htmlFor="settings-name" className="label-caps block mb-2">
          Display name
        </label>
        <input
          id="settings-name"
          type="text"
          autoComplete="name"
          className="input-dark"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your public name"
          required
        />
        <p className="text-xs text-faint mt-2">
          Shown on your profile and next to anything you publish.
        </p>
      </div>
      <div>
        <label htmlFor="settings-email" className="label-caps block mb-2">
          Email
        </label>
        <input
          id="settings-email"
          type="email"
          className="input-dark opacity-60 cursor-not-allowed"
          value={user.email ?? ""}
          readOnly
          disabled
          aria-describedby="settings-email-hint"
        />
        <p id="settings-email-hint" className="text-xs text-faint mt-2">
          Email is tied to your sign-in method and cannot be changed here.
        </p>
      </div>
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-bad/40 bg-bad/10 px-3.5 py-2.5 text-sm text-bad"
        >
          {error}
        </div>
      )}
      {saved && (
        <div className="rounded-lg border border-good/40 bg-good/10 px-3.5 py-2.5 text-sm text-good flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 13 4 4L19 7" />
          </svg>
          Profile updated.
        </div>
      )}
      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="page-shell flex-1 py-10 w-full">
        <div className="max-w-xl mx-auto">
          <BackLink />
          <h1 className="section-title text-2xl">Settings</h1>
          <p className="text-sm text-muted mt-1.5 mb-8">
            Manage your public profile details.
          </p>
          <MemberGate>{(user) => <SettingsForm user={user} />}</MemberGate>
        </div>
      </main>
      <Footer />
    </div>
  );
}
