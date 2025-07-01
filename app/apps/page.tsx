import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";

const apps = [
  {
    name: "Connect",
    category: "Social Networking",
    img: "/assets/app-connect.png",
  },
  {
    name: "Capture",
    category: "Photo & Video",
    img: "/assets/app-capture.png",
  },
  {
    name: "Listen",
    category: "Music",
    img: "/assets/app-listen.png",
  },
  {
    name: "Organize",
    category: "Productivity",
    img: "/assets/app-organize.png",
  },
  {
    name: "Move",
    category: "Health & Fitness",
    img: "/assets/app-move.png",
  },
];

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col">
      <Header showSearch searchPlaceholder="Search apps..." />
      <main className="flex-1 px-8 py-10 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl text-black font-bold mb-6">Top Apps</h2>
        <ul className="space-y-4">
          {apps.map((app, i) => (
            <li key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow border border-gray-100">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#e6e6e6] shadow-inner relative overflow-hidden">
                <Image src={app.img} alt={app.name} width={44} height={44} className="object-contain" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-base">{app.name}</div>
                <div className="text-gray-400 text-xs mt-0.5">{app.category}</div>
              </div>
              <button className="ml-auto bg-black hover:bg-gray-800 text-white px-5 py-1.5 rounded-full font-semibold text-sm border border-gray-200 shadow-sm transition-colors">GET</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
} 