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
  "w-full px-3 py-2.5 text-sm font-dm rounded-lg border border-gray-200 bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 placeholder:text-gray-400 transition-all";

const ReferralFinder = ({ filters, dispatch }) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="space-y-0">
      <div className="bg-white rounded-xl shadow-card p-5">
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
      <div className="mt-3 bg-white rounded-xl shadow-card overflow-hidden">
        <button
          type="button"
          onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-left cursor-pointer focus:outline-none group"
          aria-expanded={showHowItWorks}
        >
          <div className="flex items-center gap-2">
            <Info size={15} className="text-primary" />
            <span className="font-dm font-semibold text-[13px] uppercase tracking-wider text-gray-500 group-hover:text-gray-700 transition-colors">
              How it works
            </span>
          </div>
          <motion.div
            animate={{ rotate: showHowItWorks ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={14} className="text-gray-400" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showHowItWorks && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 space-y-2">
                <p className="text-sm font-dm text-gray-600 leading-relaxed">
                  The Referral Finder builds a LinkedIn people search URL to help you find
                  employees at a specific company who could potentially refer you.
                </p>
                <ol className="list-decimal list-inside text-sm font-dm text-gray-600 space-y-1.5 leading-relaxed">
                  <li>Enter the company name and the role you want a referral for</li>
                  <li>Select connection degree (1st degree connections are best for referrals)</li>
                  <li>Open the generated URL in LinkedIn</li>
                  <li>Reach out to people with a personalized message mentioning the role</li>
                </ol>
                <p className="text-xs font-dm text-gray-400 mt-2">
                  Tip: Filter by 1st connections first — they are most likely to help.
                  If none are found, try 2nd connections and ask mutual contacts for an introduction.
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
