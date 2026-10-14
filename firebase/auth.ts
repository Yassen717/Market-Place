"use client";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
  type Auth,
  type User,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { getFirebaseApp } from "./app";
import { isFirebaseConfigured } from "./config";

let authInstance: Auth | null = null;

export function getFirebaseAuth(): Auth | null {
  const app = getFirebaseApp();
  if (!app) return null;
  if (!authInstance) authInstance = getAuth(app);
  return authInstance;
}

export const googleProvider = isFirebaseConfigured
  ? new GoogleAuthProvider()
  : null;

const AUTH_COOKIE = "firebaseToken";

export async function persistAuthCookie(user: User) {
  const token = await user.getIdToken(true);
  document.cookie = `${AUTH_COOKIE}=${token}; path=/; SameSite=Lax`;
}

export function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE}=; path=/; Max-Age=0; SameSite=Lax`;
}

export async function signOutUser() {
  clearAuthCookie();
  await signOut(getFirebaseAuth()!);
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  configured: boolean;
}

/** Subscribe to the current Firebase user. Safe when Firebase isn't configured. */
export function useAuthUser(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading, configured: isFirebaseConfigured };
}
