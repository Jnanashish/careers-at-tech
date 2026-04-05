import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { TOOLS } from "./toolsData";

const shouldAnimate =
  typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

const totalTools = TOOLS.length;
const freeCount = TOOLS.filter(
  (t) => t.pricing === "free" || t.pricing === "freemium"
).length;

const ToolsHero = ({ searchQuery, onSearchChange }) => {
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
            Handpicked for freshers
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-hero text-text-primary mb-4"
            style={{ maxWidth: 600, margin: "0 auto" }}
          >
            The best tools to land
            <br />
            your first tech job.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-lg text-gray-500 max-w-[520px] mx-auto mb-8 leading-relaxed"
          >
            Resume builders, interview prep, salary tools, and coding practice
            — vetted and organized so you don&apos;t have to.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="relative max-w-[600px] mx-auto mb-6"
          >
            <div className="relative flex items-center bg-white border border-border rounded-xl shadow-card focus-within:border-primary focus-within:shadow-search-focus transition-all duration-200">
              <Search
                size={20}
                className="absolute left-4 text-text-tertiary pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tools by name or category..."
                className="w-full h-12 pl-12 pr-4 rounded-xl text-base text-text-primary placeholder:text-text-tertiary outline-none bg-transparent"
                aria-label="Search tools"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.3, delay: 0.35 }}
        className="bg-gray-100 border-y border-border"
      >
        <div className="max-w-content mx-auto px-4 lg:px-6 py-5">
          <div className="flex items-center justify-center gap-4 md:gap-6 text-sm">
            <span>
              <span className="font-semibold text-text-primary">
                📝 {totalTools}
              </span>{" "}
              <span className="text-text-secondary">Tools</span>
            </span>
            <span className="text-text-tertiary">·</span>
            <span>
              <span className="font-semibold text-text-primary">
                🏷️ {freeCount}
              </span>{" "}
              <span className="text-text-secondary">Free Options</span>
            </span>
            <span className="text-text-tertiary">·</span>
            <span>
              <span className="font-semibold text-text-primary">✅</span>{" "}
              <span className="text-text-secondary">Verified Monthly</span>
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ToolsHero;
