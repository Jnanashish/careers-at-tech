import React from "react";
import { format } from "timeago.js";
import {
  ExternalLink,
  Users,
  MapPin,
  Briefcase,
  IndianRupee,
  GraduationCap,
  Calendar,
} from "lucide-react";

import { countClickinJd } from "@/core/apis/jobapicall";
import { firebaseEventHandler } from "@/core/eventHandler";
import { isValid, isSalaryValid } from "./badgeUtils";

const StickyApplyCard = ({ data }) => {
  const displayTitle = data?.role && data.role !== "N" ? data.role : data?.title;

  const handleApply = () => {
    countClickinJd(data._id);
    firebaseEventHandler("apply_clicked", {
      job_id: data._id,
      job_title: data.title,
      source: "sidebar",
    });
    window.open(data.link, "_blank");
  };

  const handleReferral = () => {
    firebaseEventHandler("referral_clicked", {
      job_id: data._id,
      job_title: data.title,
      source: "sidebar",
    });
    const linkedinUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(data?.companyName)}&network=%5B%22F%22%2C%22S%22%5D&sid=zDx`;
    window.open(linkedinUrl, "_blank");
  };

  const facts = [
    { icon: IndianRupee, label: "Salary", value: data?.salary, show: isSalaryValid(data?.salary) },
    { icon: MapPin, label: "Location", value: data?.location, show: isValid(data?.location) },
    { icon: GraduationCap, label: "Degree", value: data?.degree, show: isValid(data?.degree) },
    { icon: Calendar, label: "Batch", value: data?.batch, show: isValid(data?.batch) },
    { icon: Briefcase, label: "Experience", value: data?.experience, show: isValid(data?.experience) },
  ].filter((item) => item.show);

  return (
    <div className="bg-white rounded-card p-6 shadow-card border border-border sticky top-24">
      {/* Job title + company */}
      <h3 className="text-base font-semibold text-text-primary truncate">{displayTitle}</h3>
      <p className="text-sm text-text-secondary mt-0.5">{data?.companyName}</p>

      {/* CTA buttons */}
      <div className="flex flex-col gap-2.5 mt-5">
        <button
          onClick={handleApply}
          className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-button hover:bg-primary-hover transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Apply Now
          <ExternalLink size={15} />
        </button>
        <button
          onClick={handleReferral}
          className="w-full inline-flex items-center justify-center gap-2 border border-primary text-primary font-medium py-3 rounded-button hover:bg-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Users size={15} />
          Get Referral
        </button>
      </div>

      {/* Quick facts */}
      {facts.length > 0 && (
        <div className="mt-6 pt-5 border-t border-border">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Facts</h3>
          <div className="flex flex-col">
            {facts.map((fact, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 py-2.5 ${
                  i < facts.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <fact.icon size={15} className="text-text-tertiary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-caption uppercase tracking-wider text-text-tertiary font-medium">
                    {fact.label}
                  </p>
                  <p className="text-sm font-medium text-text-primary truncate">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posted time */}
      {data?.createdAt && (
        <p className="text-xs text-text-tertiary mt-4">
          Posted {format(data.createdAt)}
        </p>
      )}
    </div>
  );
};

export default StickyApplyCard;
