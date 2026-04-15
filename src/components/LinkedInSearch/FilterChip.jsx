import { motion } from "framer-motion";

const FilterChip = ({ label, selected, onClick, size = "md" }) => {
  const sizeClasses =
    size === "sm"
      ? "px-3 py-1 text-xs min-h-[32px]"
      : "px-3.5 py-1.5 text-sm min-h-[36px] md:min-h-[32px]";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center rounded-full font-dm font-medium transition-all duration-150 cursor-pointer select-none
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${sizeClasses}
        ${
          selected
            ? "bg-primary text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] border border-primary hover:bg-primary-hover"
            : "bg-white border border-gray-200 text-gray-700 hover:border-primary/40 hover:text-primary"
        }
      `}
      aria-pressed={selected}
    >
      {label}
    </motion.button>
  );
};

export default FilterChip;
