import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ChevronDown, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Combobox({ 
  options = [], 
  value = '', 
  onChange, 
  placeholder = "Search locality...",
  label = "Locality" 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Sync with outer value
  useEffect(() => {
    setSearch(value);
  }, [value]);

  // Filter options based on search query
  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(search.toLowerCase())
  );

  // Windowed options to ensure high performance
  const WINDOW_SIZE = 50;
  const visibleOptions = filteredOptions.slice(0, WINDOW_SIZE);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        // Reset search to current selected value
        setSearch(value);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const handleSelect = (option) => {
    onChange(option);
    setSearch(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        setActiveIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prevIndex) => 
          prevIndex < visibleOptions.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (visibleOptions[activeIndex]) {
          handleSelect(visibleOptions[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearch(value);
        inputRef.current?.blur();
        break;
      case 'Tab':
        setIsOpen(false);
        setSearch(value);
        break;
      default:
        break;
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeEl = listRef.current.children[activeIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex, isOpen]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setIsOpen(true);
    setActiveIndex(0);
  };

  const handleClear = () => {
    setSearch('');
    onChange('');
    inputRef.current?.focus();
    setIsOpen(true);
  };

  return (
    <div className="relative w-full flex flex-col" ref={containerRef}>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
        {label}
      </label>
      
      <div className="relative flex items-center">
        <MapPin className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
        
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="locality-listbox"
          aria-haspopup="listbox"
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-2xl text-gray-800 text-sm font-medium transition-all outline-none"
        />

        {search ? (
          <button 
            type="button"
            onClick={handleClear}
            className="absolute right-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <ChevronDown className="absolute right-4 w-5 h-5 text-gray-400 pointer-events-none" />
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 w-full mt-24 glass-card shadow-xl border border-gray-100 overflow-hidden"
          >
            {visibleOptions.length > 0 ? (
              <ul
                ref={listRef}
                id="locality-listbox"
                role="listbox"
                className="max-h-60 overflow-y-auto py-2 combobox-list"
              >
                {visibleOptions.map((option, idx) => {
                  const isActive = idx === activeIndex;
                  const isSelected = option === value;
                  
                  return (
                    <li
                      key={option}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(option)}
                      className={`px-5 py-3 text-sm cursor-pointer flex items-center justify-between transition-colors
                        ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}
                        ${isSelected && !isActive ? 'bg-blue-50/50 text-blue-600 font-medium' : ''}
                      `}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 opacity-50" />
                        {option}
                      </span>
                      {isSelected && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-semibold">
                          Selected
                        </span>
                      )}
                    </li>
                  );
                })}
                {filteredOptions.length > WINDOW_SIZE && (
                  <li className="px-5 py-2.5 text-xs text-gray-400 bg-gray-50/50 text-center border-t border-gray-100">
                    Showing top {WINDOW_SIZE} of {filteredOptions.length} results. Type to narrow.
                  </li>
                )}
              </ul>
            ) : (
              <div className="p-6 text-center text-sm text-gray-400 flex flex-col items-center justify-center gap-1">
                <Search className="w-6 h-6 mb-1 opacity-50" />
                <span className="font-semibold text-gray-600">No localities found</span>
                <span className="text-xs">Try searching for another neighborhood</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
