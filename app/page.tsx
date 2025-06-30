import Image from "next/image";
import Link from "next/link";

const featured = [
  {
    title: "App of the Day",
    desc: "Discover today's top pick.",
    img: "/assets/featured-app-1.png",
  },
  {
    title: "Game of the Day",
    desc: "Today's most exciting game.",
    img: "/assets/featured-app-2.png",
  },
  {
    title: "App of the Week",
    desc: "This week's standout app.",
    img: "/assets/featured-app-3.png",
  },
];

const topCharts = [
  {
    name: "Connect",
    category: "Social Networking",
    img: "/assets/app-connect.png",
    bg: "bg-[#234144]",
  },
  {
    name: "Capture",
    category: "Photo & Video",
    img: "/assets/app-capture.png",
    bg: "bg-[#e6e6e6]",
  },
  {
    name: "Listen",
    category: "Music",
    img: "/assets/app-listen.png",
    bg: "bg-[#ffe6d6]",
  },
  {
    name: "Organize",
    category: "Productivity",
    img: "/assets/app-organize.png",
    bg: "bg-[#f7e6e6]",
  },
  {
    name: "Move",
    category: "Health & Fitness",
    img: "/assets/app-move.png",
    bg: "bg-[#232c3b]",
  },
];

const categories = [
  { name: "Games", color: "bg-[#234144]", icon: "/assets/cat-games.png" },
  { name: "Business", color: "bg-[#fbeee6]", icon: "/assets/cat-business.png" },
  { name: "Education", color: "bg-[#f7f3ee]", icon: "/assets/cat-education.png" },
  { name: "Entertainment", color: "bg-[#ffe6d6]", icon: "/assets/cat-entertainment.png" },
  { name: "Finance", color: "bg-[#fbeee6]", icon: "/assets/cat-finance.png" },
  { name: "Food & Drink", color: "bg-[#ffe6d6]", icon: "/assets/cat-food.png" },
  { name: "Health & Fitness", color: "bg-[#e6f2e6]", icon: "/assets/cat-health.png" },
  { name: "Lifestyle", color: "bg-[#fbeee6]", icon: "/assets/cat-lifestyle.png" },
  { name: "Medical", color: "bg-[#f7f3ee]", icon: "/assets/cat-medical.png" },
  { name: "Music", color: "bg-[#fff7e6]", icon: "/assets/cat-music.png" },
  { name: "Navigation", color: "bg-[#e6f2f7]", icon: "/assets/cat-navigation.png" },
  { name: "News", color: "bg-[#ffe6d6]", icon: "/assets/cat-news.png" },
  { name: "Photo & Video", color: "bg-[#234144]", icon: "/assets/cat-photo.png" },
  { name: "Productivity", color: "bg-[#fbeee6]", icon: "/assets/cat-productivity.png" },
  { name: "Reference", color: "bg-[#ffe6d6]", icon: "/assets/cat-reference.png" },
  { name: "Shopping", color: "bg-[#f7f3ee]", icon: "/assets/cat-shopping.png" },
  { name: "Social Networking", color: "bg-[#ffe6d6]", icon: "/assets/cat-social.png" },
  { name: "Sports", color: "bg-[#fbeee6]", icon: "/assets/cat-sports.png" },
  { name: "Travel", color: "bg-[#e6f2f7]", icon: "/assets/cat-travel.png" },
  { name: "Utilities", color: "bg-[#f7f3ee]", icon: "/assets/cat-utilities.png" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b bg-white shadow-sm rounded-b-xl sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="App Marketplace" width={32} height={32} />
          <span className="font-bold text-lg text-black">AppMarketplace</span>
        </div>
        <nav className="flex gap-6 text-base font-medium">
          <Link href="/" className="text-blue-600">Today</Link>
          <Link href="/games" className="hover:text-blue-600 transition">Games</Link>
          <Link href="/apps" className="hover:text-blue-600 transition">Apps</Link>
          <Link href="/search" className="hover:text-blue-600 transition">Search</Link>
        </nav>
        <Link href="/profile">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-shadow shadow-sm cursor-pointer">
            <Image src="/avatar.png" alt="User" width={40} height={40} />
          </div>
        </Link>
      </header>

      <main className="flex-1 px-8 py-10 max-w-6xl mx-auto w-full">
        {/* Featured */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Featured</h2>
          <div className="flex gap-8 mb-10 flex-col sm:flex-row">
            {featured.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 flex-1 flex flex-col items-center shadow-md border border-gray-100">
                <div className="w-full h-36 relative mb-4 rounded-lg overflow-hidden">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
                <div className="font-semibold text-lg mb-1 text-gray-800">{item.title}</div>
                <div className="text-gray-500 text-sm text-center">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Charts */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Top Charts</h2>
          <div className="flex gap-6 mb-4">
            <button className="text-gray-800 font-semibold border-b-2 border-black pb-1 bg-transparent">Apps</button>
            <button className="text-gray-400 font-semibold bg-transparent">Games</button>
          </div>
          <ul className="space-y-3">
            {topCharts.map((app, i) => (
              <li key={i} className="flex items-center gap-4 p-3 bg-white rounded-xl shadow border border-gray-100">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${app.bg} shadow-inner relative overflow-hidden`}>
                  <Image src={app.img} alt={app.name} width={44} height={44} className="object-contain" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800 text-base">{app.name}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{app.category}</div>
                </div>
                <button className="ml-auto bg-[#f5f6fa] text-gray-400 px-5 py-1.5 rounded-full font-semibold text-sm border border-gray-200 shadow-none">GET</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Browse Categories */}
        <section>
          <h2 className="text-xl font-bold mb-4">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className={`${cat.color} rounded-xl flex flex-col items-center justify-center p-6 shadow border border-gray-100`}>
                <div className="w-14 h-14 mb-2 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image src={cat.icon} alt={cat.name} width={44} height={44} className="object-contain" />
                </div>
                <div className="text-sm font-medium text-center text-gray-800">{cat.name}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f5f6fa] border-t py-8 px-8 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-bold text-lg mb-1">AppMarketplace</div>
            <div className="text-gray-500 text-sm">Discover your next favorite app.</div>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook"><span className="text-gray-400"><svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="10" /></svg></span></a>
            <a href="#" aria-label="Twitter"><span className="text-gray-400"><svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="10" /></svg></span></a>
            <a href="#" aria-label="Website"><span className="text-gray-400"><svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="10" /></svg></span></a>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-4">© 2024 App Marketplace. All rights reserved.</div>
      </footer>
    </div>
  );
}
