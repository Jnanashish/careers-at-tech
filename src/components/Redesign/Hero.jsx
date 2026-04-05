import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const popularFilters = [
  { label: "Frontend", query: "frontend" },
  { label: "Backend", query: "backend" },
  { label: "Data Science", query: "data" },
  { label: "Remote", query: "remote" },
  { label: "Internships", query: "internship" },
];

const stats = [
  { icon: "check-circle", number: "500+", label: "Active Jobs" },
  { icon: "building", number: "200+", label: "Companies" },
  { icon: "calendar", number: "Daily", label: "Updated" },
  { icon: "graduation-cap", number: "100%", label: "Free" },
];

const shouldAnimate = typeof window !== "undefined"
  ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : true;

const Hero = ({ onSearch, onFilterClick }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch(searchValue);
  };

  const handlePopularClick = (query) => {
    onFilterClick && onFilterClick(query);
  };

  const fadeUp = shouldAnimate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      }
    : { initial: {}, animate: {} };

  return (
    <section className="bg-page pt-24 sm:pt-28 pb-0">
      <div className="max-w-content mx-auto px-4 lg:px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.3 }}
            className="text-caption uppercase tracking-widest text-primary font-medium mb-4"
          >
            Trusted by 128,000+ freshers across India
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-hero text-text-primary mb-4"
          >
            Find your first tech job
            <br />
            at companies that matter.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-lg text-gray-500 max-w-[560px] mx-auto mb-8 leading-relaxed"
          >
            Verified jobs at Google, Microsoft, Stripe, and 200+ companies.
            Updated daily. Always free.
          </motion.p>

          <motion.form
            {...fadeUp}
            transition={{ duration: 0.3, delay: 0.3 }}
            onSubmit={handleSearch}
            className="relative max-w-[600px] mx-auto mb-6"
          >
            <div className="relative flex items-center bg-white border border-border rounded-xl shadow-card focus-within:border-primary focus-within:shadow-search-focus transition-all duration-200">
              <Search
                size={20}
                className="absolute left-4 text-text-tertiary pointer-events-none"
              />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search by job title, company, or skill..."
                className="w-full h-14 pl-12 pr-28 rounded-xl text-base text-text-primary placeholder:text-text-tertiary outline-none bg-transparent"
                aria-label="Search jobs"
              />
              <button
                type="submit"
                className="absolute right-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Search
              </button>
            </div>
          </motion.form>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="flex items-center justify-center gap-2 flex-wrap text-sm mb-10"
          >
            <span className="text-text-tertiary">Popular:</span>
            {popularFilters.map((filter, i) => (
              <React.Fragment key={filter.query}>
                <button
                  onClick={() => handlePopularClick(filter.query)}
                  className="text-primary hover:text-primary-hover font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1"
                >
                  {filter.label}
                </button>
                {i < popularFilters.length - 1 && (
                  <span className="text-text-tertiary">&middot;</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="bg-gray-100 border-y border-border">
        <div className="max-w-content mx-auto px-4 lg:px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-border">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-2 py-1"
              >
                <span className="text-sm font-semibold text-text-primary">
                  {stat.number}
                </span>
                <span className="text-sm text-text-secondary">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
