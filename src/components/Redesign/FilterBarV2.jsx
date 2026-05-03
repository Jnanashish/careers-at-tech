import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const filterConfig = [
    {
        key: "employmentType",
        label: "Job Type",
        options: [
            { display_text: "Full-time", value: "FULL_TIME" },
            { display_text: "Internship", value: "INTERN" },
            { display_text: "Contract", value: "CONTRACTOR" },
            { display_text: "Part-time", value: "PART_TIME" },
        ],
    },
    {
        key: "workMode",
        label: "Work Mode",
        options: [
            { display_text: "On-site", value: "onsite" },
            { display_text: "Remote", value: "remote" },
            { display_text: "Hybrid", value: "hybrid" },
        ],
    },
    {
        key: "batch",
        label: "Batch",
        options: [
            { display_text: "2026", value: "2026" },
            { display_text: "2025", value: "2025" },
            { display_text: "2024", value: "2024" },
            { display_text: "2023", value: "2023" },
        ],
    },
    {
        key: "topicTags",
        label: "Category",
        options: [
            { display_text: "Frontend", value: "frontend" },
            { display_text: "Backend", value: "backend" },
            { display_text: "Full-stack", value: "fullstack" },
            { display_text: "Data", value: "data" },
            { display_text: "Data Engineering", value: "data-engineering" },
            { display_text: "Mobile", value: "mobile" },
            { display_text: "DevOps", value: "devops" },
            { display_text: "ML/AI", value: "ml" },
            { display_text: "Design", value: "design" },
            { display_text: "Product", value: "product" },
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
                <ChevronDown size={16} className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
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
                                onClick={() => { onSelect(filter.key, ""); onClose(); }}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors border-b border-border"
                            >
                                Clear selection
                            </button>
                        )}
                        {filter.options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => { onSelect(filter.key, option.value); onClose(); }}
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

const FilterBarV2 = ({ activeFilters = {}, onFilterChange, totalCount }) => {
    const [openFilter, setOpenFilter] = useState(null);

    const appliedFilters = Object.entries(activeFilters).filter(([, v]) => v && v !== "");

    const handleSelect = (key, value) => onFilterChange && onFilterChange(key, value);
    const clearAll = () => appliedFilters.forEach(([key]) => handleSelect(key, ""));

    const getLabelForValue = (key, value) => {
        const filter = filterConfig.find((f) => f.key === key);
        return filter?.options.find((o) => o.value === value)?.display_text || value;
    };

    return (
        <div className="sticky top-14 sm:top-16 z-30 bg-white border-b border-border">
            <div className="max-w-content mx-auto px-4 lg:px-6 py-3">
                <div className="flex items-center justify-between gap-4">
                    <div className="hidden md:flex items-center gap-2 flex-wrap">
                        {filterConfig.map((filter) => (
                            <FilterDropdown
                                key={filter.key}
                                filter={filter}
                                activeFilters={activeFilters}
                                onSelect={handleSelect}
                                isOpen={openFilter === filter.key}
                                onToggle={() => setOpenFilter(openFilter === filter.key ? null : filter.key)}
                                onClose={() => setOpenFilter(null)}
                            />
                        ))}
                    </div>

                    <div className="md:hidden flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 flex-1">
                        {filterConfig.map((filter) => (
                            <FilterDropdown
                                key={filter.key}
                                filter={filter}
                                activeFilters={activeFilters}
                                onSelect={handleSelect}
                                isOpen={openFilter === filter.key}
                                onToggle={() => setOpenFilter(openFilter === filter.key ? null : filter.key)}
                                onClose={() => setOpenFilter(null)}
                            />
                        ))}
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
                            Clear all
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterBarV2;
