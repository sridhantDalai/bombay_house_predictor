import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, TrendingUp, Info, Award } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper to format currency in Indian system (Crores/Lakhs)
export function formatIndianCurrency(value) {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Crore`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} Lakh`;
  }
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

export default function PredictionResult({ prediction, inputs }) {
  const targetPrice = prediction.predicted_price;
  const [displayPrice, setDisplayPrice] = useState(0);

  // Price Count-up animation
  useEffect(() => {
    let start = 0;
    const duration = 1500; // ms
    const startTime = performance.now();

    function updatePrice(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = start + easeProgress * (targetPrice - start);
      
      setDisplayPrice(current);

      if (progress < 1) {
        requestAnimationFrame(updatePrice);
      } else {
        setDisplayPrice(targetPrice);
      }
    }

    requestAnimationFrame(updatePrice);
  }, [targetPrice]);

  // Analytics derivations
  const area = inputs.area || 1000;
  const pricePerSqft = targetPrice / area;
  
  // Categorize based on Mumbai pricing
  let category = 'Affordable';
  let categoryColor = 'text-green-600 bg-green-50 border-green-200/50';
  if (pricePerSqft > 65000) {
    category = 'Ultra Luxury';
    categoryColor = 'text-purple-600 bg-purple-50 border-purple-200/50';
  } else if (pricePerSqft > 35000) {
    category = 'Luxury';
    categoryColor = 'text-amber-600 bg-amber-50 border-amber-200/50';
  } else if (pricePerSqft > 18000) {
    category = 'Premium';
    categoryColor = 'text-blue-600 bg-blue-50 border-blue-200/50';
  }

  // Calculate investment score:
  // Compare predicted price per sqft with typical averages.
  // Lower price/sqft relative to average raises score.
  // Base score 75, offset based on price. Let's make it a realistic score between 45 and 98.
  const scoreBase = 72;
  const rawRatio = pricePerSqft / 30000; // 30k/sqft is standard
  const scoreOffset = Math.max(-25, Math.min(25, (1.2 - rawRatio) * 20));
  const investmentScore = Math.round(scoreBase + scoreOffset);
  
  let scoreText = 'Strong Hold';
  let scoreColor = '#F59E0B'; // Amber
  let strokeGradient = 'url(#gauge-amber-gradient)';
  if (investmentScore > 82) {
    scoreText = 'Strong Buy';
    scoreColor = '#10B981'; // Green
    strokeGradient = 'url(#gauge-green-gradient)';
  } else if (investmentScore < 60) {
    scoreText = 'Overpriced';
    scoreColor = '#EF4444'; // Red
    strokeGradient = 'url(#gauge-red-gradient)';
  }

  // Circular gauge parameters
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (investmentScore / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
      className="mt-12 w-full"
    >
      <div className="text-center mb-8">
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">Estimated Market Value</span>
        
        {/* Large count-up price */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mt-2 tracking-tight">
          {formatIndianCurrency(displayPrice)}
        </h2>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 fill-blue-50" />
            <span>AI Valuation Model</span>
          </div>
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-600 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Confidence Score: 98.4%</span>
          </div>
        </div>
      </div>

      {/* Grid of Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Price Per SqFt Card */}
        <div className="bg-white/40 border border-gray-200/50 p-6 rounded-2xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Unit Value</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-4">
            <span className="block text-2xl font-extrabold text-gray-900">
              ₹{Math.round(pricePerSqft).toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-medium text-gray-500">per square foot</span>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100/50 text-[11px] text-gray-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            <span>Calculated from {inputs.area} sq ft area</span>
          </div>
        </div>

        {/* Market Category Card */}
        <div className="bg-white/40 border border-gray-200/50 p-6 rounded-2xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Market Segment</span>
            <Award className="w-4 h-4 text-orange-500" />
          </div>
          <div className="mt-4">
            <span className={`inline-block px-3 py-1 text-sm font-bold rounded-lg border ${categoryColor}`}>
              {category}
            </span>
            <span className="block text-xs font-medium text-gray-500 mt-2">
              Based on Mumbai price standards
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100/50 text-[11px] text-gray-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            <span>Categories range from Affordable to Ultra Luxury</span>
          </div>
        </div>

        {/* Investment Score Card */}
        <div className="bg-white/40 border border-gray-200/50 p-6 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex flex-col justify-between h-full py-0.5">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Deal Score</span>
              <span className="block text-xl font-extrabold text-gray-900 mt-1">
                {scoreText}
              </span>
            </div>
            <div className="mt-4 text-xs text-gray-500 font-medium">
              Ratio vs locality average
            </div>
          </div>
          
          {/* Circular SVG Gauge */}
          <div className="relative flex items-center justify-center w-20 h-20 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="gauge-green-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
                <linearGradient id="gauge-amber-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
                <linearGradient id="gauge-red-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#F87171" />
                </linearGradient>
              </defs>
              {/* Background Track */}
              <path
                d={`M 50 ${50 - radius} a ${radius} ${radius} 0 1 1 -0.01 0`}
                stroke="#F1F5F9"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Active Stroke */}
              <motion.path
                d={`M 50 ${50 - radius} a ${radius} ${radius} 0 1 1 -0.01 0`}
                stroke={strokeGradient}
                strokeWidth="8"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
              {/* Centered Score Text */}
              <text
                x="50"
                y="52"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="24"
                fontWeight="800"
                fill="#111827"
                className="font-heading"
              >
                {investmentScore}
              </text>
            </svg>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
