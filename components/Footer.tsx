import Link from "next/link";
import Logo from "./Logo";

const LINKS: Array<{ title: string; items: Array<{ label: string; href: string }> }> = [
  {
    title: "Discover",
    items: [
      { label: "Today", href: "/" },
      { label: "Top Apps", href: "/apps" },
      { label: "Top Games", href: "/games" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    title: "Developers",
    items: [
      { label: "Submit an app", href: "/upload" },
      { label: "Your profile", href: "/profile" },
      { label: "Settings", href: "/profile/settings" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="page-shell py-10 flex flex-col md:flex-row justify-between gap-8">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <Logo size={26} />
            <span className="font-display font-bold tracking-tight">
              Nova<span className="text-gradient">Market</span>
            </span>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            A curated marketplace for standout apps and games. Hand-picked
            daily — no noise, just the good stuff.
          </p>
        </div>
        <div className="flex gap-16">
          {LINKS.map((col) => (
            <div key={col.title}>
              <div className="label-caps mb-3">{col.title}</div>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted hover:text-text transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="page-shell py-4 text-center text-xs text-faint">
          © 2026 Nova Market. Crafted for the curious.
        </div>
      </div>
    </footer>
  );
}
