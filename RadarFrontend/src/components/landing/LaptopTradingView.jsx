import React from 'react';
import { Menu, Wifi } from 'lucide-react';

const LaptopTradingView = () => {
    return (
        <div className="w-full relative shadow-[0_0_60px_-15px_rgba(56,189,248,0.3)] rounded-xl overflow-hidden border border-[#38BDF8]/20 bg-[#0B1221] group transition-all duration-300">
            {}
            <div className="relative">
                <img
                    src="/trader_dashboard.jpg"
                    alt="Radar Trading Interface"
                    className="w-full h-auto block rounded-xl"
                />
            </div>
        </div>
    );
};

export default LaptopTradingView;
