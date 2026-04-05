import React from "react";
import { CATEGORIES, SORT_OPTIONS } from "./toolsData";

const ToolsCategoryBar = ({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categoryCounts,
}) => {
  const totalCount = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="sticky top-14 sm:top-16 z-30 bg-white border-b border-border">
      <div className="max-w-content mx-auto px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Category chips */}
          <div
            role="tablist"
            aria-label="Filter tools by category"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
            }}
          >
            {/* All chip */}
            <button
              role="tab"
              aria-selected={activeCategory === "all"}
              onClick={() => onCategoryChange("all")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                activeCategory === "all"
                  ? "bg-primary text-white border-primary"
                  : "border-border text-text-secondary bg-white hover:border-primary hover:text-primary"
              }`}
            >
              All ({totalCount})
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeCategory === cat.id
                    ? "bg-primary text-white border-primary"
                    : "border-border text-text-secondary bg-white hover:border-primary hover:text-primary"
                }`}
              >
                {cat.emoji} {cat.label} ({categoryCounts[cat.id] || 0})
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="hidden sm:flex items-center flex-shrink-0">
            <label htmlFor="tools-sort" className="sr-only">
              Sort tools
            </label>
            <select
              id="tools-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="border border-border rounded-button px-3 py-2 text-sm text-text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsCategoryBar;
