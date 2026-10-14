"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import AuthCard, { AuthFormSkeleton } from "@/components/auth/AuthCard";
import { friendlyAuthError, safeNextPath } from "@/components/auth/utils";
import { getFirebaseAuth, persistAuthCookie } from "@/firebase/auth";

function SignupForm() {
  const router = useRouter();
  const next = safeNextPath(useSearchParams().get("next"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loginHref =
    next === "/" ? "/login" : `/login?next=${encodeURIComponent(next)}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const auth = getFirebaseAuth();
    if (!auth) {
      setError("Authentication is not configured.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const displayName = name.trim();
      if (displayName) await updateProfile(user, { displayName });
      await persistAuthCookie(user);
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(friendlyAuthError(err));
      setSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="signup-name" className="label-caps block mb-2">
            Display name
          </label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            placeholder="What should we call you?"
            className="input-dark"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="signup-email" className="label-caps block mb-2">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input-dark"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="label-caps block mb-2">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 6 characters"
            className="input-dark"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-bad/40 bg-bad/10 px-3.5 py-2.5 text-sm text-bad"
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          className="btn-primary w-full !py-3 mt-1"
          disabled={submitting}
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="text-center text-sm text-muted mt-6">
        Already have an account?{" "}
        <Link
          href={loginHref}
          className="font-semibold text-accent-2 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="One account for every app, game, and purchase."
    >
      <Suspense fallback={<AuthFormSkeleton />}>
        <SignupForm />
      </Suspense>
    </AuthCard>
  );
}
