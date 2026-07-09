import React, { useState, useEffect, useRef } from 'react';
import { getLocalities, predictPrice } from '../services/api';
import Combobox from './Combobox';
import PredictionResult from './PredictionResult';
import { Sparkles, Loader2, Home, Compass, Sliders, ChevronDown, BedDouble, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PredictionCard({ onError }) {
  const [localities, setLocalities] = useState([]);
  const [bhk, setBhk] = useState(2);
  const [area, setArea] = useState(1000);
  const [locality, setLocality] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [showBhkDropdown, setShowBhkDropdown] = useState(false);
  
  const bhkRef = useRef(null);

  // Close BHK dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (bhkRef.current && !bhkRef.current.contains(event.target)) {
        setShowBhkDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch localities on mount
  useEffect(() => {
    async function loadLocalities() {
      try {
        const list = await getLocalities();
        setLocalities(list);
      } catch (err) {
        console.error("Failed to load localities list:", err);
        if (onError) {
          onError("Backend server is offline. Please start the FastAPI backend.");
        }
      }
    }
    loadLocalities();
  }, [onError]);

  const handlePredict = async (e) => {
    e.preventDefault();
    setValidationError('');
    setPrediction(null);

    // Validation checks
    if (!bhk || bhk < 1 || bhk > 10) {
      setValidationError("Please select a valid BHK configuration (1 - 10).");
      return;
    }
    if (!area || area < 100 || area > 25000) {
      setValidationError("Please specify an area size between 100 and 25,000 sq ft.");
      return;
    }
    if (!locality) {
      setValidationError("Please select a Mumbai locality from the searchable dropdown.");
      return;
    }

    setLoading(true);

    try {
      // Small artificial delay for visual feedback of the skeleton loaders
      await new Promise(resolve => setTimeout(resolve, 850));
      
      const res = await predictPrice(bhk, area, locality);
      setPrediction(res);
    } catch (err) {
      console.error("Inference request failed:", err);
      const errMsg = err.response?.data?.detail || "Connection failed. Please ensure the backend is running.";
      if (onError) {
        onError(errMsg);
      } else {
        setValidationError(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="predict-section" className="py-12 px-6 max-w-6xl mx-auto relative z-20 scroll-mt-24">
      {/* Premium Glass Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-effect p-8 sm:p-12 rounded-[32px] shadow-premium relative overflow-hidden"
      >
        {/* Soft Radial Background Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-400/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" /> Real-time Valuation Engine
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Predict Mumbai Property Rates
          </h2>
          <p className="text-sm font-medium text-gray-500 mt-2 max-w-md mx-auto">
            Input property configurations to run instant predictive AI analysis on the CatBoost regression model.
          </p>
        </div>

        {/* Prediction Input Form */}
        <form onSubmit={handlePredict} className="space-y-8">
          
          {/* Inner Booking Widget Border Wrapper */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-end relative">
            
            {/* Input 1: Custom BHK Dropdown Selector (Equal Width) */}
            <div className="relative flex flex-col w-full" ref={bhkRef}>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                BHK Configuration
              </label>
              
              <button
                type="button"
                onClick={() => setShowBhkDropdown(!showBhkDropdown)}
                className="w-full flex items-center justify-between pl-4 pr-4 py-3.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-500 rounded-2xl text-gray-800 text-sm font-semibold transition-all outline-none text-left"
              >
                <span className="flex items-center gap-3">
                  <BedDouble className="w-5 h-5 text-gray-400" />
                  <span>{bhk} BHK Apartment</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showBhkDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showBhkDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-30 w-full mt-20 bg-white border border-gray-100 shadow-xl rounded-2xl p-4 space-y-3"
                  >
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Select Bedrooms</span>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            setBhk(num);
                            setShowBhkDropdown(false);
                          }}
                          className={`h-9 w-full flex items-center justify-center rounded-lg text-xs font-bold transition-all
                            ${bhk === num 
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                            }
                          `}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input 2: Area Input (Equal Width) */}
            <div className="flex flex-col w-full">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                Area (Square Feet)
              </label>
              <div className="relative flex items-center">
                <Home className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="number"
                  min="100"
                  max="25000"
                  value={area}
                  onChange={(e) => setArea(parseInt(e.target.value, 10) || '')}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-2xl text-gray-800 text-sm font-semibold transition-all outline-none"
                  placeholder="e.g. 1200"
                  required
                />
              </div>
            </div>

            {/* Input 3: Searchable Locality Combobox (Equal Width) */}
            <div className="w-full">
              <Combobox
                options={localities}
                value={locality}
                onChange={setLocality}
                placeholder="Type neighborhood..."
                label="Locality / Address"
              />
            </div>

          </div>

          {/* Validation Warning Overlay */}
          <AnimatePresence>
            {validationError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-150 text-red-600 px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 overflow-hidden"
              >
                <HelpCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{validationError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Trigger Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`gradient-btn glow-on-hover w-full sm:w-auto px-12 py-4.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2.5 transition-all
                ${loading ? 'opacity-85 pointer-events-none' : ''}
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Invoking CatBoost Estimator...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 fill-white" />
                  <span>Predict Mumbai Price</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Shimmer Skeleton Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12 space-y-8 pt-8 border-t border-gray-100"
            >
              <div className="text-center flex flex-col items-center">
                <div className="h-4 w-32 bg-gray-100 rounded-full animate-pulse mb-3" />
                <div className="h-12 w-64 bg-gray-100 rounded-2xl animate-pulse mb-4" />
                <div className="flex gap-2">
                  <div className="h-6 w-28 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-6 w-36 bg-gray-100 rounded-full animate-pulse" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-gray-50/50 border border-gray-100 p-6 rounded-3xl animate-pulse flex flex-col justify-between">
                    <div className="h-3.5 w-16 bg-gray-200 rounded" />
                    <div className="h-8 w-32 bg-gray-200 rounded-lg mt-4" />
                    <div className="h-3 w-40 bg-gray-200 rounded mt-4" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Real Prediction Outcome Display */}
        <AnimatePresence>
          {prediction && !loading && (
            <PredictionResult 
              prediction={prediction} 
              inputs={{ bhk, area, locality }} 
            />
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  );
}
