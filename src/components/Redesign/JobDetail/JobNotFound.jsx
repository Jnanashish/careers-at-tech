import React from "react";
import Link from "next/link";
import { SearchX } from "lucide-react";

const JobNotFound = () => {
  return (
    <div className="bg-page min-h-screen pt-20">
      <div className="max-w-card mx-auto mt-24 px-4">
        <div className="bg-white rounded-card p-12 shadow-card border border-border text-center">
          <SearchX size={48} className="text-text-tertiary mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-text-primary mb-3">
            This job is no longer available
          </h1>
          <p className="text-body text-text-secondary mb-8 max-w-sm mx-auto">
            It may have been filled or removed by the employer. Check out other opportunities below.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-button hover:bg-primary-hover transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Browse all jobs &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobNotFound;
