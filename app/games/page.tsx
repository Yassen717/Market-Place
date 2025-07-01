import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";

const games = [
  {
    name: "Adventure Quest",
    category: "Adventure",
    img: "/assets/game-adventure.png",
  },
  {
    name: "Puzzle Master",
    category: "Puzzle",
    img: "/assets/game-puzzle.png",
  },
  {
    name: "Speed Racer",
    category: "Racing",
    img: "/assets/game-racing.png",
  },
  {
    name: "Battle Arena",
    category: "Action",
    img: "/assets/game-action.png",
  },
  {
    name: "Farm Life",
    category: "Simulation",
    img: "/assets/game-simulation.png",
  },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen text-black bg-[#fafbfc] flex flex-col">
      <Header />
      <main className="flex-1 px-8 py-10 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl text-black font-bold mb-6">Top Games</h2>
        <ul className="space-y-4">
          {games.map((game, i) => (
            <li key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow border border-gray-100">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#e6e6e6] shadow-inner relative overflow-hidden">
                <Image src={game.img} alt={game.name} width={44} height={44} className="object-contain" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-base">{game.name}</div>
                <div className="text-gray-400 text-xs mt-0.5">{game.category}</div>
              </div>
              <button className="ml-auto bg-black hover:bg-gray-800 text-white px-5 py-1.5 rounded-full font-semibold text-sm border border-gray-200 shadow-sm transition-colors">GET</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
} 