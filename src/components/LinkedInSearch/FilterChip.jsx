import { motion } from "framer-motion";

const FilterChip = ({ label, selected, onClick, size = "md" }) => {
  const sizeClasses =
    size === "sm"
      ? "px-3 py-1 text-[12px] min-h-[32px]"
      : "px-3.5 py-1.5 text-[13px] min-h-[36px] md:min-h-[32px]";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`
        relative inline-flex items-center gap-1.5 rounded-full font-sans-linkedin font-medium cursor-pointer select-none
        transition-[background,color,border-color,transform,box-shadow] duration-150
        focus:outline-none focus-visible:ring-2 focus-visible:ring-linkedin-accent focus-visible:ring-offset-2 focus-visible:ring-offset-linkedin-bg
        ${sizeClasses}
        ${
          selected
            ? "bg-linkedin-accent-light text-linkedin-accent border border-linkedin-accent shadow-[inset_0_-1px_0_rgba(181,73,47,0.25)] hover:bg-[#FFEEE7]"
            : "bg-linkedin-surface border border-linkedin-rule text-linkedin-ink-soft hover:border-linkedin-accent/60 hover:text-linkedin-accent hover:-translate-y-[1px]"
        }
      `}
      aria-pressed={selected}
    >
      {selected && (
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-linkedin-accent animate-stamp-bloom"
        />
      )}
      <span className="leading-none">{label}</span>
    </motion.button>
  );
};

export default FilterChip;
