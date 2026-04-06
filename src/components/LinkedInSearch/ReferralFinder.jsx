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

// Design system section 8: Height 44px, Padding 12px 16px, Font 16px
const inputClasses =
  "w-full h-11 px-4 py-3 text-base rounded-button border border-border bg-white text-text-primary focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15 placeholder:text-text-tertiary transition-all duration-200";

const ReferralFinder = ({ filters, dispatch }) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="space-y-4">
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
        <div className="flex flex-wrap gap-2">
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

      {/* How Referral Finder Works */}
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <button
          type="button"
          onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
          aria-expanded={showHowItWorks}
        >
          <div className="flex items-center gap-2">
            <Info size={16} className="text-primary" />
            <span className="font-semibold text-sm text-text-primary">
              How Referral Finder Works
            </span>
          </div>
          <motion.div
            animate={{ rotate: showHowItWorks ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} className="text-text-tertiary" />
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
              <div className="px-6 pb-6 space-y-3">
                <p className="text-sm text-text-secondary leading-relaxed">
                  The Referral Finder builds a LinkedIn people search URL to help you find
                  employees at a specific company who could potentially refer you.
                </p>
                <ol className="list-decimal list-inside text-sm text-text-secondary space-y-2 leading-relaxed">
                  <li>Enter the company name and the role you want a referral for</li>
                  <li>Select connection degree (1st degree connections are best for referrals)</li>
                  <li>Open the generated URL in LinkedIn</li>
                  <li>Reach out to people with a personalized message mentioning the role</li>
                </ol>
                <p className="text-xs text-text-tertiary mt-2">
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
