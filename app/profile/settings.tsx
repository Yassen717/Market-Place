import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Header from "../../components/Header";

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
      <Header showSearch searchPlaceholder="Search settings..." />
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