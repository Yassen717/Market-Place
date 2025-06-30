import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("Sophia Bennett");
  const [email, setEmail] = useState("sophia@example.com");
  const [success, setSuccess] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("Settings saved!");
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col">
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
              placeholder="Search settings..."
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
      <main className="flex-1 px-8 py-10 max-w-xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        <form className="bg-white rounded-xl shadow p-8 flex flex-col gap-6" onSubmit={handleSave}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">Save Changes</button>
          {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
        </form>
      </main>
    </div>
  );
} 