import Image from "next/image";

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

const categories = [
  "Games", "Business", "Education", "Entertainment", "Finance", "Food & Drink",
  "Health & Fitness", "Lifestyle", "Medical", "Music", "Navigation", "News",
  "Photo & Video", "Productivity", "Reference", "Shopping", "Social Networking", "Sports",
  "Travel", "Utilities"
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="App Marketplace" width={32} height={32} />
          <span className="font-bold text-lg">AppMarketplace</span>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search apps..."
            className="rounded-lg border px-4 py-2 w-64 focus:outline-none focus:ring"
          />
          <div className="w-10 h-10 rounded-full overflow-hidden border">
            <Image src="/avatar.png" alt="User" width={40} height={40} />
          </div>
        </div>
      </header>

      <main className="flex-1 px-8 py-10 max-w-6xl mx-auto w-full">
        {/* Featured */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Featured</h2>
          <div className="flex gap-8 mb-10 flex-col sm:flex-row">
            {featured.map((item, i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-4 flex-1 flex flex-col items-center shadow-sm">
                <div className="w-full h-32 relative mb-4">
                  <Image src={item.img} alt={item.title} fill className="object-cover rounded-lg" />
                </div>
                <div className="font-semibold text-lg mb-1">{item.title}</div>
                <div className="text-gray-500 text-sm text-center">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Charts */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Top Charts</h2>
          <div className="flex gap-6 mb-4">
            <button className="text-gray-800 font-semibold border-b-2 border-black pb-1">Apps</button>
            <button className="text-gray-400 font-semibold">Games</button>
          </div>
          <ul className="space-y-4">
            {topCharts.map((app, i) => (
              <li key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="w-12 h-12 relative">
                  <Image src={app.img} alt={app.name} fill className="object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{app.name}</div>
                  <div className="text-gray-500 text-xs">{app.category}</div>
                </div>
                <button className="ml-auto bg-gray-200 text-gray-700 px-4 py-1 rounded-full font-semibold text-sm">GET</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Browse Categories */}
        <section>
          <h2 className="text-xl font-bold mb-4">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="bg-gray-100 rounded-xl flex flex-col items-center justify-center p-6 shadow-sm">
                <div className="w-12 h-12 mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                  {/* Placeholder for category icon */}
                  <span className="text-2xl">🏷️</span>
                </div>
                <div className="text-sm font-medium text-center">{cat}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-8 px-8 mt-12">
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
            <a href="#" aria-label="Facebook"><span>🔵</span></a>
            <a href="#" aria-label="Twitter"><span>🐦</span></a>
            <a href="#" aria-label="Website"><span>🌐</span></a>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-4">© 2024 App Marketplace. All rights reserved.</div>
      </footer>
    </div>
  );
}
