import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Activity, Search, Bell, Menu, X
} from 'lucide-react';

// New Sections
import Preloader from '../components/Preloader';
import HeroSection from '../components/landing/HeroSection';
import GlobalAssetSection from '../components/landing/GlobalAssetSection';
import TraderModeSection from '../components/landing/TraderModeSection';
import FeaturesSection from '../components/landing/FeaturesSection';

// --- Navbar ---
const Navbar = () => (
    <div className="absolute top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="w-full max-w-7xl flex justify-between items-center backdrop-blur-xl bg-[#348E87] rounded-2xl px-6 py-3 border border-[#6FFFE9]/20 shadow-lg shadow-[#348E87]/20 transition-all duration-300">
            {/* Left: Logo & Menu */}
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src="/radar-logo-final.jpg"
                            alt="Radar Logo"
                            className="h-8 w-auto rounded-full object-contain"
                        />
                    </div>
                    <span className="text-xl font-black text-white tracking-tighter font-['Plus_Jakarta_Sans']">RADAR</span>
                </div>

                <div className="hidden lg:flex items-center gap-6 text-sm font-bold text-white">
                    <a href="#" className="hover:text-white transition-colors">Overview</a>
                    <a href="#" className="hover:text-white transition-colors">Assets</a>
                    <a href="#" className="hover:text-white transition-colors">Watchlist</a>
                    <a href="#" className="hover:text-white transition-colors">Signals</a>
                </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/10 border border-white/10 text-white text-sm focus-within:border-white/30 focus-within:text-white transition-all">
                    <Search size={14} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-white w-24 focus:w-32 transition-all placeholder:text-white/40"
                    />
                </div>

                <div className="flex gap-2">
                    <a href="/login" className="px-5 py-2 text-sm font-bold bg-white text-[#348E87] hover:bg-white/90 rounded-full transition-all">Log In</a>
                </div>
            </div>
        </nav>
    </div>
);

// --- Footer ---
const Footer = () => (
    <footer className="relative z-10 pt-20 pb-10 border-t border-[#6FFFE9]/10 bg-[#348E87]">
        <div className="max-w-[95vw] mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1">
                <div className="flex items-center gap-2 mb-6">
                    <img src="/radar-logo-final.jpg" alt="Radar Logo" className="h-8 w-auto rounded-full object-contain" />
                    <span className="text-xl font-bold text-white tracking-widest">RADAR</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                    Radar is a real-time market research platform for observing and analyzing global markets in one structured interface.
                </p>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Product</h4>
                <ul className="space-y-4 text-sm text-white/50">
                    <li><a href="#" className="hover:text-[#6FFFE9] transition-colors">Trade Center</a></li>
                    <li><a href="#" className="hover:text-[#6FFFE9] transition-colors">Pro Mode</a></li>
                    <li><a href="#" className="hover:text-[#6FFFE9] transition-colors">Live Pulse</a></li>
                    <li><a href="#" className="hover:text-[#6FFFE9] transition-colors">APIs</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Resources</h4>
                <ul className="space-y-4 text-sm text-white/50">
                    <li><a href="#" className="hover:text-[#6FFFE9] transition-colors">Learning Lab</a></li>
                    <li><a href="#" className="hover:text-[#6FFFE9] transition-colors">Market Circle</a></li>
                    <li><a href="#" className="hover:text-[#6FFFE9] transition-colors">Documentation</a></li>
                    <li><a href="#" className="hover:text-[#6FFFE9] transition-colors">Ask Pulse AI</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Support</h4>
                <ul className="space-y-4 text-sm text-white/50">
                    <li><a href="#" className="hover:text-[#6FFFE9] transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-[#6FFFE9] transition-colors">Security</a></li>
                    <li><a href="#" className="hover:text-[#6FFFE9] transition-colors">Contact Us</a></li>
                </ul>
            </div>
        </div>

        <div className="max-w-[95vw] mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
            <p>© 2026 Radar Financial Analytics. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
        </div>
    </footer>
);



export default function Home() {
    return (
        <Preloader>
            <div className="min-h-screen bg-[#F8F5EF] text-gray-900 font-sans selection:bg-radar-cyan selection:text-radar-dark overflow-x-hidden">
                <Navbar />

                <main className="pt-20">
                    <HeroSection />
                    <GlobalAssetSection />
                    <TraderModeSection />
                    <FeaturesSection />
                </main>

                <Footer />
            </div>
        </Preloader>
    );
}
