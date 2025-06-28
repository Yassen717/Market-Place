import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f6f8fa] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b bg-white shadow-sm rounded-b-xl sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="App Marketplace" width={32} height={32} />
          <span className="font-bold text-lg text-black">AppMarketplace</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#A0AEC0" strokeWidth="2"/><path d="M20 20L17 17" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            <input
              type="text"
              placeholder="Search apps..."
              className="rounded-lg border text-black border-gray-200 bg-[#f5f6fa] pl-10 pr-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-200 transition"
            />
          </div>
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-shadow shadow-sm cursor-pointer">
              <Image src="/avatar.png" alt="User" width={40} height={40} />
            </div>
          </Link>
        </div>
      </header>
      <div className="flex flex-col items-center py-12 px-2">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-0 overflow-hidden">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-8 border-b">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 bg-[#ffe6d6]">
                <Image src="/avatar.png" alt="User" width={80} height={80} />
              </div>
              <div>
                <div className="font-bold text-2xl text-black">Sophia Bennett</div>
                <div className="text-gray-400 text-sm mt-1">Joined July 2023</div>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition">Edit Profile</button>
          </div>
          {/* Main Content */}
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {/* Menu */}
            <div className="w-full sm:w-1/3 p-8 flex flex-col gap-4">
              <div>
                <div className="font-semibold text-gray-700 mb-4">Menu</div>
                <ul className="space-y-2">
                  <li>
                    <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="white" strokeWidth="2"/></svg>
                      Account
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 6h15M6 12h15M6 18h15M3 6h.01M3 12h.01M3 18h.01" stroke="#64748b" strokeWidth="2"/></svg>
                      App Purchases
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#64748b" strokeWidth="2"/><path d="M12 8v4l2 2" stroke="#64748b" strokeWidth="2"/></svg>
                      Settings
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {/* Account Details */}
            <div className="w-full sm:w-2/3 p-8 flex flex-col gap-8">
              <div>
                <div className="font-semibold text-gray-700 mb-4">Account</div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="bg-gray-100 p-2 rounded-lg">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#64748b" strokeWidth="2"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#64748b" strokeWidth="2"/></svg>
                    </span>
                    <span className="flex-1 text-gray-700">Manage Account</span>
                    <span className="text-gray-300">&gt;</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-gray-100 p-2 rounded-lg">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" stroke="#64748b" strokeWidth="2"/><path d="M7 7V5a5 5 0 0 1 10 0v2" stroke="#64748b" strokeWidth="2"/></svg>
                    </span>
                    <span className="flex-1 text-gray-700">Redeem Gift Card or Code</span>
                    <span className="text-gray-300">&gt;</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-gray-100 p-2 rounded-lg">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" stroke="#64748b" strokeWidth="2"/><path d="M6 7V5a6 6 0 0 1 12 0v2" stroke="#64748b" strokeWidth="2"/></svg>
                    </span>
                    <span className="flex-1 text-gray-700">Payment Methods</span>
                    <span className="text-gray-300">&gt;</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-gray-100 p-2 rounded-lg">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#64748b" strokeWidth="2"/><path d="M8 12h8" stroke="#64748b" strokeWidth="2"/></svg>
                    </span>
                    <span className="flex-1 text-gray-700">Subscriptions</span>
                    <span className="text-gray-300">&gt;</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-4">App Store</div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="bg-gray-100 p-2 rounded-lg">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 17.5l-6-6 1.41-1.41L12 14.67l4.59-4.58L18 11.5z" stroke="#64748b" strokeWidth="2"/></svg>
                    </span>
                    <span className="flex-1 text-gray-700">Personalized Recommendations</span>
                    <span className="text-gray-300">&gt;</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-gray-100 p-2 rounded-lg">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#64748b" strokeWidth="2"/></svg>
                    </span>
                    <span className="flex-1 text-gray-700">Purchased Apps</span>
                    <span className="text-gray-300">&gt;</span>
                  </li>
                </ul>
              </div>
              <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition w-40">Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 