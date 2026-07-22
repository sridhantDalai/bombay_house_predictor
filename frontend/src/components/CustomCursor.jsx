import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Position trackers
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics config for lag-behind outer ring
  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch-only / coarse pointers (mobile devices)
    const checkMobile = () => {
      const match = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(match);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (isHidden) setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Dynamic hover handler for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(!!isClickable);
    };

    // Attach listeners on desktop
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isHidden, isMobile]);

  // Disable completely on mobile or if hidden off-screen
  if (isMobile || isHidden) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border-2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          borderColor: isHovered ? '#FF156D' : '#2563EB',
          backgroundColor: isHovered ? 'rgba(255, 21, 109, 0.08)' : 'rgba(37, 99, 235, 0.03)',
        }}
        animate={{
          scale: isClicked ? 0.85 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[10000] shadow-[0_0_8px_rgba(255,21,109,0.5)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovered ? '#FF156D' : '#2563EB',
        }}
        animate={{
          scale: isClicked ? 1.5 : isHovered ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </>
  );
}
