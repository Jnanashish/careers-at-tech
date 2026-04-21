import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const shouldAnimate =
  typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

const Breadcrumb = ({ companyName, jobTitle }) => {
  return (
    <motion.nav
      aria-label="Breadcrumb"
      className="mb-6"
      initial={shouldAnimate ? { opacity: 0 } : {}}
      animate={shouldAnimate ? { opacity: 1 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Desktop breadcrumb */}
      <ol className="hidden md:flex items-center gap-1.5 text-sm text-text-tertiary">
        <li>
          <Link href="/jobs" className="text-primary hover:text-primary-hover transition-colors">
            Jobs
          </Link>
        </li>
        <li>
          <ChevronRight size={14} className="text-border" />
        </li>
        <li>
          <span className="text-text-secondary">{companyName}</span>
        </li>
        <li>
          <ChevronRight size={14} className="text-border" />
        </li>
        <li>
          <span className="text-text-primary font-medium truncate max-w-[280px] inline-block align-bottom">
            {jobTitle}
          </span>
        </li>
      </ol>

      {/* Mobile back link */}
      <Link
        href="/jobs"
        className="md:hidden inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover transition-colors font-medium"
      >
        <ArrowLeft size={16} />
        Back to Jobs
      </Link>
    </motion.nav>
  );
};

export default Breadcrumb;
