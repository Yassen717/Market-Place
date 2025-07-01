import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";

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
      <Header showSearch searchPlaceholder="Search purchases..." />
      <main className="flex-1 px-8 py-10 max-w-3xl mx-auto w-full">
        <h2 className="text-2xl text-black font-bold mb-6">App Purchases</h2>
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