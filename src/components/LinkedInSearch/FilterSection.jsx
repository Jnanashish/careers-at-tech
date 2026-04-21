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
    <div className="py-4 first:pt-0 last:pb-0 border-b border-dashed border-linkedin-rule last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-linkedin-accent focus-visible:ring-offset-2 focus-visible:ring-offset-linkedin-surface rounded-[4px]"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5">
          {Icon && (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-[4px] bg-linkedin-accent-light text-linkedin-accent transition-colors group-hover:bg-linkedin-accent group-hover:text-linkedin-surface">
              <Icon size={13} strokeWidth={2.25} />
            </span>
          )}
          <span className="font-mono-proof text-[10.5px] uppercase tracking-[0.18em] text-linkedin-ink-soft group-hover:text-linkedin-ink transition-colors">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
        >
          <ChevronDown size={14} className="text-linkedin-muted" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
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
