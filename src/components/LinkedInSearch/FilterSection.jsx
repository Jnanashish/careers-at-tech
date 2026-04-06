import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FilterSection = ({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
  tier = 1,
}) => {
  const [open, setOpen] = useState(tier === 1 ? defaultOpen : false);

  // Design system: Cards 12px radius, 24px padding, shadow at rest
  return (
    <div className="border-l-[3px] border-primary bg-white rounded-r-lg shadow-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-text-tertiary" />}
          <span className="font-semibold text-sm text-text-primary">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-text-tertiary" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterSection;
