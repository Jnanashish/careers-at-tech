import { motion } from "framer-motion";

const FilterChip = ({ label, selected, onClick, size = "md" }) => {
  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-1 text-xs min-h-[32px]"
      : "px-3.5 py-1.5 text-sm min-h-[36px] md:min-h-[32px]";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center rounded-full font-dm font-medium transition-colors cursor-pointer select-none
        ${sizeClasses}
        ${
          selected
            ? "bg-linkedin-accent text-white shadow-sm"
            : "bg-white border border-linkedin-border text-linkedin-charcoal hover:border-linkedin-accent hover:text-linkedin-accent"
        }
      `}
      aria-pressed={selected}
    >
      {label}
    </motion.button>
  );
};

export default FilterChip;
