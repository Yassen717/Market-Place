"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthCard, { AuthFormSkeleton } from "@/components/auth/AuthCard";
import { friendlyAuthError, safeNextPath } from "@/components/auth/utils";
import { getFirebaseAuth, persistAuthCookie } from "@/firebase/auth";

function LoginForm() {
  const router = useRouter();
  const next = safeNextPath(useSearchParams().get("next"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const signupHref =
    next === "/" ? "/signup" : `/signup?next=${encodeURIComponent(next)}`;

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
      const { user } = await signInWithEmailAndPassword(auth, email, password);
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
          <label htmlFor="login-email" className="label-caps block mb-2">
            Email
          </label>
          <input
            id="login-email"
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
          <label htmlFor="login-password" className="label-caps block mb-2">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
            className="input-dark"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="text-center text-sm text-muted mt-6">
        New to Nova Market?{" "}
        <Link
          href={signupHref}
          className="font-semibold text-accent-2 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to keep your library and purchases in sync."
    >
      <Suspense fallback={<AuthFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
