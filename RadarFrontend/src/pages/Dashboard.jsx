import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Search, Maximize2, Settings, Pin, Bell, Menu, X, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, DollarSign, Activity, LogOut, LayoutDashboard, Star, Filter, Newspaper, ChevronRight, ChevronLeft, User, CreditCard, HelpCircle, CheckCircle } from "lucide-react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import "./Dashboard.css";

const mockStock = {
  symbol: "BTC",
  name: "Bitcoin",
  price: "42,500.00",
  change: "+5.2%",
  high: "43,000",
  low: "41,200",
  volume: "24B",
  marketCap: "800B",
};

const priceData = [
  { time: "10:00", price: 41200 },
  { time: "11:00", price: 41800 },
  { time: "12:00", price: 42500 },
  { time: "13:00", price: 42100 },
  { time: "14:00", price: 43000 },
  { time: "15:00", price: 42800 },
  { time: "16:00", price: 43200 },
  { time: "17:00", price: 42900 },
];

const topMovers = [
  { symbol: "SOL", name: "Solana", change: "+12.5%", price: "$98.20" },
  { symbol: "AVAX", name: "Avalanche", change: "+8.1%", price: "$34.50" },
  { symbol: "ETH", name: "Ethereum", change: "+4.2%", price: "$2,250" },
];

const mockNews = [
  {
    id: 1,
    source: "CoinDesk",
    title: "Bitcoin Surges Past $92k Amid ETF Optimism",
    time: "2h ago",
    sentiment: "Bullish",
  },
  {
    id: 2,
    source: "Bloomberg",
    title: "Global Markets Rally as Inflation Data Cools",
    time: "4h ago",
    sentiment: "Neutral",
  },
  {
    id: 3,
    source: "CryptoSlate",
    title: "Miners Holding Onto BTC Despite Price Volatility",
    time: "6h ago",
    sentiment: "Bullish",
  },
];

const dominanceData = [
  { name: "BTC", value: 52 },
  { name: "ETH", value: 17 },
  { name: "Others", value: 31 },
];

const COLORS = ["#00f3ff", "#bc13fe", "#0aff68"];

const defaultTiltOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.02,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.02,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [isTraderMode, setIsTraderMode] = useState(
    localStorage.getItem("mode") === "TRADER"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userInitial, setUserInitial] = useState("U");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const email = localStorage.getItem("email");
    // Fallback logic to get initial
    const name = user ? JSON.parse(user).name : (email ? email.split('@')[0] : "User");
    setUserInitial(name.charAt(0).toUpperCase());
  }, []);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const mockNotifications = [
    { id: 1, text: "BTC broken resistance at $44k", time: "2m ago", read: false },
    { id: 2, text: "New Feature: Options Chain live", time: "1h ago", read: false },
    { id: 3, text: "Margin Call Warning: 80% usage", time: "3h ago", read: true },
  ];

  const toggleMode = () => {
    const newMode = !isTraderMode;
    setIsTraderMode(newMode);
    localStorage.setItem("mode", newMode ? "TRADER" : "INVESTOR");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userMode");
    localStorage.removeItem("mode");
    navigate("/", { state: { skipPreloader: true } });
  };

  const [activeModule, setActiveModule] = useState("DASHBOARD");

  return (
    <div
      className={`dashboard-container ${isTraderMode ? "trader-theme" : "investor-theme"
        }`}
    >
      <header className="navbar">
        <div className="flex items-center">
          <a href="/" className="brand">
            <img
              src="/radar-logo-final.jpg"
              alt="Radar Logo"
              className="logo-img rounded-full"
            />
            <span className="brand-name">RADAR</span>
          </a>
        </div>

        {/* Global Search Bar (Universal Element) */}
        <div className="hidden md:flex flex-1 justify-center mx-8 relative group">
          <div className="relative transition-all duration-300 w-64 focus-within:w-full max-w-2xl">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00f3ff] transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search stocks, indices, news..."
              className="w-full bg-[#1e293b]/80 border border-gray-700 rounded-full py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#00f3ff] focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Mode Toggle Removed - Moved to Menu */}

        <div className="nav-buttons flex items-center gap-4">
          {/* Notification Bell */}
          <div
            className="relative"
            onMouseEnter={() => setIsNotificationsOpen(true)}
            onMouseLeave={() => setIsNotificationsOpen(false)}
          >
            <button
              className={`transition-colors relative w-8 h-8 flex items-center justify-center ${isTraderMode ? "text-gray-400 hover:text-white" : "text-slate-400 hover:text-slate-600"}`}
            >
              <Bell size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {isNotificationsOpen && (
              <div className={`absolute right-0 top-12 w-80 rounded-xl shadow-2xl border py-2 backdrop-blur-xl z-[100] transform origin-top-right transition-all ${isTraderMode
                ? "bg-[#161c27]/95 border-[#293839]"
                : "bg-white/95 border-slate-200"
                }`}>
                <div className="px-4 py-2 border-b border-gray-700/50 flex justify-between items-center">
                  <h3 className={`font-bold text-sm ${isTraderMode ? 'text-white' : 'text-slate-800'}`}>Notifications</h3>
                  <span className="text-xs text-[#00f3ff] cursor-pointer">Mark read</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {mockNotifications.map(n => (
                    <div key={n.id} className={`px-4 py-3 border-b border-gray-700/30 hover:bg-gray-700/20 cursor-pointer flex gap-3 ${!n.read ? 'bg-blue-500/5' : ''}`}>
                      <div className="mt-1"><CheckCircle size={14} className={n.read ? "text-gray-500" : "text-[#00f3ff]"} /></div>
                      <div>
                        <p className={`text-xs font-semibold ${isTraderMode ? 'text-gray-200' : 'text-slate-700'}`}>{n.text}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 text-center text-xs text-gray-500 cursor-pointer hover:text-[#00f3ff]">View all activity</div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-blue-500 transition-all"
            >
              {userInitial}
            </div>

            {isProfileOpen && (
              <div className={`absolute right-0 top-12 w-72 rounded-xl shadow-2xl border py-2 backdrop-blur-xl z-[100] transform origin-top-right transition-all ${isTraderMode
                ? "bg-[#161c27]/95 border-[#293839]"
                : "bg-white/95 border-slate-200"
                }`}>
                <div className="px-4 py-4 border-b border-gray-700/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-base font-bold text-white">
                    {userInitial}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${isTraderMode ? 'text-white' : 'text-slate-800'}`}>Current User</p>
                    <p className="text-xs text-gray-500">user@radar.com</p>
                  </div>
                </div>

                {/* Mode Switching Section */}
                <div className="border-b border-gray-700/50 py-2">
                  <div className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider mb-1 ${isTraderMode ? 'text-gray-500' : 'text-slate-400'}`}>
                    Switch Mode
                  </div>

                  <button
                    onClick={() => {
                      setIsTraderMode(false);
                      localStorage.setItem("mode", "INVESTOR");
                      setIsProfileOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors group ${!isTraderMode
                      ? "bg-blue-50/50"
                      : "hover:bg-[#293839]"
                      }`}
                  >
                    <Activity size={16} className={`${!isTraderMode ? "text-blue-600" : "text-gray-400 group-hover:text-white"}`} />
                    <span className={`text-sm font-medium ${!isTraderMode ? "text-slate-800" : "text-gray-300 group-hover:text-white"}`}>Investor</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsTraderMode(true);
                      localStorage.setItem("mode", "TRADER");
                      setIsProfileOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors group ${isTraderMode
                      ? "bg-[#293839]/50"
                      : "hover:bg-slate-50"
                      }`}
                  >
                    <TrendingUp size={16} className={`${isTraderMode ? "text-[#00f3ff]" : "text-slate-400 group-hover:text-slate-600"}`} />
                    <span className={`text-sm font-medium ${isTraderMode ? "text-white" : "text-slate-700"}`}>Trader</span>
                  </button>
                </div>

                <div className="py-2">
                  <button className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 ${isTraderMode ? 'text-gray-300 hover:bg-[#293839]' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <User size={16} /> My Profile
                  </button>

                  <button className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 ${isTraderMode ? 'text-gray-300 hover:bg-[#293839]' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <Settings size={16} /> Settings
                  </button>
                  <button className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 ${isTraderMode ? 'text-gray-300 hover:bg-[#293839]' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <HelpCircle size={16} /> Help & Support
                  </button>
                </div>
                <div className="border-t border-gray-700/50 pt-2 pb-1">
                  <button onClick={handleLogout} className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 text-red-500 hover:bg-red-500/10`}>
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar rendered outside main content to fix z-index/transform issues */}
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} isTrader={isTraderMode} isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      < main className="content fade-in transition-all duration-300" style={{ marginLeft: isSidebarOpen ? '250px' : '70px' }}>
        {
          isTraderMode ? (
            <TraderView data={mockStock} activeModule={activeModule} />
          ) : (
            <InvestorView data={mockStock} movers={topMovers} activeModule={activeModule} />
          )}
      </main >
    </div >
  );
}

// --- New Components for Refined Dashboard ---

const Sidebar = ({ activeModule, setActiveModule, isTrader, isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 'DASHBOARD', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { id: 'WATCHLIST', icon: <Star size={18} />, label: 'Watchlist' },
    { id: 'SCREENERS', icon: <Filter size={18} />, label: 'Screeners' },
    { id: 'NEWS', icon: <Newspaper size={18} />, label: 'News' },
    { id: 'SETTINGS', icon: <Settings size={18} />, label: 'Settings' },
  ];

  return (
    <aside
      className="investor-sidebar transition-all duration-300 ease-in-out border-r border-[#293839]"
      style={{ width: isOpen ? '250px' : '70px' }}
    >
      {/* Toggle Button */}
      <div
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-[#293839] text-[#9194a2] p-1 rounded-full cursor-pointer hover:text-white hover:bg-[#3db26b] transition-colors shadow-md z-50 flex items-center justify-center w-6 h-6 border border-[#161c27]"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors relative group ${activeModule === item.id
              ? (isTrader ? 'bg-[#293839] text-[#3db26b] border-r-2 border-[#3db26b]' : 'bg-slate-100 text-blue-600 border-r-2 border-blue-600')
              : 'text-[#9194a2] hover:bg-[#293839]/50 hover:text-white'}`}
            onClick={() => setActiveModule(item.id)}
            title={!isOpen ? item.label : ''}
          >
            <span className="min-w-[20px] flex justify-center">{item.icon}</span>
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              {item.label}
            </span>

            {/* Tooltip for collapsed state */}
            {!isOpen && (
              <div className="absolute left-14 bg-[#161c27] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-[#293839] z-50 whitespace-nowrap">
                {item.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

const TickerTape = () => (
  <div className="ticker-tape-container">
    <div className="ticker-content">
      <div className="ticker-item-inline">NIFTY 16,250 <span className="text-red-500">▼ 0.35%</span></div>
      <div className="ticker-item-inline">SENSEX 54,100 <span className="text-red-500">▼ 0.29%</span></div>
      <div className="ticker-item-inline">S&P 500 4,300 <span className="text-green-500">▲ 0.4%</span></div>
      <div className="ticker-item-inline">FTSE 7,620 <span className="text-gray-500">0.0%</span></div>
      <div className="ticker-item-inline">NIKKEI 32,900 <span className="text-red-500">▼ 0.2%</span></div>
      {/* Duplicate for infinite loop effect */}
      <div className="ticker-item-inline">NIFTY 16,250 <span className="text-red-500">▼ 0.35%</span></div>
      <div className="ticker-item-inline">SENSEX 54,100 <span className="text-red-500">▼ 0.29%</span></div>
      <div className="ticker-item-inline">S&P 500 4,300 <span className="text-green-500">▲ 0.4%</span></div>
      <div className="ticker-item-inline">FTSE 7,620 <span className="text-gray-500">0.0%</span></div>
      <div className="ticker-item-inline">NIKKEI 32,900 <span className="text-red-500">▼ 0.2%</span></div>
    </div>
  </div>
);

const MarketMoodGauge = () => (
  <div className="investor-card p-6 h-full flex flex-col justify-between">
    <div className="card-header flex justify-between">
      <h3 className="text-lg font-bold text-slate-800">Market Mood Index</h3>
      <span className="text-gray-400">⋮</span>
    </div>

    <div className="gauge-chart-wrapper mt-4">
      {/* Visual representation of a gauge using CSS borders/gradients or SVG */}
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e2e8f0" strokeWidth="20" />
        <path d="M 20 100 A 80 80 0 0 1 100 20" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="125 250" />
        <path d="M 100 20 A 80 80 0 0 1 180 100" fill="none" stroke="#22c55e" strokeWidth="20" strokeDasharray="125 250" />
        {/* Needle */}
        <line x1="100" y1="100" x2="140" y2="60" stroke="#334155" strokeWidth="4" className="gauge-needle" />
        <circle cx="100" cy="100" r="10" fill="#334155" />
      </svg>
    </div>

    <div className="flex justify-between text-xs font-semibold text-slate-500 mt-2">
      <span>Extreme Fear</span>
      <span>Greed</span>
    </div>
    <p className="text-xs text-center text-slate-400 mt-2">Market leaning towards greed.</p>
  </div>
);

const ValuationThermometer = () => (
  <div className="investor-card p-6 h-full flex flex-col">
    <div className="card-header flex justify-between mb-4">
      <h3 className="text-lg font-bold text-slate-800">Valuation Thermometer</h3>
      <span className="text-gray-400">⋮</span>
    </div>

    <div className="space-y-4 flex-1">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-slate-600">NIFTY 50 P/E</span>
        <span className="font-bold text-xl text-slate-800">21.8</span>
      </div>
      <div className="flex justify-between text-xs text-slate-400 border-b border-gray-100 pb-2">
        <span>5 Year Avg.</span>
        <span>20.0 / 3.8</span>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-slate-600">P/B Ratio</span>
        <span className="font-bold text-xl text-slate-800">4.1</span>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full"></div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>Cheap</span>
          <span>Fair</span>
          <span>Expensive</span>
        </div>
      </div>
    </div>
    <p className="text-xs text-slate-400 mt-4">Near 5-year average valuations.</p>
  </div>
);

const GlobalPulse = () => (
  <div className="investor-card p-6 h-full">
    <div className="card-header mb-4">
      <h3 className="text-lg font-bold text-slate-800">Global Pulse</h3>
    </div>
    <div className="space-y-4">
      {[
        { name: "S&P 500", val: "4,300", change: "▲ 0.4%", code: "US" },
        { name: "FTSE", val: "7,620", change: "▲ 0.0%", code: "UK" },
        { name: "NIKKEI", val: "32,900", change: "▼ 0.2%", code: "JP" }
      ].map((m, i) => (
        <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
          <div className="flex items-center gap-2">
            <span className="text-lg">{m.code === 'US' ? '🇺🇸' : m.code === 'UK' ? '🇬🇧' : '🇯🇵'}</span>
            <div>
              <div className="font-bold text-sm text-slate-700">{m.name}</div>
              <div className={`text-xs ${m.change.includes('▲') ? 'text-green-500' : 'text-red-500'}`}>{m.change}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-sm text-slate-700">{m.val}</div>
            {/* Mini Sparkline using text characters as styling mockup */}
            <div className="text-xs text-slate-300 tracking-tighter">∿∿∿∿</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DiscoveryShelves = () => (
  <div className="investor-card p-6 h-full">
    <div className="card-header mb-4">
      <h3 className="text-lg font-bold text-slate-800">Discovery "Shelves"</h3>
    </div>
    <div className="space-y-0">
      {[
        { title: "Buffettology", desc: "High ROE, Low Debt, Consistent Margins", icon: "💎" },
        { title: "Dividend Aristocrats", desc: "Increasing dividends for > 5 years", icon: "🛡️" },
        { title: "Undervalued Giants", desc: "Blue-chip stocks near 52-week lows", icon: "📉" },
        { title: "Growth at Reasonable Price", desc: "PEG Ratio < 1", icon: "🚀" },
      ].map((item, i) => (
        <div key={i} className="feature-item hover:bg-slate-50 p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="feature-icon bg-slate-100 p-2 rounded-full w-10 h-10 flex items-center justify-center text-lg">{item.icon}</div>
            <div>
              <div className="font-bold text-sm text-slate-700">{item.title}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </div>
          </div>
          <span className="text-gray-300">›</span>
        </div>
      ))}
    </div>
  </div>
);


const SectorLandscape = () => (
  <div className="investor-card p-6 col-span-2">
    <div className="card-header flex justify-between mb-4">
      <h3 className="text-lg font-bold text-slate-800">Sector Landscape</h3>
      <div className="flex gap-2">
        <button className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">1 Year</button>
        <button className="text-xs bg-white border px-2 py-1 rounded text-slate-400">3 Years</button>
      </div>
    </div>
    <div className="h-40 flex items-end justify-between gap-4 px-4 border-b border-gray-100 pb-4">
      {[
        { label: "Auto", height: "60%", color: "bg-emerald-500", val: "+39%" },
        { label: "IT", height: "40%", color: "bg-teal-400", val: "+26%" },
        { label: "Banks", height: "20%", color: "bg-blue-500", val: "+8%" },
        { label: "Pharma", height: "15%", color: "bg-indigo-400", val: "+5%" },
        { label: "FMCG", height: "30%", color: "bg-slate-400", val: "+12%" }
      ].map((bar, i) => (
        <div key={i} className="flex flex-col items-center flex-1 group cursor-pointer">
          <div className={`w-full max-w-[40px] rounded-t-sm transition-all group-hover:opacity-80 ${bar.color}`} style={{ height: bar.height }}></div>
          <span className="text-xs font-bold text-slate-700 mt-2">{bar.label}</span>
          <span className="text-[10px] text-green-600 font-medium">{bar.val}</span>
        </div>
      ))}
    </div>
  </div>
);


function InvestorView({ data, movers, activeModule }) {
  // Simple check to show active module (Placeholder for actual full logic)
  if (activeModule && activeModule !== 'DASHBOARD') {
    return (
      <div className="dashboard-layout fade-in flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-700 mb-2">{activeModule}</h2>
          <p className="text-slate-500">Module under development.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout fade-in">
      {/* Sidebar removed from here, now in Dashboard */}
      <div className="main-content-area" style={{ transition: 'margin-left 0.3s ease' }}>
        {/* Top Ticker */}
        <TickerTape />

        {/* Top Widget Row - Barometer & Pulse */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          <MarketMoodGauge />
          <ValuationThermometer />
          <GlobalPulse />
        </div>

        {/* Middle Widget Row - Discovery & Landscape */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-1">
            <DiscoveryShelves />
          </div>
          <div className="md:col-span-2 space-y-6">
            <SectorLandscape />

            {/* Small bottom widgets */}
            <div className="grid grid-cols-2 gap-6">
              <div className="investor-card p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Economic Calendar</h3>
                <div className="space-y-3">
                  <div className="text-xs flex justify-between"><span className="flex items-center gap-2">🇺🇸 FOMC Meeting</span> <span className="text-slate-400">July 5</span></div>
                  <div className="text-xs flex justify-between"><span className="flex items-center gap-2">🇯🇵 Inflation Data</span> <span className="text-slate-400">July 12</span></div>
                </div>
              </div>
              <div className="investor-card p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Trending Themes</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 text-green-700 text-xs p-2 rounded font-medium text-center">Green Energy</div>
                  <div className="bg-blue-50 text-blue-700 text-xs p-2 rounded font-medium text-center">EV Ecosystem</div>
                  <div className="bg-orange-50 text-orange-700 text-xs p-2 rounded font-medium text-center">Defense</div>
                  <div className="bg-purple-50 text-purple-700 text-xs p-2 rounded font-medium text-center">AI Tech</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const Sparkline = ({ data, color }) => (
  <div style={{ width: 60, height: 30 }}>
    <ResponsiveContainer>
      <AreaChart data={data}>
        <Area type="monotone" dataKey="price" stroke={color} fill="none" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

// Enhanced Trader Components for Professional Look

const SectorHeatmap = () => (
  <div className="trader-card col-span-4 row-span-1 flex flex-col h-full bg-[#161c27] border border-[#293839]">
    <div className="card-header flex justify-between items-center mb-2 px-2 py-1 bg-[#1c222e] border-b border-[#293839]">
      <h3 className="text-[#9194a2] font-bold text-xs tracking-wider">SECTOR HEATMAP</h3>
      <div className="flex gap-2">
        <span className="text-[10px] text-[#5d606b]">NIFTY 500</span>
        <span className="text-[#9194a2] text-xs cursor-pointer hover:text-white">●●●</span>
      </div>
    </div>
    <div className="flex-1 grid grid-cols-6 grid-rows-2 gap-1 p-1">
      {/* Major Blocks */}
      <motion.div whileHover={{ scale: 0.98 }} className="col-span-2 row-span-2 bg-[#14532d] flex flex-col justify-center items-center rounded-sm border border-black/20 relative overflow-hidden group cursor-pointer shadow-lg shadow-green-900/20">
        <div className="absolute top-1 right-1 text-[9px] text-green-300 opacity-50">Vol: 2.1M</div>
        <span className="text-white font-bold text-sm drop-shadow-md">FINANCIALS</span>
        <span className="text-[#4ade80] text-xs font-mono font-bold">+1.85%</span>
      </motion.div>
      <motion.div whileHover={{ scale: 0.98 }} className="col-span-2 row-span-2 bg-[#14532d] flex flex-col justify-center items-center rounded-sm border border-black/20 cursor-pointer shadow-lg shadow-green-900/20">
        <span className="text-white font-bold text-sm drop-shadow-md">TECHNOLOGY</span>
        <span className="text-[#4ade80] text-xs font-mono font-bold">+1.42%</span>
      </motion.div>

      {/* Minor Blocks */}
      <motion.div className="bg-[#7f1d1d] flex flex-col justify-center items-center rounded-sm cursor-pointer hover:opacity-90 shadow-md">
        <span className="text-white text-[10px] font-semibold drop-shadow-sm">AUTO</span>
        <span className="text-[#fecaca] text-[10px] font-mono font-bold">-0.45%</span>
      </motion.div>
      <motion.div className="bg-[#14532d] flex flex-col justify-center items-center rounded-sm cursor-pointer hover:opacity-90 shadow-md">
        <span className="text-white text-[10px] font-semibold drop-shadow-sm">PHARMA</span>
        <span className="text-[#4ade80] text-[10px] font-mono font-bold">+0.20%</span>
      </motion.div>
      <motion.div className="bg-[#334155] flex flex-col justify-center items-center rounded-sm cursor-pointer hover:opacity-90 shadow-md">
        <span className="text-white text-[10px] font-semibold drop-shadow-sm">FMCG</span>
        <span className="text-[#cbd5e1] text-[10px] font-mono font-bold">0.00%</span>
      </motion.div>
      <motion.div className="bg-[#991b1b] flex flex-col justify-center items-center rounded-sm cursor-pointer hover:opacity-90 shadow-md">
        <span className="text-white text-[10px] font-semibold drop-shadow-sm">METALS</span>
        <span className="text-[#fecaca] text-[10px] font-mono font-bold">-1.10%</span>
      </motion.div>
    </div>
  </div>
);

const GapLists = () => {
  const [activeTab, setActiveTab] = useState('GAINERS');

  return (
    <div className="trader-card col-span-2 flex flex-col h-full bg-[#161c27] border border-[#293839]">
      <div className="card-header flex justify-between items-center mb-2 px-2 py-1 bg-[#1c222e] border-b border-[#293839]">
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('GAINERS')} className={`text-[10px] font-bold tracking-wider ${activeTab === 'GAINERS' ? 'text-[#3db26b]' : 'text-[#9194a2]'}`}>GAINERS</button>
          <span className="text-[#293839]">|</span>
          <button onClick={() => setActiveTab('LOSERS')} className={`text-[10px] font-bold tracking-wider ${activeTab === 'LOSERS' ? 'text-[#ed5750]' : 'text-[#9194a2]'}`}>LOSERS</button>
        </div>
        <Maximize2 size={10} className="text-[#9194a2] cursor-pointer hover:text-white" />
      </div>
      <div className="flex-1 space-y-0.5 overflow-y-auto pr-1 custom-scrollbar p-1">
        {(activeTab === 'GAINERS' ? [
          { s: 'TCS', v: '+2.5%', c: 'text-[#3db26b]' },
          { s: 'INFY', v: '+1.8%', c: 'text-[#3db26b]' },
          { s: 'WIPRO', v: '+1.1%', c: 'text-[#3db26b]' },
          { s: 'TECHM', v: '+0.9%', c: 'text-[#3db26b]' },
          { s: 'LTIM', v: '+0.8%', c: 'text-[#3db26b]' },
        ] : [
          { s: 'ADANIENT', v: '-3.2%', c: 'text-[#ed5750]' },
          { s: 'TATAMOTORS', v: '-2.1%', c: 'text-[#ed5750]' },
          { s: 'SBIN', v: '-1.5%', c: 'text-[#ed5750]' },
          { s: 'BAJFINANCE', v: '-1.2%', c: 'text-[#ed5750]' },
        ]).map((i, idx) => (
          <div key={idx} className="flex justify-between items-center bg-[#293839]/20 px-2 py-1 rounded hover:bg-[#293839] cursor-pointer transition-colors border-b border-[#293839]/30">
            <span className="font-semibold text-[#e2e8f0] text-[11px]">{i.s}</span>
            <span className={`${i.c} font-mono text-[11px] font-bold`}>{i.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const VolumeShockers = () => (
  <div className="trader-card col-span-2 flex flex-col h-full bg-[#161c27] border border-[#293839]">
    <div className="card-header flex justify-between items-center mb-2 px-2 py-1 bg-[#1c222e] border-b border-[#293839]">
      <h3 className="text-[#9194a2] font-bold text-xs tracking-wider">VOL SHOCKERS</h3>
    </div>
    <div className="flex-1 space-y-0.5 overflow-y-auto pr-1 custom-scrollbar p-1">
      {[
        { s: 'ADANIENT', v: '3.5x', c: 'text-purple-400', p: 80 },
        { s: 'HDFCBANK', v: '2.8x', c: 'text-blue-400', p: 60 },
        { s: 'IDEA', v: '2.1x', c: 'text-orange-400', p: 45 },
        { s: 'RELIANCE', v: '1.9x', c: 'text-[#9194a2]', p: 30 },
        { s: 'TATAMOTORS', v: '1.8x', c: 'text-[#9194a2]', p: 25 },
      ].map((i, idx) => (
        <div key={idx} className="flex justify-between items-center bg-[#293839]/20 px-2 py-1 rounded hover:bg-[#293839] cursor-pointer transition-colors border-b border-[#293839]/30">
          <span className="font-semibold text-[#e2e8f0] text-[11px] w-16">{i.s}</span>
          <div className="flex flex-1 items-center gap-2 justify-end">
            <div className="h-1 w-10 bg-[#161c27] rounded-full overflow-hidden">
              <div style={{ width: `${i.p}%` }} className={`h-full ${i.c.replace('text-', 'bg-')}`}></div>
            </div>
            <span className={`${i.c} font-mono text-[11px] font-bold`}>{i.v}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdvancedWatchlist = () => (
  <div className="trader-card col-span-4 flex flex-col h-full bg-[#161c27] border border-[#293839]">
    <div className="card-header flex justify-between items-center mb-2 px-2 py-1 bg-[#1c222e] border-b border-[#293839]">
      <h3 className="text-[#9194a2] font-bold text-xs tracking-wider">ADVANCED WATCHLIST</h3>
      <div className="flex gap-2 text-[#9194a2]">
        <div className="flex items-center gap-1 text-[10px] bg-[#293839] px-1.5 rounded">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Live
        </div>
        <Search size={12} className="cursor-pointer hover:text-white" />
        <span className="cursor-pointer hover:text-white text-xs">⋮</span>
      </div>
    </div>
    <div className="flex-1 overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#1c222e]">
          <tr className="text-[9px] text-[#5d606b] font-bold uppercase tracking-wider">
            <th className="py-2 pl-2">Symbol</th>
            <th className="py-2 text-right">LTP</th>
            <th className="py-2 text-right">%</th>
            <th className="py-2 text-right text-gray-500">Bid</th>
            <th className="py-2 text-right text-gray-500">Ask</th>
            <th className="py-2 text-right pr-2">Vol</th>
          </tr>
        </thead>
        <tbody className="text-[11px]">
          {[
            { sym: "TCS", ltp: "3,450.00", chg: "+1.2%", bid: "3449.50", ask: "3450.10", data: priceData, vol: 85 },
            { sym: "INFY", ltp: "1,420.50", chg: "-0.5%", bid: "1420.00", ask: "1420.60", data: [...priceData].reverse(), vol: 45 },
            { sym: "BANKNIFTY", ltp: "44,200", chg: "+0.8%", bid: "44190", ask: "44210", data: priceData, vol: 90 },
            { sym: "RELIANCE", ltp: "2,550.00", chg: "+0.3%", bid: "2549.80", ask: "2550.20", data: priceData, vol: 30 },
            { sym: "HDFCBANK", ltp: "1,650.00", chg: "+0.6%", bid: "1649.50", ask: "1650.10", data: priceData, vol: 60 },
            { sym: "ADANIENT", ltp: "2,400.00", chg: "-1.2%", bid: "2398.00", ask: "2402.00", data: [...priceData].reverse(), vol: 70 },
            { sym: "SBIN", ltp: "580.00", chg: "+0.2%", bid: "579.80", ask: "580.10", data: priceData, vol: 20 },
            { sym: "WIPRO", ltp: "410.00", chg: "-0.1%", bid: "409.90", ask: "410.15", data: priceData, vol: 25 },
            { sym: "ICICIBANK", ltp: "950.00", chg: "+0.4%", bid: "949.50", ask: "950.50", data: priceData, vol: 55 },
          ].map((row, i) => (
            <tr key={i} className="border-b border-[#293839]/50 hover:bg-[#293839] transition-colors group cursor-pointer">
              <td className="py-1.5 pl-2 font-bold text-[#e2e8f0] group-hover:text-white">{row.sym}</td>
              <td className="py-1.5 text-right text-[#e2e8f0] font-mono">{row.ltp}</td>
              <td className={`py-1.5 text-right ${row.chg.includes('+') ? 'text-[#3db26b]' : 'text-[#ed5750]'} font-mono`}>{row.chg}</td>
              <td className="py-1.5 text-right text-gray-500 font-mono text-[10px]">{row.bid}</td>
              <td className="py-1.5 text-right text-gray-500 font-mono text-[10px]">{row.ask}</td>
              <td className="py-1.5 text-right pr-2">
                <div className="w-12 h-1 bg-[#161c27] ml-auto rounded overflow-hidden">
                  <div style={{ width: `${row.vol}%` }} className="h-full bg-[#5d606b]"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const MultiChartGrid = ({ className }) => (
  <div className={`${className} h-full`}>
    <div className="trader-card h-full flex flex-col bg-[#161c27] border border-[#293839] p-0">
      <div className="flex justify-between items-center px-3 py-1 bg-[#1c222e] border-b border-[#293839]">
        <h3 className="text-[#9194a2] font-bold text-xs">MULTI-CHART WORKSPACE</h3>
        <div className="flex gap-2 items-center">
          <span className="text-[10px] text-[#5d606b] mr-2">LAYOUT: 4-GRID</span>
          <button className="text-[10px] px-2 py-0.5 bg-[#293839] text-[#e2e8f0] rounded hover:bg-black">1H</button>
          <button className="text-[10px] px-2 py-0.5 bg-[#3db26b] text-white rounded">15M</button>
          <button className="text-[10px] px-2 py-0.5 bg-[#293839] text-[#e2e8f0] rounded hover:bg-black">5M</button>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-px bg-[#293839]">
        {['NIFTY 50', 'BANKNIFTY', 'RELIANCE', 'HDFCBANK'].map((title, i) => (
          <div key={i} className="bg-[#161c27] relative p-1 group flex flex-col">
            <div className="flex justify-between text-xs mb-1 px-2 pt-1 border-b border-[#293839]/30 pb-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[#e2e8f0] font-bold text-[11px]">{title}</span>
                  <span className={i % 2 === 0 ? "text-[#3db26b] text-[10px] font-mono" : "text-[#ed5750] text-[10px] font-mono"}>{i % 2 === 0 ? "18500 (+0.5%)" : "2400 (-0.2%)"}</span>
                </div>
                <div className="flex gap-2 text-[9px] text-[#5d606b] font-mono mt-0.5 opacity-80">
                  <span>O:<span className="text-[#9194a2]">{18420 + i * 50}</span></span>
                  <span>H:<span className="text-[#9194a2]">{18550 + i * 50}</span></span>
                  <span>L:<span className="text-[#9194a2]">{18400 + i * 50}</span></span>
                  <span>C:<span className="text-[#9194a2]">{18500 + i * 50}</span></span>
                </div>
              </div>
              <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity items-center">
                <span className="cursor-pointer hover:text-white text-[9px] font-mono border border-current px-1 rounded">fx</span>
                <Settings size={12} className="cursor-pointer hover:text-white" />
                <Maximize2 size={12} className="cursor-pointer hover:text-white" />
                <Pin size={12} className="cursor-pointer hover:text-white" />
              </div>
            </div>

            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceData}>
                  <defs>
                    <linearGradient id={`grad${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={i % 2 === 0 ? "#3db26b" : "#c14843"} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={i % 2 === 0 ? "#3db26b" : "#c14843"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#161c27', border: '1px solid #293839', fontSize: '10px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <XAxis dataKey="time" hide />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={i % 2 === 0 ? "#3db26b" : "#c14843"}
                    fill={`url(#grad${i})`}
                    strokeWidth={1.5}
                    isAnimationActive={false}
                  />
                  <CartesianGrid stroke="#293839" strokeDasharray="3 3" vertical={false} />
                </AreaChart>
              </ResponsiveContainer>
              {/* Fake Indicator Overlay */}
              <div className="absolute bottom-2 left-2 text-[9px] text-[#5d606b] font-mono pointer-events-none">
                VOL: 1.2M  MA(50): 18450
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const QuickTradePanel = () => {
  const [orderType, setOrderType] = useState('LIMIT');
  const [qty, setQty] = useState(50);

  return (
    <div className="trader-card bg-[#161c27] border border-[#293839] flex flex-col gap-2 p-2 h-full">
      <div className="flex justify-between items-center border-b border-[#293839] pb-2">
        <h3 className="text-[#9194a2] font-bold text-xs">QUICK ORDER</h3>
        <div className="flex bg-[#293839] rounded p-0.5">
          <button onClick={() => setOrderType('LIMIT')} className={`px-2 py-0.5 text-[9px] font-bold rounded transition-colors ${orderType === 'LIMIT' ? 'bg-[#5f6377] text-white' : 'text-[#9194a2] hover:text-white'}`}>LMT</button>
          <button onClick={() => setOrderType('MKT')} className={`px-2 py-0.5 text-[9px] font-bold rounded transition-colors ${orderType === 'MKT' ? 'bg-[#5f6377] text-white' : 'text-[#9194a2] hover:text-white'}`}>MKT</button>
        </div>
      </div>

      {/* Market Depth Visual */}
      <div className="flex h-12 gap-1 mb-1">
        <div className="flex-1 flex flex-col gap-px">
          <div className="flex justify-between text-[9px] text-[#9194a2]"><span>BID</span><span>QTY</span></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex justify-between text-[9px] text-green-400 font-mono relative">
              <div className="absolute bg-green-500/10 h-full left-0" style={{ width: `${100 - i * 20}%` }}></div>
              <span className="z-10 bg-[#161c27]/80 px-1">18500.{50 - i * 5}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-px">
          <div className="flex justify-between text-[9px] text-[#9194a2]"><span>ASK</span><span>QTY</span></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex justify-between text-[9px] text-red-400 font-mono relative">
              <div className="absolute bg-red-500/10 h-full right-0" style={{ width: `${100 - i * 15}%` }}></div>
              <div className="z-10 flex justify-between w-full px-1 bg-[#161c27]/80">
                <span>18500.{50 + i * 5}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1 flex-1 flex flex-col justify-center">
        {/* Quantity Presets */}
        <div className="flex gap-1 justify-between mb-1">
          {[50, 100, 250, 500].map(q => (
            <button key={q} onClick={() => setQty(q)} className={`text-[9px] px-1 py-0.5 rounded border border-[#293839] ${qty === q ? 'bg-[#3db26b] text-white' : 'text-[#9194a2] hover:bg-[#293839]'}`}>{q}</button>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs bg-[#11151e] p-1.5 rounded border border-[#293839]">
          <span className="text-[#9194a2] font-bold px-1 text-[10px]">QTY</span>
          <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="bg-transparent text-right text-white w-20 outline-none font-mono text-sm" />
        </div>
        {orderType === 'LIMIT' && (
          <div className="flex items-center justify-between text-xs bg-[#11151e] p-1.5 rounded border border-[#293839]">
            <span className="text-[#9194a2] font-bold px-1 text-[10px]">PRICE</span>
            <input type="number" defaultValue="18500.50" className="bg-transparent text-right text-white w-20 outline-none font-mono text-sm" />
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-auto pt-2">
        <button className="flex-1 py-3 text-xs font-black rounded shadow-lg transition-transform active:scale-95 bg-[#3db26b] hover:bg-[#33965a] text-white border-b-2 border-[#267540]">
          BUY
        </button>
        <button className="flex-1 py-3 text-xs font-black rounded shadow-lg transition-transform active:scale-95 bg-[#ed5750] hover:bg-[#d64540] text-white border-b-2 border-[#a3322d]">
          SELL
        </button>
      </div>
    </div>
  );
};

const TechnicalScreeners = () => {
  const [activeTab, setActiveTab] = useState('BREAKOUT');
  return (
    <div className="trader-card flex flex-col h-full bg-[#161c27] border border-[#293839]">
      <div className="flex border-b border-[#293839] mb-2 bg-[#1c222e]">
        <button onClick={() => setActiveTab('BREAKOUT')} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider ${activeTab === 'BREAKOUT' ? 'border-b-2 border-[#3db26b] text-[#3db26b] bg-[#293839]/50' : 'border-transparent text-[#9194a2] hover:text-[#e2e8f0]'}`}>Breakout Alerts</button>
        <button onClick={() => setActiveTab('INDICATOR')} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider ${activeTab === 'INDICATOR' ? 'border-b-2 border-[#3db26b] text-[#3db26b] bg-[#293839]/50' : 'border-transparent text-[#9194a2] hover:text-[#e2e8f0]'}`}>Indicator Signals</button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
        {activeTab === 'BREAKOUT' ? (
          <div className="space-y-1">
            {[
              { s: 'INFY', m: 'Vol Breakout > 200%', v: '1420', c: 'text-[#3db26b]', t: '14:30' },
              { s: 'BANKNIFTY', m: 'Day High Break', v: '44250', c: 'text-[#3db26b]', t: '14:15' },
              { s: 'TCS', m: 'Support Crack S1', v: '3440', c: 'text-[#ed5750]', t: '13:45' },
              { s: 'RELIANCE', m: 'VWAP Cross Up', v: '2560', c: 'text-[#3db26b]', t: '13:10' },
            ].map((i, k) => (
              <div key={k} className="flex justify-between items-center p-2 rounded hover:bg-[#293839]/50 text-xs border-b border-[#293839]/30">
                <div className="flex items-center gap-2">
                  <span className="text-[#5d606b] font-mono text-[9px]">{i.t}</span>
                  <span className="font-bold text-[#e2e8f0] w-20">{i.s}</span>
                  <span className="text-[#9194a2] text-[10px] bg-[#293839] px-1 rounded">{i.m}</span>
                </div>
                <span className={`${i.c} font-mono font-bold`}>{i.v}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            <div className="text-[#9194a2] text-xs text-center py-4">Scanning active markets...</div>
          </div>
        )}
      </div>
    </div>
  );
};

const FODashboard = () => (
  <div className="trader-card flex flex-col h-full bg-[#161c27] border border-[#293839]">
    <div className="card-header flex justify-between items-center mb-2 px-3 py-1 bg-[#1c222e] border-b border-[#293839]">
      <h3 className="text-[#9194a2] font-bold text-xs tracking-wider">F&O INSIGHTS</h3>
      <div className="flex gap-2 items-center">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-[10px] text-[#3db26b] uppercase">Options Chain</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 h-full p-2">
      <div className="flex flex-col justify-center border-r border-[#293839] pr-2">
        {/* PCR Meter */}
        <div className="flex justify-between text-[10px] text-[#9194a2] mb-1">
          <span>PCR (Nifty)</span>
          <span className="text-white font-bold font-mono">1.06</span>
        </div>
        <div className="w-full bg-[#11151e] h-2 rounded-full overflow-hidden border border-[#293839] mb-4">
          <div className="bg-gradient-to-r from-[#ed5750] via-yellow-400 to-[#3db26b] w-full h-full relative">
            <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_5px_white]" style={{ left: '60%' }}></div>
          </div>
        </div>

        <div className="flex justify-between text-[9px] text-[#5d606b] mb-4 px-1">
          <div className="text-center">
            <div className="font-bold text-[#ed5750]">2.4M</div>
            <div>CALL OI</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-[#3db26b]">2.8M</div>
            <div>PUT OI</div>
          </div>
        </div>

        {/* Max Pain */}
        <div className="flex justify-between text-[10px] text-[#9194a2] mb-1">
          <span>MAX PAIN</span>
          <span className="text-[#e2e8f0] font-bold font-mono">18,450</span>
        </div>
        <div className="flex justify-between text-[10px] text-[#9194a2]">
          <span>IV PERCENTILE</span>
          <span className="text-[#e2e8f0] font-bold font-mono">45%</span>
        </div>
      </div>

      <div className="space-y-2 text-xs flex flex-col justify-center">
        <div className="flex justify-between items-center bg-[#293839]/30 p-2 rounded border-l-2 border-[#3db26b]">
          <div>
            <div className="text-[#e2e8f0] font-bold">Long Buildup</div>
            <div className="text-[9px] text-[#5d606b]">Price ▲ OI ▲</div>
          </div>
          <span className="font-mono text-white bg-[#3db26b]/20 px-1 py-0.5 rounded">42</span>
        </div>
        <div className="flex justify-between items-center bg-[#293839]/30 p-2 rounded border-l-2 border-[#ed5750]">
          <div>
            <div className="text-[#e2e8f0] font-bold">Short Covering</div>
            <div className="text-[9px] text-[#5d606b]">Price ▲ OI ▼</div>
          </div>
          <span className="font-mono text-white bg-[#ed5750]/20 px-1 py-0.5 rounded">18</span>
        </div>
      </div>
    </div>
  </div>
);



const MarketBreadth = () => (
  <div className="trader-card p-3 bg-[#161c27] border border-[#293839] flex flex-col gap-2 rounded-lg">
    <div className="flex justify-between text-[10px] text-[#9194a2] font-bold tracking-wider">
      <span>MARKET BREADTH</span>
    </div>
    <div className="flex items-center gap-0.5 h-2 rounded-full overflow-hidden bg-[#11151e]">
      <div className="bg-[#3db26b] h-full shadow-[0_0_5px_#3db26b]" style={{ width: '55%' }}></div>
      <div className="bg-[#5d606b] h-full" style={{ width: '10%' }}></div>
      <div className="bg-[#ed5750] h-full shadow-[0_0_5px_#ed5750]" style={{ width: '35%' }}></div>
    </div>
    <div className="flex justify-between text-[9px] font-mono font-bold">
      <div className="text-[#3db26b]">1240 <span className="text-[8px] opacity-70">ADV</span></div>
      <div className="text-[#9194a2]">230 <span className="text-[8px] opacity-70">UNCH</span></div>
      <div className="text-[#ed5750]">980 <span className="text-[8px] opacity-70">DEC</span></div>
    </div>
  </div>
);

const MarketSentiment = () => (
  <div className="trader-card p-3 bg-[#161c27] border border-[#293839] flex flex-col gap-2 rounded-lg">
    <div className="flex justify-between text-[10px] text-[#9194a2] font-bold tracking-wider">
      <span>MARKET SENTIMENT</span>
    </div>
    <div className="relative h-2 bg-[#11151e] rounded-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#ed5750] via-yellow-500 to-[#3db26b]"></div>
      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_white]" style={{ left: '68%' }}></div>
    </div>
    <div className="flex justify-between text-[9px] font-mono font-bold">
      <span className="text-[#ed5750]">BEARISH</span>
      <span className="text-[#3db26b]">BULLISH 68%</span>
    </div>
  </div>
);

function TraderView({ data, activeModule }) {
  if (activeModule && activeModule !== 'DASHBOARD') {
    return (
      <div className="dashboard-layout fade-in flex items-center justify-center text-white h-[80vh]">
        <div className="text-center opacity-50">
          <h2 className="text-3xl font-bold mb-2">{activeModule}</h2>
          <p className="font-mono text-sm">MODULE INITIALIZING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout fade-in">
      <div className="main-content-area w-full" style={{ background: '#0b0e14', minHeight: '100vh', padding: '16px' }}>

        {/* Top Info Bar: Ticker + Latency + Timeframe */}
        <div className="flex items-center justify-between mb-4 bg-[#161c27] px-4 py-2 rounded-lg border border-[#293839] shadow-lg">
          <div className="flex items-center gap-6 overflow-hidden">
            {/* Latency Indicator Removed */}

            {/* Smooth Ticker */}
            <div className="flex gap-6 text-xs font-bold text-[#9194a2] whitespace-nowrap overflow-hidden mask-linear-fade">
              <motion.div
                className="flex gap-8"
                animate={{ x: [0, -500] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              >
                <span>NIFTY <span className="text-[#3db26b] font-mono ml-1">18,500 (+0.5%)</span></span>
                <span>BANKNIFTY <span className="text-[#3db26b] font-mono ml-1">43,800 (+0.7%)</span></span>
                <span>SENSEX <span className="text-[#3db26b] font-mono ml-1">62,300 (+0.4%)</span></span>
                <span>RELIANCE <span className="text-[#ed5750] font-mono ml-1">2,450 (-0.2%)</span></span>
                <span>HDFCBANK <span className="text-[#3db26b] font-mono ml-1">1,640 (+0.8%)</span></span>
                {/* Duplicate for smooth loop */}
                <span>NIFTY <span className="text-[#3db26b] font-mono ml-1">18,500 (+0.5%)</span></span>
                <span>BANKNIFTY <span className="text-[#3db26b] font-mono ml-1">43,800 (+0.7%)</span></span>
              </motion.div>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex bg-[#11151e] rounded p-0.5 border border-[#293839]">
              <button className="px-3 py-1 text-[10px] font-bold bg-[#293839] text-[#00f3ff] rounded shadow-sm border border-[#00f3ff]/20">SCALP</button>
              <button className="px-3 py-1 text-[10px] font-bold text-[#5d606b] hover:text-[#e2e8f0] transition-colors">SWING</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">

          {/* LEFT MAIN CONTENT (9 Columns) */}
          <div className="col-span-9 flex flex-col gap-4">

            {/* Row 1: Market Pulse (Heatmap, Gap, Vol, Watchlist) */}
            <div className="grid grid-cols-9 gap-4 h-[280px]">
              <div className="col-span-3 h-full"><SectorHeatmap /></div>
              <div className="col-span-2 h-full"><GapLists /></div>
              <div className="col-span-2 h-full"><VolumeShockers /></div>
              <div className="col-span-2 h-full"><AdvancedWatchlist /></div>
            </div>

            {/* Row 2: Multi Chart Workspace */}
            <div className="h-[450px]">
              <MultiChartGrid className="h-full" />
            </div>

            {/* Row 3: Technicals & F&O */}
            <div className="grid grid-cols-2 gap-4 h-[280px]">
              <TechnicalScreeners />
              <FODashboard />
            </div>

          </div>

          {/* RIGHT SIDEBAR (3 Columns) */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Market Breadth & Sentiment */}
            <MarketBreadth />
            <MarketSentiment />

            {/* Quick Order Panel */}
            <div className="flex-1 min-h-[300px]">
              <QuickTradePanel />
            </div>

            {/* News Flash */}
            <div className="h-[250px]">
              <div className="trader-card flex flex-col overflow-hidden h-full bg-[#161c27] border border-[#293839] rounded-lg">
                <div className="card-header flex justify-between items-center mb-2 px-3 py-2 bg-[#1c222e] border-b border-[#293839]">
                  <h3 className="text-[#9194a2] font-bold text-xs tracking-wider flex items-center gap-2">
                    <Activity size={12} className="text-[#ed5750]" />
                    NEWS FLASH
                  </h3>
                </div>
                <div className="flex-1 relative overflow-hidden p-1">
                  <div className="overflow-y-auto custom-scrollbar space-y-2 h-full pr-1">
                    {[
                      { t: '14:05', s: 'RELIANCE', m: 'Block deal executed at market price', imp: 'High' },
                      { t: '13:50', s: 'ADANI', m: 'Promoter increases stake by 2% via open market', imp: 'Med' },
                      { t: '13:30', s: 'FED', m: 'Powell hinting at rate pause next month', imp: 'High' },
                      { t: '12:15', s: 'TCS', m: 'Wins $500M contract with UK gov', imp: 'Med' },
                      { t: '11:45', s: 'CRUDE', m: 'Prices jump 3% on supply concerns', imp: 'High' },
                      { t: '11:00', s: 'GOLD', m: 'Hits all time high in domestic market', imp: 'Med' },
                      { t: '10:30', s: 'INFY', m: 'CEO speaks on AI adoption strategy', imp: 'Low' }
                    ].map((news, i) => (
                      <div key={i} className="flex gap-2 text-[10px] border-b border-[#293839]/30 pb-2 hover:bg-[#293839]/30 p-1 rounded cursor-pointer group transition-colors">
                        <span className="text-[#5d606b] font-mono whitespace-nowrap">{news.t}</span>
                        <div>
                          <span className={`font-bold mr-2 ${news.imp === 'High' ? 'text-[#ed5750]' : 'text-[#3db26b]'}`}>{news.s}</span>
                          <span className="text-[#9194a2] group-hover:text-[#e2e8f0]">{news.m}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}