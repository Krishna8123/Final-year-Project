import React, { useState, useEffect } from "react";
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
import { Search, ChevronDown } from "lucide-react";
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
};

export default function Dashboard() {
  const [isTraderMode, setIsTraderMode] = useState(
    localStorage.getItem("mode") === "TRADER"
  );

  const toggleMode = () => {
    const newMode = !isTraderMode;
    setIsTraderMode(newMode);
    localStorage.setItem("mode", newMode ? "TRADER" : "INVESTOR");
  };

  return (
    <div
      className={`dashboard-container ${isTraderMode ? "trader-theme" : "investor-theme"
        }`}
    >
      <header className="navbar">
        <a href="/" className="brand">
          <img
            src="/radar-logo-final.jpg"
            alt="Radar Logo"
            className="logo-img"
          />
          <span className="brand-name">RADAR</span>
        </a>

        <div className="toggle-wrapper">
          <span className={!isTraderMode ? "active-label" : "inactive-label"}>
            Investor
          </span>
          <label className="switch">
            <input type="checkbox" checked={isTraderMode} onChange={toggleMode} />
            <span className="slider round"></span>
          </label>
          <span className={isTraderMode ? "active-label" : "inactive-label"}>
            Trader
          </span>
        </div>

        <div className="nav-buttons">
          <a href="/login" className="nav-btn login-btn">
            Log Out
          </a>
        </div>
      </header>

      <main className="content fade-in">
        {isTraderMode ? (
          <TraderView data={mockStock} />
        ) : (
          <InvestorView data={mockStock} movers={topMovers} />
        )}
      </main>
    </div>
  );
}

const investorData = {
  totalValue: "$182,350.25",
  gainLoss: "+$25,528.60",
  gainLossPercent: "+17.5%",
  todayChange: "+$4,680.20",
  todayPercent: "+2.64%",
  performanceData: [
    { name: "JAN", value: 140000 },
    { name: "FEB", value: 145000 },
    { name: "MAR", value: 142000 },
    { name: "APR", value: 148000 },
    { name: "MAY", value: 155000 },
    { name: "JUN", value: 162000 },
    { name: "JUL", value: 168000 },
    { name: "AUG", value: 172000 },
    { name: "SEP", value: 175000 },
    { name: "OCT", value: 178000 },
    { name: "NOV", value: 180000 },
    { name: "DEC", value: 182350 },
  ],
  marketOverview: [
    { name: "NIFTY", value: "25,450", change: "+275", percent: "+1.09%" },
    { name: "SENSEX", value: "79,250", change: "+658", percent: "+0.84%" },
    { name: "NASDAQ", value: "14,345", change: "+82", percent: "+0.50%" },
    { name: "S&P 500", value: "7,281", change: "+32", percent: "+0.44%" },
  ],
  holdings: [
    { name: "Equity", value: 63, color: "#34D399" },
    { name: "Debt", value: 23, color: "#10B981" },
    { name: "Cash", value: 14, color: "#059669" },
  ],
  transactions: [
    { date: "2025", type: "BUY", stock: "20", amount: "3720.00" },
    { date: "2025", type: "DEF", stock: "55", amount: "3150.00" },
    { date: "2025", type: "CHI", stock: "20", amount: "3000.00" },
  ],
};

function InvestorView() {
  const [activeTab, setActiveTab] = useState("Portfolio");

  return (
    <div className="investor-layout">
      {/* Sidebar */}
      <aside className="investor-sidebar">
        <div className="sidebar-logo">
          <img src="/radar-logo-final.jpg" alt="Logo" className="w-8 h-8 rounded-lg" />
          <span>INT333</span>
        </div>
        <nav className="sidebar-nav">
          {["Overview", "Portfolio", "Performance", "Market", "Watchlist", "Settings"].map((item) => (
            <div
              key={item}
              className={`nav-item ${activeTab === item ? 'active' : ''}`}
              onClick={() => setActiveTab(item)}
            >
              <div className={`w-2 h-2 rounded-full ${activeTab === item ? 'bg-[#0F766E]' : 'border border-slate-400'}`}></div>
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="investor-main">
        {/* Header */}
        <header className="investor-header">
          <div></div> {/* Spacer */}
          <div className="header-center">
            <h1 className="header-date">WEDNESDAY, FEBRUARY 4, 2026</h1>
            <div className="header-status">MARKET : CLOSED • 21:17 PM IST</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-white/20">
              <img src="https://i.pravatar.cc/30" alt="User" className="w-6 h-6 rounded-full" />
              <span className="text-sm font-medium text-slate-700">Investor Mode</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="investor-grid">
          {/* Top Row Stats */}
          <div className="inv-card">
            <div className="stat-card-title">
              Total Portfolio Value
            </div>
            <div className="stat-card-value text-white">{investorData.totalValue}</div>
            <div className="stat-card-sub text-green-400">{investorData.todayPercent} Today</div>
          </div>

          <div className="inv-card">
            <div className="stat-card-title">
              Gain/Loss (All Time)
              <span className="text-xs">↗</span>
            </div>
            <div className="stat-card-value text-green-400">{investorData.gainLoss}</div>
            <div className="stat-card-sub text-green-400/80">{investorData.gainLossPercent}</div>
          </div>

          <div className="inv-card relative overflow-hidden">
            <div className="relative z-10">
              <div className="stat-card-title">
                Today's Change
                <span className="text-xs">↗</span>
              </div>
              <div className="stat-card-value text-green-400">{investorData.todayChange}</div>
              <div className="stat-card-sub text-green-400/80">{investorData.todayPercent}</div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-16 opacity-50">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={investorData.performanceData.slice(8)}>
                  <Area type="monotone" dataKey="value" stroke="#34D399" fill="#10B981" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Chart - Large Area */}
          <div className="inv-card area-perf flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-slate-300">Portfolio Performance</h3>
              <div className="flex gap-2 text-xs">
                <span className="text-slate-500">1M</span>
                <span className="text-white font-bold">1Y</span>
                <span className="text-slate-500">ALL</span>
              </div>
            </div>
            <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={investorData.performanceData}>
                  <defs>
                    <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2BBFA3" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2BBFA3" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0F172A", border: "none", borderRadius: "8px", color: "white" }}
                  />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} domain={['dataMin', 'auto']} />
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <Area type="monotone" dataKey="value" stroke="#2BBFA3" strokeWidth={2} fillOpacity={1} fill="url(#colorPerf)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Market Overview */}
          <div className="inv-card area-market">
            <h3 className="text-lg font-medium text-slate-300 mb-6">Market Overview</h3>
            <div className="space-y-5">
              {investorData.marketOverview.map((market) => (
                <div key={market.name} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
                  <span className="text-slate-400 font-medium">{market.name}</span>
                  <span className="text-white font-bold">{market.value}</span>
                  <div className={`text-right ${market.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    <div>{market.change}</div>
                    <div className="text-xs opacity-70">{market.percent}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Holdings Allocation */}
          <div className="inv-card area-holdings flex items-center justify-between">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={investorData.holdings} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                    {investorData.holdings.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 text-sm pr-4">
              <h3 className="text-slate-300 mb-2 font-medium">Holdings Allocation</h3>
              {investorData.holdings.map((h) => (
                <div key={h.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: h.color }}></div>
                  <span className="text-slate-400">{h.name}</span>
                  <span className="text-white ml-auto font-bold">{h.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div className="inv-card area-trans">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-slate-300">Market Transactions</h3>
              <span className="text-xs text-slate-500 cursor-pointer">View All</span>
            </div>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-white/5">
                  <th className="pb-2 font-normal">Date</th>
                  <th className="pb-2 font-normal">Type</th>
                  <th className="pb-2 font-normal">Stocks</th>
                  <th className="pb-2 text-right font-normal">Amount</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {investorData.transactions.map((t, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="py-2.5">{t.date}</td>
                    <td className="py-2.5"><span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{t.type}</span></td>
                    <td className="py-2.5">{t.stock}</td>
                    <td className="py-2.5 text-right">{t.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Insights */}
          <div className="inv-card area-insights">
            <h3 className="text-slate-300 mb-4">Market Insights</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <div className="mt-1 w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span>Weekly Market Overview</span>
              </li>
              <li className="flex gap-2">
                <div className="mt-1 w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span>RBI Announces Interest Rate Decision</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

function TraderView({ data }) {
  return (
    <motion.div
      className="view-container trader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="trader-search-bar">
        <div className="trader-search-wrapper">
          <Search className="trader-search-icon" />
          <input
            type="text"
            placeholder="Search pair (e.g. BTC/USD)..."
            className="trader-search-input"
          />
        </div>
      </div>

      <div className="ticker-bar">
        <div className="ticker-item">
          <span className="t-symbol">BTC/USD</span>
          <span className="t-price">{data.price}</span>
          <span className="t-change text-green">{data.change}</span>
        </div>
        <div className="ticker-item">
          <span className="t-symbol">ETH/USD</span>
          <span className="t-price">2,250.00</span>
          <span className="t-change text-red">-1.2%</span>
        </div>
        <div className="ticker-item">
          <span className="t-symbol">EUR/USD</span>
          <span className="t-price">1.0920</span>
          <span className="t-change text-green">+0.05%</span>
        </div>
      </div>

      <div className="trader-grid">
        <Tilt options={{ ...defaultTiltOptions, max: 5 }}>
          <div className="panel chart-panel">
            <div className="panel-header">
              <h3>BTC/USD • 1H</h3>
              <div className="time-toggles">
                <span className="active">1H</span>
                <span>4H</span>
                <span>1D</span>
                <span>1W</span>
              </div>
            </div>
            <div className="chart-box-dark">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={priceData}>
                  <defs>
                    <linearGradient id="colorPriceTrd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#bc13fe" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#bc13fe" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis
                    stroke="#64748b"
                    domain={["auto", "auto"]}
                    tick={{ fontSize: 12 }}
                    orientation="right"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0b0e11",
                      borderColor: "#1e293b",
                      color: "#f8fafc",
                    }}
                    itemStyle={{ color: "#bc13fe" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#bc13fe"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPriceTrd)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Tilt>

        <div className="side-panel-column">
          <Tilt options={{ ...defaultTiltOptions, max: 5 }}>
            <div className="panel data-panel">
              <div className="panel-header-simple" style={{ padding: '15px 20px' }}>
                <h3>Order Book</h3>
              </div>
              <table className="order-book-table">
                <thead>
                  <tr>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="ask">
                    <td>42,505</td>
                    <td>0.45</td>
                    <td>19,127</td>
                  </tr>
                  <tr className="ask">
                    <td>42,502</td>
                    <td>1.20</td>
                    <td>51,002</td>
                  </tr>
                  <tr className="spread-row">
                    <td colSpan="3">Spread: 2.0 (0.01%)</td>
                  </tr>
                  <tr className="bid">
                    <td>42,500</td>
                    <td>5.02</td>
                    <td>213,350</td>
                  </tr>
                  <tr className="bid">
                    <td>42,498</td>
                    <td>2.30</td>
                    <td>97,745</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tilt>

          <Tilt options={{ ...defaultTiltOptions, max: 5 }}>
            <div className="panel research-panel">
              <div className="panel-header-simple">
                <h3>Market Sentiment</h3>
              </div>

              <div className="sentiment-dashboard">
                <div className="sentiment-row">
                  <span className="s-label">Signal</span>
                  <span className="s-value text-green strong">STRONG BUY</span>
                </div>

                <div className="sentiment-row">
                  <span className="s-label">RSI (14)</span>
                  <span className="s-value">62.5 (Neutral)</span>
                </div>

                <div className="sentiment-row">
                  <span className="s-label">MACD</span>
                  <span className="s-value text-green">Bullish Crossover</span>
                </div>

                <div className="sentiment-row">
                  <span className="s-label">Moving Avg (50)</span>
                  <span className="s-value text-green">Above</span>
                </div>
              </div>
            </div>
          </Tilt>
        </div>

        <div className="panel stats-footer">
          <div className="stat-item">
            <span className="stat-label">24h High</span>
            <span className="stat-val">{data.high}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">24h Low</span>
            <span className="stat-val">{data.low}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Volume</span>
            <span className="stat-val">{data.volume}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mkt Cap</span>
            <span className="stat-val">{data.marketCap}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}