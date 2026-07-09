import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PredictionCard from './components/PredictionCard';
import AnalyticsSection from './components/AnalyticsSection';
import { Sparkles, AlertCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [toastMessage, setToastMessage] = useState(null);

  // Mouse follow glow effect handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    // Auto dismiss after 6 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      
      {/* 1. Animated Blob Background elements */}
      <div className="blob-container">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* 2. Mouse Follow Glow */}
      <div 
        className="mouse-glow hidden md:block" 
        style={{ 
          top: 'var(--mouse-y, 0px)', 
          left: 'var(--mouse-x, 0px)' 
        }} 
      />

      {/* 3. Sticky Navigation Bar */}
      <Navbar />

      {/* 4. Page Content Wrapper */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Prediction Input Form & Result display */}
        <PredictionCard onError={triggerToast} />
        
        {/* Data Analytics Graphs Section */}
        <AnalyticsSection />
      </main>

      {/* 5. Premium Minimalist Footer */}
      <footer className="py-12 bg-gray-950 text-gray-500 border-t border-gray-900 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-white tracking-tight">
              Bombay House Predictor <span className="text-blue-500">AI</span>
            </span>
          </div>
          <div className="font-medium">
            © {new Date().getFullYear()} Bombay House Predictor AI. Crafted for Mumbai real estate valuations.
          </div>
          <div className="flex gap-6 font-semibold">
            <a href="#predict-section" className="hover:text-white transition-colors">Predict</a>
            <a href="#analytics-section" className="hover:text-white transition-colors">Market Insights</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Source Code</a>
          </div>
        </div>
      </footer>

      {/* 6. Custom animated toast notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white/80 backdrop-blur-md border border-red-100 p-4 rounded-2xl shadow-2xl flex items-start gap-3"
          >
            <div className="p-1 rounded-lg bg-red-50 text-red-500 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-sm font-bold text-gray-900">Valuation Engine Alert</h4>
              <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                {toastMessage}
              </p>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
