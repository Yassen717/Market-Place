/**
 * Shown in place of auth/member content when the NEXT_PUBLIC_FIREBASE_*
 * env vars are missing — the common dev case. Keeps pages from throwing
 * when Firebase can't initialize.
 */
export default function AuthNotice() {
  return (
    <div className="rounded-xl border border-warn/40 bg-warn/10 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-warn">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        Auth not configured
      </div>
      <p className="mt-2 text-sm text-muted leading-relaxed">
        Set the Firebase env vars in{" "}
        <code className="font-mono text-xs text-text bg-surface-2 rounded px-1.5 py-0.5">
          .env.local
        </code>{" "}
        and restart the dev server:
      </p>
      <pre className="mt-3 rounded-lg bg-surface border border-border p-3 font-mono text-[11px] leading-relaxed text-accent-2 overflow-x-auto">
        {`NEXT_PUBLIC_FIREBASE_API_KEY=…
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=…
NEXT_PUBLIC_FIREBASE_PROJECT_ID=…
NEXT_PUBLIC_FIREBASE_APP_ID=…`}
      </pre>
    </div>
  );
}
