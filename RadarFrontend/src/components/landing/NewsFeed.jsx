import React from "react";
import { Clock } from "lucide-react";

const newsItems = [
    {
        source: "Bloomberg",
        title: "Bitcoin ETFs See Record Inflows in First Week of Trading",
        time: "2h ago",
        tag: "Crypto"
    },
    {
        source: "Reuters",
        title: "Oil Prices Dip on Unexpected Inventory Build",
        time: "4h ago",
        tag: "Commodities"
    },
    {
        source: "CNBC",
        title: "Tech Earnings Preview: What to Expect from Big Seven",
        time: "5h ago",
        tag: "Earnings"
    },
    {
        source: "Wall St Journal",
        title: "Fed Signals Potential Rate Cuts Later This Year",
        time: "6h ago",
        tag: "Economy"
    }
];

export default function NewsFeed() {
    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden w-full h-full">
            <div className="p-4 border-b border-white/10 bg-white/5">
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-white">Latest News</h3>
            </div>

            <div className="flex flex-col">
                {newsItems.map((item, i) => (
                    <div key={i} className="p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[#42C0A5] text-xs font-bold uppercase tracking-wider">{item.source}</span>
                            <span className="text-[#B9F3EA]/40 text-xs flex items-center gap-1">
                                <Clock size={10} /> {item.time}
                            </span>
                        </div>
                        <h4 className="text-white font-medium text-sm leading-snug group-hover:text-[#6FFFE9] transition-colors">
                            {item.title}
                        </h4>
                        <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                            {item.tag}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
