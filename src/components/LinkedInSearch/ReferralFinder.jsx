import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  UserSearch,
  Users,
  MapPin,
  ChevronDown,
  Info,
} from "lucide-react";
import FilterSection from "./FilterSection";
import FilterChip from "./FilterChip";
import { CONNECTION_DEGREE } from "./lib/linkedin-params";

const inputClasses =
  "w-full px-3.5 py-2.5 text-[14px] font-sans-linkedin text-linkedin-ink rounded-[8px] border border-linkedin-rule bg-linkedin-surface focus:border-linkedin-accent focus:outline-none focus:ring-2 focus:ring-linkedin-accent/25 placeholder:text-linkedin-muted transition-colors";

const ReferralFinder = ({ filters, dispatch }) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="space-y-3">
      <div className="bg-linkedin-surface rounded-[14px] shadow-letterpress border border-linkedin-rule p-5 sm:p-6">
        <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-linkedin-rule">
          <div className="flex items-baseline gap-2">
            <span className="font-mono-proof text-[10px] uppercase tracking-[0.22em] text-linkedin-accent">
              §
            </span>
            <span className="font-serif-display italic text-[18px] leading-none text-linkedin-ink">
              Composing stick
            </span>
          </div>
          <span className="font-mono-proof text-[10px] uppercase tracking-[0.2em] text-linkedin-muted">
            Referral Finder
          </span>
        </div>

        <FilterSection title="Company" icon={Building2} defaultOpen={true}>
          <input
            type="text"
            value={filters.company}
            onChange={(e) =>
              dispatch({ type: "SET_FILTER", key: "company", value: e.target.value })
            }
            placeholder="e.g. Google, Microsoft, Razorpay..."
            className={inputClasses}
            aria-label="Company name"
          />
        </FilterSection>

        <FilterSection title="Role / Title" icon={UserSearch} defaultOpen={true}>
          <input
            type="text"
            value={filters.role}
            onChange={(e) =>
              dispatch({ type: "SET_FILTER", key: "role", value: e.target.value })
            }
            placeholder="e.g. Software Engineer, HR, Recruiter..."
            className={inputClasses}
            aria-label="Role or title"
          />
        </FilterSection>

        <FilterSection title="Connection Degree" icon={Users} defaultOpen={true}>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(CONNECTION_DEGREE).map(([label, value]) => (
              <FilterChip
                key={value}
                label={`${label} connections`}
                selected={filters.connectionDegree.includes(value)}
                onClick={() =>
                  dispatch({ type: "TOGGLE_CHIP", key: "connectionDegree", value })
                }
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Location" icon={MapPin} defaultOpen={true}>
          <input
            type="text"
            value={filters.location}
            onChange={(e) =>
              dispatch({ type: "SET_FILTER", key: "location", value: e.target.value })
            }
            placeholder="e.g. Bangalore, India..."
            className={inputClasses}
            aria-label="Location"
          />
        </FilterSection>
      </div>

      {/* How Referral Finder Works */}
      <div className="bg-linkedin-surface rounded-[14px] shadow-letterpress border border-linkedin-rule overflow-hidden">
        <button
          type="button"
          onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-left cursor-pointer focus:outline-none group"
          aria-expanded={showHowItWorks}
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-[4px] bg-linkedin-accent-light text-linkedin-accent">
              <Info size={13} strokeWidth={2.25} />
            </span>
            <span className="font-mono-proof text-[10.5px] uppercase tracking-[0.18em] text-linkedin-ink-soft group-hover:text-linkedin-ink transition-colors">
              Colophon · how it works
            </span>
          </div>
          <motion.div
            animate={{ rotate: showHowItWorks ? 180 : 0 }}
            transition={{ duration: 0.22 }}
          >
            <ChevronDown size={14} className="text-linkedin-muted" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showHowItWorks && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 space-y-2.5 border-t border-dashed border-linkedin-rule pt-3">
                <p className="font-sans-linkedin text-[14px] text-linkedin-ink-soft leading-relaxed">
                  The Referral Finder sets type for a LinkedIn people-search URL so
                  you can find employees at a specific company who might refer you.
                </p>
                <ol className="list-decimal list-inside font-sans-linkedin text-[14px] text-linkedin-ink-soft space-y-1.5 leading-relaxed marker:text-linkedin-accent marker:font-mono-proof">
                  <li>Enter the company name and the role you want a referral for</li>
                  <li>Select connection degree (1st degree connections are best for referrals)</li>
                  <li>Open the generated URL in LinkedIn</li>
                  <li>Reach out with a personalized message mentioning the role</li>
                </ol>
                <p className="font-mono-proof text-[11px] text-linkedin-muted mt-3 pt-2 border-t border-dashed border-linkedin-rule">
                  Tip · filter by 1st connections first. If none found, try 2nd
                  connections and ask mutual contacts for an introduction.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReferralFinder;
