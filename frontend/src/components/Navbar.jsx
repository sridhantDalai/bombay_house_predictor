import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-40 w-full px-6 py-4 md:px-12 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-gray-200/50"
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-8 h-8 flex items-center justify-center text-gray-900 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-6 h-6">
            <circle cx="35" cy="38" r="8" fill="currentColor" />
            <circle cx="35" cy="62" r="8" fill="currentColor" />
            <path d="M 58 20 Q 81 50 58 80" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-heading font-extrabold text-base md:text-lg tracking-tight flex items-center gap-1.5 text-gray-900">
          Bombay House Predictor <span className="text-blue-600 flex items-center gap-0.5">AI <Sparkles className="w-3.5 h-3.5 fill-blue-600" /></span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="hover:text-blue-600 transition-colors"
        >
          Home
        </button>
        <button 
          onClick={() => handleScroll('predict-section')} 
          className="hover:text-blue-600 transition-colors"
        >
          Predict
        </button>
        <button 
          onClick={() => handleScroll('analytics-section')} 
          className="hover:text-blue-600 transition-colors"
        >
          About Model & Analytics
        </button>
      </div>

      <div>
        <a 
          href="https://github.com/sridhantDalai/bombay_house_predictor" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200/80 bg-white/40 hover:bg-white hover:border-gray-300 text-gray-700 text-xs font-semibold shadow-sm transition-all"
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-4 h-4 fill-none stroke-current" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          <span>Github</span>
        </a>
      </div>
    </motion.nav>
  );
}
