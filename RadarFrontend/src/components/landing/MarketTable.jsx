import React from "react";
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";

const moversData = [
    { symbol: "NVDA", name: "Nvidia Corp", price: "531.40", change: "+3.40%", isUp: true },
    { symbol: "AMD", name: "Adv. Micro Devices", price: "145.30", change: "+5.10%", isUp: true },
    { symbol: "COIN", name: "Coinbase Global", price: "155.20", change: "-4.20%", isUp: false },
    { symbol: "MARA", name: "Marathon Digital", price: "22.40", change: "-8.50%", isUp: false },
    { symbol: "PLTR", name: "Palantir Tech", price: "16.80", change: "+1.20%", isUp: true },
];

export default function MarketTable() {
    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden w-full">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-white">Market Movers</h3>
                <button className="text-[#42C0A5] text-sm font-medium hover:text-[#6FFFE9] transition-colors">View All Match</button>
            </div>

            <div className="p-0">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[#B9F3EA]/60 text-xs uppercase tracking-wider border-b border-white/5">
                            <th className="p-4 font-medium">Symbol</th>
                            <th className="p-4 font-medium">Price</th>
                            <th className="p-4 font-medium text-right">Chg %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moversData.map((stock, i) => (
                            <tr
                                key={i}
                                className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group cursor-pointer"
                            >
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold text-sm group-hover:text-[#42C0A5] transition-colors">{stock.symbol}</span>
                                        <span className="text-[#B9F3EA]/50 text-xs">{stock.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-white font-mono text-sm">
                                    ${stock.price}
                                </td>
                                <td className="p-4 text-right">
                                    <div className={`inline-flex items-center gap-1 text-sm font-bold ${stock.isUp ? 'text-[#42C0A5]' : 'text-red-400'}`}>
                                        {stock.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        {stock.change}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
