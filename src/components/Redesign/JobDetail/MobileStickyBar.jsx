import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { countClickinJd } from "@/core/apis/jobapicall";
import { firebaseEventHandler } from "@/core/eventHandler";
import { isSalaryValid } from "./badgeUtils";

const shouldAnimate =
  typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

const MobileStickyBar = ({ data }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector("[data-apply-trigger]");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleApply = () => {
    countClickinJd(data._id);
    firebaseEventHandler("apply_clicked", {
      job_id: data._id,
      job_title: data.title,
      source: "mobile_sticky",
    });
    window.open(data.link, "_blank");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={shouldAnimate ? { y: 100 } : {}}
          animate={shouldAnimate ? { y: 0 } : {}}
          exit={shouldAnimate ? { y: 100 } : {}}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center justify-between px-4 py-3 max-w-content mx-auto">
            <div className="min-w-0 mr-3">
              <p className="text-sm font-medium text-text-primary truncate">
                {data?.companyName}
              </p>
              {isSalaryValid(data?.salary) && (
                <p className="text-xs text-green-600 font-medium">{data.salary}</p>
              )}
            </div>
            <button
              onClick={handleApply}
              className="flex-shrink-0 inline-flex items-center gap-1.5 bg-primary text-white font-semibold px-6 py-2.5 rounded-button text-sm hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Apply Now
              <ExternalLink size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyBar;
