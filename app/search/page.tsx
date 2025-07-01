"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Header from "../../components/Header";

const results = [
  { name: "Connect", category: "Social Networking", img: "/assets/app-connect.png" },
  { name: "Puzzle Master", category: "Puzzle", img: "/assets/game-puzzle.png" },
  { name: "Farm Life", category: "Simulation", img: "/assets/game-simulation.png" },
  { name: "Capture", category: "Photo & Video", img: "/assets/app-capture.png" },
  { name: "Speed Racer", category: "Racing", img: "/assets/game-racing.png" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const filtered = results.filter(r => r.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col">
      <Header />
      <main className="flex-1 px-8 py-10 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search apps, games..."
            className="w-full rounded-lg border text-black border-gray-200 bg-white px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-colors"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 flex flex-col items-center shadow border border-gray-100">
              <div className="w-16 h-16 relative mb-3 rounded-lg overflow-hidden bg-[#e6e6e6] flex items-center justify-center">
                <Image src={item.img} alt={item.name} fill className="object-contain" />
              </div>
              <div className="font-semibold text-base mb-1 text-gray-800">{item.name}</div>
              <div className="text-gray-500 text-sm text-center">{item.category}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 