import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router from "next/router";
import { motion } from "framer-motion";

import { getJobListData } from "@/core/apis/jobapicall";
import { generateSlugFromrole } from "@/Helpers/jobdetailshelper";
import { firebaseEventHandler } from "@/core/eventHandler";
import { DEFAULT_COMPANY_LOGO } from "@/Helpers/config";
import { isValid } from "./badgeUtils";

const shouldAnimate =
  typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

const MiniJobCard = ({ job }) => {
  const getCompanyLogo = () => {
    const logo = job?.company?.smallLogo || job?.imagePath;
    if (!logo || logo === "none") return DEFAULT_COMPANY_LOGO;
    return logo;
  };

  const handleClick = () => {
    firebaseEventHandler("similar_jobcard_clicked", {
      job_id: job.id,
      job_title: job.title,
    });
    const slug = generateSlugFromrole(job.title);
    Router.push(`/${slug}/${job.id}`);
  };

  const meta = [job.companyName, isValid(job.location) ? job.location : null]
    .filter(Boolean)
    .join(" \u00B7 ");

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-3 bg-page rounded-lg p-3 hover:bg-primary-light transition-colors text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-md border border-border overflow-hidden bg-white">
        <Image
          src={getCompanyLogo()}
          alt={`${job.companyName} logo`}
          width={32}
          height={32}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-text-primary truncate">
          {job.role && job.role !== "N" ? job.role : job.title}
        </p>
        <p className="text-xs text-text-tertiary truncate">{meta}</p>
      </div>
    </button>
  );
};

const MiniSkeleton = () => (
  <div className="flex items-center gap-3 bg-page rounded-lg p-3 animate-pulse">
    <div className="w-8 h-8 rounded-md bg-gray-200 flex-shrink-0" />
    <div className="flex-1">
      <div className="h-3.5 bg-gray-200 rounded w-3/4 mb-1.5" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

const SimilarJobsMini = ({ companytype, currentJobId }) => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobListData(2, 5);
        if (res?.data) {
          const filtered = res.data.filter(
            (item) => item.id !== currentJobId && item.jdpage === "true"
          );
          setJobs(filtered.slice(0, 4));
        }
      } catch {
        setJobs([]);
      }
    };
    fetchJobs();
  }, [currentJobId]);

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 12 } : {}}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-card p-6 shadow-card border border-border"
    >
      <h3 className="text-sm font-semibold text-text-primary mb-3">Similar Jobs</h3>

      <div className="flex flex-col gap-2">
        {jobs === null ? (
          <>
            <MiniSkeleton />
            <MiniSkeleton />
            <MiniSkeleton />
          </>
        ) : jobs.length > 0 ? (
          jobs.map((job) => <MiniJobCard key={job.id} job={job} />)
        ) : (
          <p className="text-sm text-text-tertiary py-2">No similar jobs found.</p>
        )}
      </div>

      <button
        onClick={() => Router.push("/jobs")}
        className="mt-4 text-sm text-primary hover:text-primary-hover font-medium transition-colors"
      >
        View all jobs &rarr;
      </button>
    </motion.div>
  );
};

export default SimilarJobsMini;
