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
import { Search } from "lucide-react";
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
  reverse: false,  // reverse the tilt direction
  max: 15,     // max tilt rotation (degrees)
  perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.02,   // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000,   // Speed of the enter/exit transition
  transition: true,   // Set a transition on enter/exit.
  axis: null,   // What axis should be disabled. Can be X or Y.
  reset: true,   // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
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

function InvestorView({ data, movers }) {
  return (
    <div className="view-container investor">
      <motion.div
        className="search-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="search-header-text">
          <h2>Market Research 🔍</h2>
          <p>Search for stocks, ETFs, or crypto to analyze fundamentals.</p>
        </div>
        <div className="search-bar-wrapper" style={{ margin: '0 auto' }}>
          <div className="search-input-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search e.g. AAPL, BTC, Nvidia..."
              className="main-search-input"
            />
          </div>
          <button className="search-button">Search</button>
        </div>
      </motion.div>

      <div className="grid-investor">
        <div className="left-column">
          <Tilt options={defaultTiltOptions} className="tilt-wrapper">
            <motion.div
              className="main-chart-card"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-header">
                <h3>{data.name} ({data.symbol})</h3>
                <span className="price-tag">${data.price}</span>
              </div>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={priceData}>
                    <defs>
                      <linearGradient id="colorPriceInv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={["dataMin - 1000", "dataMax + 1000"]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(5, 5, 20, 0.9)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                        color: "#fff"
                      }}
                      itemStyle={{ color: "#00f3ff" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#00f3ff"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorPriceInv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </Tilt>

          <Tilt options={defaultTiltOptions}>
            <motion.div
              className="news-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="card-header">
                <h3>📰 Latest News for {data.name}</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="news-list">
                {mockNews.map((news) => (
                  <div key={news.id} className="news-item">
                    <div className="news-content">
                      <span className="news-source">{news.source} • {news.time}</span>
                      <h4 className="news-title">{news.title}</h4>
                    </div>
                    <span className={`news-badge ${news.sentiment.toLowerCase()}`}>
                      {news.sentiment}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </Tilt>
        </div>

        <div className="right-column">
          <Tilt options={defaultTiltOptions}>
            <motion.div
              className="allocation-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>🌍 Market Dominance</h3>
              <div className="pie-wrapper">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={dominanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {dominanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(5, 5, 20, 0.9)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </Tilt>

          <Tilt options={defaultTiltOptions}>
            <motion.div
              className="movers-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3>🚀 Top Movers</h3>
              <ul className="movers-list">
                {movers.map((m) => (
                  <li key={m.symbol} className="mover-item">
                    <div className="mover-info">
                      <span className="mover-symbol">{m.symbol}</span>
                      <span className="mover-name">{m.name}</span>
                    </div>
                    <div className="mover-price">
                      <span>{m.price}</span>
                      <span className="change-positive">{m.change}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Tilt>
        </div>
      </div>
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