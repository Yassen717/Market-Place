import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { firebaseConfig, isFirebaseConfigured } from "./config";

let app: FirebaseApp | null = null;

/**
 * Lazily initialized Firebase app singleton.
 * Returns null when env config is missing so callers can render
 * a graceful signed-out/unconfigured state instead of crashing.
 */
export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured) return null;
  if (!app) {
    app = getApps().length
      ? getApps()[0]
      : initializeApp(firebaseConfig as Record<string, string>);
  }
  return app;
}
