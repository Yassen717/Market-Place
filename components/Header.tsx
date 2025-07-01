"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
}

export default function Header({ 
  showSearch = false, 
  searchPlaceholder = "Search...",
  onSearchChange,
  searchValue = ""
}: HeaderProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b bg-white shadow-sm rounded-b-xl sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="App Marketplace" width={32} height={32} />
        <span className="font-bold text-lg text-black">AppMarketplace</span>
      </div>
      
      {showSearch ? (
        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="#A0AEC0" strokeWidth="2"/>
                <path d="M20 20L17 17" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="rounded-lg border text-black border-gray-200 bg-white pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-colors"
              value={searchValue}
              onChange={e => onSearchChange?.(e.target.value)}
            />
          </div>
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-shadow shadow-sm cursor-pointer">
              <Image src="/avatar.png" alt="User" width={40} height={40} />
            </div>
          </Link>
        </div>
      ) : (
        <>
          <nav className="flex gap-6 text-base font-medium">
            <Link 
              href="/" 
              className={`transition ${isActive("/") ? "text-blue-600" : "hover:text-blue-600"}`}
            >
              Today
            </Link>
            <Link 
              href="/games" 
              className={`transition ${isActive("/games") ? "text-blue-600" : "hover:text-blue-600"}`}
            >
              Games
            </Link>
            <Link 
              href="/apps" 
              className={`transition ${isActive("/apps") ? "text-blue-600" : "hover:text-blue-600"}`}
            >
              Apps
            </Link>
            <Link 
              href="/search" 
              className={`transition ${isActive("/search") ? "text-blue-600" : "hover:text-blue-600"}`}
            >
              Search
            </Link>
          </nav>
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-shadow shadow-sm cursor-pointer">
              <Image src="/avatar.png" alt="User" width={40} height={40} />
            </div>
          </Link>
        </>
      )}
    </header>
  );
} 