"use client";

import Link from "next/link";
import { Stars } from "@/components/AppCard";
import AppIcon from "@/components/AppIcon";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MemberGate from "@/components/profile/MemberGate";
import { PURCHASES, type Purchase } from "@/components/profile/purchases";
import { formatDate, formatPrice } from "@/lib/helpers";

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

function PurchaseRow({ purchase, index }: { purchase: Purchase; index: number }) {
  const { app, purchasedOn } = purchase;
  return (
    <li className="animate-rise" style={{ animationDelay: `${index * 0.06}s` }}>
      <Link
        href={`/app/${app.slug}`}
        className="glass card-hover rounded-2xl flex items-center gap-4 p-3.5 group"
      >
        <AppIcon app={app} size={56} />
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate group-hover:text-accent-2 transition-colors">
            {app.name}
          </div>
          <div className="text-xs text-muted truncate">
            {app.developer} · {app.category}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Stars rating={app.rating} />
            <span className="text-xs text-faint">{app.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-sm font-semibold text-accent-2">
            {app.price === 0 ? "Free" : formatPrice(app.price)}
          </span>
          <span className="text-[11px] text-faint">
            Purchased {formatDate(purchasedOn)}
          </span>
        </div>
      </Link>
    </li>
  );
}

export default function AppPurchasesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="page-shell flex-1 py-10 w-full">
        <div className="max-w-3xl mx-auto">
          <BackLink />
          <h1 className="section-title text-2xl">Purchases</h1>
          <p className="text-sm text-muted mt-1.5 mb-8">
            Apps and games you have picked up on Nova Market.
          </p>
          <MemberGate>
            {() => (
              <>
                <div className="label-caps mb-3">
                  {PURCHASES.length}{" "}
                  {PURCHASES.length === 1 ? "item" : "items"} in your library
                </div>
                <ul className="space-y-3">
                  {PURCHASES.map((purchase, i) => (
                    <PurchaseRow
                      key={purchase.app.slug}
                      purchase={purchase}
                      index={i}
                    />
                  ))}
                </ul>
              </>
            )}
          </MemberGate>
        </div>
      </main>
      <Footer />
    </div>
  );
}
