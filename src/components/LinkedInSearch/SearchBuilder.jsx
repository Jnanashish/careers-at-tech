import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  Building2,
  GraduationCap,
  Zap,
  SlidersHorizontal,
  IndianRupee,
  ArrowUpDown,
} from "lucide-react";
import FilterSection from "./FilterSection";
import FilterChip from "./FilterChip";
import {
  TIME_POSTED,
  SORT_BY,
  WORK_MODE,
  JOB_TYPE,
  EXPERIENCE_LEVEL_PRIMARY,
  EXPERIENCE_LEVEL_SECONDARY,
  INDIAN_LOCATIONS,
  CURRENCIES,
} from "./lib/linkedin-params";

// Design system section 8: Height 44px, Padding 12px 16px, Font 16px, Border 1px #E5E7EB
// Focus: border-color #2563EB + ring 0 0 0 3px rgba(37,99,235,0.15)
const inputClasses =
  "w-full h-11 px-4 py-3 text-base rounded-button border border-border bg-white text-text-primary focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15 placeholder:text-text-tertiary transition-all duration-200";

const SearchBuilder = ({ filters, dispatch }) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [customLocation, setCustomLocation] = useState("");
  const keywordsRef = useRef(null);

  // Expose ref for keyboard shortcut
  SearchBuilder.keywordsRef = keywordsRef;

  const handleCustomLocation = (e) => {
    if (e.key === "Enter" && customLocation.trim()) {
      dispatch({ type: "SET_FILTER", key: "location", value: customLocation.trim() });
      setCustomLocation("");
    }
  };

  const hasMoreFilters =
    filters.workMode.length > 0 ||
    filters.experienceLevel.length > 0 ||
    filters.sortBy ||
    filters.easyApply ||
    filters.minSalary;

  return (
    <div className="space-y-4">
      {/* Tier 1: Always visible */}
      <FilterSection title="Keywords" icon={Search} defaultOpen={true}>
        <input
          ref={keywordsRef}
          type="text"
          value={filters.keywords}
          onChange={(e) =>
            dispatch({ type: "SET_FILTER", key: "keywords", value: e.target.value })
          }
          placeholder="e.g. React Developer, Data Analyst, SDE..."
          className={inputClasses}
          aria-label="Job keywords"
        />
      </FilterSection>

      <FilterSection title="Location" icon={MapPin} defaultOpen={true}>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {INDIAN_LOCATIONS.map((loc) => (
              <FilterChip
                key={loc}
                label={loc}
                size="sm"
                selected={filters.location === loc}
                onClick={() =>
                  dispatch({
                    type: "SET_FILTER",
                    key: "location",
                    value: filters.location === loc ? "" : loc,
                  })
                }
              />
            ))}
          </div>
          <input
            type="text"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            onKeyDown={handleCustomLocation}
            placeholder="Or type a custom location and press Enter"
            className={inputClasses}
            aria-label="Custom location"
          />
        </div>
      </FilterSection>

      <FilterSection title="Time Posted" icon={Clock} defaultOpen={true}>
        <div className="flex flex-wrap gap-2">
          {Object.entries(TIME_POSTED).map(([label, value]) => (
            <FilterChip
              key={value}
              label={label}
              size="sm"
              selected={filters.timePosted === value}
              onClick={() =>
                dispatch({
                  type: "SET_FILTER",
                  key: "timePosted",
                  value: filters.timePosted === value ? "" : value,
                })
              }
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Job Type" icon={Briefcase} defaultOpen={true}>
        <div className="flex flex-wrap gap-2">
          {Object.entries(JOB_TYPE).map(([label, value]) => (
            <FilterChip
              key={value}
              label={label}
              size="sm"
              selected={filters.jobType.includes(value)}
              onClick={() =>
                dispatch({ type: "TOGGLE_CHIP", key: "jobType", value })
              }
            />
          ))}
        </div>
      </FilterSection>

      {/* Tier 2: More Filters */}
      <button
        type="button"
        onClick={() => setShowMoreFilters(!showMoreFilters)}
        className="w-full flex items-center justify-center gap-2 h-11 text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-150 cursor-pointer"
      >
        <SlidersHorizontal size={16} />
        {showMoreFilters ? "Less filters" : "More filters"}
        {hasMoreFilters && !showMoreFilters && (
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold">
            {[
              filters.workMode.length,
              filters.experienceLevel.length,
              filters.sortBy ? 1 : 0,
              filters.easyApply ? 1 : 0,
              filters.minSalary ? 1 : 0,
            ].reduce((a, b) => a + b, 0)}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showMoreFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden space-y-4"
          >
            <FilterSection title="Work Mode" icon={Building2} tier={2} defaultOpen={true}>
              <div className="flex flex-wrap gap-2">
                {Object.entries(WORK_MODE).map(([label, value]) => (
                  <FilterChip
                    key={value}
                    label={label}
                    size="sm"
                    selected={filters.workMode.includes(value)}
                    onClick={() =>
                      dispatch({ type: "TOGGLE_CHIP", key: "workMode", value })
                    }
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Experience Level" icon={GraduationCap} tier={2} defaultOpen={true}>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(EXPERIENCE_LEVEL_PRIMARY).map(([label, value]) => (
                    <FilterChip
                      key={value}
                      label={label}
                      size="sm"
                      selected={filters.experienceLevel.includes(value)}
                      onClick={() =>
                        dispatch({
                          type: "TOGGLE_CHIP",
                          key: "experienceLevel",
                          value,
                        })
                      }
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 opacity-70">
                  {Object.entries(EXPERIENCE_LEVEL_SECONDARY).map(([label, value]) => (
                    <FilterChip
                      key={value}
                      label={label}
                      size="sm"
                      selected={filters.experienceLevel.includes(value)}
                      onClick={() =>
                        dispatch({
                          type: "TOGGLE_CHIP",
                          key: "experienceLevel",
                          value,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Sort By" icon={ArrowUpDown} tier={2} defaultOpen={true}>
              <div className="flex flex-wrap gap-2">
                {Object.entries(SORT_BY).map(([label, value]) => (
                  <FilterChip
                    key={value}
                    label={label}
                    size="sm"
                    selected={filters.sortBy === value}
                    onClick={() =>
                      dispatch({
                        type: "SET_FILTER",
                        key: "sortBy",
                        value: filters.sortBy === value ? "" : value,
                      })
                    }
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Easy Apply" icon={Zap} tier={2} defaultOpen={true}>
              <FilterChip
                label="Easy Apply only"
                selected={filters.easyApply}
                onClick={() =>
                  dispatch({
                    type: "SET_FILTER",
                    key: "easyApply",
                    value: !filters.easyApply,
                  })
                }
              />
            </FilterSection>

            <FilterSection title="Minimum Salary" icon={IndianRupee} tier={2} defaultOpen={true}>
              <div className="flex gap-3">
                <select
                  value={filters.salaryCurrency}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FILTER",
                      key: "salaryCurrency",
                      value: e.target.value,
                    })
                  }
                  className="h-11 px-3 py-3 text-base rounded-button border border-border bg-white text-text-primary focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15 transition-all duration-200"
                  aria-label="Salary currency"
                >
                  {Object.keys(CURRENCIES).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={filters.minSalary}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FILTER",
                      key: "minSalary",
                      value: e.target.value,
                    })
                  }
                  placeholder="e.g. 500000"
                  className={`flex-1 ${inputClasses}`}
                  aria-label="Minimum salary"
                />
              </div>
            </FilterSection>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBuilder;
