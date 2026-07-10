import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Building, Sparkles, Cpu } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const count = useMotionValue(0);
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING ENGINE...");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate percentage from 0 to 100 with custom ease curves (slow start, fast middle, slow end)
    const controls = animate(count, 100, {
      duration: 3.5,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (latest) => {
        const p = Math.round(latest);
        setPercent(p);
        
        // Dynamic loading stages matching Mumbai ML real estate theme
        if (p < 20) {
          setStatusText("CONNECTING TO BOMBAY VALUATION CORE...");
        } else if (p < 40) {
          setStatusText("DATAMINING 10,000+ MUMBAI TRANSACTIONS...");
        } else if (p < 60) {
          setStatusText("CALIBRATING CATBOOST ML HYPERPARAMETERS...");
        } else if (p < 80) {
          setStatusText("COMPUTING DISTRICT GEOLOCATION COEFFICIENTS...");
        } else if (p < 95) {
          setStatusText("INJECTING PREMIUM AESTHETIC ENGINE...");
        } else {
          setStatusText("NEURAL NETWORKS CALIBRATED & READY");
        }
      },
      onComplete: () => {
        // Trigger curtain exit animation after a brief delay
        setTimeout(() => {
          setIsExiting(true);
          // Call onComplete after curtains slide off screen
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 600);
      }
    });

    return () => controls.stop();
  }, [count, onComplete]);

  // Format percentage with leading zeros
  const formatPercent = (val) => {
    if (val < 10) return `00${val}`;
    if (val < 100) return `0${val}`;
    return `${val}`;
  };

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden pointer-events-none flex items-center justify-center">
      {/* 1. Curtain Panels (Slide up and down on completion) */}
      <motion.div
        initial={{ y: 0 }}
        animate={isExiting ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
        className="absolute top-0 left-0 w-full h-1/2 bg-slate-950 border-b border-slate-900 pointer-events-auto z-10"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={isExiting ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-950 border-t border-slate-900 pointer-events-auto z-10"
      />

      {/* 2. Interactive Overlay Elements (Fade out on completion) */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div 
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="relative w-full h-full flex flex-col items-center justify-center pointer-events-auto z-20 px-6"
          >
            {/* Tech grid overlay background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            
            {/* Horizontal sweeping laser line */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-sweep" />
            
            {/* Rotating orbits */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Outer dashed spinning ring */}
              <div className="absolute inset-0 border-2 border-dashed border-slate-800 rounded-full animate-[spin_12s_linear_infinite]" />
              
              {/* Inner glowing blue ring */}
              <div className="absolute inset-2 border border-blue-500/20 rounded-full" />
              <div 
                className="absolute inset-2 border-2 border-transparent border-t-blue-500 border-r-blue-500/40 rounded-full animate-[spin_3s_linear_infinite]"
              />

              {/* Core logo container with breathing glow */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 relative"
              >
                <Building className="w-10 h-10" />
                <Sparkles className="w-5 h-5 absolute -top-1 -right-1 text-orange-400 animate-pulse" />
              </motion.div>
            </div>

            {/* Title / App Brand */}
            <h1 className="mt-8 font-heading font-extrabold text-white text-lg md:text-xl tracking-wider flex items-center gap-2">
              BOMBAY HOUSE PREDICTOR <span className="text-blue-500 flex items-center gap-0.5">AI <Cpu className="w-4 h-4 fill-blue-500" /></span>
            </h1>

            {/* Glowing huge JetBrains Mono counter */}
            <div className="mt-6 flex items-baseline">
              <span className="font-jetbrains font-extrabold text-7xl md:text-8xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                {formatPercent(percent)}
              </span>
              <span className="font-jetbrains font-bold text-2xl md:text-3xl text-orange-500 ml-1 select-none">%</span>
            </div>

            {/* Dynamic Status message */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <span className="font-jetbrains text-xs tracking-widest text-slate-500 font-semibold uppercase animate-pulse">
                {statusText}
              </span>
              
              {/* Sleek cyber style loading bar */}
              <div className="w-64 md:w-80 h-[4px] bg-slate-900 rounded-full overflow-hidden border border-slate-800/50">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-500 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* Small credit brand */}
            <div className="absolute bottom-10 text-[10px] tracking-widest text-slate-600 uppercase font-semibold">
              ENGINEERED BY {"{SRIDHANT}"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom inline sweeping line animation style */}
      <style>{`
        @keyframes sweep {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-sweep {
          animation: sweep 4s linear infinite;
        }
      `}</style>
    </div>
  );
}

// Make sure AnimatePresence is imported
import { AnimatePresence } from 'framer-motion';
