import React from "react";
import { Info } from "lucide-react";

const AffiliateDisclosure = () => {
  return (
    <div className="max-w-content mx-auto px-4 lg:px-6 pt-6">
      <p className="text-xs text-text-tertiary text-center flex items-center justify-center gap-1.5">
        <Info size={14} className="flex-shrink-0" />
        We independently evaluate each tool. Some links may earn us a small
        commission at no extra cost to you.
      </p>
    </div>
  );
};

export default AffiliateDisclosure;
