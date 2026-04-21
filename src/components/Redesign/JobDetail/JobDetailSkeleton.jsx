import React from "react";

const Shimmer = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const JobDetailSkeleton = () => {
  return (
    <div className="bg-page min-h-screen pt-20">
      <div className="max-w-content mx-auto px-4 lg:px-6 py-8">
        {/* Breadcrumb skeleton */}
        <Shimmer className="h-4 w-48 mb-6" />

        {/* Header card skeleton */}
        <div className="bg-white rounded-card p-6 md:p-8 shadow-card border border-border mb-8">
          <div className="flex items-start gap-4">
            <Shimmer className="w-16 h-16 rounded-card flex-shrink-0" />
            <div className="flex-1">
              <Shimmer className="h-8 w-3/4 mb-3" />
              <Shimmer className="h-5 w-1/3 mb-4" />
              <div className="flex gap-2 mb-6">
                <Shimmer className="h-6 w-20 rounded-full" />
                <Shimmer className="h-6 w-24 rounded-full" />
                <Shimmer className="h-6 w-16 rounded-full" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-page rounded-lg p-4 mb-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <Shimmer className="h-3 w-16" />
                    <Shimmer className="h-4 w-24" />
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Shimmer className="h-12 w-48 rounded-button" />
                <Shimmer className="h-12 w-48 rounded-button" />
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout skeleton */}
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 flex flex-col gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-card p-6 shadow-card border border-border">
                <Shimmer className="h-5 w-40 mb-4" />
                <Shimmer className="h-px w-full mb-5 bg-border" />
                <div className="flex flex-col gap-2.5">
                  <Shimmer className="h-4 w-full" />
                  <Shimmer className="h-4 w-5/6" />
                  <Shimmer className="h-4 w-4/5" />
                  <Shimmer className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:flex flex-col gap-4 w-[320px] flex-shrink-0">
            <div className="bg-white rounded-card p-6 shadow-card border border-border">
              <Shimmer className="h-5 w-32 mb-2" />
              <Shimmer className="h-4 w-24 mb-4" />
              <Shimmer className="h-12 w-full rounded-button mb-3" />
              <Shimmer className="h-12 w-full rounded-button" />
            </div>
            <div className="bg-white rounded-card p-6 shadow-card border border-border">
              <Shimmer className="h-5 w-28 mb-4" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col gap-1.5 py-3 border-b border-gray-100 last:border-0">
                  <Shimmer className="h-3 w-14" />
                  <Shimmer className="h-4 w-28" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailSkeleton;
