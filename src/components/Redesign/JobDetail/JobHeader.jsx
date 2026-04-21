import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "timeago.js";
import {
  Bookmark,
  Share2,
  CheckCircle,
  MapPin,
  Briefcase,
  IndianRupee,
  GraduationCap,
  Calendar,
  Clock,
  ExternalLink,
  Users,
} from "lucide-react";

import { countClickinJd } from "@/core/apis/jobapicall";
import { shareJobDetails } from "@/Helpers/socialmediahandler";
import { firebaseEventHandler } from "@/core/eventHandler";
import { DEFAULT_COMPANY_LOGO } from "@/Helpers/config";
import { getBadgeClass, formatJobType, isValid, isSalaryValid } from "./badgeUtils";

const shouldAnimate =
  typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

const JobHeader = ({ data }) => {
  const [saved, setSaved] = useState(false);

  const displayTitle = data?.role && data.role !== "N" ? data.role : data?.title;

  const getCompanyLogo = () => {
    const logo = data?.company?.smallLogo || data?.imagePath;
    if (!logo || logo === "none") return DEFAULT_COMPANY_LOGO;
    return logo;
  };

  const handleApply = () => {
    countClickinJd(data._id);
    firebaseEventHandler("apply_clicked", {
      job_id: data._id,
      job_title: data.title,
      source: "jd_header",
    });
    window.open(data.link, "_blank");
  };

  const handleReferral = () => {
    firebaseEventHandler("referral_clicked", {
      job_id: data._id,
      job_title: data.title,
    });
    const linkedinUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(data?.companyName)}&network=%5B%22F%22%2C%22S%22%5D&sid=zDx`;
    window.open(linkedinUrl, "_blank");
  };

  const handleShare = () => {
    shareJobDetails(data);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const formattedJobType = formatJobType(data?.jobtype);

  const badges = [];
  if (formattedJobType) badges.push({ label: formattedJobType, type: data?.jobtype });
  if (isValid(data?.location) && data.location.length < 25)
    badges.push({
      label: data.location,
      type: data.location.toLowerCase().includes("remote") ? "remote" : "onsite",
    });
  if (isValid(data?.experience) && data.experience.length < 20)
    badges.push({ label: data.experience, type: "default" });

  const metaItems = [
    { icon: IndianRupee, label: "Salary", value: data?.salary, show: isSalaryValid(data?.salary) },
    { icon: GraduationCap, label: "Degree", value: data?.degree, show: isValid(data?.degree) },
    { icon: Calendar, label: "Batch", value: data?.batch, show: isValid(data?.batch) },
    { icon: MapPin, label: "Location", value: data?.location, show: isValid(data?.location) },
    { icon: Briefcase, label: "Experience", value: data?.experience, show: isValid(data?.experience) },
    { icon: Clock, label: "Posted", value: format(data?.createdAt), show: !!data?.createdAt },
  ].filter((item) => item.show);

  return (
    <motion.header
      initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-card p-6 md:p-8 shadow-card border border-border"
    >
      <div className="flex items-start gap-4 md:gap-5">
        {/* Company logo */}
        <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-card border border-border overflow-hidden bg-white">
          <Image
            src={getCompanyLogo()}
            alt={`${data?.companyName} logo`}
            width={64}
            height={64}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title row with action buttons */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-page-title font-bold text-text-primary leading-tight">
                {displayTitle}
              </h1>
              <p className="text-body font-medium text-text-secondary flex items-center gap-1.5 mt-1">
                {data?.companyName}
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                  <CheckCircle size={12} />
                  Verified
                </span>
              </p>
            </div>

            {/* Save & Share buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={handleSave}
                aria-label={saved ? "Remove saved job" : "Save job"}
                className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  saved ? "text-primary" : "text-text-tertiary hover:text-primary"
                }`}
              >
                <Bookmark
                  size={20}
                  fill={saved ? "currentColor" : "none"}
                  className={saved ? "scale-110 transition-transform" : "transition-transform"}
                />
              </button>
              <button
                onClick={handleShare}
                aria-label="Share job"
                className="p-2 rounded-lg text-text-tertiary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {badges.map((badge, i) => (
                <motion.span
                  key={i}
                  initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : {}}
                  animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.2, delay: 0.3 + i * 0.05 }}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getBadgeClass(badge.type)}`}
                >
                  {badge.label}
                </motion.span>
              ))}
            </div>
          )}

          {/* Metadata grid */}
          {metaItems.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 bg-page rounded-lg p-4 mt-5">
              {metaItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <item.icon size={16} className="text-text-tertiary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-caption uppercase tracking-wider text-text-tertiary font-medium">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-text-primary mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              data-apply-trigger
              onClick={handleApply}
              aria-label={`Apply for ${displayTitle} at ${data?.companyName} on their careers page`}
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-button text-base hover:bg-primary-hover transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-full sm:w-auto"
            >
              Apply on {data?.companyName}
              <ExternalLink size={16} />
            </button>
            <button
              onClick={handleReferral}
              className="inline-flex items-center justify-center gap-2 border border-primary text-primary font-medium px-6 py-3.5 rounded-button text-base hover:bg-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-full sm:w-auto"
            >
              <Users size={16} />
              Ask for Referral
            </button>
          </div>

          {/* Disclaimer */}
          {data?.platform === "careerspage" && (
            <p className="text-sm text-text-tertiary mt-4 italic">
              You&apos;ll be redirected to {data?.companyName}&apos;s official careers page. We never charge you to apply.
            </p>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default JobHeader;
