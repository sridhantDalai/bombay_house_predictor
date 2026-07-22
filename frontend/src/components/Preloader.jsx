import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show the preloader for 2.5 seconds, then animate the exit
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 800); // Match exit transition duration
      return () => clearTimeout(exitTimer);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] bg-[#F8FAFC] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Ambient Glowing Background Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-70">
            <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#2563EB] blur-[120px] top-[-10%] left-[-10%] opacity-15" />
            <div className="absolute w-[450px] h-[450px] md:w-[700px] md:h-[700px] rounded-full bg-[#FF156D] blur-[120px] bottom-[-10%] right-[-10%] opacity-15" />
          </div>

          {/* Central Content */}
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-md">
            {/* SVG Spinner Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }} // smooth bounce-in
              className="w-28 h-28 md:w-32 md:h-32 drop-shadow-[0_8px_30px_rgba(255,21,109,0.25)] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
                <g fill="#FF156D" stroke="#FF156D" strokeWidth="15">
                  <rect width="30" height="30" x="125" y="45">
                    <animateTransform 
                      attributeName="transform" 
                      type="translate" 
                      calcMode="spline" 
                      dur="2" 
                      values="0 0;0 80;0 80;0 80;-80 80;" 
                      keySplines=".5 0 .5 1;.5 0 .5 1;.5 0 .5 1;.5 0 .5 1" 
                      repeatCount="indefinite"
                    />
                  </rect>
                  <rect width="30" height="30" x="45" y="45">
                    <animateTransform 
                      attributeName="transform" 
                      type="translate" 
                      calcMode="spline" 
                      dur="2" 
                      values="0 0;0 0;80 0;80 0;80 0;" 
                      keySplines=".5 0 .5 1;.5 0 .5 1;.5 0 .5 1;.5 0 .5 1" 
                      repeatCount="indefinite"
                    />
                  </rect>
                  <rect width="30" height="30" x="45" y="125">
                    <animateTransform 
                      attributeName="transform" 
                      type="translate" 
                      calcMode="spline" 
                      dur="2" 
                      values="0 0;0 0;0 0;0 -80;0 -80;" 
                      keySplines=".5 0 .5 1;.5 0 .5 1;.5 0 .5 1;.5 0 .5 1" 
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
              </svg>
            </motion.div>

            {/* Premium Typography & Status Message */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
              className="mt-8 space-y-2"
            >
              <h1 className="font-heading text-lg md:text-xl font-bold uppercase tracking-[0.25em] text-gray-800">
                Bombay House Predictor
              </h1>
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-widest text-[#FF156D] uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF156D] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF156D]"></span>
                </span>
                Valuation Engine Loading
              </div>
            </motion.div>
          </div>

          {/* Bottom Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-10 text-[9px] tracking-[0.3em] text-gray-400 font-semibold uppercase select-none"
          >
            Powered by Premium ML Models
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
