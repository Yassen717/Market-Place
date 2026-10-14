"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signOutUser, useAuthUser } from "@/firebase/auth";
import { cn } from "@/lib/helpers";
import Logo from "./Logo";

const NAV = [
  { href: "/", label: "Today" },
  { href: "/games", label: "Games" },
  { href: "/apps", label: "Apps" },
  { href: "/search", label: "Search" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuthUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOutUser();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[rgba(7,8,13,0.72)] backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between py-3.5">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Logo />
          <span className="font-display font-bold text-lg tracking-tight">
            Nova<span className="text-gradient">Market</span>
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-surface-2 text-text"
                  : "text-muted hover:text-text",
              )}
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/upload"
              className={cn(
                "px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors",
                isActive("/upload")
                  ? "bg-surface-2 text-text"
                  : "text-muted hover:text-text",
              )}
            >
              Upload
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            aria-label="Search"
            className="sm:hidden text-muted hover:text-text transition-colors"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>

          {loading ? (
            <div className="w-9 h-9 rounded-full bg-surface-2 animate-pulse" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm text-white bg-gradient-to-br from-accent to-accent-2 border border-border-strong cursor-pointer"
                aria-label="Account menu"
              >
                {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 glass-solid rounded-xl p-1.5 shadow-2xl shadow-black/50 animate-rise">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <div className="text-sm font-semibold truncate">
                      {user.displayName || "Member"}
                    </div>
                    <div className="text-xs text-muted truncate">
                      {user.email}
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-lg text-muted hover:text-text hover:bg-surface-2 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/profile/app-purchases"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-lg text-muted hover:text-text hover:bg-surface-2 transition-colors"
                  >
                    Purchases
                  </Link>
                  <Link
                    href="/profile/settings"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-lg text-muted hover:text-text hover:bg-surface-2 transition-colors"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg text-bad hover:bg-surface-2 transition-colors cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="btn-ghost !py-1.5">
              Sign in
            </Link>
          )}
        </div>
      </div>

      <nav className="sm:hidden page-shell flex gap-1 pb-2.5 overflow-x-auto">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              isActive(item.href)
                ? "bg-surface-2 text-text"
                : "text-muted",
            )}
          >
            {item.label}
          </Link>
        ))}
        {user && (
          <Link
            href="/upload"
            className={cn(
              "px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap",
              isActive("/upload") ? "bg-surface-2 text-text" : "text-muted",
            )}
          >
            Upload
          </Link>
        )}
      </nav>
    </header>
  );
}
