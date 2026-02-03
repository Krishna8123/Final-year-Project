import React from "react";
import { Bell, Star, MoreHorizontal, X } from "lucide-react";

const watchlistItems = [
    { symbol: "BTC-USD", price: "42,505.20", change: "+2.4%", type: "CRYPTO", miniChart: "up" },
    { symbol: "AAPL", price: "185.92", change: "+0.5%", type: "STOCK", miniChart: "up" },
    { symbol: "EUR/USD", price: "1.0950", change: "-0.1%", type: "FOREX", miniChart: "down" },
    { symbol: "GOLD", price: "2,045.00", change: "+0.2%", type: "COMMODITY", miniChart: "neutral" },
];

export default function WatchlistHub() {
    return (
        <div className="bg-[#0b1d21] rounded-3xl border border-white/10 p-6 overflow-hidden relative">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans']">Watchlist Hub</h3>
                <button className="text-[#42C0A5] text-sm hover:underline">View All</button>
            </div>

            <div className="space-y-3">
                {watchlistItems.map((item, i) => (
                    <div key={i} className="group relative flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#42C0A5]/30 transition-all">

                        {}
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-8 rounded-full bg-[#42C0A5]/50"></div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-white">{item.symbol}</span>
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-white/10 text-white/50 rounded">{item.type}</span>
                                </div>
                                <div className="text-white/40 text-xs mt-0.5">{item.price}</div>
                            </div>
                        </div>

                        {}
                        <div className="flex items-center gap-4">
                            <span className={`font-mono text-sm font-bold ${item.change.startsWith('+') ? 'text-[#42C0A5]' : 'text-red-400'}`}>
                                {item.change}
                            </span>

                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 hover:bg-white/10 rounded-lg text-white/60 hover:text-[#42C0A5]">
                                    <Bell size={14} />
                                </button>
                                <button className="p-1.5 hover:bg-white/10 rounded-lg text-white/60 hover:text-red-400">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#42C0A5]/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>
    );
}
