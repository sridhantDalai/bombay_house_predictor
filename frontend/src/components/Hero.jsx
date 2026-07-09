import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToPredict = () => {
    const el = document.getElementById('predict-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative px-6 py-16 md:px-12 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-hidden">
      
      {/* Hero Left Content */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-6 flex flex-col items-start text-left z-10"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/50 text-blue-600 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 fill-blue-600 animate-pulse" />
          <span>Mumbai Real Estate Valuation Engine</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
          Predict Mumbai <br />
          House Prices <br />
          <span className="gradient-text">Instantly.</span>
        </h1>
        
        <p className="text-base sm:text-lg text-gray-600 max-w-xl mb-10 leading-relaxed font-medium">
          AI-powered valuation using CatBoost Machine Learning trained on Mumbai housing data.
          Get precise estimates based on BHK size, square footage, and neighborhood.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={scrollToPredict}
            className="gradient-btn px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 group transition-all"
          >
            <span>Start Valuation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => document.getElementById('analytics-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-2xl border border-gray-200/80 bg-white/50 hover:bg-white text-gray-700 hover:text-gray-900 font-bold text-sm transition-all text-center"
          >
            Explore Market Charts
          </button>
        </div>

        {/* Small stats banner */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-10 text-gray-500">
          <div>
            <span className="block text-2xl font-extrabold text-gray-950">260+</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Localities Indexed</span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-gray-950">98.4%</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Model Accuracy</span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-gray-950">&lt; 100ms</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Inference Speed</span>
          </div>
        </div>
      </motion.div>

      {/* Hero Right: Beautiful skyline animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-6 relative w-full h-[320px] sm:h-[400px] lg:h-[450px] flex items-center justify-center"
      >
        {/* Floating backdrop blur container */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 via-orange-50/20 to-pink-50/30 rounded-[40px] border border-white/80 backdrop-blur-[2px] shadow-inner -z-10" />

        {/* Interactive SVG Skyline Illustration */}
        <svg 
          viewBox="0 0 600 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-[500px]"
        >
          {/* Sun glowing in the background */}
          <motion.circle 
            cx="480" cy="120" r="45" 
            fill="url(#sun-gradient)" 
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 0.9, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Clouds */}
          <motion.g 
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M70,120 C85,120 90,110 95,115 C100,120 120,120 125,110 C130,100 110,90 95,95 C80,100 75,105 70,120 Z" fill="#FFFFFF" opacity="0.6" />
            <path d="M400,90 C410,90 415,82 420,85 C425,88 435,88 440,82 C445,75 430,68 420,72 C410,75 405,80 400,90 Z" fill="#FFFFFF" opacity="0.8" />
          </motion.g>

          {/* Distant skyline (Flat light blue silhouettes) */}
          <path d="M0,320 L50,300 L90,320 L120,290 L160,320 L220,270 L260,320 L300,285 L350,320 L400,260 L450,320 L490,295 L530,320 L600,270 L600,320 L0,320 Z" fill="#E2E8F0" opacity="0.6" />

          {/* Middle layer skyscrapers (Blue-gray gradient) */}
          <g opacity="0.8">
            <rect x="80" y="160" width="30" height="160" rx="3" fill="url(#skyscrapers-mid)" />
            <rect x="120" y="200" width="25" height="120" rx="3" fill="url(#skyscrapers-mid)" />
            <rect x="250" y="140" width="40" height="180" rx="4" fill="url(#skyscrapers-mid)" />
            <rect x="300" y="180" width="35" height="140" rx="3" fill="url(#skyscrapers-mid)" />
            <rect x="420" y="130" width="30" height="190" rx="3" fill="url(#skyscrapers-mid)" />
          </g>

          {/* Forefront: Bandra-Worli Sea Link cables representation */}
          <g>
            <motion.path 
              d="M 120 320 L 200 240 L 280 320" 
              stroke="#CBD5E1" 
              strokeWidth="2"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Main Pylon */}
            <motion.polygon 
              points="195,320 200,160 205,320" 
              fill="url(#pylon-grad)"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Cable wires */}
            <motion.path 
              d="M 200 180 L 150 320 M 200 200 L 165 320 M 200 220 L 180 320 M 200 180 L 250 320 M 200 200 L 235 320 M 200 220 L 220 320" 
              stroke="#94A3B8" 
              strokeWidth="0.75" 
              opacity="0.7"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>

          {/* Gateway of India on the right */}
          <motion.g 
            transform="translate(480, 230)"
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            {/* Base */}
            <rect x="0" y="70" width="90" height="20" fill="url(#gateway-grad)" />
            {/* Left and Right Columns */}
            <rect x="5" y="20" width="20" height="50" fill="url(#gateway-grad)" />
            <rect x="65" y="20" width="20" height="50" fill="url(#gateway-grad)" />
            {/* Center Dome Arch */}
            <path d="M 25 35 A 20 20 0 0 1 65 35 L 65 70 L 25 70 Z" fill="url(#gateway-grad)" />
            {/* Arch details */}
            <path d="M 30 45 A 15 15 0 0 1 60 45 L 60 70 L 30 70 Z" fill="#F1F5F9" opacity="0.4" />
            {/* Roof cornice */}
            <rect x="0" y="10" width="90" height="10" fill="url(#gateway-grad)" rx="2" />
            {/* Little domes */}
            <circle cx="15" cy="5" r="5" fill="url(#gateway-grad)" />
            <circle cx="45" cy="5" r="8" fill="url(#gateway-grad)" />
            <circle cx="75" cy="5" r="5" fill="url(#gateway-grad)" />
          </motion.g>

          {/* Modern Premium skyscrapers on the left */}
          <motion.g 
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Curved modern building */}
            <path d="M 20 320 L 20 150 Q 35 120 50 150 L 50 320 Z" fill="url(#sky-premium)" />
            {/* Spire building */}
            <rect x="350" y="100" width="30" height="220" rx="2" fill="url(#sky-premium)" />
            <line x1="365" y1="100" x2="365" y2="40" stroke="#F97316" strokeWidth="2.5" />
            <circle cx="365" cy="40" r="3" fill="#F97316" className="animate-pulse" />
          </motion.g>

          {/* Sea Water Foreground */}
          <rect x="0" y="320" width="600" height="80" fill="url(#sea-gradient)" />

          {/* Water reflection waves */}
          <motion.path 
            d="M 10 330 Q 150 325 300 330 T 590 330" 
            stroke="rgba(255, 255, 255, 0.4)" 
            strokeWidth="1.5" 
            fill="none" 
            animate={{ d: ["M 10 330 Q 150 325 300 330 T 590 330", "M 10 332 Q 150 335 300 332 T 590 332", "M 10 330 Q 150 325 300 330 T 590 330"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M 30 350 Q 200 345 370 350 T 570 350" 
            stroke="rgba(249, 115, 22, 0.2)" 
            strokeWidth="1" 
            fill="none" 
            animate={{ d: ["M 30 350 Q 200 345 370 350 T 570 350", "M 30 352 Q 200 355 370 352 T 570 352", "M 30 350 Q 200 345 370 350 T 570 350"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Defs for gradients */}
          <defs>
            <linearGradient id="sun-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="skyscrapers-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="sky-premium" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="pylon-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="gateway-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="sea-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="30%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
    </section>
  );
}
