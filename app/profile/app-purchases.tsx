import Image from "next/image";
import Link from "next/link";

const purchases = [
  {
    name: "Connect",
    date: "2024-06-01",
    img: "/assets/app-connect.png",
  },
  {
    name: "Puzzle Master",
    date: "2024-05-20",
    img: "/assets/game-puzzle.png",
  },
  {
    name: "Farm Life",
    date: "2024-05-10",
    img: "/assets/game-simulation.png",
  },
];

export default function AppPurchasesPage() {
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
              placeholder="Search purchases..."
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
      <main className="flex-1 px-8 py-10 max-w-3xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6">App Purchases</h2>
        <ul className="space-y-4">
          {purchases.map((item, i) => (
            <li key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow border border-gray-100">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#e6e6e6] shadow-inner relative overflow-hidden">
                <Image src={item.img} alt={item.name} width={44} height={44} className="object-contain" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-base">{item.name}</div>
                <div className="text-gray-400 text-xs mt-0.5">Purchased on {item.date}</div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
} 