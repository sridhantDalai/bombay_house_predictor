import React, { useState, useEffect } from 'react';
import { getAnalytics } from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { BarChart3, PieChart as PieIcon, TrendingUp, HelpCircle, Activity } from 'lucide-react';
import { formatIndianCurrency } from './PredictionResult';

const COLORS = ['#2563EB', '#F97316', '#10B981', '#EC4899', '#8B5CF6', '#F59E0B', '#EF4444', '#14B8A6'];

export default function AnalyticsSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getAnalytics();
        setData(res);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load analytics:", err);
        setError("Could not retrieve market analytics. Please ensure the backend is online.");
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <section id="analytics-section" className="py-20 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Market Insights & Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-80 bg-white/40 border border-gray-100 rounded-3xl animate-pulse flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-400">Loading analysis charts...</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="analytics-section" className="py-20 max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-md mx-auto p-8 glass-card border-red-100 text-center">
          <HelpCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Analytics Offline</h3>
          <p className="text-sm text-gray-500 mb-6">{error}</p>
        </div>
      </section>
    );
  }

  // Format currency for Y axis (e.g. 10 Cr, 50 L)
  const formatYAxisPrice = (val) => {
    if (val >= 10000000) return `${(val / 10000000).toFixed(0)} Cr`;
    if (val >= 100000) return `${(val / 100000).toFixed(0)} L`;
    return val;
  };

  const CustomTooltipPrice = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 border border-gray-200 p-4 rounded-xl shadow-lg backdrop-blur-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{data.locality || data.macro_locality}</p>
          <p className="text-sm font-extrabold text-gray-950">Avg Price: {formatIndianCurrency(payload[0].value)}</p>
          {data.listings && <p className="text-xs text-gray-500 font-medium mt-1">Listings: {data.listings}</p>}
        </div>
      );
    };
    return null;
  };

  const CustomTooltipScatter = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const pt = payload[0].payload;
      return (
        <div className="bg-white/95 border border-gray-200 p-4 rounded-xl shadow-lg backdrop-blur-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{pt.locality}</p>
          <p className="text-sm font-extrabold text-gray-950">Price: {formatIndianCurrency(pt.price)}</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Area: {pt.area} sq ft</p>
          <p className="text-xs text-gray-500 font-medium">Layout: {pt.bhk} BHK</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="analytics-section" className="py-20 md:py-28 bg-[#F1F5F9]/50 border-y border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Mumbai Housing Market Trends
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto font-medium text-sm sm:text-base">
            Detailed market analysis generated directly from {data?.summary?.total_listings || 810} recent property transactions in Mumbai.
          </p>
        </div>

        {/* Small Analytics Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Avg Property Price', val: formatIndianCurrency(data.summary.average_price) },
            { label: 'Median Price', val: formatIndianCurrency(data.summary.median_price) },
            { label: 'Avg Property Area', val: `${Math.round(data.summary.average_area)} Sq Ft` },
            { label: 'Total Records', val: data.summary.total_listings }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/70 border border-gray-200/40 p-6 rounded-2xl shadow-sm text-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">{stat.label}</span>
              <span className="text-xl sm:text-2xl font-black text-gray-900">{stat.val}</span>
            </div>
          ))}
        </div>

        {/* Dashboard grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Expensive & Regions */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Chart 1: Average prices per macro locality */}
            <div className="bg-white/70 border border-gray-200/40 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Average Prices by Sub-Region (Macro Locality)</h3>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.macro_locality_stats} margin={{ top: 10, right: 10, left: 15, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis 
                      dataKey="macro_locality" 
                      tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tickFormatter={formatYAxisPrice}
                      tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltipPrice />} cursor={{ fill: 'rgba(37,99,235,0.04)' }} />
                    <Bar dataKey="average_price" fill="url(#blue-grad)" radius={[6, 6, 0, 0]} barSize={40} />
                    <defs>
                      <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Area vs Price Correlation */}
            <div className="bg-white/70 border border-gray-200/40 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Area vs. Price Correlation</h3>
              </div>
              <div className="h-85 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                    <CartesianGrid stroke="rgba(0,0,0,0.05)" />
                    <XAxis 
                      type="number" 
                      dataKey="area" 
                      name="Area" 
                      unit=" sqft" 
                      tick={{ fill: '#6B7280', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="price" 
                      name="Price" 
                      tickFormatter={formatYAxisPrice}
                      tick={{ fill: '#6B7280', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <ZAxis type="number" range={[60, 60]} />
                    <Tooltip content={<CustomTooltipScatter />} cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Mumbai Properties" data={data.area_vs_price} fill="#F97316" opacity={0.6} />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Right Column: BHK & Histogram */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Chart 3: BHK Distribution */}
            <div className="bg-white/70 border border-gray-200/40 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <PieIcon className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-gray-900">Property Configurations</h3>
              </div>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.bhk_distribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="count"
                      nameKey="bhk"
                    >
                      {data.bhk_distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} Listings`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Custom Legend */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-semibold text-gray-500 text-center">
                {data.bhk_distribution.slice(0, 6).map((item, idx) => (
                  <div key={item.bhk} className="flex items-center gap-1.5 justify-center">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span>{item.bhk} BHK</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 4: Price Histogram */}
            <div className="bg-white/70 border border-gray-200/40 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-gray-900">Market Price Ranges</h3>
              </div>
              <div className="h-68 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.price_histogram} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} />
                    <YAxis 
                      type="category" 
                      dataKey="range" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 500 }} 
                    />
                    <Tooltip formatter={(val) => [`${val} Properties`, 'Density']} />
                    <Bar dataKey="count" fill="url(#orange-grad)" radius={[0, 4, 4, 0]} barSize={16} />
                    <defs>
                      <linearGradient id="orange-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#F97316" />
                        <stop offset="100%" stopColor="#FB923C" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Full-width Row: Top Expensive Localities */}
          <div className="lg:col-span-12">
            <div className="bg-white/70 border border-gray-200/40 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Top 10 Most Premium Localities in Mumbai</h3>
              </div>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.top_expensive} margin={{ top: 10, right: 10, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis 
                      dataKey="locality" 
                      tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 500 }}
                      angle={-25}
                      textAnchor="end"
                      height={60}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tickFormatter={formatYAxisPrice}
                      tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltipPrice />} cursor={{ fill: 'rgba(249,115,22,0.04)' }} />
                    <Bar dataKey="average_price" fill="url(#premium-grad)" radius={[6, 6, 0, 0]} barSize={45} />
                    <defs>
                      <linearGradient id="premium-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F97316" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
