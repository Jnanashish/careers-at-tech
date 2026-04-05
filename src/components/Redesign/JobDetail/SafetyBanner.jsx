import React from "react";
import { Shield, Flag } from "lucide-react";
import { motion } from "framer-motion";

const shouldAnimate =
  typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

const SafetyBanner = ({ jobTitle, companyName }) => {
  const reportSubject = encodeURIComponent(
    `Report: ${jobTitle || "Job"} at ${companyName || "Company"} — CareersAt.Tech`
  );

  return (
    <motion.section
      initial={shouldAnimate ? { opacity: 0 } : {}}
      whileInView={shouldAnimate ? { opacity: 1 } : {}}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-page py-10 mt-10"
    >
      <div className="max-w-content mx-auto px-4 lg:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Shield size={20} className="text-secondary" />
          <h2 className="text-base font-semibold text-text-primary">
            Your safety matters to us
          </h2>
        </div>
        <p className="text-sm text-text-secondary max-w-lg mx-auto leading-relaxed mb-4">
          All jobs are verified before listing. We never charge applicants to apply.
          If something looks suspicious, please report it.
        </p>
        <a
          href={`mailto:thecodergeek@gmail.com?subject=${reportSubject}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:underline transition-colors"
        >
          <Flag size={14} />
          Report this job
        </a>
      </div>
    </motion.section>
  );
};

export default SafetyBanner;
