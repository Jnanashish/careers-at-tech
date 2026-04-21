import React from "react";

const SkeletonCard = () => (
  <div className="bg-white rounded-card p-6 shadow-card border border-border animate-pulse">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-gray-200" />
      <div className="flex-1">
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-20" />
          <div className="h-6 bg-gray-200 rounded-full w-24" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-8 bg-gray-200 rounded-lg w-28 hidden sm:block" />
        </div>
      </div>
    </div>
  </div>
);

const SkeletonList = ({ count = 5 }) => (
  <div className="flex flex-col gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export { SkeletonCard };
export default SkeletonList;
