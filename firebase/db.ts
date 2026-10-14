import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseApp } from "./app";

let dbInstance: Firestore | null = null;

export function getDb(): Firestore | null {
  const app = getFirebaseApp();
  if (!app) return null;
  if (!dbInstance) dbInstance = getFirestore(app);
  return dbInstance;
}
