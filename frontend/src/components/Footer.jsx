import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, Code2, ExternalLink, Building, Heart } from 'lucide-react';

export default function Footer() {
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  // Refs for magnetic effects (separate for inline and floating badges)
  const inlineRef = useRef(null);
  const floatRef = useRef(null);
  
  // Magnetic values for inline badge
  const inlineX = useMotionValue(0);
  const inlineY = useMotionValue(0);
  const inlineSpringX = useSpring(inlineX, { damping: 15, stiffness: 150, mass: 0.1 });
  const inlineSpringY = useSpring(inlineY, { damping: 15, stiffness: 150, mass: 0.1 });

  // Magnetic values for floating badge
  const floatX = useMotionValue(0);
  const floatY = useMotionValue(0);
  const floatSpringX = useSpring(floatX, { damping: 15, stiffness: 150, mass: 0.1 });
  const floatSpringY = useSpring(floatY, { damping: 15, stiffness: 150, mass: 0.1 });

  // Scroll detection to toggle floating badge visibility
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // If we are within 100px of the bottom of the page, hide the floating badge
      if (docHeight - (scrollTop + windowHeight) < 100) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e, ref, x, y) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull distance logic
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = (x, y) => {
    x.set(0);
    y.set(0);
  };

  const signature = "{SRIDHANT}";

  const openPortfolio = () => {
    window.open('https://portfolio-one-fawn-cv0a47vf5f.vercel.app/', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* A. FLOATING BOTTOM BADGE (shown when NOT at the bottom of the page) */}
      <AnimatePresence>
        {!isAtBottom && (
          <motion.div
            initial={{ y: 100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: 100, x: '-50%', opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="fixed bottom-6 left-1/2 z-40 transform -translate-x-1/2"
          >
            <motion.div
              ref={floatRef}
              onMouseMove={(e) => handleMouseMove(e, floatRef, floatX, floatY)}
              onMouseLeave={() => handleMouseLeave(floatX, floatY)}
              style={{ x: floatSpringX, y: floatSpringY }}
              onClick={openPortfolio}
              className="cursor-pointer select-none relative px-6 py-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 hover:border-slate-700/80 shadow-2xl flex items-center gap-2.5 transition-colors duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Pulse effect indicator */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>

              <span className="text-xs text-slate-400 font-semibold tracking-wider font-heading">
                Dev:
              </span>

              <span className="font-jetbrains font-extrabold text-sm tracking-wider text-white inline-flex">
                {signature.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    whileHover={{ 
                      y: -4,
                      scale: 1.15,
                      color: ['{', '}'].includes(char) ? '#3b82f6' : '#f97316',
                    }}
                    transition={{ type: 'spring', stiffness: 450, damping: 8 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />

              {/* Glowing rectangular aura */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* B. MAIN FOOTER (revealed at the very bottom of the page) */}
      <footer className="relative bg-slate-950 text-gray-400 py-12 border-t border-slate-900 overflow-hidden">
        
        {/* Top border animated glowing line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-orange-500 opacity-60 animate-pulse" />
        
        {/* Decorative background grid/ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(37,99,235,0.05),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform duration-300">
                <Building className="w-4.5 h-4.5" />
              </div>
              <span className="font-heading font-extrabold text-white tracking-tight flex items-center gap-1">
                Bombay House Predictor <span className="text-blue-500 flex items-center gap-0.5">AI <Sparkles className="w-3 h-3 text-blue-400 fill-blue-500" /></span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-xs text-center md:text-left mt-1">
              Predicting real estate valuations in Mumbai with CatBoost machine learning model.
            </p>
          </div>

          {/* Center: Developer Signature (Merged inside the footer) */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs tracking-wider text-slate-500 font-semibold uppercase flex items-center gap-1.5">
              Designed & Developed with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" /> by
            </span>
            
            <motion.div
              ref={inlineRef}
              onMouseMove={(e) => handleMouseMove(e, inlineRef, inlineX, inlineY)}
              onMouseLeave={() => handleMouseLeave(inlineX, inlineY)}
              style={{ x: inlineSpringX, y: inlineSpringY }}
              onClick={openPortfolio}
              className="cursor-pointer select-none relative group px-6 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
              
              <Code2 className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
              
              <span className="font-jetbrains font-extrabold text-sm md:text-base tracking-wide text-white inline-flex">
                {signature.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    whileHover={{ 
                      y: -5,
                      scale: 1.15,
                      color: ['{', '}'].includes(char) ? '#3b82f6' : '#f97316',
                      textShadow: '0 0 8px rgba(249, 115, 22, 0.4)'
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
            </motion.div>
          </div>

          {/* Right: Quick Links */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-5 text-sm font-semibold">
              <a href="#predict-section" className="hover:text-white transition-colors text-slate-400 hover:scale-105 transform duration-200">Predict</a>
              <a href="#analytics-section" className="hover:text-white transition-colors text-slate-400 hover:scale-105 transform duration-200">Market Insights</a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors text-slate-400 hover:scale-105 transform duration-200"
              >
                Source Code
              </a>
            </div>
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} Bombay House Predictor AI.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
