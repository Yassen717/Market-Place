import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getFirebaseApp } from "./app";

let storageInstance: FirebaseStorage | null = null;

export function getStorageBucket(): FirebaseStorage | null {
  const app = getFirebaseApp();
  if (!app) return null;
  if (!storageInstance) storageInstance = getStorage(app);
  return storageInstance;
}
