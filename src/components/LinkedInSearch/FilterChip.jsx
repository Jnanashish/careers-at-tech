import { motion } from "framer-motion";

const FilterChip = ({ label, selected, onClick, size = "md" }) => {
  // Design system 10.2: Padding 8px 16px, Font 14px/500, radius 9999px
  // Active: bg #2563EB, text white, border #2563EB
  // Default: bg white, border #E5E7EB, text #4B5563, hover border+text #2563EB
  const sizeClasses =
    size === "sm"
      ? "px-3 py-1.5 text-sm min-h-[36px]"
      : "px-4 py-2 text-sm min-h-[44px]";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`
        inline-flex items-center rounded-full font-medium transition-all duration-200 cursor-pointer select-none
        ${sizeClasses}
        ${
          selected
            ? "bg-primary text-white border border-primary shadow-sm"
            : "bg-white border border-border text-text-secondary hover:border-primary hover:text-primary"
        }
      `}
      aria-pressed={selected}
    >
      {label}
    </motion.button>
  );
};

export default FilterChip;
