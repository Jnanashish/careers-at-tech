import React from "react";
import { Search } from "lucide-react";

const EmptyState = ({ onClearFilters }) => {
  return (
    <div className="max-w-content mx-auto px-4 lg:px-6 py-16">
      <div className="text-center">
        <Search size={48} className="mx-auto text-text-tertiary mb-4" />
        <p className="text-xl font-semibold text-text-primary mb-2">
          No tools found
        </p>
        <p className="text-sm text-text-secondary mb-6">
          Try a different search term or browse all categories.
        </p>
        <button
          onClick={onClearFilters}
          className="border border-primary text-primary rounded-button px-5 py-2.5 text-sm font-medium hover:bg-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Browse All Tools
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
