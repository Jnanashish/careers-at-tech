import React, { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import { Bookmark, ExternalLink, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "timeago.js";

import { countClickinJd } from "@/core/apis/jobapicall";
import { generateSlugFromrole, generateRandomImpression } from "@/Helpers/jobdetailshelper";
import { DEFAULT_COMPANY_LOGO } from "@/Helpers/config";
import { getBadgeClass, formatJobType } from "@/components/Redesign/JobDetail/badgeUtils";

const JobCardNew = ({ data, index = 0 }) => {
  const {
    title,
    role,
    imagePath,
    jobtype,
    location,
    experience,
    jdpage,
    totalclick,
    id,
    link,
    companyName,
    createdAt,
    company,
  } = data;

  const [saved, setSaved] = useState(false);

  const titleForShare = generateSlugFromrole(title);
  const impressionClick = generateRandomImpression(totalclick);
  const displayTitle = role !== "N" ? role : title;
  const formattedJobType = formatJobType(jobtype);

  const companyLogo = () => {
    const logo = company?.smallLogo || imagePath;
    if (!logo || logo === "none") return DEFAULT_COMPANY_LOGO;
    return logo;
  };

  const handleCardClick = () => {
    if (jdpage === "true") {
      Router.push(`/${titleForShare}/${id}`);
    } else if (jdpage === "false" || jobtype === "promo") {
      window.open(link);
      countClickinJd(id);
    }
  };

  const handleMouseEnter = () => {
    if (jdpage === "true") {
      Router.prefetch(`/${titleForShare}/${id}`);
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setSaved(!saved);
  };

  if (jobtype === "promo") return null;

  const badges = [];
  if (formattedJobType) badges.push({ label: formattedJobType, type: jobtype });
  if (location && location !== "N" && location.length < 20)
    badges.push({ label: location, type: location.toLowerCase().includes("remote") ? "remote" : "onsite" });
  if (experience && experience !== "N" && experience.length < 15)
    badges.push({ label: experience, type: "default" });

  const shouldAnimate = typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

  return (
    <motion.article
      initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      className="group bg-white rounded-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 hover:border-l-4 hover:border-l-primary transition-all duration-200 cursor-pointer border border-border hover:border-border"
      role="article"
      aria-label={`${displayTitle} at ${companyName}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-border overflow-hidden bg-white">
          <Image
            src={companyLogo()}
            alt={`${companyName} logo`}
            width={48}
            height={48}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-card-title text-text-primary truncate">
                {displayTitle}
              </h3>
              <p className="text-base text-text-secondary flex items-center gap-1.5 mt-0.5">
                {companyName}
                <CheckCircle size={14} className="text-secondary flex-shrink-0" />
              </p>
            </div>
            <button
              onClick={handleSave}
              aria-label={saved ? "Remove bookmark" : "Save job"}
              className={`flex-shrink-0 p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                saved
                  ? "text-primary"
                  : "text-text-tertiary hover:text-primary"
              }`}
            >
              <Bookmark size={20} fill={saved ? "currentColor" : "none"} className={saved ? "animate-pulse" : ""} />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {badges.map((badge, i) => (
              <span
                key={i}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeClass(
                  badge.type
                )}`}
              >
                {badge.label}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 text-sm text-text-tertiary">
              <span>Posted {format(createdAt)}</span>
              <span className="hidden sm:inline">&middot;</span>
              <span className="hidden sm:inline">{impressionClick} views</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 border border-primary text-primary rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              View & Apply
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default JobCardNew;
