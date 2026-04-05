import React from "react";
import { ArrowRight } from "lucide-react";

const SuggestToolCTA = () => {
  return (
    <div className="max-w-content mx-auto px-4 lg:px-6 py-8">
      <div className="bg-primary-light rounded-card p-8 md:p-12 text-center">
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          💡 Know a great tool we&apos;re missing?
        </h2>
        <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
          We&apos;re always looking to add useful resources for freshers. Help
          the community by suggesting tools you&apos;ve found helpful.
        </p>
        <a
          href="mailto:thecodergeek@gmail.com?subject=Tool%20Suggestion%20for%20CareersAt.Tech"
          className="inline-flex items-center gap-2 border border-primary text-primary rounded-button px-6 py-3 text-sm font-medium hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Suggest a Tool
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
};

export default SuggestToolCTA;
