import React from "react";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { isValid } from "./badgeUtils";

const shouldAnimate =
  typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

const ContentCard = ({ title, icon, html, fallbackText, companyName, applyUrl }) => {
  const hasContent = isValid(html);

  if (!hasContent && !fallbackText) return null;

  return (
    <motion.section
      initial={shouldAnimate ? { opacity: 0, y: 16 } : {}}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-card p-6 md:p-7 shadow-card border border-border"
    >
      <h2 className="text-card-title font-semibold text-text-primary flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h2>
      <hr className="border-border mt-3 mb-5" />

      {hasContent ? (
        <div className="text-body text-text-secondary leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-2 [&_li]:marker:text-primary [&_p]:mb-3 [&_a]:text-primary [&_a]:underline [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-text-primary [&_h3]:mb-2 [&_h4]:text-sm [&_h4]:font-semibold [&_h4]:text-text-primary [&_h4]:mb-1 last:[&_p]:mb-0">
          {parse(html)}
        </div>
      ) : (
        <div className="bg-page border border-dashed border-border rounded-lg p-4 flex items-start gap-3">
          <Info size={18} className="text-text-tertiary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-text-secondary">
            <p>
              {companyName
                ? `Details about ${companyName} are not available at the moment.`
                : "Company details are not available."}
            </p>
            {applyUrl && (
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover font-medium mt-1 inline-block transition-colors"
              >
                Visit their careers page &rarr;
              </a>
            )}
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default ContentCard;
