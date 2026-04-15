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

  return (
    <div className="py-4 first:pt-0 last:pb-0 border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-none"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={15} className="text-gray-400 group-hover:text-primary transition-colors" />}
          <span className="font-dm font-semibold text-[13px] uppercase tracking-wider text-gray-500 group-hover:text-gray-700 transition-colors">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} className="text-gray-400" />
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
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterSection;
