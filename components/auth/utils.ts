import { FirebaseError } from "firebase/app";

/** Map Firebase Auth error codes to short human-readable messages. */
export function friendlyAuthError(err: unknown): string {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Incorrect email or password.";
      case "auth/invalid-email":
        return "That email address looks invalid.";
      case "auth/email-already-in-use":
        return "An account already exists for this email.";
      case "auth/weak-password":
        return "Password needs at least 6 characters.";
      case "auth/too-many-requests":
        return "Too many attempts — try again in a minute.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and retry.";
      default:
        return "Authentication failed. Please try again.";
    }
  }
  return "Something went wrong. Please try again.";
}

/**
 * Sanitize a `?next=` redirect target — only same-site paths are allowed,
 * anything else falls back to "/".
 */
export function safeNextPath(next: string | null): string {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
}
