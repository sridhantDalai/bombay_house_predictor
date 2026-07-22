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
        {/* Interactive SVG Skyline Illustration */}
        <svg 
          viewBox="0 0 600 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-[500px] drop-shadow-[0_15px_35px_rgba(37,99,235,0.08)]"
        >
          <defs>
            {/* Light-blue/white gradient for clouds */}
            <linearGradient id="cloud-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
            
            {/* Island dirt gradient */}
            <linearGradient id="dirt-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8C5C42" />
              <stop offset="60%" stopColor="#6C432D" />
              <stop offset="100%" stopColor="#51301E" />
            </linearGradient>

            {/* Shadow under house */}
            <radialGradient id="house-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(69, 42, 28, 0.4)" />
              <stop offset="100%" stopColor="rgba(69, 42, 28, 0)" />
            </radialGradient>

            {/* Soft glowing halo background */}
            <radialGradient id="halo-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(37, 99, 235, 0.08)" />
              <stop offset="60%" stopColor="rgba(236, 72, 153, 0.02)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>
          </defs>

          {/* Soft background glow */}
          <circle cx="300" cy="200" r="180" fill="url(#halo-grad)" />

          {/* Floating Group (Island + House) */}
          <motion.g
            animate={{ 
              y: [-12, 12, -12],
              rotate: [-0.5, 0.5, -0.5]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {/* 1. Rock Base (under the grass) */}
            <path 
              d="M 176 195 
                 C 176 215, 205 235, 240 250 
                 C 260 260, 280 285, 300 288 
                 C 320 285, 340 260, 360 250 
                 C 395 235, 424 215, 424 195 
                 Z" 
              fill="url(#dirt-grad)" 
              stroke="#452A1C" 
              strokeWidth="7" 
              strokeLinejoin="round" 
            />
            
            {/* Rock texture details/lines */}
            <path d="M 230 205 L 255 240" stroke="#452A1C" strokeWidth="6" strokeLinecap="round" />
            <path d="M 370 205 L 345 240" stroke="#452A1C" strokeWidth="6" strokeLinecap="round" />
            <path d="M 300 205 L 300 282" stroke="#452A1C" strokeWidth="7" strokeLinecap="round" />

            {/* 2. Grass Top (Green Ellipse) */}
            <ellipse cx="300" cy="195" rx="124" ry="24" fill="#72B155" stroke="#452A1C" strokeWidth="7" />

            {/* Subtle shadow directly under the house */}
            <ellipse cx="300" cy="194" rx="60" ry="10" fill="url(#house-shadow)" />

            {/* 3. The House */}
            {/* Wall base */}
            <rect 
              x="248" 
              y="145" 
              width="104" 
              height="45" 
              fill="#FAF2DE" 
              stroke="#452A1C" 
              strokeWidth="7" 
              strokeLinejoin="round" 
            />

            {/* Red Roof */}
            <polygon 
              points="300,95 235,148 365,148" 
              fill="#D9534F" 
              stroke="#452A1C" 
              strokeWidth="7" 
              strokeLinejoin="round" 
            />

            {/* Door */}
            <rect 
              x="264" 
              y="155" 
              width="22" 
              height="35" 
              rx="2" 
              fill="#664635" 
              stroke="#452A1C" 
              strokeWidth="7" 
            />
            {/* Door Knob */}
            <circle cx="270" cy="173" r="2.5" fill="#FAF2DE" />

            {/* Window */}
            <rect 
              x="308" 
              y="153" 
              width="24" 
              height="20" 
              rx="2" 
              fill="#98D9F5" 
              stroke="#452A1C" 
              strokeWidth="7" 
              strokeLinejoin="round" 
            />
            {/* Window Pane Divider */}
            <line x1="320" y1="153" x2="320" y2="173" stroke="#452A1C" strokeWidth="4.5" />
          </motion.g>

          {/* 4. Clouds (Floating below the island, with drifting animation) */}
          {/* Left Cloud */}
          <motion.g
            animate={{ 
              x: [-10, 10, -10],
              y: [-2, 2, -2]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <path 
              d="M 140 270 
                 H 190 
                 A 12 12 0 0 0 190 246 
                 A 15 15 0 0 0 165 238 
                 A 12 12 0 0 0 140 250 
                 A 10 10 0 0 0 140 270 
                 Z" 
              fill="url(#cloud-grad)" 
              stroke="#428EB9" 
              strokeWidth="6" 
              strokeLinejoin="round" 
            />
          </motion.g>

          {/* Right Cloud */}
          <motion.g
            animate={{ 
              x: [10, -10, 10],
              y: [2, -2, 2]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <path 
              d="M 370 290 
                 H 420 
                 A 12 12 0 0 0 420 266 
                 A 15 15 0 0 0 395 258 
                 A 12 12 0 0 0 370 270 
                 A 10 10 0 0 0 370 290 
                 Z" 
              fill="url(#cloud-grad)" 
              stroke="#428EB9" 
              strokeWidth="6" 
              strokeLinejoin="round" 
            />
          </motion.g>
        </svg>
      </motion.div>
      
    </section>
  );
}
