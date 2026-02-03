import React from "react";
import { motion } from "framer-motion";

const tickers = [
    { symbol: "SPX", value: "4,783.45", change: "+0.45%" },
    { symbol: "NDX", value: "16,832.90", change: "+0.82%" },
    { symbol: "DJIA", value: "37,695.73", change: "-0.31%" },
    { symbol: "BTC", value: "$42,505.00", change: "+2.53%" },
    { symbol: "ETH", value: "$2,250.10", change: "+1.30%" },
    { symbol: "OILS", value: "72.40", change: "-1.20%" },
    { symbol: "GOLD", value: "2,045.30", change: "+0.15%" },
    { symbol: "EUR/USD", value: "1.0950", change: "-0.05%" },
    { symbol: "AAPL", value: "185.92", change: "+0.55%" },
    { symbol: "NVDA", value: "531.40", change: "+3.40%" },
    { symbol: "TSLA", value: "235.40", change: "-2.10%" },
];

export default function TickerTape() {
    return (
        <div className="w-full bg-[#0a2a30]/90 backdrop-blur-md border-b border-white/5 overflow-hidden py-3 flex relative z-50">
            <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#0D343A] to-transparent z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#0D343A] to-transparent z-10" />

            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
                {}
                {[...tickers, ...tickers].map((item, i) => (
                    <div key={i} className="flex items-center mx-6 gap-2">
                        <span className="font-bold text-white/80">{item.symbol}</span>
                        <span className="text-white font-mono">{item.value}</span>
                        <span
                            className={`text-xs font-semibold px-1.5 py-0.5 rounded ${item.change.startsWith("+")
                                    ? "text-[#42C0A5] bg-[#42C0A5]/10"
                                    : "text-red-400 bg-red-400/10"
                                }`}
                        >
                            {item.change}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
