"use client"
import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Placeholder for Firebase login logic
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // TODO: Add Firebase login logic here
    setTimeout(() => {
      setLoading(false);
      // setError("Invalid credentials");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8fa] px-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign In to AppMarketplace</h2>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-200 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-200 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition mt-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline font-semibold">Sign Up</Link>
        </div>
      </div>
    </div>
  );
} 