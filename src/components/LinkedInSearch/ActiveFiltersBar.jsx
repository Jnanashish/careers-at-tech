import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  TIME_POSTED_LABELS,
  SORT_BY_LABELS,
  WORK_MODE_LABELS,
  JOB_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
  CONNECTION_DEGREE_LABELS,
} from "./lib/linkedin-params";

const LABEL_MAPS = {
  timePosted: TIME_POSTED_LABELS,
  sortBy: SORT_BY_LABELS,
  workMode: WORK_MODE_LABELS,
  jobType: JOB_TYPE_LABELS,
  experienceLevel: EXPERIENCE_LEVEL_LABELS,
  connectionDegree: CONNECTION_DEGREE_LABELS,
};

function getActiveChips(filters, tab) {
  const chips = [];

  if (tab === "referral") {
    if (filters.company)
      chips.push({ key: "company", label: filters.company, value: filters.company });
    if (filters.role)
      chips.push({ key: "role", label: filters.role, value: filters.role });
    if (filters.location)
      chips.push({ key: "location", label: filters.location, value: filters.location });
    filters.connectionDegree?.forEach((v) => {
      chips.push({
        key: "connectionDegree",
        label: CONNECTION_DEGREE_LABELS[v] || v,
        value: v,
      });
    });
    return chips;
  }

  if (filters.keywords)
    chips.push({ key: "keywords", label: filters.keywords, value: filters.keywords });
  if (filters.location)
    chips.push({ key: "location", label: filters.location, value: filters.location });
  if (filters.timePosted)
    chips.push({
      key: "timePosted",
      label: TIME_POSTED_LABELS[filters.timePosted] || filters.timePosted,
      value: filters.timePosted,
    });
  if (filters.sortBy)
    chips.push({
      key: "sortBy",
      label: SORT_BY_LABELS[filters.sortBy] || filters.sortBy,
      value: filters.sortBy,
    });

  const arrayFields = ["workMode", "jobType", "experienceLevel"];
  arrayFields.forEach((field) => {
    filters[field]?.forEach((v) => {
      chips.push({
        key: field,
        label: LABEL_MAPS[field]?.[v] || v,
        value: v,
      });
    });
  });

  if (filters.easyApply)
    chips.push({ key: "easyApply", label: "Easy Apply", value: true });
  if (filters.minSalary)
    chips.push({
      key: "minSalary",
      label: `Min ${filters.salaryCurrency} ${filters.minSalary}`,
      value: filters.minSalary,
    });

  return chips;
}

const ActiveFiltersBar = ({ filters, tab, onRemoveFilter, onClearAll }) => {
  const chips = getActiveChips(filters, tab);

  if (!chips.length) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      <span className="text-[11px] font-dm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap flex-shrink-0">
        Active
      </span>
      <AnimatePresence mode="popLayout">
        {chips.map((chip) => (
          <motion.span
            key={`${chip.key}-${chip.value}`}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-dm font-medium bg-primary/10 text-primary whitespace-nowrap flex-shrink-0"
          >
            {chip.label}
            <button
              type="button"
              onClick={() => onRemoveFilter(chip.key, chip.value)}
              className="ml-0.5 hover:text-primary-hover cursor-pointer"
              aria-label={`Remove ${chip.label} filter`}
            >
              <X size={12} />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
      <button
        type="button"
        onClick={onClearAll}
        className="text-[11px] font-dm font-medium text-gray-400 hover:text-primary whitespace-nowrap flex-shrink-0 cursor-pointer uppercase tracking-wider"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFiltersBar;
