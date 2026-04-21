import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const filterConfig = [
  {
    key: "jobtype",
    label: "Job Type",
    options: [
      { display_text: "Full Time", value: "full" },
      { display_text: "Internship", value: "internship" },
    ],
  },
  {
    key: "experience",
    label: "Experience",
    options: [
      { display_text: "Freshers", value: "freshers" },
      { display_text: "0-1 Years", value: "0-1" },
      { display_text: "1-3 Years", value: "1-3" },
      { display_text: "3-5 Years", value: "3-5" },
    ],
  },
  {
    key: "location",
    label: "Location",
    options: [
      { display_text: "Bengaluru", value: "bengaluru" },
      { display_text: "Gurgaon", value: "gurgaon" },
      { display_text: "Noida", value: "noida" },
      { display_text: "Delhi", value: "delhi" },
      { display_text: "Pune", value: "pune" },
      { display_text: "Mumbai", value: "mumbai" },
      { display_text: "Hyderabad", value: "hyderabad" },
      { display_text: "Remote", value: "remote" },
    ],
  },
  {
    key: "batch",
    label: "Batch",
    options: [
      { display_text: "2024", value: "2024" },
      { display_text: "2025", value: "2025" },
      { display_text: "2026", value: "2026" },
      { display_text: "2023", value: "2023" },
      { display_text: "2022", value: "2022" },
    ],
  },
];

const FilterDropdown = ({ filter, activeFilters, onSelect, isOpen, onToggle, onClose }) => {
  const ref = useRef(null);
  const selectedValue = activeFilters[filter.key];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-1.5 border rounded-lg px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          selectedValue
            ? "bg-primary-light border-primary text-primary"
            : "border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {selectedValue
          ? filter.options.find((o) => o.value === selectedValue)?.display_text || filter.label
          : filter.label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-border overflow-hidden z-40 min-w-[200px] max-h-80 overflow-y-auto"
            role="listbox"
          >
            {selectedValue && (
              <button
                onClick={() => {
                  onSelect(filter.key, "");
                  onClose();
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors border-b border-border"
              >
                Clear selection
              </button>
            )}
            {filter.options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSelect(filter.key, option.value);
                  onClose();
                }}
                role="option"
                aria-selected={selectedValue === option.value}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                  selectedValue === option.value
                    ? "bg-primary-light text-primary font-medium"
                    : "text-text-secondary hover:bg-gray-50"
                }`}
              >
                {option.display_text}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileBottomSheet = ({ filter, activeFilters, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[60vh] flex flex-col">
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>
        <div className="px-4 pb-2 flex items-center justify-between">
          <h3 className="text-base font-semibold text-text-primary">{filter.label}</h3>
          <button
            onClick={onClose}
            aria-label="Close filter"
            className="p-1 text-text-tertiary hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto px-4 pb-4 flex-1">
          {filter.options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSelect(filter.key, option.value);
                onClose();
              }}
              className={`w-full text-left px-4 py-3 text-sm rounded-lg mb-1 transition-colors ${
                activeFilters[filter.key] === option.value
                  ? "bg-primary-light text-primary font-medium"
                  : "text-text-secondary hover:bg-gray-50"
              }`}
            >
              {option.display_text}
            </button>
          ))}
        </div>
        {activeFilters[filter.key] && (
          <div className="p-4 border-t border-border">
            <button
              onClick={() => {
                onSelect(filter.key, "");
                onClose();
              }}
              className="w-full bg-primary text-white py-3 rounded-lg text-sm font-medium"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterBar = ({ activeFilters = {}, onFilterChange, totalCount }) => {
  const [openFilter, setOpenFilter] = useState(null);
  const [mobileSheet, setMobileSheet] = useState(null);

  const appliedFilters = Object.entries(activeFilters).filter(([, v]) => v && v !== "");

  const handleSelect = (key, value) => {
    onFilterChange && onFilterChange(key, value);
  };

  const clearAll = () => {
    appliedFilters.forEach(([key]) => handleSelect(key, ""));
  };

  const getLabelForValue = (key, value) => {
    const filter = filterConfig.find((f) => f.key === key);
    return filter?.options.find((o) => o.value === value)?.display_text || value;
  };

  return (
    <>
      <div className="sticky top-14 sm:top-16 z-30 bg-white border-b border-border">
        <div className="max-w-content mx-auto px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Desktop filter chips */}
            <div className="hidden md:flex items-center gap-2">
              {filterConfig.map((filter) => (
                <FilterDropdown
                  key={filter.key}
                  filter={filter}
                  activeFilters={activeFilters}
                  onSelect={handleSelect}
                  isOpen={openFilter === filter.key}
                  onToggle={() =>
                    setOpenFilter(openFilter === filter.key ? null : filter.key)
                  }
                  onClose={() => setOpenFilter(null)}
                />
              ))}
            </div>

            {/* Mobile horizontal scroll */}
            <div className="md:hidden flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
              {filterConfig.map((filter) => {
                const selected = activeFilters[filter.key];
                return (
                  <button
                    key={filter.key}
                    onClick={() => setMobileSheet(filter.key)}
                    className={`flex items-center gap-1.5 border rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                      selected
                        ? "bg-primary-light border-primary text-primary"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {selected
                      ? getLabelForValue(filter.key, selected)
                      : filter.label}
                    <ChevronDown size={14} />
                  </button>
                );
              })}
            </div>

            {totalCount > 0 && (
              <p className="text-sm text-text-tertiary whitespace-nowrap hidden sm:block">
                Showing {totalCount} jobs
              </p>
            )}
          </div>

          {appliedFilters.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs text-text-tertiary">Applied:</span>
              {appliedFilters.map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 bg-primary-light text-primary rounded-full px-3 py-1 text-sm"
                >
                  {getLabelForValue(key, value)}
                  <button
                    onClick={() => handleSelect(key, "")}
                    aria-label={`Remove ${getLabelForValue(key, value)} filter`}
                    className="hover:text-primary-hover ml-0.5"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              <button
                onClick={clearAll}
                className="text-sm text-text-tertiary hover:text-red-500 transition-colors ml-2"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {mobileSheet && (
        <MobileBottomSheet
          filter={filterConfig.find((f) => f.key === mobileSheet)}
          activeFilters={activeFilters}
          onSelect={handleSelect}
          onClose={() => setMobileSheet(null)}
        />
      )}
    </>
  );
};

export default FilterBar;
